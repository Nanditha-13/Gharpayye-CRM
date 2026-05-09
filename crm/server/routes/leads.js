import express from 'express';
import Lead from '../models/Lead.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const { status, location, agent, search, page = 1, limit = 20 } = req.query;
    let query = {};
    if (req.user.role === 'agent') query.assignedTo = req.user._id;
    if (status) query.status = status;
    if (location) query.preferredLocation = new RegExp(location, 'i');
    if (agent && req.user.role === 'admin') query.assignedTo = agent; // Only admin can filter by agent
    if (search) query.$or = [
      { name: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') }
    ];
    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .populate('assignedTo', 'name email role')
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ leads, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const leadData = { ...req.body };
    if (req.user.role === 'agent') {
      leadData.assignedTo = req.user._id; // Force self-assignment for agents
    } else if (!leadData.assignedTo) {
      leadData.assignedTo = req.user._id;
    }
    const lead = await Lead.create(leadData);
    await lead.populate('assignedTo', 'name email role');
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const existingLead = await Lead.findById(req.params.id);
    if (!existingLead) return res.status(404).json({ message: 'Lead not found' });
    
    // Check if agent trying to edit someone else's lead or reassiging lead
    if (req.user.role === 'agent') {
      if (existingLead.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You can only edit assigned leads' });
      }
      if (req.body.assignedTo && req.body.assignedTo !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: Cannot reassign leads' });
      }
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assignedTo', 'name email role');
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin only route
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const byStatus = await Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
    const byTemp = await Lead.aggregate([{ $group: { _id: '$leadTemperature', count: { $sum: 1 } } }]);
    const bySource = await Lead.aggregate([{ $group: { _id: '$source', count: { $sum: 1 } } }]);
    const booked = byStatus.find(s => s._id === 'Booked')?.count || 0;
    res.json({ total, conversionRate: total ? ((booked / total) * 100).toFixed(1) : 0, byStatus, byTemp, bySource });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
