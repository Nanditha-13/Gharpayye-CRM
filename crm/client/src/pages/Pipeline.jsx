import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal } from 'lucide-react';
import { MOCK_LEADS } from '../utils/mockData';
import { getStatusColor, getTempClass, getScoreColor, getInitials } from '../utils/helpers';
import toast from 'react-hot-toast';

const STAGES = ['New', 'Contacted', 'Visit Scheduled', 'Negotiation', 'Booked', 'Lost'];

const STAGE_COLORS = {
  'New': 'border-purple-500/30 bg-purple-500/5',
  'Contacted': 'border-blue-500/30 bg-blue-500/5',
  'Visit Scheduled': 'border-cyan-500/30 bg-cyan-500/5',
  'Negotiation': 'border-amber-500/30 bg-amber-500/5',
  'Booked': 'border-emerald-500/30 bg-emerald-500/5',
  'Lost': 'border-red-500/30 bg-red-500/5',
};

function LeadCard({ lead, onMove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-accent/40 transition-all group"
      draggable
      onDragStart={e => e.dataTransfer.setData('leadId', lead._id)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center text-xs font-semibold text-secondary">
            {getInitials(lead.name)}
          </div>
          <span className="text-sm font-medium text-primary">{lead.name}</span>
        </div>
        <span className={getTempClass(lead.leadTemperature)}>{lead.leadTemperature}</span>
      </div>

      <div className="text-xs text-muted mb-2 truncate">{lead.preferredLocation || 'No location'}</div>

      {lead.budget && (
        <div className="text-xs text-secondary mb-2">₹{lead.budget.toLocaleString()}/mo</div>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${getScoreColor(lead.score)}`} style={{ width: `${lead.score}%` }} />
        </div>
        <span className="text-xs text-muted font-mono">{lead.score}</span>
      </div>

      {/* Quick move */}
      <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {STAGES.filter(s => s !== lead.status).slice(0, 3).map(s => (
          <button key={s} onClick={() => onMove(lead._id, s)}
            className={`text-xs px-1.5 py-0.5 rounded-md border transition-all ${getStatusColor(s)} hover:opacity-80`}>
            → {s.split(' ')[0]}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function Pipeline() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [dragging, setDragging] = useState(null);

  const byStage = (stage) => leads.filter(l => l.status === stage);

  const moveToStage = (leadId, newStatus) => {
    setLeads(l => l.map(x => x._id === leadId ? { ...x, status: newStatus } : x));
    toast.success(`Moved to ${newStatus}`);
  };

  const handleDrop = (e, stage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (leadId) moveToStage(leadId, stage);
    setDragging(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Pipeline</h1>
          <p className="text-muted text-sm mt-0.5">Drag cards to move leads between stages</p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const stageLeads = byStage(stage);
          return (
            <div
              key={stage}
              className="flex-shrink-0 w-64"
              onDragOver={e => { e.preventDefault(); setDragging(stage); }}
              onDragLeave={() => setDragging(null)}
              onDrop={e => handleDrop(e, stage)}
            >
              {/* Stage header */}
              <div className={`rounded-xl border p-3 mb-3 ${STAGE_COLORS[stage]} transition-all ${dragging === stage ? 'scale-[1.02]' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(stage)}`}>{stage}</span>
                  </div>
                  <span className="text-xs text-muted font-mono font-bold">{stageLeads.length}</span>
                </div>
              </div>

              {/* Cards */}
              <div className={`space-y-2 min-h-24 rounded-xl transition-all p-1 ${dragging === stage ? 'bg-white/3 border border-dashed border-border' : ''}`}>
                {stageLeads.map(lead => (
                  <LeadCard key={lead._id} lead={lead} onMove={moveToStage} />
                ))}
                {stageLeads.length === 0 && (
                  <div className="text-center py-6 text-muted text-xs">Drop here</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
