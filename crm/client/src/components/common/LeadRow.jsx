import { Phone, MessageCircle, MessageSquare, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTempClass, getTempDot, getStatusColor, getScoreColor, formatTimeAgo, getInitials } from '../../utils/helpers';

export default function LeadRow({ lead, index, onClick }) {
  const tempDot = getTempDot(lead.leadTemperature);
  const scoreColor = getScoreColor(lead.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 border-b border-border/50 last:border-0 cursor-pointer group transition-colors"
      onClick={() => onClick?.(lead)}
    >
      {/* Name + Temp */}
      <div className="flex items-center gap-2 w-44 min-w-0 shrink-0">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${tempDot}`} />
        <span className="text-sm font-medium text-primary truncate">{lead.name}</span>
        <span className={getTempClass(lead.leadTemperature)}>
          {lead.leadTemperature}
        </span>
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0 hidden md:block">
        <span className="text-xs text-muted truncate">{lead.notes || 'No notes'}</span>
      </div>

      {/* Status badge */}
      <div className="w-32 shrink-0 hidden lg:block">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(lead.status)}`}>
          {lead.status}
        </span>
      </div>

      {/* Score bar */}
      <div className="w-28 shrink-0 hidden xl:flex items-center gap-2">
        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full ${scoreColor} rounded-full transition-all`} style={{ width: `${lead.score}%` }} />
        </div>
        <span className="text-xs text-muted font-mono w-6 text-right">{lead.score}</span>
      </div>

      {/* Agent */}
      <div className="w-8 shrink-0 hidden lg:block">
        {lead.assignedTo && (
          <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-secondary text-xs font-semibold" title={lead.assignedTo.name}>
            {getInitials(lead.assignedTo.name)}
          </div>
        )}
      </div>

      {/* Time */}
      <div className="w-20 shrink-0 hidden xl:block">
        <span className="text-xs text-muted">{formatTimeAgo(lead.updatedAt)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          className="p-1.5 text-muted hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all"
          onClick={e => { e.stopPropagation(); window.open(`tel:${lead.phone}`); }}
        >
          <Phone size={13} />
        </button>
        <button className="p-1.5 text-muted hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all">
          <MessageSquare size={13} />
        </button>
        <button className="p-1.5 text-muted hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all">
          <MessageCircle size={13} />
        </button>
        <ChevronRight size={13} className="text-muted" />
      </div>
    </motion.div>
  );
}
