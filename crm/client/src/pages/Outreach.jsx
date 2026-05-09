import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Send, MessageCircle, Phone, Mail, Users, Zap, Plus, CheckCircle2 } from 'lucide-react';
import { MOCK_LEADS } from '../utils/mockData';
import { getTempClass, getInitials } from '../utils/helpers';
import toast from 'react-hot-toast';

const TEMPLATES = [
  { id: 1, name: 'Welcome Message', type: 'WhatsApp', body: 'Hi {name}! Welcome to Gharpayy. We have some great PG options in {location} that match your budget of ₹{budget}/mo. Would you like to schedule a tour?' },
  { id: 2, name: 'Tour Reminder', type: 'SMS', body: 'Hi {name}, your property tour at {address} is scheduled for today. Our agent will meet you at {time}. Reply CONFIRM to confirm.' },
  { id: 3, name: 'Re-engagement', type: 'Email', body: 'Hi {name}, we noticed you were interested in PG accommodations recently. We have new listings in {location} that match your needs. Let us know if you would like a callback!' },
  { id: 4, name: 'Post-Tour Follow-up', type: 'WhatsApp', body: 'Hi {name}! Hope you enjoyed the tour. Do you have any questions or would you like to proceed with the booking? We can offer special move-in discounts this week!' },
  { id: 5, name: 'Negotiation Nudge', type: 'Call', body: 'Call script: "Hi {name}, this is {agent} from Gharpayy. I wanted to follow up on the property you toured. We can offer 10% off on the security deposit if you book this week."' },
];

const TYPE_COLORS = {
  WhatsApp: 'text-green-400 bg-green-500/10 border-green-500/20',
  SMS: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Email: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Call: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

const TYPE_ICONS = { WhatsApp: MessageCircle, SMS: Phone, Email: Mail, Call: Phone };

export default function Outreach() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [sent, setSent] = useState(0);
  const [filter, setFilter] = useState('HOT');

  const filteredLeads = MOCK_LEADS.filter(l =>
    filter === 'all' ? true : l.leadTemperature === filter
  );

  const toggleLead = (id) => {
    setSelectedLeads(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const sendCampaign = () => {
    if (!selectedTemplate) { toast.error('Select a template first'); return; }
    if (selectedLeads.length === 0) { toast.error('Select at least one lead'); return; }
    setSent(selectedLeads.length);
    setSelectedLeads([]);
    toast.success(`Campaign sent to ${selectedLeads.length} leads!`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Outreach</h1>
          <p className="text-gray-500 text-sm mt-0.5">Send bulk messages and campaigns to leads</p>
        </div>
        {sent > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
            <CheckCircle2 size={14} /> {sent} messages sent
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Templates */}
        <div className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Zap size={13} className="text-accent" /> Message Templates
          </h2>
          <div className="space-y-2">
            {TEMPLATES.map(t => {
              const Icon = TYPE_ICONS[t.type] || Send;
              return (
                <motion.div
                  key={t.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedTemplate(t)}
                  className={`card p-3.5 cursor-pointer transition-all ${selectedTemplate?.id === t.id ? 'border-accent/50 bg-accent/5' : 'hover:border-white/10'}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${TYPE_COLORS[t.type]}`}>
                      <Icon size={10} className="inline mr-1" />{t.type}
                    </span>
                    {selectedTemplate?.id === t.id && (
                      <CheckCircle2 size={12} className="text-accent ml-auto" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{t.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lead selector */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Users size={13} className="text-accent" />
              Select Leads
              {selectedLeads.length > 0 && (
                <span className="text-xs text-accent font-bold">({selectedLeads.length} selected)</span>
              )}
            </h2>
            <div className="flex items-center gap-1">
              {['HOT', 'WARM', 'COLD', 'all'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-all ${filter === f ? 'bg-accent text-black font-bold' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="card overflow-hidden mb-4">
            <div className="flex items-center px-4 py-2.5 border-b border-border">
              <input
                type="checkbox"
                checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                onChange={() => setSelectedLeads(
                  selectedLeads.length === filteredLeads.length ? [] : filteredLeads.map(l => l._id)
                )}
                className="mr-3 accent-accent"
              />
              <span className="text-xs text-gray-500">Select all ({filteredLeads.length})</span>
            </div>
            <div className="divide-y divide-border/50 max-h-80 overflow-y-auto">
              {filteredLeads.map((lead, i) => (
                <motion.div
                  key={lead._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => toggleLead(lead._id)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/3 transition-colors ${selectedLeads.includes(lead._id) ? 'bg-accent/5' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => {}}
                    className="accent-accent shrink-0"
                  />
                  <div className="w-7 h-7 bg-white/8 rounded-full flex items-center justify-center text-xs font-semibold text-gray-300 shrink-0">
                    {getInitials(lead.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-white">{lead.name}</span>
                      <span className={getTempClass(lead.leadTemperature)}>{lead.leadTemperature}</span>
                    </div>
                    <div className="text-xs text-gray-500">{lead.phone} · {lead.preferredLocation || 'No location'}</div>
                  </div>
                  <div className="text-xs text-gray-500 shrink-0">{lead.status}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Send button */}
          <div className="flex items-center gap-3">
            {selectedTemplate && (
              <div className="flex-1 bg-surface border border-border rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1">Preview: {selectedTemplate.name}</div>
                <p className="text-xs text-gray-300 line-clamp-2">{selectedTemplate.body}</p>
              </div>
            )}
            <button
              onClick={sendCampaign}
              disabled={!selectedTemplate || selectedLeads.length === 0}
              className="btn-primary flex items-center gap-2 px-5 py-3 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={14} />
              Send Campaign
              {selectedLeads.length > 0 && <span className="font-mono">({selectedLeads.length})</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
