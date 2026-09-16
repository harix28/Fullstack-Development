import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, Bell, Globe } from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-brand-navy">GovConnect</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-brand-teal text-sm font-medium">
                Home
              </Link>
              <Link to="/services" className="text-gray-500 hover:text-gray-900 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Services
              </Link>
              <Link to="/schemes" className="text-gray-500 hover:text-gray-900 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Schemes
              </Link>
              <Link to="/jobs" className="text-gray-500 hover:text-gray-900 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                Jobs
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Globe className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <Link to="/login">
              <Button variant="outline" size="sm" className="ml-4">
                Login
              </Button>
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button className="text-gray-500 hover:text-gray-700">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
