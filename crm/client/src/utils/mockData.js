export const MOCK_LEADS = [
  { _id: '1', name: 'Riya D.', phone: '+91 98765 43210', email: 'riya@email.com', budget: 15000, preferredLocation: 'Koramangala', source: 'Website', status: 'Tour Done', leadTemperature: 'WARM', score: 74, assignedTo: { name: 'Priya S.', email: 'ps@g.com' }, notes: 'Post-tour form pending', visitDate: new Date(Date.now() - 86400000 * 2), createdAt: new Date(Date.now() - 86400000 * 5), updatedAt: new Date(Date.now() - 86400000 * 1) },
  { _id: '2', name: 'Tanya M.', phone: '+91 97654 32109', email: 'tanya@email.com', budget: 12000, preferredLocation: 'Indiranagar', source: 'Referral', status: 'Tour Done', leadTemperature: 'COLD', score: 46, assignedTo: { name: 'Priya S.', email: 'ps@g.com' }, notes: 'Post-tour update missing', visitDate: new Date(Date.now() - 86400000 * 3), createdAt: new Date(Date.now() - 86400000 * 7), updatedAt: new Date(Date.now() - 86400000 * 2) },
  { _id: '3', name: 'Faisal N.', phone: '+91 96543 21098', email: 'faisal@email.com', budget: 8000, preferredLocation: 'HSR Layout', source: 'App', status: 'New', leadTemperature: 'COLD', score: 1, assignedTo: { name: 'Rohit I.', email: 'ri@g.com' }, notes: 'First response overdue', visitDate: null, createdAt: new Date(Date.now() - 86400000 * 5), updatedAt: new Date(Date.now() - 86400000 * 5) },
  { _id: '4', name: 'Arjun K.', phone: '+91 95432 10987', email: 'arjun@email.com', budget: 18000, preferredLocation: 'Whitefield', source: 'Social Media', status: 'New', leadTemperature: 'COLD', score: 48, assignedTo: { name: 'Rohit I.', email: 'ri@g.com' }, notes: 'First response overdue', visitDate: null, createdAt: new Date(Date.now() - 86400000 * 0.09), updatedAt: new Date(Date.now() - 86400000 * 0.09) },
  { _id: '5', name: 'Manish T.', phone: '+91 94321 09876', email: 'manish@email.com', budget: 10000, preferredLocation: 'BTM Layout', source: 'Walk-in', status: 'Contacted', leadTemperature: 'COLD', score: 5, assignedTo: { name: 'Rohit I.', email: 'ri@g.com' }, notes: 'Resurrect ghost', visitDate: null, createdAt: new Date(Date.now() - 86400000 * 10), updatedAt: new Date(Date.now() - 86400000 * 2) },
  { _id: '6', name: 'Sneha P.', phone: '+91 93210 98765', email: 'sneha@email.com', budget: 20000, preferredLocation: 'Koramangala', source: 'Referral', status: 'Visit Scheduled', leadTemperature: 'HOT', score: 100, assignedTo: { name: 'Neha V.', email: 'nv@g.com' }, notes: 'Tour today in 1.5h', visitDate: new Date(Date.now() + 3600000 * 1.5), createdAt: new Date(Date.now() - 86400000 * 2), updatedAt: new Date() },
  { _id: '7', name: 'Aakash B.', phone: '+91 92109 87654', email: 'aakash@email.com', budget: 25000, preferredLocation: 'Indiranagar', source: 'Website', status: 'Negotiation', leadTemperature: 'HOT', score: 100, assignedTo: { name: 'Amit M.', email: 'am@g.com' }, notes: 'Tour today in 2.5h, good prospect', visitDate: new Date(Date.now() + 3600000 * 2.5), createdAt: new Date(Date.now() - 86400000 * 1), updatedAt: new Date() },
  { _id: '8', name: 'Karthik R.', phone: '+91 91098 76543', email: 'karthik@email.com', budget: 16000, preferredLocation: 'HSR Layout', source: 'App', status: 'Visit Scheduled', leadTemperature: 'HOT', score: 97, assignedTo: { name: 'Amit M.', email: 'am@g.com' }, notes: 'Tour was 3h ago - confirm', visitDate: new Date(Date.now() - 3600000 * 3), createdAt: new Date(Date.now() - 86400000 * 3), updatedAt: new Date(Date.now() - 3600000 * 3) },
  { _id: '9', name: 'Vikram S.', phone: '+91 90987 65432', email: 'vikram@email.com', budget: 9000, preferredLocation: 'BTM Layout', source: 'Social Media', status: 'Contacted', leadTemperature: 'COLD', score: 14, assignedTo: { name: 'Rohit I.', email: 'ri@g.com' }, notes: 'Re-engagement attempt', visitDate: null, createdAt: new Date(Date.now() - 86400000 * 8), updatedAt: new Date(Date.now() - 86400000 * 1) },
  { _id: '10', name: 'Priya L.', phone: '+91 89876 54321', email: 'priya.l@email.com', budget: 14000, preferredLocation: 'Koramangala', source: 'Referral', status: 'Booked', leadTemperature: 'HOT', score: 95, assignedTo: { name: 'Priya S.', email: 'ps@g.com' }, notes: 'Booked Room 304', visitDate: new Date(Date.now() - 86400000 * 5), createdAt: new Date(Date.now() - 86400000 * 15), updatedAt: new Date(Date.now() - 86400000 * 3) },
  { _id: '11', name: 'Dev P.', phone: '+91 88765 43210', email: 'dev@email.com', budget: 7500, preferredLocation: 'Whitefield', source: 'Walk-in', status: 'Lost', leadTemperature: 'COLD', score: 10, assignedTo: { name: 'Neha V.', email: 'nv@g.com' }, notes: 'Found other PG', visitDate: null, createdAt: new Date(Date.now() - 86400000 * 20), updatedAt: new Date(Date.now() - 86400000 * 10) },
  { _id: '12', name: 'Neha G.', phone: '+91 87654 32101', email: 'neha.g@email.com', budget: 11000, preferredLocation: 'Indiranagar', source: 'App', status: 'New', leadTemperature: 'WARM', score: 55, assignedTo: { name: 'Amit M.', email: 'am@g.com' }, notes: 'Interested in double sharing', visitDate: null, createdAt: new Date(Date.now() - 86400000 * 0.5), updatedAt: new Date(Date.now() - 86400000 * 0.5) },
];

