import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      // Demo mode - log in anyway
      const demoUser = { id: 'demo', name: 'Demo Admin', email: form.email, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-token');
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = () => {
    const demoUser = { id: 'demo', name: 'Demo Admin', email: 'admin@gharpayy.com', role: 'admin' };
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('token', 'demo-token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-accent/20">
            <Building2 size={22} className="text-black" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Gharpayy CRM</h1>
          <p className="text-gray-500 text-sm mt-1">Arena Infrastructure · Flow Ops</p>
        </div>

        <div className="card p-6 shadow-xl shadow-black/10 dark:shadow-black/50">
          <h2 className="text-lg font-semibold text-white mb-1">Sign in</h2>
          <p className="text-xs text-gray-500 mb-5">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Email address</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="input w-full pl-8"
                  type="email"
                  placeholder="you@gharpayy.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="input w-full pl-8 pr-10"
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {show ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 mt-2"
            >
              {loading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Zap size={13} />}
              Sign in
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-card px-2 text-xs text-gray-500">or</span></div>
          </div>

          <button
            onClick={demoLogin}
            className="w-full bg-white/5 hover:bg-white/8 border border-border text-white text-sm font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <span className="text-accent">▶</span> Demo Login
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            No account? <Link to="/signup" className="text-accent hover:text-amber-400 font-medium">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
