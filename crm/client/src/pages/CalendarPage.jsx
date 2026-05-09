import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import { MOCK_VISITS, MOCK_LEADS } from '../utils/mockData';
import { getTempDot, getStatusColor } from '../utils/helpers';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date());
  const today = new Date();

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  // Get events for a day
  const getEvents = (day) => {
    if (!day) return [];
    const date = new Date(year, month, day);
    const events = [];

    // Visits
    MOCK_VISITS.forEach(v => {
      const vd = new Date(v.visitDate);
      if (vd.toDateString() === date.toDateString()) {
        events.push({ type: 'visit', label: `Visit: ${v.leadId?.name}`, color: 'bg-blue-500' });
      }
    });

    // Lead visit dates
    MOCK_LEADS.forEach(l => {
      if (l.visitDate) {
        const ld = new Date(l.visitDate);
        if (ld.toDateString() === date.toDateString()) {
          events.push({ type: 'lead', label: l.name, color: getTempDot(l.leadTemperature) === 'bg-red-500' ? 'bg-red-500' : getTempDot(l.leadTemperature) === 'bg-amber-500' ? 'bg-amber-500' : 'bg-blue-500' });
        }
      }
    });

    return events;
  };

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Calendar</h1>
          <p className="text-gray-500 text-sm mt-0.5">Visits, follow-ups & tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <ChevronLeft size={16} />
          </button>
          <span className="font-display font-semibold text-white text-sm px-2">
            {MONTHS[month]} {year}
          </span>
          <button onClick={next} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <ChevronRight size={16} />
          </button>
          <button onClick={() => setCurrent(new Date())} className="text-xs text-accent hover:text-amber-400 px-2 py-1.5 hover:bg-accent/10 rounded-lg transition-all">
            Today
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {DAYS.map(d => (
            <div key={d} className="text-center py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const events = getEvents(day);
            const isToday = day && new Date(year, month, day).toDateString() === today.toDateString();
            const isPast = day && new Date(year, month, day) < today && !isToday;

            return (
              <motion.div
                key={i}
                className={`min-h-24 p-2 border-b border-r border-border/50 transition-colors
                  ${day ? 'hover:bg-white/3 cursor-pointer' : ''}
                  ${isToday ? 'bg-accent/5' : ''}
                  ${isPast ? 'opacity-60' : ''}
                  ${(i + 1) % 7 === 0 ? 'border-r-0' : ''}
                `}
              >
                {day && (
                  <>
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold mb-1
                      ${isToday ? 'bg-accent text-black' : 'text-gray-400 hover:text-white'}`}>
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {events.slice(0, 3).map((ev, j) => (
                        <div key={j} className={`flex items-center gap-1 text-xs px-1 py-0.5 rounded truncate`}>
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${ev.color}`} />
                          <span className="text-gray-400 truncate text-xs">{ev.label}</span>
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div className="text-xs text-gray-600 pl-1">+{events.length - 3} more</div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> HOT Lead</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> WARM Lead</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Visit / COLD</div>
      </div>
    </div>
  );
}
