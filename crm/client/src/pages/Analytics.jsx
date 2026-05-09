import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Users, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';
import { MOCK_LEADS, MOCK_MONTHLY_DATA, AGENT_PERF } from '../utils/mockData';
import StatCard from '../components/common/StatCard';

const PIE_COLORS = ['#F5A623', '#4A9EFF', '#FF4444', '#10B981', '#8B5CF6', '#EC4899'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-300">{p.name}:</span>
          <span className="text-white font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Analytics() {
  const leads = MOCK_LEADS;
  const total = leads.length;
  const booked = leads.filter(l => l.status === 'Booked').length;
  const conversion = ((booked / total) * 100).toFixed(1);

  const byStatus = Object.entries(
    leads.reduce((acc, l) => ({ ...acc, [l.status]: (acc[l.status] || 0) + 1 }), {})
  ).map(([name, value]) => ({ name, value }));

  const bySource = Object.entries(
    leads.reduce((acc, l) => ({ ...acc, [l.source]: (acc[l.source] || 0) + 1 }), {})
  ).map(([name, value]) => ({ name, value }));

  const stats = [
    { label: 'Total Leads', value: total, trend: 12, icon: Users, color: 'accent' },
    { label: 'Conversion Rate', value: `${conversion}%`, trend: 3, icon: TrendingUp, color: 'green' },
    { label: 'Total Visits', value: 18, trend: 8, icon: Calendar, color: 'cold' },
    { label: 'Booked', value: booked, trend: 15, icon: CheckCircle2, color: 'hot' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-500 text-sm mt-0.5">Performance overview for your CRM</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.08} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Monthly trend */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Monthly Leads & Bookings</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MOCK_MONTHLY_DATA}>
              <defs>
                <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#252830" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="leads" name="Leads" stroke="#F5A623" fill="url(#leadsGrad)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#10B981" fill="url(#bookGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Lead by source */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Leads by Source</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={bySource} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {bySource.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(val) => <span style={{ color: '#9CA3AF', fontSize: 11 }}>{val}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Agent performance */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Agent Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={AGENT_PERF} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#252830" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="leads" name="Leads" fill="#4A9EFF" radius={[3, 3, 0, 0]} />
              <Bar dataKey="bookings" name="Bookings" fill="#F5A623" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status breakdown */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Pipeline Status Breakdown</h3>
          <div className="space-y-3">
            {byStatus.map((s, i) => {
              const pct = ((s.value / total) * 100).toFixed(0);
              return (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">{s.name}</span>
                    <span className="text-gray-500">{s.value} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
