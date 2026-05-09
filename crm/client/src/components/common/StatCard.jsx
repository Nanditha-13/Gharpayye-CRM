import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ label, value, sub, trend, icon: Icon, color = 'accent', delay = 0 }) {
  const colors = {
    accent: 'text-amber-400 bg-amber-400/10',
    hot: 'text-red-400 bg-red-400/10',
    cold: 'text-blue-400 bg-blue-400/10',
    green: 'text-emerald-400 bg-emerald-400/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="card p-4 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-muted font-medium">{label}</span>
        {Icon && (
          <div className={`p-1.5 rounded-lg ${colors[color]}`}>
            <Icon size={13} />
          </div>
        )}
      </div>
      <div className="font-display text-2xl font-bold text-primary mb-1">{value}</div>
      <div className="flex items-center gap-1.5">
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(trend)}%
          </span>
        )}
        {sub && <span className="text-xs text-muted">{sub}</span>}
      </div>
    </motion.div>
  );
}
