import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, User, FileText, Briefcase, 
  FolderOpen, MessageSquare, Bot, Bell, 
  Settings, LogOut, Shield 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ROUTES from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function Sidebar() {
  const { logout } = useAuth();
  const unreadCount = 3; // Hardcoded for now as requested

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, href: ROUTES.DASHBOARD || '/dashboard', exact: true },
    { label: 'My Profile', icon: User, href: ROUTES.PROFILE || '/dashboard/profile' },
    { label: 'Schemes', icon: FileText, href: ROUTES.SCHEMES || '/dashboard/schemes' },
    { label: 'Govt Jobs', icon: Briefcase, href: ROUTES.JOBS || '/dashboard/jobs' },
    { label: 'Document Vault', icon: FolderOpen, href: ROUTES.DOCUMENTS || '/dashboard/documents' },
    { label: 'Grievances', icon: MessageSquare, href: ROUTES.GRIEVANCES || '/dashboard/grievances' },
    { label: 'AI Assistant', icon: Bot, href: ROUTES.ASSISTANT || '/dashboard/assistant' },
    { label: 'Notifications', icon: Bell, href: ROUTES.NOTIFICATIONS || '/dashboard/notifications', badge: unreadCount },
    { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS || '/dashboard/settings' },
  ];

  return (
    <aside className="fixed w-64 left-0 top-0 h-full bg-white border-r border-[#e2e8f0] flex-col z-40 hidden md:flex">
      {/* Top: Logo */}
      <div className="px-4 py-5 border-b border-[#e2e8f0]">
        <NavLink to={ROUTES.HOME} className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-[#1a2f8a]" />
          <span className="font-bold text-[#0f1740] text-xl">GovConnect</span>
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  isActive 
                    ? 'bg-[#1a2f8a] text-white' 
                    : 'text-[#64748b] hover:bg-gray-50 hover:text-[#1e293b]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-[#64748b]')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className={cn(
                      "flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold",
                      isActive ? "bg-red-500 text-white" : "bg-red-100 text-red-600"
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

      {/* Bottom: Logout */}
      <div className="px-3 pb-4 border-t border-[#e2e8f0] pt-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
