import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, RefreshCw, Flame, Zap, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_LEADS } from '../utils/mockData';
import LeadRow from '../components/common/LeadRow';
import StatCard from '../components/common/StatCard';
import LeadDetailModal from '../components/common/LeadDetailModal';

const GREETING = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

export default function Dashboard() {
  const { user } = useAuth();
  const [leads] = useState(MOCK_LEADS);
  const [selected, setSelected] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 15000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const hot = leads.filter(l => l.leadTemperature === 'HOT').length;
  const today = leads.filter(l => {
    if (!l.visitDate) return false;
    const d = new Date(l.visitDate);
    return d.toDateString() === now.toDateString();
  }).length;
  const urgent = leads.filter(l => l.score >= 70).length;
  const overdue = leads.filter(l => l.notes?.toLowerCase().includes('overdue')).length;

  const stats = [
    { label: 'Total Leads', value: leads.length, sub: 'all time', trend: 12, color: 'accent' },
    { label: 'HOT Leads', value: hot, sub: 'need action now', trend: 5, color: 'hot' },
    { label: 'Tours Today', value: today, sub: 'scheduled', color: 'cold' },
    { label: 'Booked', value: leads.filter(l => l.status === 'Booked').length, sub: 'this month', trend: 8, color: 'green' },
  ];

  const prioritized = [...leads].sort((a, b) => {
    const tempOrder = { HOT: 0, WARM: 1, COLD: 2 };
    if (tempOrder[a.leadTemperature] !== tempOrder[b.leadTemperature])
      return tempOrder[a.leadTemperature] - tempOrder[b.leadTemperature];
    return b.score - a.score;
  });

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
          <Sun size={12} className="text-accent" />
          <span>{dateStr} · {timeStr}</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-primary mb-1">{GREETING()}.</h1>
        <p className="text-secondary text-sm">
          {leads.length} actions ranked. Start at the top.
          <a href="/leads" className="text-accent hover:text-amber-400 ml-2 inline-flex items-center gap-1 transition-colors">
            All leads <ArrowRight size={11} />
          </a>
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Status strip */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="flex items-center gap-2 mb-4 text-xs flex-wrap">
        <span className="text-muted">Inbound triage</span>
        <div className="h-3 w-px bg-border" />
        <span className="bg-black/5 dark:bg-black/5 dark:bg-white/5 text-primary border border-border px-2 py-0.5 rounded-full font-medium">23 live tasks</span>
        <div className="h-3 w-px bg-border" />
        <span className="text-muted">Flow control: {leads.length} actions waiting · Inbox zero by lunch?</span>
      </motion.div>

      {/* Do This Next queue */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Zap size={13} className="text-accent" />
            <span className="text-sm font-semibold text-primary">Do this next</span>
            <span className="text-xs text-muted">live · refreshes every 15s</span>
          </div>
          <div className="flex items-center gap-3 ml-auto text-xs">
            <span className="flex items-center gap-1 text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              {urgent} urgent
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              {today} today
            </span>
            <span className="flex items-center gap-1 text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
              {hot} hot
            </span>
            <button className="text-muted hover:text-primary p-1 hover:bg-black/5 dark:bg-white/5 rounded-lg transition-all" onClick={() => setTick(t => t + 1)}>
              <RefreshCw size={11} />
            </button>
          </div>
        </div>

        {/* Column headers */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-border/50 text-xs text-muted font-medium uppercase tracking-wider">
          <div className="w-44">Lead</div>
          <div className="flex-1 hidden md:block">Notes</div>
          <div className="w-32 hidden lg:block">Stage</div>
          <div className="w-28 hidden xl:block">Score</div>
          <div className="w-8 hidden lg:block">Agent</div>
          <div className="w-20 hidden xl:block">Last activity</div>
          <div className="w-20">Actions</div>
        </div>

        {/* Lead rows */}
        {prioritized.map((lead, i) => (
          <LeadRow key={lead._id} lead={lead} index={i} onClick={setSelected} />
        ))}
      </motion.div>

      {selected && <LeadDetailModal lead={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
