import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Bookmark, ChevronRight } from 'lucide-react';
import { mockJobs } from '@/data/mockJobs';
import { Button, Card, Badge, LoadingSkeleton, DeadlineBadge, MatchBadge, SearchBar, Tabs, TabsList, TabsTrigger, EmptyState } from '@/components/ui';
import type { Job } from '@/types';

const JobsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...mockJobs];
      
      if (searchQuery) {
        filtered = filtered.filter(j => 
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          j.organization.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (activeTab === 'recommended') {
        filtered = filtered.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
      } else if (activeTab === 'saved') {
        filtered = filtered.filter(j => j.isSaved);
      }
      
      setJobs(filtered);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0f1740]">Government Jobs</h1>
          <p className="text-[#64748b]">Find and apply for government jobs matching your profile.</p>
        </div>
        <div className="w-full md:w-96">
          <SearchBar placeholder="Search jobs by title or organization..." onChange={(v) => setSearchQuery(v)} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:block w-64 shrink-0">
          <Card className="p-5 sticky top-24">
            <h3 className="font-bold text-[#0f1740] flex items-center mb-4">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#64748b] block mb-1">State/Central</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option>All</option>
                  <option>Central Govt</option>
                  <option>State Govt</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#64748b] block mb-1">Qualification</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option>All</option>
                  <option>10th Pass</option>
                  <option>12th Pass</option>
                  <option>Graduate</option>
                </select>
              </div>
              <Button variant="outline" className="w-full">Clear Filters</Button>
            </div>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="all">Explore All</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
          </Tabs>

          {isLoading ? (
            <LoadingSkeleton count={5} type="card" className="grid grid-cols-1 gap-4" />
          ) : jobs.length === 0 ? (
            <EmptyState title="No jobs found" description="Try adjusting your filters or search query." />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map(job => (
                <Card key={job.id} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-[#1a2f8a]/10 flex items-center justify-center font-bold text-[#1a2f8a] shrink-0">
                        {job.organization.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0f1740]">{job.title}</h3>
                        <p className="text-sm text-[#64748b] mb-2">{job.organization} • {job.department}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge variant="outline">{job.location}</Badge>
                          <Badge variant="outline">{job.jobType}</Badge>
                          <Badge variant="outline">{job.payScale ? `₹${job.payScale}` : 'Pay N/A'}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      {activeTab === 'recommended' && <MatchBadge matchPercentage={job.matchPercentage || 0} />}
                      {job.applicationDeadline && <DeadlineBadge date={job.applicationDeadline} />}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-sm text-[#64748b]">
                      Vacancies: <span className="font-bold text-[#0f1740]">{job.vacancies || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-slate-400 hover:text-[#0f1740] p-2">
                        <Bookmark className="w-5 h-5" fill={job.isSaved ? "currentColor" : "none"} />
                      </button>
                      <Button asChild>
                        <Link to={`/dashboard/jobs/${job.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
