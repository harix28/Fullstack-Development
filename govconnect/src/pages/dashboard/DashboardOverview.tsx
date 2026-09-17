import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  FileText, 
  Briefcase, 
  FolderOpen, 
  MessageSquare, 
  Bookmark, 
  ChevronRight, 
  Clock 
} from 'lucide-react';
import { cn } from '@/utils/cn';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { mockUser } from '@/data/mockUser';
import { mockSchemes } from '@/data/mockSchemes';
import { mockJobs } from '@/data/mockJobs';
import { 
  Button, 
  Card, 
  Badge, 
  LoadingSkeleton, 
  DeadlineBadge, 
  MatchBadge 
} from '@/components/ui';
import { timeAgo } from '@/utils/formatDate';
import type { Scheme, Job } from '@/types';

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSchemes(mockSchemes.slice(0, 3));
      setJobs(mockJobs.slice(0, 3));
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name || mockUser.name || 'Citizen';

  const recentActivities = [
    { id: 1, text: 'Document uploaded: Aadhaar Card', time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 2, text: 'Scheme saved: PM MUDRA Yojana', time: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    { id: 3, text: 'Job bookmarked: IBPS PO Recruitment', time: new Date(Date.now() - 48 * 60 * 60 * 1000) },
    { id: 4, text: 'Grievance drafted: Road pothole repair', time: new Date(Date.now() - 72 * 60 * 60 * 1000) },
    { id: 5, text: 'Profile updated', time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  ];

  const upcomingDeadlines = [
    ...schemes.filter(s => s.deadline).map(s => ({ ...s, type: 'scheme' as const })),
    ...jobs.filter(j => j.applicationDeadline).map(j => ({ ...j, type: 'job' as const, deadline: j.applicationDeadline }))
  ].sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()).slice(0, 4);

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold text-[#0f1740] mb-2">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-[#64748b]">Here is your personalised GovConnect overview.</p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <Card className="p-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-16 h-16 mb-3">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-200" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-[#0d9488]" strokeDasharray="72, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-[#0f1740]">72%</span>
            </div>
          </div>
          <p className="text-sm font-medium text-[#0f1740]">Profile Completion</p>
          <Link to="/dashboard/profile" className="text-xs text-[#0d9488] mt-2 hover:underline">Complete now</Link>
        </Card>

        <Card className="p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-[#1a2f8a]/10 flex items-center justify-center mb-4">
            <FileText className="w-5 h-5 text-[#1a2f8a]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f1740]">12</h3>
            <p className="text-sm text-[#64748b]">Scheme Matches</p>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-[#0d9488]/10 flex items-center justify-center mb-4">
            <Briefcase className="w-5 h-5 text-[#0d9488]" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f1740]">8</h3>
            <p className="text-sm text-[#64748b]">Job Matches</p>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
            <FolderOpen className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f1740]">8</h3>
            <p className="text-sm text-[#64748b]">Saved Documents</p>
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between relative overflow-hidden hidden xl:flex">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <MessageSquare className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f1740]">2</h3>
            <p className="text-sm text-[#64748b]">Active Grievances</p>
          </div>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0f1740]">Recommended Schemes</h2>
              <Link to="/dashboard/schemes" className="text-sm font-medium text-[#0d9488] hover:underline flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {isLoading ? (
              <LoadingSkeleton count={3} type="card" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schemes.map(scheme => (
                  <Card key={scheme.id} className="p-5 flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="text-[10px]">{scheme.ministry}</Badge>
                      <MatchBadge matchPercentage={scheme.matchPercentage || 0} />
                    </div>
                    <h3 className="font-semibold text-[#0f1740] mb-2 line-clamp-2">{scheme.title}</h3>
                    <p className="text-sm text-[#64748b] mb-4 line-clamp-2">{scheme.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {scheme.benefits?.slice(0, 2).map((benefit, i) => (
                        <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      {scheme.deadline && <DeadlineBadge date={scheme.deadline} />}
                      <div className="flex items-center space-x-2 ml-auto">
                        <button className="text-slate-400 hover:text-[#0f1740]">
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/dashboard/schemes/${scheme.id}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0f1740]">Recommended Jobs</h2>
              <Link to="/dashboard/jobs" className="text-sm font-medium text-[#0d9488] hover:underline flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {isLoading ? (
              <LoadingSkeleton count={3} type="card" className="grid grid-cols-1 md:grid-cols-3 gap-4" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map(job => (
                  <Card key={job.id} className="p-5 flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-[#1a2f8a]/10 flex items-center justify-center font-bold text-[#1a2f8a] text-xs">
                          {job.organization.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs text-[#64748b] truncate max-w-[100px]">{job.organization}</p>
                        </div>
                      </div>
                      <MatchBadge matchPercentage={job.matchPercentage || 0} />
                    </div>
                    <h3 className="font-semibold text-[#0f1740] mb-2 line-clamp-2">{job.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4 text-xs text-[#64748b]">
                      <span className="px-2 py-1 bg-slate-100 rounded-md">{job.location}</span>
                      <span className="px-2 py-1 bg-slate-100 rounded-md">{job.jobType}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-sm font-medium text-[#0f1740]">
                        {job.payScale ? '₹'+job.payScale : 'Pay N/A'}
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/dashboard/jobs/${job.id}`}>Apply</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#0f1740] mb-4">Upcoming Deadlines</h2>
            <Card className="p-5">
              {isLoading ? (
                <LoadingSkeleton count={4} type="list" />
              ) : upcomingDeadlines.length > 0 ? (
                <div className="space-y-4">
                  {upcomingDeadlines.map((item, i) => {
                    const daysLeft = Math.ceil((new Date(item.deadline!).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    const borderColor = daysLeft <= 7 ? 'border-red-500' : daysLeft <= 30 ? 'border-amber-500' : 'border-blue-500';
                    return (
                      <div key={i} className={cn("pl-3 border-l-4 flex items-center justify-between py-1", borderColor)}>
                        <div className="pr-2">
                          <p className="font-medium text-[#0f1740] text-sm line-clamp-1">{item.title}</p>
                          <p className="text-xs text-[#64748b] capitalize">{item.type}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={cn("text-xs font-semibold", daysLeft <= 7 ? "text-red-600" : "text-[#64748b]")}>
                            {daysLeft <= 0 ? 'Today' : `${daysLeft} days left`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-[#64748b] text-sm">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-green-500 mb-2" />
                  No upcoming deadlines!
                </div>
              )}
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f1740] mb-4">Recent Activity</h2>
            <Card className="p-5">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
                {recentActivities.map((activity, index) => (
                  <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-lg border border-slate-100 bg-white shadow-sm">
                      <p className="text-sm text-[#0f1740]">{activity.text}</p>
                      <span className="text-xs text-[#64748b]">{timeAgo(activity.time)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
