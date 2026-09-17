import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Briefcase, FolderOpen, MessageSquare, 
  Bookmark, ChevronRight, Clock, CheckCircle2, ArrowRight,
  Sparkles, Bell, AlertTriangle, ShieldCheck, ExternalLink
} from 'lucide-react';
import { cn } from '@/utils/cn';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { mockSchemes } from '@/data/mockSchemes';
import { mockJobs } from '@/data/mockJobs';
import { mockNotifications } from '@/data/mockNotifications';
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

export default function DashboardOverview() {
  const { user } = useAuth();
  const { isSchemeSaved, toggleSaveScheme, isJobSaved, toggleSaveJob } = useSaved();
  const [isLoading, setIsLoading] = useState(true);
  
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSchemes(mockSchemes.slice(0, 3));
      setJobs(mockJobs.slice(0, 3));
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'Citizen';

  const recentActivities = [
    { id: 1, text: 'Document verified: Graduation Certificate', time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 2, text: 'Scheme matched: PM MUDRA Yojana (92% Match)', time: new Date(Date.now() - 12 * 60 * 60 * 1000) },
    { id: 3, text: 'Job bookmarked: SSC CGL Examination', time: new Date(Date.now() - 28 * 60 * 60 * 1000) },
    { id: 4, text: 'AI Complaint draft generated: Road sanitation', time: new Date(Date.now() - 48 * 60 * 60 * 1000) },
    { id: 5, text: 'Profile updated with MCA & Python skills', time: new Date(Date.now() - 72 * 60 * 60 * 1000) },
  ];

  const upcomingDeadlines = [
    ...schemes.filter(s => s.deadline).map(s => ({ ...s, type: 'scheme' as const })),
    ...jobs.filter(j => j.applicationDeadline).map(j => ({ ...j, type: 'job' as const, deadline: j.applicationDeadline }))
  ].sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()).slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      
      {/* ── 1. WELCOME SECTION (Prompt Section 7) ── */}
      <div className="bg-gradient-to-r from-[#0f1740] via-[#1a2f8a] to-[#0d9488] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge className="bg-white/10 text-teal-300 border-white/20 text-xs">
              Verified Citizen Profile
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {getGreeting()}, {firstName} 👋
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-xl">
              Here is what is relevant to you today based on your profile in <strong>{user?.state || 'Delhi'}</strong> with background in <strong>{user?.education || 'MCA'}</strong>.
            </p>
          </div>

          {/* Profile Completion Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shrink-0 w-full sm:w-80">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Profile Status
              </span>
              <span className="text-sm font-bold text-teal-300">
                85% Complete
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-black/20 rounded-full h-2.5 mb-3 overflow-hidden">
              <div 
                className="bg-[#0d9488] h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: '85%' }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-blue-200">Skills & Documents verified</span>
              <Button 
                size="sm" 
                asChild
                className="bg-white text-[#0f1740] hover:bg-teal-50 font-bold text-xs h-8 px-3"
              >
                <Link to={ROUTES.PROFILE}>Complete Profile</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative background glows */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#0d9488] rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/3 w-60 h-60 bg-blue-400 rounded-full blur-3xl opacity-20 pointer-events-none" />
      </div>

      {/* ── 2. THREE PRIMARY TILES (Prompt Section 8) ── */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#0f1740] dark:text-white">
            Primary Citizen Modules
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access core services tailored to your citizen eligibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tile 1: Government Schemes */}
          <Card className="p-6 relative overflow-hidden border-2 border-transparent hover:border-[#1a2f8a] transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#1a2f8a] dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <Badge className="bg-blue-50 text-[#1a2f8a] border-blue-200 text-[10px] mb-2 font-bold uppercase tracking-wider">
                12 Schemes Matched
              </Badge>
              <h3 className="text-xl font-bold text-[#0f1740] dark:text-white mb-2">
                Government Schemes
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Discover schemes you're eligible for based on your age, education, category, and state quota.
              </p>
            </div>

            <Button 
              asChild 
              className="w-full bg-[#1a2f8a] hover:bg-[#0f1740] text-white font-semibold py-3 gap-2 shadow"
            >
              <Link to={ROUTES.SCHEMES}>
                Explore Schemes <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </Card>

          {/* Tile 2: Jobs & Vacancies */}
          <Card className="p-6 relative overflow-hidden border-2 border-transparent hover:border-[#0d9488] transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-[#0d9488] dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 text-[10px] mb-2 font-bold uppercase tracking-wider">
                8 Active Vacancies
              </Badge>
              <h3 className="text-xl font-bold text-[#0f1740] dark:text-white mb-2">
                Jobs & Vacancies
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Find opportunities matching your skills and degree in SSC, Banking, Railways, and State PSUs.
              </p>
            </div>

            <Button 
              asChild 
              className="w-full bg-[#0d9488] hover:bg-teal-700 text-white font-semibold py-3 gap-2 shadow"
            >
              <Link to={ROUTES.JOBS}>
                Find Jobs <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </Card>

          {/* Tile 3: My Documents Vault */}
          <Card className="p-6 relative overflow-hidden border-2 border-transparent hover:border-amber-500 transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FolderOpen className="w-7 h-7" />
              </div>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] mb-2 font-bold uppercase tracking-wider">
                8 Saved Documents
              </Badge>
              <h3 className="text-xl font-bold text-[#0f1740] dark:text-white mb-2">
                My Documents
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Securely manage your important documents with OCR extraction for instant form auto-fill.
              </p>
            </div>

            <Button 
              asChild 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-semibold py-3 gap-2 shadow"
            >
              <Link to={ROUTES.DOCUMENTS}>
                Open Vault <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </Card>

        </div>
      </section>

      {/* ── 3. RECOMMENDED SECTION & SIDEBAR GRID (Prompt Section 9) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main 8-col: Recommended Schemes & Jobs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Recommended Schemes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0f1740] dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Recommended Schemes for You
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Calibrated for {user?.education || 'MCA'} & {user?.state || 'Delhi'} profile
                </p>
              </div>
              <Link 
                to={ROUTES.SCHEMES} 
                className="text-sm font-semibold text-[#1a2f8a] dark:text-blue-400 hover:underline flex items-center"
              >
                View All <ChevronRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>
            
            {isLoading ? (
              <LoadingSkeleton count={3} type="card" className="grid grid-cols-1 md:grid-cols-3 gap-4" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {schemes.map(scheme => {
                  const saved = isSchemeSaved(scheme.id);
                  return (
                    <Card key={scheme.id} className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-[10px] truncate max-w-[130px]">
                            {scheme.ministry}
                          </Badge>
                          <MatchBadge matchPercentage={scheme.matchPercentage || 85} />
                        </div>
                        <h3 className="font-bold text-[#0f1740] dark:text-white text-sm mb-1.5 line-clamp-2">
                          {scheme.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                          {scheme.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {scheme.benefits?.slice(0, 1).map((b, i) => (
                            <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] rounded-full">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <button 
                          onClick={() => toggleSaveScheme(scheme.id, scheme.title)}
                          className={`p-1.5 rounded transition-colors ${saved ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
                          title={saved ? "Saved" : "Save Scheme"}
                        >
                          <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
                        </button>
                        <Button size="sm" variant="outline" asChild className="text-xs h-7">
                          <Link to={`/dashboard/schemes/${scheme.id}`}>Details</Link>
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Recommended Jobs */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-[#0f1740] dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  Recommended Jobs Matching Your Skills
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Skills matched: {(user?.skills || ['Python', 'SQL']).slice(0, 3).join(', ')}
                </p>
              </div>
              <Link 
                to={ROUTES.JOBS} 
                className="text-sm font-semibold text-[#0d9488] dark:text-teal-400 hover:underline flex items-center"
              >
                View All <ChevronRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>

            {isLoading ? (
              <LoadingSkeleton count={3} type="card" className="grid grid-cols-1 md:grid-cols-3 gap-4" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {jobs.map(job => {
                  const saved = isJobSaved(job.id);
                  return (
                    <Card key={job.id} className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[11px] font-bold text-slate-500 truncate max-w-[130px]">
                            {job.organization}
                          </span>
                          <MatchBadge matchPercentage={job.matchPercentage || 80} />
                        </div>
                        <h3 className="font-bold text-[#0f1740] dark:text-white text-sm mb-1 line-clamp-2">
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                          📍 {job.location} • {job.jobType}
                        </p>
                        <div className="text-xs font-semibold text-[#0f1740] dark:text-slate-200 bg-slate-50 dark:bg-slate-800 p-2 rounded mb-3">
                          Pay: ₹{job.payScale}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <button 
                          onClick={() => toggleSaveJob(job.id, job.title)}
                          className={`p-1.5 rounded transition-colors ${saved ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
                          title={saved ? "Bookmarked" : "Bookmark Job"}
                        >
                          <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
                        </button>
                        <Button size="sm" asChild className="text-xs h-7 bg-[#1a2f8a] hover:bg-[#0f1740]">
                          <Link to={`/dashboard/jobs/${job.id}`}>Apply</Link>
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* AI Grievance Assistant Banner */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-800 border border-blue-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <Badge className="bg-[#1a2f8a] text-white border-transparent text-[10px]">
                Assisted Submission Model
              </Badge>
              <h3 className="text-lg font-bold text-[#0f1740] dark:text-white">
                Facing a public issue? Let AI draft your complaint.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
                Describe road damage, garbage, or water supply delays. Our AI classifies the department, suggests CPGRAMS routing, and generates formal letter drafts ready for official portal submission.
              </p>
            </div>
            <Button asChild className="shrink-0 bg-[#1a2f8a] hover:bg-[#0f1740] text-white text-xs">
              <Link to={ROUTES.GRIEVANCE_NEW}>Draft Grievance</Link>
            </Button>
          </Card>
        </div>

        {/* Right 4-col: Deadlines, Notifications & Recent Activity */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Notifications Widget */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0f1740] dark:text-white text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#1a2f8a]" />
                Recent Notifications
              </h3>
              <Link to={ROUTES.NOTIFICATIONS} className="text-xs text-[#1a2f8a] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {mockNotifications.slice(0, 3).map((n) => (
                <div key={n.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-[#0f1740] dark:text-slate-200">
                    <span className="truncate max-w-[170px]">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{timeAgo(n.createdAt)}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-2">{n.message}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="p-5">
            <h3 className="font-bold text-[#0f1740] dark:text-white text-sm mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Upcoming Deadlines
            </h3>
            
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-3">
                {upcomingDeadlines.map((item, i) => {
                  const daysLeft = Math.ceil((new Date(item.deadline!).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800 last:border-none">
                      <div className="pr-2">
                        <p className="font-semibold text-[#0f1740] dark:text-slate-200 line-clamp-1">{item.title}</p>
                        <span className="text-[10px] text-slate-400 capitalize">{item.type}</span>
                      </div>
                      <span className={cn("font-bold shrink-0", daysLeft <= 7 ? "text-red-600" : "text-slate-600 dark:text-slate-400")}>
                        {daysLeft <= 0 ? 'Today' : `${daysLeft}d left`}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">No imminent deadlines.</p>
            )}
          </Card>

          {/* Recent Activity Timeline */}
          <Card className="p-5">
            <h3 className="font-bold text-[#0f1740] dark:text-white text-sm mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Recent Activity
            </h3>

            <div className="space-y-3 text-xs">
              {recentActivities.map(act => (
                <div key={act.id} className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#1a2f8a] shrink-0 mt-1.5" />
                  <div>
                    <p className="text-[#0f1740] dark:text-slate-200 font-medium">{act.text}</p>
                    <span className="text-[10px] text-slate-400">{timeAgo(act.time)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
