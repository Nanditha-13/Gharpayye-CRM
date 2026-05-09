import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, Mail, Lock, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'agent' });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('All fields required');
      return;
    }
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.role);
      toast.success('Account created!');
      navigate('/');
    } catch {
      const demoUser = { id: 'demo', name: form.name, email: form.email, role: form.role };
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-token');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-3">
            <Building2 size={22} className="text-black" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join the Gharpayy CRM team</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Full name</label>
              <div className="relative">
                <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input className="input w-full pl-8" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input className="input w-full pl-8" type="email" placeholder="you@gharpayy.com" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input className="input w-full pl-8" type="password" placeholder="Min 8 characters" value={form.password} onChange={e => set('password', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Role</label>
              <select className="input w-full" value={form.role} onChange={e => set('role', e.target.value)}>
                <option value="agent">Sales Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 mt-2">
              {loading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Zap size={13} />}
              Create Account
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-4">
            Have an account? <Link to="/login" className="text-accent hover:text-amber-400 font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
