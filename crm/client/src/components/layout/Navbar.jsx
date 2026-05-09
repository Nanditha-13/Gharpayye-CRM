import { useState } from 'react';
import { Search, Bell, Menu, Zap, Sun, Moon, PlusCircle, Kanban } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';
import { useTheme } from '../../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onMenuToggle, onAddLead, isPipMode, togglePipMode }) {
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 transition-colors duration-300">
      <button 
        onClick={onMenuToggle}
        className="lg:hidden p-2 text-secondary hover:text-primary mr-2 transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          className="w-full bg-main border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-primary placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
          placeholder="Search leads, tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted font-mono bg-surface px-1.5 py-0.5 rounded border border-border shadow-sm">⌘K</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 text-secondary hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          onClick={onAddLead}
          className="hidden md:flex items-center gap-2 bg-main hover:bg-black/5 dark:hover:bg-white/5 border border-border text-primary text-sm font-medium px-3 py-2 rounded-lg transition-all shadow-sm"
        >
          <PlusCircle size={16} className="text-accent" />
          PiP Add
        </button>

        <button 
          onClick={() => navigate('/pipeline')}
          className="hidden md:flex items-center gap-2 bg-main hover:bg-black/5 dark:hover:bg-white/5 border border-border text-primary text-sm font-medium px-3 py-2 rounded-lg transition-all shadow-sm"
        >
          <Kanban size={16} className="text-secondary" />
          PiP Manage
        </button>

        <button 
          onClick={togglePipMode}
          className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg transition-all shadow-sm ${isPipMode ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-accent hover:bg-accent-hover text-white'}`}
        >
          <Zap size={16} className={isPipMode ? 'animate-pulse' : ''} />
          <span className="hidden sm:inline">{isPipMode ? 'Exit Mode' : 'PiP Mode'}</span>
        </button>

        <div className="w-px h-6 bg-border mx-1 hidden sm:block"></div>

        <button className="relative p-2 text-secondary hover:text-primary transition-colors hover:bg-black/5 dark:hover:bg-white/5 rounded-md">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface" />
        </button>
      </div>
    </header>
  );
}
