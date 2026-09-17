import React, { useState } from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function Schemes() {
  const [activeTab, setActiveTab] = useState('recommended');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Government Schemes</h2>
          <p className="mt-1 text-sm text-gray-500">Discover and apply for schemes you are eligible for.</p>
        </div>
        
        <div className="flex w-full sm:w-auto space-x-2">
          <div className="relative flex-grow sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input type="text" placeholder="Search schemes..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
          </div>
          <Button variant="outline" className="px-3">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['recommended', 'explore', 'saved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-brand-teal text-brand-teal'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab} Schemes
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Mock Scheme Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-5 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                100% Match
              </span>
              <span className="text-xs font-medium text-brand-warning bg-brand-warning/10 px-2 py-1 rounded">Closing Soon</span>
            </div>
            <h3 className="text-lg font-bold text-brand-navy">Ayushman Bharat Yojana</h3>
            <p className="text-xs text-gray-500 mt-1 font-medium">Ministry of Health and Family Welfare</p>
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">
              National Health Protection Scheme providing health insurance cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.
            </p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-start text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Income below ₹2.5 Lakhs</span>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>No family member in Govt Service</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
            <Button variant="ghost" size="sm">Save</Button>
            <Link to="/dashboard/schemes/2">
              <Button size="sm">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
