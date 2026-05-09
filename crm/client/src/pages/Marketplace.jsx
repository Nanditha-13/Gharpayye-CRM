import { motion } from 'framer-motion';
import { ShoppingBag, Star, Download, Zap, TrendingUp, Shield, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const INTEGRATIONS = [
  { id: 1, name: 'IndiaMART Leads', category: 'Lead Source', desc: 'Auto-import leads from IndiaMART property listings', rating: 4.6, downloads: 2340, icon: '🏪', price: 'Free', installed: true },
  { id: 2, name: 'WhatsApp Business', category: 'Messaging', desc: 'Send automated WhatsApp messages and campaigns', rating: 4.8, downloads: 5120, icon: '💬', price: 'Free', installed: true },
  { id: 3, name: 'Google Calendar Sync', category: 'Calendar', desc: 'Sync visit schedules with Google Calendar automatically', rating: 4.5, downloads: 3200, icon: '📅', price: 'Free', installed: false },
  { id: 4, name: 'Razorpay Payments', category: 'Payments', desc: 'Accept security deposits and rent payments online', rating: 4.7, downloads: 1890, icon: '💳', price: '₹999/mo', installed: false },
  { id: 5, name: 'MagicBricks Import', category: 'Lead Source', desc: 'Import leads automatically from MagicBricks', rating: 4.3, downloads: 1450, icon: '🏠', price: '₹499/mo', installed: false },
  { id: 6, name: 'Twilio SMS', category: 'Messaging', desc: 'Bulk SMS campaigns for lead nurturing and reminders', rating: 4.4, downloads: 980, icon: '📱', price: '₹299/mo', installed: false },
  { id: 7, name: 'Google Analytics', category: 'Analytics', desc: 'Track website traffic and lead source attribution', rating: 4.6, downloads: 4500, icon: '📊', price: 'Free', installed: false },
  { id: 8, name: 'Slack Notifications', category: 'Notifications', desc: 'Get instant Slack alerts for HOT leads and updates', rating: 4.7, downloads: 2100, icon: '🔔', price: 'Free', installed: false },
];

const CATEGORIES = ['All', 'Lead Source', 'Messaging', 'Calendar', 'Payments', 'Analytics', 'Notifications'];

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [installed, setInstalled] = useState(new Set(INTEGRATIONS.filter(i => i.installed).map(i => i.id)));

  const filtered = INTEGRATIONS.filter(item => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'All' && item.category !== category) return false;
    return true;
  });

  const toggle = (id) => {
    const item = INTEGRATIONS.find(i => i.id === id);
    if (installed.has(id)) {
      setInstalled(s => { const n = new Set(s); n.delete(id); return n; });
      toast.success(`${item.name} uninstalled`);
    } else {
      setInstalled(s => new Set([...s, id]));
      toast.success(`${item.name} installed!`);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Marketplace</h1>
        <p className="text-gray-500 text-sm mt-0.5">Extend your CRM with powerful integrations</p>
      </div>

      {/* Search + filter */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input className="input w-full pl-8" placeholder="Search integrations..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${category === c ? 'bg-accent text-black font-bold' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Installed banner */}
      {installed.size > 0 && (
        <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3 mb-5 text-sm">
          <Shield size={14} className="text-emerald-400 shrink-0" />
          <span className="text-emerald-400 font-medium">{installed.size} integrations active</span>
          <span className="text-gray-500">· Your CRM is enhanced with {installed.size} tools</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`card p-4 hover:border-white/15 transition-all group ${installed.has(item.id) ? 'border-emerald-500/30 bg-emerald-500/3' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-2xl">{item.icon}</div>
              {installed.has(item.id) && (
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                  Installed
                </span>
              )}
            </div>

            <div className="mb-1">
              <div className="text-sm font-semibold text-white">{item.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.category}</div>
            </div>

            <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{item.desc}</p>

            <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Star size={10} className="text-amber-400 fill-amber-400" />
                {item.rating}
              </div>
              <div className="flex items-center gap-1">
                <Download size={10} />
                {item.downloads.toLocaleString()}
              </div>
              <div className="ml-auto font-medium text-accent">{item.price}</div>
            </div>

            <button
              onClick={() => toggle(item.id)}
              className={`w-full text-xs font-semibold py-2 rounded-lg transition-all ${
                installed.has(item.id)
                  ? 'bg-white/5 text-gray-400 hover:bg-red-500/10 hover:text-red-400 border border-border hover:border-red-500/20'
                  : 'bg-accent text-black hover:bg-amber-400'
              }`}
            >
              {installed.has(item.id) ? 'Uninstall' : 'Install'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
