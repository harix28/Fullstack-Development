import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Bell, Menu, X, LogOut, User, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import ROUTES from '@/constants/routes';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate(ROUTES.HOME);
  };

  const navLinks = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Services', href: ROUTES.SERVICES || '/services' },
    { label: 'Schemes', href: isAuthenticated ? (ROUTES.SCHEMES || '/dashboard/schemes') : '#schemes-section' },
    { label: 'Jobs', href: isAuthenticated ? (ROUTES.JOBS || '/dashboard/jobs') : '#jobs-section' },
    { label: 'About', href: ROUTES.ABOUT || '/about' },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#1a2f8a]" />
            <span className="font-bold text-[#0f1740] text-xl">GovConnect</span>
          </Link>
        </div>

        {/* CENTER: Desktop NavLinks */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-[#1a2f8a]',
                  isActive && link.href !== '#' ? 'text-[#1a2f8a] font-semibold' : 'text-[#64748b]'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-[#0f1740] hover:bg-gray-200 transition-colors"
          >
            {language === 'hi' ? 'हि' : 'EN'}
          </button>

          {isAuthenticated ? (
            <>
              <Link to={ROUTES.NOTIFICATIONS || '/dashboard/notifications'} className="relative p-2 text-[#64748b] hover:text-[#1a2f8a] transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </Link>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-[#1a2f8a] text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a2f8a]"
                >
                  {getInitials(user?.name)}
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-[#e2e8f0]">
                    <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link to={ROUTES.PROFILE || '/dashboard/profile'} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <Link to={ROUTES.SETTINGS || '/dashboard/settings'} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN || '/login'}
                className="px-4 py-2 text-sm font-medium text-[#1a2f8a] border border-[#1a2f8a] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER || '/register'}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1a2f8a] rounded-lg hover:bg-[#0f1740] transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE: Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-[#0f1740]"
          >
            {language === 'hi' ? 'हि' : 'EN'}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#64748b] hover:text-[#0f1740] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e2e8f0]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#64748b] hover:text-[#1a2f8a] hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-1 px-2">
                <div className="flex items-center px-3 py-2">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1a2f8a] text-white font-medium">
                      {getInitials(user?.name)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-[#0f1740]">{user?.name || 'User'}</div>
                  </div>
                </div>
                <Link to={ROUTES.DASHBOARD} className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-[#64748b] hover:text-[#1a2f8a] hover:bg-gray-50">
                  <LayoutDashboard className="h-5 w-5" /> Dashboard
                </Link>
                <Link to={ROUTES.NOTIFICATIONS || '/dashboard/notifications'} className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-[#64748b] hover:text-[#1a2f8a] hover:bg-gray-50">
                  <Bell className="h-5 w-5" /> Notifications
                </Link>
                <Link to={ROUTES.PROFILE || '/dashboard/profile'} className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-[#64748b] hover:text-[#1a2f8a] hover:bg-gray-50">
                  <User className="h-5 w-5" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="h-5 w-5" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-4 py-2">
                <Link
                  to={ROUTES.LOGIN || '/login'}
                  className="w-full flex justify-center px-4 py-2 text-base font-medium text-[#1a2f8a] border border-[#1a2f8a] rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER || '/register'}
                  className="w-full flex justify-center px-4 py-2 text-base font-medium text-white bg-[#1a2f8a] rounded-lg hover:bg-[#0f1740]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
