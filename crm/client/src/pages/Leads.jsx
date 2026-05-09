import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, ChevronLeft, ChevronRight, Edit2, Trash2, Eye, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_LEADS, MOCK_USERS } from '../utils/mockData';
import { getStatusColor, getTempClass, getScoreColor, formatDate, getInitials, PIPELINE_STAGES, LOCATIONS } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';
import AddLeadModal from '../components/common/AddLeadModal';
import LeadDetailModal from '../components/common/LeadDetailModal';

const PER_PAGE = 10;

export default function Leads() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterAgent, setFilterAgent] = useState('');
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [viewLead, setViewLead] = useState(null);

  const filtered = useMemo(() => leads.filter(l => {
    if (search && !`${l.name} ${l.phone} ${l.email}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus && l.status !== filterStatus) return false;
    if (filterLocation && l.preferredLocation !== filterLocation) return false;
    if (filterAgent && l.assignedTo?.name !== filterAgent) return false;
    return true;
  }), [leads, search, filterStatus, filterLocation, filterAgent]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const addLead = (form) => {
    const agentUser = MOCK_USERS.find(u => u._id === form.assignedTo);
    const newLead = {
      _id: String(Date.now()),
      ...form,
      leadTemperature: form.score >= 70 ? 'HOT' : form.score >= 40 ? 'WARM' : 'COLD',
      assignedTo: agentUser ? { name: agentUser.name, email: agentUser.email } : null,
      activities: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLeads(l => [newLead, ...l]);
    toast.success('Lead added!');
  };

  const updateLead = (form) => {
    const agentUser = MOCK_USERS.find(u => u._id === form.assignedTo);
    setLeads(l => l.map(x => x._id === editLead._id ? {
      ...x, ...form,
      leadTemperature: form.score >= 70 ? 'HOT' : form.score >= 40 ? 'WARM' : 'COLD',
      assignedTo: agentUser ? { name: agentUser.name, email: agentUser.email } : x.assignedTo,
      updatedAt: new Date()
    } : x));
    toast.success('Lead updated!');
    setEditLead(null);
  };

  const deleteLead = (id) => {
    setLeads(l => l.filter(x => x._id !== id));
    toast.success('Lead deleted');
    setViewLead(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">Leads</h1>
          <p className="text-muted text-sm mt-0.5">{filtered.length} leads found</p>
        </div>
        <button onClick={() => setAddOpen(true)} className="btn-primary flex items-center gap-1.5">
          <Plus size={14} /> Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input className="input w-full pl-8" placeholder="Search leads..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="input text-sm" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="input text-sm" value={filterLocation} onChange={e => { setFilterLocation(e.target.value); setPage(1); }}>
          <option value="">All Locations</option>
          {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        {isAdmin && (
          <select className="input text-sm" value={filterAgent} onChange={e => { setFilterAgent(e.target.value); setPage(1); }}>
            <option value="">All Agents</option>
            {MOCK_USERS.filter(u => u.role === 'agent').map(u => <option key={u._id} value={u.name}>{u.name}</option>)}
          </select>
        )}
        {(search || filterStatus || filterLocation || (isAdmin && filterAgent)) && (
          <button onClick={() => { setSearch(''); setFilterStatus(''); setFilterLocation(''); setFilterAgent(''); setPage(1); }}
            className="text-xs text-muted hover:text-primary px-2 py-1.5 hover:bg-black/5 dark:bg-white/5 rounded-lg transition-all">
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Phone</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Location</th>
                <th className="text-left px-4 py-3 font-semibold hidden xl:table-cell">Budget</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Score</th>
                <th className="text-left px-4 py-3 font-semibold hidden xl:table-cell">Agent</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Created</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 && (
                <tr><td colSpan={9} className="text-center py-16 text-muted">
                  <div className="text-4xl mb-2">📭</div>
                  <div>No leads found</div>
                </td></tr>
              )}
              {paged.map((lead, i) => (
                <motion.tr
                  key={lead._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 last:border-0 hover:bg-white/3 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center text-xs font-semibold text-gray-300 shrink-0">
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary">{lead.name}</div>
                        <span className={getTempClass(lead.leadTemperature)}>{lead.leadTemperature}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-secondary">{lead.phone}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-sm text-secondary">{lead.preferredLocation || '—'}</td>
                  <td className="px-4 py-3 hidden xl:table-cell text-sm text-secondary">
                    {lead.budget ? `₹${lead.budget.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                        <div className={`h-full ${getScoreColor(lead.score)} rounded-full`} style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className="text-xs text-muted font-mono">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell text-sm text-secondary">{lead.assignedTo?.name || '—'}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewLead(lead)} className="p-1.5 text-secondary hover:text-primary hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 rounded-lg transition-all" title="View details">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => setEditLead(lead)} className="p-1.5 text-secondary hover:text-accent hover:bg-accent/10 rounded-lg transition-all" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      {isAdmin && (
                        <button onClick={() => deleteLead(lead._id)} className="p-1.5 text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-xs text-muted">
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 text-muted hover:text-primary hover:bg-black/5 dark:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-7 h-7 text-xs rounded-lg transition-all ${p === page ? 'bg-accent text-black font-bold' : 'text-muted hover:text-primary hover:bg-black/5 dark:bg-white/5'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                className="p-1.5 text-muted hover:text-primary hover:bg-black/5 dark:bg-white/5 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {addOpen && <AddLeadModal onClose={() => setAddOpen(false)} onSave={addLead} />}
      {editLead && <AddLeadModal lead={editLead} onClose={() => setEditLead(null)} onSave={updateLead} />}
      {viewLead && <LeadDetailModal lead={viewLead} onClose={() => setViewLead(null)} onEdit={setEditLead} onDelete={deleteLead} />}
    </div>
  );
}
