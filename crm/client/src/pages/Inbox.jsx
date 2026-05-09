import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, CheckCircle2, Clock, AlertCircle, Archive, Star, Filter } from 'lucide-react';
import { MOCK_LEADS } from '../utils/mockData';
import { getTempClass, getStatusColor, formatTimeAgo, getInitials } from '../utils/helpers';

const INBOX_ITEMS = [
  { id: 1, type: 'overdue', lead: MOCK_LEADS[0], message: 'Post-tour form pending · 26h overdue', priority: 'urgent' },
  { id: 2, type: 'overdue', lead: MOCK_LEADS[1], message: 'Post-tour update missing · 48h overdue', priority: 'urgent' },
  { id: 3, type: 'new', lead: MOCK_LEADS[2], message: 'First response overdue · created 5d ago', priority: 'high' },
  { id: 4, type: 'new', lead: MOCK_LEADS[3], message: 'First response overdue · created 2.1h ago', priority: 'high' },
  { id: 5, type: 'followup', lead: MOCK_LEADS[4], message: 'Follow-up overdue · Resurrect ghost', priority: 'medium' },
  { id: 6, type: 'followup', lead: MOCK_LEADS[5], message: 'Tour today in 1.5h — prepare client', priority: 'urgent' },
  { id: 7, type: 'update', lead: MOCK_LEADS[6], message: 'Negotiation stage — needs quote', priority: 'high' },
  { id: 8, type: 'followup', lead: MOCK_LEADS[8], message: 'Re-engagement attempt — Vikram', priority: 'medium' },
  { id: 9, type: 'followup', lead: MOCK_LEADS[7], message: 'Move-in too far — sanity check', priority: 'low' },
  { id: 10, type: 'overdue', lead: MOCK_LEADS[1], message: 'Post-tour empty — follow up now', priority: 'urgent' },
];

const PRIORITY_STYLES = {
  urgent: 'text-red-400 bg-red-500/10 border-red-500/20',
  high: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  medium: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  low: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
};

const TYPE_ICONS = {
  overdue: AlertCircle,
  new: Star,
  followup: Clock,
  update: MessageCircle,
};

export default function Inbox() {
  const [items, setItems] = useState(INBOX_ITEMS);
  const [filter, setFilter] = useState('all');
  const [resolved, setResolved] = useState(new Set());

  const filtered = items.filter(item => {
    if (resolved.has(item.id)) return false;
    if (filter === 'all') return true;
    if (filter === 'urgent') return item.priority === 'urgent';
    if (filter === 'overdue') return item.type === 'overdue';
    return item.type === filter;
  });

  const resolve = (id) => setResolved(s => new Set([...s, id]));

  const filters = [
    { key: 'all', label: 'All', count: items.length - resolved.size },
    { key: 'urgent', label: 'Urgent', count: items.filter(i => i.priority === 'urgent' && !resolved.has(i.id)).length },
    { key: 'overdue', label: 'Overdue', count: items.filter(i => i.type === 'overdue' && !resolved.has(i.id)).length },
    { key: 'new', label: 'New Leads', count: items.filter(i => i.type === 'new' && !resolved.has(i.id)).length },
    { key: 'followup', label: 'Follow-ups', count: items.filter(i => i.type === 'followup' && !resolved.has(i.id)).length },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Inbox</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {filtered.length} action{filtered.length !== 1 ? 's' : ''} waiting · {resolved.size} resolved
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-4 bg-surface border border-border rounded-xl p-1 w-fit flex-wrap">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.key ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {f.label}
            {f.count > 0 && (
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                filter === f.key ? 'bg-accent text-black' : 'bg-white/10 text-gray-400'
              }`}>
                {f.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Inbox items */}
      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <CheckCircle2 size={32} className="mx-auto mb-3 text-emerald-500/50" />
            <div className="text-emerald-400 font-medium">All clear!</div>
            <div className="text-sm mt-1">Inbox zero achieved 🎉</div>
          </div>
        ) : (
          filtered.map((item, i) => {
            const Icon = TYPE_ICONS[item.type] || Clock;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-border/50 last:border-0 hover:bg-white/3 transition-colors group"
              >
                {/* Icon */}
                <div className={`p-1.5 rounded-lg border ${PRIORITY_STYLES[item.priority]} shrink-0`}>
                  <Icon size={12} />
                </div>

                {/* Avatar */}
                <div className="w-7 h-7 bg-white/8 rounded-full flex items-center justify-center text-xs font-semibold text-gray-300 shrink-0">
                  {getInitials(item.lead?.name)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white">{item.lead?.name}</span>
                    <span className={getTempClass(item.lead?.leadTemperature)}>{item.lead?.leadTemperature}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(item.lead?.status)}`}>
                      {item.lead?.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{item.message}</p>
                </div>

                {/* Time */}
                <span className="text-xs text-gray-600 shrink-0 hidden lg:block">
                  {formatTimeAgo(item.lead?.updatedAt)}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-500 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all" title="Call">
                    <Phone size={12} />
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all" title="WhatsApp">
                    <MessageCircle size={12} />
                  </button>
                  <button
                    onClick={() => resolve(item.id)}
                    className="p-1.5 text-gray-500 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all"
                    title="Mark done"
                  >
                    <CheckCircle2 size={12} />
                  </button>
                  <button
                    onClick={() => resolve(item.id)}
                    className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-lg transition-all"
                    title="Archive"
                  >
                    <Archive size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
