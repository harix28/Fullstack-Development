import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Bell, Shield, Search, Moon, Sun, 
  Bookmark, User, LogOut, Settings, LayoutDashboard 
} from 'lucide-react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { GlobalSearchModal } from '@/components/common/GlobalSearchModal';
import { DemoSwitcher } from '@/components/common/DemoSwitcher';
import ROUTES from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('schemes')) return 'Government Schemes Matching';
    if (path.includes('jobs')) return 'Jobs & Recruitment Tracker';
    if (path.includes('documents')) return 'Digital Document Vault';
    if (path.includes('grievances')) return 'Grievance Redressal Assistant';
    if (path.includes('assistant')) return 'Ask Sarkar AI Assistant';
    if (path.includes('notifications')) return 'Citizen Notifications';
    if (path.includes('profile')) return 'Citizen Profile';
    if (path.includes('saved')) return 'Saved & Bookmarked Items';
    if (path.includes('settings')) return 'Settings & Privacy';
    return 'Dashboard Overview';
  };

  const getInitials = (name?: string) => {
    if (!name) return 'CS';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={cn(
        "md:hidden fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col",
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#1a2f8a]" />
            <span className="font-bold text-lg text-[#0f1740] dark:text-white">GovConnect</span>
          </Link>
          <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-slate-400">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-1 text-sm font-semibold">
          <Link to={ROUTES.DASHBOARD} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">Overview</Link>
          <Link to={ROUTES.PROFILE} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">My Profile</Link>
          <Link to={ROUTES.SCHEMES} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">Schemes</Link>
          <Link to={ROUTES.JOBS} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">Govt Jobs</Link>
          <Link to={ROUTES.DOCUMENTS} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">Document Vault</Link>
          <Link to={ROUTES.GRIEVANCES} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">Grievances</Link>
          <Link to={ROUTES.ASSISTANT} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">Ask Sarkar AI</Link>
          <Link to={ROUTES.SAVED || '/dashboard/saved'} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">Saved Items</Link>
          <Link to={ROUTES.SETTINGS} onClick={() => setMobileSidebarOpen(false)} className="block py-2 text-slate-700 dark:text-slate-300">Settings</Link>
        </div>
      </div>

      {/* Top Header Bar (Prompt Section 7) */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 h-16 md:ml-64 flex items-center justify-between px-4 sm:px-6 transition-colors">
        
        {/* Left: Hamburger + Page Title */}
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-1.5 text-slate-600 dark:text-slate-300 hover:text-[#1a2f8a]"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <h1 className="text-base sm:text-lg font-bold text-[#0f1740] dark:text-white truncate">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right: Controls & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Demo Persona Switcher Pill */}
          <div className="hidden xl:block">
            <DemoSwitcher />
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs hover:bg-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            title="Search anything (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] bg-white dark:bg-slate-700 px-1 py-0.5 rounded font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-[#0f1740] dark:text-white hover:bg-slate-200 transition-colors"
            title="Language"
          >
            {language === 'hi' ? 'हि' : 'EN'}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-[#1a2f8a] rounded-lg transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Icon */}
          <Link 
            to={ROUTES.NOTIFICATIONS} 
            className="relative p-1.5 text-slate-500 dark:text-slate-400 hover:text-[#1a2f8a] transition-colors"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Link>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-[#1a2f8a] text-white font-bold text-xs focus:outline-none ring-2 ring-blue-100 shadow"
            >
              {getInitials(user?.name)}
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-1.5 border border-slate-200 dark:border-slate-700 text-xs z-50">
                <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="font-bold text-[#0f1740] dark:text-white truncate">{user?.name || 'Citizen'}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.education} • {user?.state}</p>
                </div>
                <Link 
                  to={ROUTES.PROFILE} 
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  <User className="w-3.5 h-3.5" /> Citizen Profile
                </Link>
                <Link 
                  to={ROUTES.SAVED || '/dashboard/saved'} 
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-500" /> Saved Items
                </Link>
                <Link 
                  to={ROUTES.SETTINGS} 
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                  <Settings className="w-3.5 h-3.5" /> Settings
                </Link>
                <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-red-600 hover:bg-red-50 text-left font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="md:ml-64 pb-20 md:pb-8">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Ctrl+K Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </div>
  );
}
