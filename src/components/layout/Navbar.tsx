import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, Bell, Menu, X, LogOut, User, LayoutDashboard, 
  Settings, Bookmark, Moon, Sun, ArrowRight, Sparkles 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const getInitials = (name?: string) => {
    if (!name) return 'CS';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0f1740] via-[#1a2f8a] to-[#2563eb] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-[#0f1740] dark:text-white tracking-tight">
                Gov<span className="text-[#0d9488]">Connect</span>
              </span>
            </Link>
          </div>

          {/* Right Action Controls: Clean nav with Mode (Theme), Language, Sign In, Register */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Language Switch */}
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-[#0f1740] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/60 dark:border-slate-700/60 cursor-pointer flex items-center gap-1"
              title="Switch Language"
            >
              <span className="text-[10px] text-slate-400">Lang:</span>
              <span>{language === 'hi' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Theme / Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#1a2f8a] dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors border border-slate-200/60 dark:border-slate-700/60 cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Authenticated Controls */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={ROUTES.DASHBOARD}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#1a2f8a] dark:text-blue-300 font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all border border-blue-200 dark:border-blue-800 shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#1a2f8a] dark:text-blue-400" />
                  <span>Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-blue-500" />
                </Link>

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
                        <LayoutDashboard className="h-4 w-4 text-[#1a2f8a] dark:text-blue-400" /> Citizen Dashboard
                      </Link>
                      <Link to={ROUTES.PROFILE} className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                        <User className="h-4 w-4 text-slate-500 dark:text-slate-400" /> Profile
                      </Link>
                      <Link to={ROUTES.SAVED || '/dashboard/saved'} className="flex items-center gap-2.5 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60">
                        <Bookmark className="h-4 w-4 text-amber-500" /> Saved Items
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
              /* Clean Auth Action Buttons */
              <div className="flex items-center gap-2">
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

            {/* Mobile Menu Button for Authenticated Users */}
            {isAuthenticated && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-[#0f1740] dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Slideout for Logged In User */}
        {mobileMenuOpen && isAuthenticated && (
          <div className="sm:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-150">
            <Link
              to={ROUTES.DASHBOARD}
              className="block px-3 py-2.5 rounded-lg text-sm font-bold bg-blue-50 dark:bg-blue-950/50 text-[#1a2f8a] dark:text-blue-300"
            >
              Open Citizen Dashboard
            </Link>
            <Link
              to={ROUTES.PROFILE}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              My Profile
            </Link>
            <Link
              to={ROUTES.SAVED || '/dashboard/saved'}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Saved Items
            </Link>
            <button
              onClick={handleLogout}
              className="w-full mt-2 py-2 text-center text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/40 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
