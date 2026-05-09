import express from 'express';
import Visit from '../models/Visit.js';
import Lead from '../models/Lead.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'agent') query.agentId = req.user._id;
    const visits = await Visit.find(query)
      .populate('leadId', 'name phone email')
      .populate('agentId', 'name email')
      .sort({ visitDate: 1 });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const visit = await Visit.create({ ...req.body, agentId: req.body.agentId || req.user._id });
    await Lead.findByIdAndUpdate(req.body.leadId, { status: 'Visit Scheduled', visitDate: req.body.visitDate });
    await visit.populate(['leadId', 'agentId']);
    res.status(201).json(visit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('leadId', 'name phone')
      .populate('agentId', 'name');
    res.json(visit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