export const MOCK_USERS = [
  { _id: 'u1', name: 'Priya S.', email: 'ps@gharpayy.com', role: 'agent' },
  { _id: 'u2', name: 'Rohit I.', email: 'ri@gharpayy.com', role: 'agent' },
  { _id: 'u3', name: 'Neha V.', email: 'nv@gharpayy.com', role: 'agent' },
  { _id: 'u4', name: 'Amit M.', email: 'am@gharpayy.com', role: 'agent' },
  { _id: 'u5', name: 'Admin', email: 'admin@gharpayy.com', role: 'admin' },
];

export const MOCK_VISITS = [
  { _id: 'v1', leadId: { _id: '6', name: 'Sneha P.', phone: '+91 93210 98765' }, agentId: { _id: 'u3', name: 'Neha V.' }, visitDate: new Date(Date.now() + 3600000 * 1.5), propertyAddress: 'Koramangala Block 5, Property A', status: 'Scheduled', remarks: 'Premium room tour' },
  { _id: 'v2', leadId: { _id: '7', name: 'Aakash B.', phone: '+91 92109 87654' }, agentId: { _id: 'u4', name: 'Amit M.' }, visitDate: new Date(Date.now() + 3600000 * 2.5), propertyAddress: 'Indiranagar 12th Main, Property B', status: 'Scheduled', remarks: '' },
  { _id: 'v3', leadId: { _id: '8', name: 'Karthik R.', phone: '+91 91098 76543' }, agentId: { _id: 'u4', name: 'Amit M.' }, visitDate: new Date(Date.now() - 3600000 * 3), propertyAddress: 'HSR Layout Sector 2', status: 'Completed', remarks: 'Tour done, awaiting decision' },
  { _id: 'v4', leadId: { _id: '1', name: 'Riya D.', phone: '+91 98765 43210' }, agentId: { _id: 'u1', name: 'Priya S.' }, visitDate: new Date(Date.now() - 86400000 * 2), propertyAddress: 'Koramangala Block 7', status: 'Completed', remarks: 'Post-tour form pending' },
];

export const MOCK_MONTHLY_DATA = [
  { month: 'Nov', leads: 45, bookings: 8, visits: 32 },
  { month: 'Dec', leads: 52, bookings: 11, visits: 38 },
  { month: 'Jan', leads: 61, bookings: 13, visits: 44 },
  { month: 'Feb', leads: 48, bookings: 9, visits: 35 },
  { month: 'Mar', leads: 73, bookings: 16, visits: 56 },
  { month: 'Apr', leads: 84, bookings: 19, visits: 63 },
  { month: 'May', leads: 23, bookings: 5, visits: 18 },
];

export const AGENT_PERF = [
  { name: 'Priya S.', leads: 28, bookings: 7, rate: 25 },
  { name: 'Rohit I.', leads: 22, bookings: 4, rate: 18 },
  { name: 'Neha V.', leads: 19, bookings: 5, rate: 26 },
  { name: 'Amit M.', leads: 31, bookings: 8, rate: 26 },
];
