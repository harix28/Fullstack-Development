import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink, Mail, Phone } from 'lucide-react';
import ROUTES from '@/constants/routes';

export default function Footer() {
  return (
    <footer className="bg-[#0f1740] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1 Brand */}
          <div className="space-y-4">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-white" />
              <span className="font-bold text-xl">GovConnect</span>
            </Link>
            <p className="text-sm font-medium text-teal-400">One Platform. Every Citizen Service.</p>
            <p className="text-sm text-gray-300">
              Simplifying access to government services, schemes, and jobs for citizens across India.
            </p>
          </div>

          {/* Col 2 Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to={ROUTES.HOME} className="text-sm text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to={ROUTES.ABOUT || '/about'} className="text-sm text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to={ROUTES.SERVICES || '/services'} className="text-sm text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to={ROUTES.SCHEMES || '/dashboard/schemes'} className="text-sm text-gray-300 hover:text-white transition-colors">Schemes</Link></li>
              <li><Link to={ROUTES.JOBS || '/dashboard/jobs'} className="text-sm text-gray-300 hover:text-white transition-colors">Jobs</Link></li>
            </ul>
          </div>

          {/* Col 3 Platform */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to={ROUTES.LOGIN || '/login'} className="text-sm text-gray-300 hover:text-white transition-colors">Login</Link></li>
              <li><Link to={ROUTES.REGISTER || '/register'} className="text-sm text-gray-300 hover:text-white transition-colors">Register</Link></li>
              <li><Link to={ROUTES.DASHBOARD || '/dashboard'} className="text-sm text-gray-300 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to={ROUTES.DOCUMENTS || '/dashboard/documents'} className="text-sm text-gray-300 hover:text-white transition-colors">Document Vault</Link></li>
              <li><Link to={ROUTES.ASSISTANT || '/dashboard/assistant'} className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">AI Assistant <ExternalLink className="h-3 w-3" /></Link></li>
            </ul>
          </div>

          {/* Col 4 Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-gray-300 hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center text-center">
          <p className="text-gray-400 text-xs mb-2">
            &copy; 2024 GovConnect. Built for India's citizens.
          </p>
          <p className="text-gray-400 text-xs max-w-2xl">
            GovConnect is an independent citizen-assistance platform and is not affiliated with any government department. Always verify information through official portals.
          </p>
        </div>
      </div>
    </footer>
  );
}
