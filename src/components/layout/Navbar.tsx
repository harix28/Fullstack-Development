import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, Bell, Menu, X, LogOut, User, LayoutDashboard, 
  Settings, Bookmark, Search, Moon, Sun, ArrowRight, Sparkles 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { GlobalSearchModal } from '@/components/common/GlobalSearchModal';
import ROUTES from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate(ROUTES.HOME);
  };

  // Exactly 4 tabs for unauthenticated visitors to get an overview of the platform
  const publicOverviewTabs = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'How It Works', href: ROUTES.HOW_IT_WORKS || '/how-it-works' },
    { label: 'Services', href: ROUTES.SERVICES },
    { label: 'About', href: ROUTES.ABOUT },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'CS';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0f1740] via-[#1a2f8a] to-[#2563eb] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-[#0f1740] dark:text-white tracking-tight">
                Gov<span className="text-[#0d9488]">Connect</span>
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          {!isAuthenticated ? (
            /* Exactly 4 Overview Tabs for Unauthenticated Citizens */
            <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              {publicOverviewTabs.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  end={link.href === ROUTES.HOME}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                      isActive 
                        ? 'bg-white dark:bg-slate-900 text-[#1a2f8a] dark:text-blue-400 font-bold shadow-xs border border-slate-200/60 dark:border-slate-700/60' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#1a2f8a] dark:hover:text-white'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          ) : (
            /* Logged-in citizen indicator: single prominent link to Dashboard where all work is done */
            <div className="hidden md:flex items-center gap-3">
              <Link
                to={ROUTES.DASHBOARD}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#1a2f8a] dark:text-blue-300 font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all border border-blue-200 dark:border-blue-800 shadow-xs"
              >
                <LayoutDashboard className="w-4 h-4 text-[#1a2f8a] dark:text-blue-400" />
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-blue-500" />
              </Link>
            </div>
          )}

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Search Button (Ctrl+K) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 text-xs hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors border border-slate-200/70 dark:border-slate-700/70 cursor-pointer"
              title="Search schemes, jobs, services (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-slate-600 dark:text-slate-300">Search...</span>
              <kbd className="text-[10px] bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded shadow-xs font-mono font-medium border border-slate-200 dark:border-slate-600">
                Ctrl+K
              </kbd>
            </button>

            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-[#0f1740] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/60 dark:border-slate-700/60 cursor-pointer"
              title="Switch Language"
            >
              {language === 'hi' ? 'हिन्दी' : 'EN'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-[#1a2f8a] dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors border border-slate-200/60 dark:border-slate-700/60 cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Authenticated Controls */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link 
                  to={ROUTES.SAVED || '/dashboard/saved'} 
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-[#1a2f8a] dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Saved Items"
                >
                  <Bookmark className="w-4 h-4" />
                </Link>

                <Link 
                  to={ROUTES.NOTIFICATIONS} 
                  className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-[#1a2f8a] dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                </Link>
                
                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-[#1a2f8a] text-white font-bold text-xs focus:outline-none ring-2 ring-blue-100 dark:ring-blue-900 shadow cursor-pointer"
                  >
                    {getInitials(user?.name)}
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-2 border border-slate-200 dark:border-slate-700 text-xs font-medium z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="font-bold text-[#0f1740] dark:text-white truncate">{user?.name || 'Citizen'}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                      </div>

                      <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold">
                        <LayoutDashboard className="h-4 w-4 text-[#1a2f8a] dark:text-blue-400" /> Dashboard Overview
                      </Link>
                      <Link to={ROUTES.PROFILE} className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                        <User className="h-4 w-4 text-slate-500 dark:text-slate-400" /> Citizen Profile
                      </Link>
                      <Link to={ROUTES.SAVED || '/dashboard/saved'} className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                        <Bookmark className="h-4 w-4 text-amber-500" /> Saved Collections
                      </Link>
                      <Link to={ROUTES.SETTINGS} className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                        <Settings className="h-4 w-4 text-slate-400" /> Settings
                      </Link>

                      <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-left font-semibold cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Unauthenticated Login & Register Buttons */
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to={ROUTES.LOGIN}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#1a2f8a] dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#1a2f8a] to-[#2563eb] rounded-lg hover:opacity-95 transition-opacity shadow-xs"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-[#0f1740] dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slideout Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-150">
            <button
              onClick={() => { setSearchModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" /> Search schemes, jobs, services...
              </span>
              <kbd className="text-[10px] bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded">Ctrl+K</kbd>
            </button>

            {!isAuthenticated ? (
              /* Exactly 4 mobile links for unauthenticated overview */
              <div className="space-y-1">
                {publicOverviewTabs.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : (
              /* Logged in mobile links focused on dashboard */
              <div className="space-y-1">
                <Link
                  to={ROUTES.DASHBOARD}
                  className="block px-3 py-2.5 rounded-lg text-sm font-bold bg-blue-50 dark:bg-blue-950/50 text-[#1a2f8a] dark:text-blue-300"
                >
                  Go to Dashboard Workspace
                </Link>
                <Link
                  to={ROUTES.PROFILE}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Citizen Profile
                </Link>
                <Link
                  to={ROUTES.SAVED || '/dashboard/saved'}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Saved Items
                </Link>
                <Link
                  to={ROUTES.SETTINGS}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Settings
                </Link>
              </div>
            )}

            {!isAuthenticated ? (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                <Link to={ROUTES.LOGIN} className="w-full py-2.5 text-center text-xs font-bold border border-slate-300 dark:border-slate-700 text-[#1a2f8a] dark:text-blue-400 rounded-lg">
                  Sign In
                </Link>
                <Link to={ROUTES.REGISTER} className="w-full py-2.5 text-center text-xs font-bold bg-[#1a2f8a] text-white rounded-lg">
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-center text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/40 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Global Ctrl+K Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
