import { X, Phone, Mail, MapPin, DollarSign, Calendar, Clock, User, Edit2, Trash2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTempClass, getStatusColor, getScoreColor, formatDate, formatDateTime, getInitials } from '../../utils/helpers';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2">
    <Icon size={13} className="text-gray-500 mt-0.5 shrink-0" />
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm text-white">{value || '—'}</div>
    </div>
  </div>
);

const activities = [
  { action: 'Lead created', time: '5 days ago', by: 'System' },
  { action: 'First call made', time: '3 days ago', by: 'Rohit I.' },
  { action: 'Tour scheduled', time: '2 days ago', by: 'Priya S.' },
  { action: 'Tour completed', time: '1 day ago', by: 'Priya S.' },
  { action: 'Follow-up pending', time: 'Now', by: 'System' },
];

export default function LeadDetailModal({ lead, onClose, onEdit, onDelete }) {
  const scoreColor = getScoreColor(lead.score);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent/30 to-amber-600/20 rounded-xl flex items-center justify-center text-white font-bold text-sm border border-accent/20">
              {getInitials(lead.name)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg text-white font-semibold">{lead.name}</h2>
                <span className={getTempClass(lead.leadTemperature)}>{lead.leadTemperature}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {onEdit && (
              <button onClick={() => onEdit(lead)} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                <Edit2 size={14} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(lead._id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                <Trash2 size={14} />
              </button>
            )}
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Contact Info</h3>
            <div className="space-y-3">
              <InfoRow icon={Phone} label="Phone" value={lead.phone} />
              <InfoRow icon={Mail} label="Email" value={lead.email} />
              <InfoRow icon={MapPin} label="Preferred Location" value={lead.preferredLocation} />
              <InfoRow icon={DollarSign} label="Budget" value={lead.budget ? `₹${lead.budget?.toLocaleString()}/mo` : null} />
              <InfoRow icon={User} label="Assigned To" value={lead.assignedTo?.name} />
              <InfoRow icon={Calendar} label="Visit Date" value={formatDateTime(lead.visitDate)} />
            </div>
          </div>

          {/* Score & Timeline */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Lead Score</h3>
            <div className="bg-surface rounded-xl p-4">
              <div className="flex items-end justify-between mb-3">
                <span className="font-display text-3xl font-bold text-white">{lead.score}</span>
                <span className="text-xs text-gray-500">/ 100</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lead.score}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${scoreColor}`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Source: {lead.source}</p>
            </div>

            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-4">Activity Timeline</h3>
            <div className="space-y-2">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0 relative">
                    {i === 0 && <div className="absolute inset-0 rounded-full bg-accent animate-ping" />}
                    <div className="absolute inset-0 rounded-full bg-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-300">{a.action}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock size={9} />
                      {a.time} · {a.by}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        {lead.notes && (
          <div className="px-5 pb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Notes</h3>
            <p className="text-sm text-gray-300 bg-surface rounded-lg p-3">{lead.notes}</p>
          </div>
        )}

        {/* Quick actions */}
        <div className="flex items-center gap-2 p-5 border-t border-border">
          <button className="flex items-center gap-1.5 bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 px-3 py-2 rounded-lg text-xs font-medium transition-all">
            <Phone size={12} /> Call
          </button>
          <button className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 px-3 py-2 rounded-lg text-xs font-medium transition-all">
            <MessageCircle size={12} /> WhatsApp
          </button>
          <button className="flex items-center gap-1.5 bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 px-3 py-2 rounded-lg text-xs font-medium transition-all">
            <Calendar size={12} /> Schedule Visit
          </button>
          <div className="ml-auto text-xs text-gray-600">Created {formatDate(lead.createdAt)}</div>
        </div>
      </motion.div>
    </div>
  );
}
