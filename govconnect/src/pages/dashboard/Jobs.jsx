import React from 'react';
import { Search, MapPin, Building2, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Jobs() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand-navy">Government Jobs</h2>
        <p className="mt-1 text-sm text-gray-500">Find and apply for relevant government vacancies.</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
         <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search by role, department..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-brand-teal">
            <option>All Locations</option>
            <option>Delhi</option>
            <option>Maharashtra</option>
          </select>
          <Button>Search Jobs</Button>
      </div>

      <div className="space-y-4">
        {/* Mock Job Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:border-brand-teal transition-colors flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-brand-navy">Junior Assistant</h3>
            <p className="text-sm font-medium text-brand-teal">Staff Selection Commission (SSC)</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> New Delhi</span>
              <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Last Date: 25 Oct</span>
            </div>
            <div className="mt-3 flex gap-2">
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Graduate</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Age: 18-27</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
            <span className="text-center text-sm font-semibold text-green-600 bg-green-50 rounded py-1 mb-2 border border-green-100">85% Match</span>
            <Button size="sm">View Details</Button>
            <Button variant="outline" size="sm">Save Job</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
