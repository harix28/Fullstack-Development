import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Shield, User } from 'lucide-react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useAuth } from '@/context/AuthContext';
import ROUTES from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function DashboardLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('schemes')) return 'Schemes';
    if (path.includes('jobs')) return 'Govt Jobs';
    if (path.includes('documents')) return 'Document Vault';
    if (path.includes('grievances')) return 'Grievances';
    if (path.includes('assistant')) return 'AI Assistant';
    if (path.includes('notifications')) return 'Notifications';
    if (path.includes('profile')) return 'My Profile';
    if (path.includes('settings')) return 'Settings';
    return 'Dashboard Overview';
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={cn(
        "md:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out border-r border-[#e2e8f0]",
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#e2e8f0]">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#1a2f8a]" />
            <span className="font-bold text-[#0f1740] text-xl">GovConnect</span>
          </Link>
          <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-[#64748b]">Menu items are available in the bottom bar.</p>
        </div>
      </div>

      {/* Top Bar (Mobile & Desktop) */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#e2e8f0] h-14 md:ml-64 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-1 -ml-1 text-[#64748b] hover:text-[#0f1740]"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="md:hidden font-bold text-[#0f1740] flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#1a2f8a]" />
            GovConnect
          </div>
          <h1 className="hidden md:block text-lg font-semibold text-[#0f1740]">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to={ROUTES.NOTIFICATIONS || '/dashboard/notifications'} 
            className="relative p-2 text-[#64748b] hover:text-[#1a2f8a] transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Link>
          <Link to={ROUTES.PROFILE || '/dashboard/profile'}>
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#1a2f8a] text-white font-medium text-sm">
              {getInitials(user?.name)}
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="md:ml-64 pb-16 md:pb-0">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
}
