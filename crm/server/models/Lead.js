import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  action: String,
  note: String,
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  at: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  budget: { type: Number },
  preferredLocation: { type: String },
  source: { type: String, enum: ['Website', 'Referral', 'Social Media', 'Walk-in', 'App', 'Other'], default: 'Website' },
  status: { type: String, enum: ['New', 'Contacted', 'Visit Scheduled', 'Tour Done', 'Negotiation', 'Booked', 'Lost'], default: 'New' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String },
  leadTemperature: { type: String, enum: ['HOT', 'WARM', 'COLD'], default: 'COLD' },
  score: { type: Number, default: 0, min: 0, max: 100 },
  visitDate: { type: Date },
  activities: [activitySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

leadSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  // Auto-calculate temperature based on score
  if (this.score >= 70) this.leadTemperature = 'HOT';
  else if (this.score >= 40) this.leadTemperature = 'WARM';
  else this.leadTemperature = 'COLD';
  next();
});

export default mongoose.model('Lead', leadSchema);
