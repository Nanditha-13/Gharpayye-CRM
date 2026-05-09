import { motion } from 'framer-motion';
import { Building2, MapPin, Users, Star, DollarSign, CheckCircle2, Eye, Phone } from 'lucide-react';

const PROPERTIES = [
  { id: 1, name: 'Koramangala Heights', location: 'Koramangala Block 5', type: 'PG', beds: 24, available: 3, rent: 14000, rating: 4.5, amenities: ['WiFi', 'AC', 'Meals', 'Laundry', 'Security'], status: 'active' },
  { id: 2, name: 'Indiranagar Elite', location: 'Indiranagar 12th Main', type: 'PG', beds: 16, available: 1, rent: 18000, rating: 4.8, amenities: ['WiFi', 'AC', 'Gym', 'Meals'], status: 'active' },
  { id: 3, name: 'HSR Premium Stay', location: 'HSR Layout Sector 2', type: 'Hostel', beds: 40, available: 8, rent: 9500, rating: 4.2, amenities: ['WiFi', 'Meals', 'Security', 'CCTV'], status: 'active' },
  { id: 4, name: 'BTM Comfort PG', location: 'BTM Layout 2nd Stage', type: 'PG', beds: 20, available: 0, rent: 11000, rating: 4.0, amenities: ['WiFi', 'AC', 'Laundry'], status: 'full' },
  { id: 5, name: 'Whitefield Tech Hub', location: 'Whitefield Main Road', type: 'PG', beds: 36, available: 12, rent: 13000, rating: 4.3, amenities: ['WiFi', 'AC', 'Meals', 'Gym', 'Parking'], status: 'active' },
  { id: 6, name: 'Electronic City Nest', location: 'Electronic City Phase 1', type: 'Hostel', beds: 60, available: 5, rent: 8000, rating: 3.9, amenities: ['WiFi', 'Meals', 'Security'], status: 'active' },
];

const STATUS_STYLES = {
  active: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  full: 'text-red-400 bg-red-500/10 border-red-500/20',
  maintenance: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export default function SupplyHub() {
  const totalBeds = PROPERTIES.reduce((a, p) => a + p.beds, 0);
  const availableBeds = PROPERTIES.reduce((a, p) => a + p.available, 0);
  const occupancy = (((totalBeds - availableBeds) / totalBeds) * 100).toFixed(0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Supply Hub</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage PG properties and availability</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Properties', value: PROPERTIES.length, icon: Building2 },
          { label: 'Total Beds', value: totalBeds, icon: Users },
          { label: 'Available', value: availableBeds, icon: CheckCircle2 },
          { label: 'Occupancy', value: `${occupancy}%`, icon: Star },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{s.label}</span>
              <s.icon size={13} className="text-accent" />
            </div>
            <div className="font-display text-2xl font-bold text-white">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Occupancy bar */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Overall Occupancy</span>
          <span className="font-display text-lg font-bold text-accent">{occupancy}%</span>
        </div>
        <div className="h-3 bg-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${occupancy}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{totalBeds - availableBeds} occupied</span>
          <span>{availableBeds} available</span>
        </div>
      </div>

      {/* Properties grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROPERTIES.map((prop, i) => (
          <motion.div
            key={prop.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-4 hover:border-white/15 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Building2 size={14} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{prop.name}</div>
                  <div className="text-xs text-gray-500">{prop.type}</div>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[prop.status]}`}>
                {prop.status === 'full' ? 'Full' : prop.status === 'active' ? 'Active' : 'Maintenance'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
              <MapPin size={11} /> {prop.location}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="bg-surface rounded-lg p-2">
                <div className="font-display text-lg font-bold text-white">{prop.beds}</div>
                <div className="text-xs text-gray-600">Total beds</div>
              </div>
              <div className="bg-surface rounded-lg p-2">
                <div className={`font-display text-lg font-bold ${prop.available > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{prop.available}</div>
                <div className="text-xs text-gray-600">Available</div>
              </div>
              <div className="bg-surface rounded-lg p-2">
                <div className="flex items-center justify-center gap-0.5">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="font-display text-sm font-bold text-white">{prop.rating}</span>
                </div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-accent font-semibold">
                <DollarSign size={12} />
                <span className="text-sm">₹{prop.rent.toLocaleString()}<span className="text-gray-500 font-normal text-xs">/mo</span></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {prop.amenities.map(a => (
                <span key={a} className="text-xs text-gray-500 bg-surface border border-border px-2 py-0.5 rounded-full">{a}</span>
              ))}
            </div>

            <div className="flex gap-2 mt-3 pt-3 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 px-2.5 py-1.5 rounded-lg transition-all">
                <Eye size={11} /> View
              </button>
              <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 px-2.5 py-1.5 rounded-lg transition-all">
                <Phone size={11} /> Contact owner
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
