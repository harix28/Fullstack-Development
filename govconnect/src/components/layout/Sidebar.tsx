import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  FileText, Briefcase, FolderOpen, MessageSquare, 
  Bot, Bell, Settings, LogOut, Shield, Bookmark, User,
  Sparkles, CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import ROUTES from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { savedSchemeIds, savedJobIds } = useSaved();
  const totalSaved = savedSchemeIds.length + savedJobIds.length;

  // Streamlined, focused citizen modules (No "Overview", No "Local Services")
  const primaryNavItems = [
    { label: 'Schemes Matching', icon: FileText, href: ROUTES.SCHEMES, badge: 'AI Match' },
    { label: 'Govt Jobs Tracker', icon: Briefcase, href: ROUTES.JOBS },
    { label: 'Document Vault', icon: FolderOpen, href: ROUTES.DOCUMENTS },
    { label: 'Grievance Redress', icon: MessageSquare, href: ROUTES.GRIEVANCES },
    { label: 'Ask Sarkar AI', icon: Bot, href: ROUTES.ASSISTANT, highlight: true },
  ];

  const secondaryNavItems = [
    { label: 'My Citizen Profile', icon: User, href: ROUTES.PROFILE },
    { label: 'Saved Items', icon: Bookmark, href: ROUTES.SAVED || '/dashboard/saved', count: totalSaved > 0 ? totalSaved : undefined },
    { label: 'Notifications', icon: Bell, href: ROUTES.NOTIFICATIONS, count: 3 },
    { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
  ];

  return (
    <aside className="fixed w-64 left-0 top-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 hidden md:flex transition-colors font-sans shadow-xs">
      
      {/* Top Brand */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <Link to={ROUTES.SCHEMES} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0f1740] via-[#1a2f8a] to-[#2563eb] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Shield className="h-4.5 w-4.5" />
          </div>
          <span className="font-extrabold text-lg text-[#0f1740] dark:text-white tracking-tight">
            Gov<span className="text-[#0d9488]">Connect</span>
          </span>
        </Link>
        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      </div>

      {/* Citizen Demographics Quick Summary Pill */}
      <div className="px-3.5 pt-3 pb-1">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Citizen Active State</span>
            <span className="text-[10px] font-bold text-[#0d9488] bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.2 rounded border border-teal-200/60 dark:border-teal-800">
              Verified
            </span>
          </div>
          <p className="font-bold text-[#0f1740] dark:text-white truncate">{user?.name || 'Citizen User'}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {user?.education || 'MCA'} • {user?.state || 'Delhi'}
          </p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-4 scrollbar-thin">
        
        {/* Core Citizen Services */}
        <div>
          <p className="px-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Citizen Services
          </p>
          <div className="space-y-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150',
                      isActive 
                        ? 'bg-gradient-to-r from-[#1a2f8a] to-[#2563eb] text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-white' : item.highlight ? 'text-purple-500 dark:text-purple-400' : 'text-slate-400')} />
                        <span className={item.highlight && !isActive ? 'text-purple-600 dark:text-purple-400 font-bold' : ''}>
                          {item.label}
                        </span>
                      </div>
                      {item.badge && !isActive && (
                        <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#1a2f8a] dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Account & Records */}
        <div>
          <p className="px-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            My Account
          </p>
          <div className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-150',
                      isActive 
                        ? 'bg-[#1a2f8a] text-white shadow-xs' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                        <span>{item.label}</span>
                      </div>
                      {item.count ? (
                        <span className={cn(
                          "flex items-center justify-center h-4.5 px-1.5 rounded-full text-[10px] font-bold",
                          isActive ? "bg-white text-[#1a2f8a]" : "bg-blue-100 dark:bg-slate-800 text-[#1a2f8a] dark:text-blue-300"
                        )}>
                          {item.count}
                        </span>
                      ) : null}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

      </nav>

      {/* Bottom User Actions */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 bg-slate-50/50 dark:bg-slate-900/50">
        <Link 
          to={ROUTES.PROFILE} 
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a2f8a] to-[#2563eb] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            {user?.name?.slice(0, 2).toUpperCase() || 'CS'}
          </div>
          <div className="truncate text-xs">
            <p className="font-bold text-[#0f1740] dark:text-white truncate">{user?.name || 'Citizen'}</p>
            <p className="text-[10px] text-slate-400 truncate">Manage Profile →</p>
          </div>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
