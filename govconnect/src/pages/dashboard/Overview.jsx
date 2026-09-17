import React from 'react';
import { FileText, Briefcase, FileSignature, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../store/useStore';

export default function Overview() {
  const user = useStore(state => state.user);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-bold text-brand-navy">Good morning, {user?.name || 'Citizen'}</h2>
        <p className="mt-1 text-sm text-gray-500">Here is your personalized GovConnect overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Profile Completion" value="85%" subtitle="Update info to get better matches" icon={<AlertCircle className="text-brand-warning h-6 w-6" />} />
        <StatCard title="Scheme Matches" value="12" subtitle="3 new since last login" icon={<FileText className="text-brand-teal h-6 w-6" />} />
        <StatCard title="Job Matches" value="5" subtitle="Deadline approaching for 2" icon={<Briefcase className="text-brand-teal h-6 w-6" />} />
        <StatCard title="Active Grievances" value="1" subtitle="In progress" icon={<FileSignature className="text-status-info h-6 w-6" />} />
      </div>

      {/* Recommended Schemes */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-brand-navy">Recommended Schemes</h3>
          <Button variant="ghost" size="sm" className="text-brand-teal gap-1">
            View All <ArrowRight size={16} />
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mock Scheme Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                98% Match
              </span>
              <span className="text-xs text-gray-500">Closes in 12 days</span>
            </div>
            <h4 className="text-md font-semibold text-brand-navy mt-2">PM Kisan Samman Nidhi</h4>
            <p className="text-xs text-gray-500 mt-1">Ministry of Agriculture</p>
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">Income support to all landholding farmer families to supplement their financial needs.</p>
            <Button variant="outline" size="sm" className="w-full mt-4">View Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm border border-gray-100 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-gray-50 rounded-md p-3">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
          <dd>
            <div className="text-2xl font-semibold text-brand-navy">{value}</div>
          </dd>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
}
