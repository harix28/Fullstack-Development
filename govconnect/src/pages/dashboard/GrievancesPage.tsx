import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, MessageSquare, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button, Card, Badge, EmptyState } from '@/components/ui';
import { timeAgo } from '@/utils/formatDate';
import { mockGrievances } from '@/data/mockGrievances';
import ROUTES from '@/constants/routes';

export default function GrievancesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'active' | 'resolved'>('all');

  const filteredGrievances = mockGrievances.filter(g => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['submitted', 'under_review'].includes(g.status);
    return g.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-amber-100 text-amber-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 border-red-200 bg-red-50';
      case 'medium': return 'text-amber-600 border-amber-200 bg-amber-50';
      case 'low': return 'text-green-600 border-green-200 bg-green-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f1740]">Grievances</h1>
          <p className="text-[#64748b]">Track and manage your complaints with government departments.</p>
        </div>
        <Button onClick={() => navigate(ROUTES.GRIEVANCE_NEW)} className="bg-[#1a2f8a] hover:bg-[#0f1740] shrink-0">
          <PlusCircle className="w-4 h-4 mr-2" />
          New Grievance
        </Button>
      </div>

      <div className="flex border-b border-[#e2e8f0] gap-6">
        {[
          { id: 'all', label: 'All' },
          { id: 'draft', label: 'Drafts' },
          { id: 'active', label: 'Active' },
          { id: 'resolved', label: 'Resolved' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors border-b-2",
              activeTab === tab.id 
                ? "border-[#1a2f8a] text-[#1a2f8a]" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredGrievances.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="w-12 h-12 text-gray-300" />}
          title="No grievances found"
          description={activeTab === 'all' ? "File a new grievance with AI assistance." : `You have no ${activeTab} grievances.`}
          action={
            <Button onClick={() => navigate(ROUTES.GRIEVANCE_NEW)} className="bg-[#1a2f8a]">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Grievance
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredGrievances.map(grievance => (
            <Card key={grievance.id} className="p-5 hover:border-[#1a2f8a]/30 transition-colors">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Badge className={getStatusColor(grievance.status)}>
                      {grievance.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    {grievance.priority && (
                      <Badge variant="outline" className={getPriorityColor(grievance.priority)}>
                        {grievance.priority.toUpperCase()} PRIORITY
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500 flex items-center bg-gray-100 px-2 py-0.5 rounded-full">
                      {grievance.department}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-[#0f1740]">{grievance.title}</h3>
                  <p className="text-sm text-[#64748b] line-clamp-2 max-w-3xl">
                    {grievance.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Created {timeAgo(grievance.createdAt)}
                    </span>
                    {grievance.timeline && grievance.timeline.length > 0 && (
                      <span className="flex items-center">
                        <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-500" />
                        Updated {timeAgo(grievance.timeline[grievance.timeline.length - 1].date)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex sm:flex-col gap-2 shrink-0">
                  {grievance.status === 'draft' ? (
                    <Button onClick={() => navigate(`${ROUTES.GRIEVANCES}/${grievance.id}`)} variant="outline" className="w-full sm:w-auto">
                      Continue Drafting
                    </Button>
                  ) : (
                    <Button onClick={() => navigate(`${ROUTES.GRIEVANCES}/${grievance.id}`)} className="bg-white text-[#1a2f8a] border border-[#1a2f8a] hover:bg-gray-50 w-full sm:w-auto">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
