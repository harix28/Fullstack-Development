import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, FileText, Briefcase, MessageSquare, Bell, LogOut, Menu } from 'lucide-react';

export function DashboardLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Profile', path: '/dashboard/profile', icon: <User size={20} /> },
    { name: 'Schemes', path: '/dashboard/schemes', icon: <FileText size={20} /> },
    { name: 'Jobs', path: '/dashboard/jobs', icon: <Briefcase size={20} /> },
    { name: 'Documents', path: '/dashboard/documents', icon: <FileText size={20} /> },
    { name: 'Grievances', path: '/dashboard/grievances', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-brand-light">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 bg-brand-navy text-white md:flex md:flex-col">
        <div className="flex h-16 items-center justify-center border-b border-gray-700">
          <span className="text-xl font-bold tracking-wider">GovConnect</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 rounded-md px-3 py-2 transition-colors ${
                    location.pathname === item.path
                      ? 'bg-brand-teal text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-gray-700 p-4">
          <Link to="/" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
          <div className="flex items-center md:hidden">
            <button className="text-gray-500 focus:outline-none">
              <Menu size={24} />
            </button>
            <span className="ml-3 text-xl font-bold text-brand-navy">GovConnect</span>
          </div>
          <div className="hidden md:flex">
            <h1 className="text-xl font-semibold text-brand-navy capitalize">
              {location.pathname.split('/').pop() || 'Overview'}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-brand-teal transition-colors">
              <Bell size={24} />
            </button>
            <div className="h-8 w-8 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold">
              C
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
