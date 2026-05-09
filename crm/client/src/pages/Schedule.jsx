import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Clock, MapPin, User, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_VISITS, MOCK_LEADS, MOCK_USERS } from '../utils/mockData';
import { formatDateTime, getInitials } from '../utils/helpers';

const STATUS_STYLES = {
  'Scheduled': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Cancelled': 'bg-red-500/10 text-red-400 border-red-500/20',
  'No Show': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

function ScheduleModal({ onClose, onSave }) {
  const [form, setForm] = useState({ leadId: '', agentId: '', visitDate: '', propertyAddress: '', remarks: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}>
        <h2 className="font-display text-lg text-white mb-5">Schedule Visit</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Lead</label>
            <select className="input w-full" value={form.leadId} onChange={e => set('leadId', e.target.value)}>
              <option value="">Select lead</option>
              {MOCK_LEADS.map(l => <option key={l._id} value={l._id}>{l.name} — {l.phone}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Field Executive</label>
            <select className="input w-full" value={form.agentId} onChange={e => set('agentId', e.target.value)}>
              <option value="">Assign agent</option>
              {MOCK_USERS.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Visit Date & Time</label>
            <input type="datetime-local" className="input w-full" value={form.visitDate} onChange={e => set('visitDate', e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Property Address</label>
            <input className="input w-full" placeholder="Full property address" value={form.propertyAddress} onChange={e => set('propertyAddress', e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Remarks</label>
            <textarea className="input w-full resize-none" rows={2} placeholder="Any notes for the visit" value={form.remarks} onChange={e => set('remarks', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="btn-ghost flex-1">Cancel</button>
          <button onClick={() => { if (!form.leadId || !form.visitDate) { toast.error('Select lead and date'); return; } onSave(form); onClose(); }} className="btn-primary flex-1">
            Schedule
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Schedule() {
  const [visits, setVisits] = useState(MOCK_VISITS);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const now = new Date();
  const upcoming = visits.filter(v => new Date(v.visitDate) >= now && v.status === 'Scheduled');
  const overdue = visits.filter(v => new Date(v.visitDate) < now && v.status === 'Scheduled');
  const completed = visits.filter(v => v.status === 'Completed');

  const addVisit = (form) => {
    const lead = MOCK_LEADS.find(l => l._id === form.leadId);
    const agent = MOCK_USERS.find(u => u._id === form.agentId);
    const newVisit = {
      _id: String(Date.now()),
      leadId: lead ? { _id: lead._id, name: lead.name, phone: lead.phone } : { name: 'Unknown' },
      agentId: agent ? { _id: agent._id, name: agent.name } : { name: 'Unknown' },
      visitDate: new Date(form.visitDate),
      propertyAddress: form.propertyAddress,
      remarks: form.remarks,
      status: 'Scheduled',
    };
    setVisits(v => [newVisit, ...v]);
    toast.success('Visit scheduled!');
  };

  const updateStatus = (id, status) => {
    setVisits(v => v.map(x => x._id === id ? { ...x, status } : x));
    toast.success(`Visit ${status.toLowerCase()}`);
  };

  const VisitCard = ({ visit }) => (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
      className="card p-4 hover:border-white/10 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center text-xs font-bold text-white">
            {getInitials(visit.leadId?.name)}
          </div>
          <div>
            <div className="text-sm font-medium text-white">{visit.leadId?.name}</div>
            <div className="text-xs text-gray-500">{visit.leadId?.phone}</div>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[visit.status]}`}>
          {visit.status}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-gray-400">
        <div className="flex items-center gap-2"><Clock size={11} className="text-gray-600" />{formatDateTime(visit.visitDate)}</div>
        {visit.propertyAddress && <div className="flex items-center gap-2"><MapPin size={11} className="text-gray-600" />{visit.propertyAddress}</div>}
        <div className="flex items-center gap-2"><User size={11} className="text-gray-600" />{visit.agentId?.name}</div>
        {visit.remarks && <div className="text-gray-600 italic mt-1">"{visit.remarks}"</div>}
      </div>

      {visit.status === 'Scheduled' && (
        <div className="flex gap-1.5 mt-3 pt-3 border-t border-border/50">
          <button onClick={() => updateStatus(visit._id, 'Completed')}
            className="flex items-center gap-1 text-xs text-emerald-400 hover:bg-emerald-400/10 px-2 py-1 rounded-lg transition-all">
            <CheckCircle2 size={11} /> Done
          </button>
          <button onClick={() => updateStatus(visit._id, 'No Show')}
            className="flex items-center gap-1 text-xs text-gray-400 hover:bg-white/5 px-2 py-1 rounded-lg transition-all">
            <AlertCircle size={11} /> No Show
          </button>
          <button onClick={() => updateStatus(visit._id, 'Cancelled')}
            className="flex items-center gap-1 text-xs text-red-400 hover:bg-red-400/10 px-2 py-1 rounded-lg transition-all">
            <XCircle size={11} /> Cancel
          </button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Schedule</h1>
          <p className="text-gray-500 text-sm mt-0.5">{upcoming.length} upcoming · {overdue.length} overdue</p>
        </div>
        <button onClick={() => setScheduleOpen(true)} className="btn-primary flex items-center gap-1.5">
          <Plus size={14} /> Schedule Visit
        </button>
      </div>

      {overdue.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
            <AlertCircle size={14} /> Overdue Visits ({overdue.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {overdue.map(v => <VisitCard key={v._id} visit={v} />)}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Calendar size={14} className="text-accent" /> Upcoming Visits ({upcoming.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcoming.map(v => <VisitCard key={v._id} visit={v} />)}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
            <CheckCircle2 size={14} /> Completed ({completed.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {completed.map(v => <VisitCard key={v._id} visit={v} />)}
          </div>
        </div>
      )}

      {scheduleOpen && <ScheduleModal onClose={() => setScheduleOpen(false)} onSave={addVisit} />}
    </div>
  );
}
