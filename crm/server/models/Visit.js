import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visitDate: { type: Date, required: true },
  propertyAddress: { type: String },
  remarks: { type: String },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled', 'No Show'], default: 'Scheduled' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Visit', visitSchema);
