import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, User, FileText, Briefcase, 
  FolderOpen, MessageSquare, Bot, Bell, 
  Settings, LogOut, Shield, Bookmark, MapPin, Search 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import ROUTES from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { savedSchemeIds, savedJobIds, savedServiceIds } = useSaved();
  const totalSaved = savedSchemeIds.length + savedJobIds.length + savedServiceIds.length;

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, href: ROUTES.DASHBOARD, exact: true },
    { label: 'My Profile', icon: User, href: ROUTES.PROFILE },
    { label: 'Schemes Matching', icon: FileText, href: ROUTES.SCHEMES },
    { label: 'Govt Jobs', icon: Briefcase, href: ROUTES.JOBS },
    { label: 'Document Vault', icon: FolderOpen, href: ROUTES.DOCUMENTS },
    { label: 'Grievance Redress', icon: MessageSquare, href: ROUTES.GRIEVANCES },
    { label: 'Ask Sarkar AI', icon: Bot, href: ROUTES.ASSISTANT },
    { label: 'Local Services', icon: MapPin, href: ROUTES.SERVICES },
    { label: 'Saved Items', icon: Bookmark, href: ROUTES.SAVED || '/dashboard/saved', badge: totalSaved > 0 ? totalSaved : undefined },
    { label: 'Notifications', icon: Bell, href: ROUTES.NOTIFICATIONS, badge: 3 },
    { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
  ];

  return (
    <aside className="fixed w-64 left-0 top-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 hidden md:flex transition-colors font-sans">
      
      {/* Top Brand */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1a2f8a] flex items-center justify-center text-white shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg text-[#0f1740] dark:text-white tracking-tight">
            Gov<span className="text-[#0d9488]">Connect</span>
          </span>
        </Link>
        <span className="text-[10px] bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 font-bold px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
          Prototype
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors',
                  isActive 
                    ? 'bg-[#1a2f8a] text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className={cn(
                      "flex items-center justify-center h-4.5 px-1.5 rounded-full text-[10px] font-bold",
                      isActive ? "bg-white text-[#1a2f8a]" : "bg-blue-100 text-[#1a2f8a]"
                    )}>
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Profile Summary & Logout */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
        <Link to={ROUTES.PROFILE} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#1a2f8a] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow">
            {user?.name?.slice(0, 2).toUpperCase() || 'U'}
          </div>
          <div className="truncate text-xs">
            <p className="font-bold text-[#0f1740] dark:text-white truncate">{user?.name || 'Citizen'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.education || 'MCA'} • {user?.state || 'Delhi'}</p>
          </div>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
