export const formatTimeAgo = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (diff < 0) {
    const absMins = Math.abs(mins);
    const absHrs = Math.abs(hrs);
    if (absMins < 60) return `in ${absMins}m`;
    if (absHrs < 24) return `in ${absHrs}h`;
    return `in ${Math.abs(days)}d`;
  }
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
};

export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatDateTime = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

export const getInitials = (name) => {
  if (!name) return '??';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const getStatusColor = (status) => {
  const colors = {
    'New': 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    'Contacted': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    'Visit Scheduled': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
    'Tour Done': 'bg-green-500/15 text-green-400 border-green-500/20',
    'Negotiation': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    'Booked': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    'Lost': 'bg-red-500/15 text-red-400 border-red-500/20',
  };
  return colors[status] || 'bg-gray-500/15 text-gray-400 border-gray-500/20';
};

export const getTempClass = (temp) => {
  if (temp === 'HOT') return 'badge-hot';
  if (temp === 'WARM') return 'badge-warm';
  return 'badge-cold';
};

export const getTempDot = (temp) => {
  if (temp === 'HOT') return 'bg-red-500';
  if (temp === 'WARM') return 'bg-amber-500';
  return 'bg-blue-500';
};

export const getScoreColor = (score) => {
  if (score >= 70) return 'bg-red-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-blue-500';
};

export const PIPELINE_STAGES = ['New', 'Contacted', 'Visit Scheduled', 'Negotiation', 'Booked', 'Lost'];
export const LOCATIONS = ['Koramangala', 'Indiranagar', 'HSR Layout', 'BTM Layout', 'Whitefield', 'Marathahalli', 'Electronic City'];
export const SOURCES = ['Website', 'Referral', 'Social Media', 'Walk-in', 'App', 'Other'];
