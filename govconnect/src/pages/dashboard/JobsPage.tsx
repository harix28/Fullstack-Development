import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Filter, Bookmark, ChevronRight, Search, 
  MapPin, Clock, CheckCircle2, Building2, SlidersHorizontal, Sparkles 
} from 'lucide-react';
import { mockJobs } from '@/data/mockJobs';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { 
  Button, Card, Badge, LoadingSkeleton, DeadlineBadge, 
  MatchBadge, SearchBar, EmptyState 
} from '@/components/ui';
import type { Job } from '@/types';

export default function JobsPage() {
  const { user } = useAuth();
  const { isJobSaved, toggleSaveJob } = useSaved();

  const [activeTab, setActiveTab] = useState<'recommended' | 'all' | 'saved'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQualification, setSelectedQualification] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const userSkills = user?.skills || ['Python', 'SQL', 'React', 'Data Analysis'];

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesQual = selectedQualification === 'all' || 
        job.qualification.some(q => q.toLowerCase().includes(selectedQualification.toLowerCase()));
      const matchesLoc = selectedLocation === 'all' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesSaved = activeTab !== 'saved' || isJobSaved(job.id);

      return matchesSearch && matchesCat && matchesQual && matchesLoc && matchesSaved;
    }).sort((a, b) => {
      if (activeTab === 'recommended') {
        return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedQualification, selectedLocation, activeTab, isJobSaved]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* ── JOB MATCHING BANNER (Prompt Section 14) ── */}
      <div className="bg-gradient-to-r from-[#0f1740] via-[#1a2f8a] to-[#0d9488] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <Badge className="bg-white/10 text-teal-300 border-white/20 text-xs font-semibold">
            Skills & Degree Match Engine
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Recommended Jobs For You
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            Matching vacancies for <strong>{user?.education || 'MCA Graduate'}</strong> in Central Government, PSUs, and National Banks.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-blue-200">Matched profile skills:</span>
            {userSkills.map((sk) => (
              <span key={sk} className="px-2.5 py-0.5 bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs rounded-full font-medium">
                {sk} ✓
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 shrink-0 bg-white/10 backdrop-blur px-5 py-4 rounded-xl border border-white/20 text-center">
          <span className="text-3xl font-extrabold text-teal-300">
            94%
          </span>
          <p className="text-[11px] text-blue-200 font-medium">Top Match Rate</p>
        </div>
      </div>

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0f1740] dark:text-white">
            Government & Public Sector Vacancies
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredJobs.length} active opportunities.
          </p>
        </div>

        <div className="w-full md:w-96">
          <SearchBar 
            placeholder="Search jobs, departments, skills..." 
            onChange={(v) => setSearchQuery(v)} 
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Filters Sidebar (Prompt Section 13) */}
        <div className="lg:w-64 shrink-0 space-y-4">
          <Card className="p-5 sticky top-20 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-[#0f1740] dark:text-white text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#1a2f8a]" />
                Filter Vacancies
              </h3>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedQualification('all');
                  setSelectedLocation('all');
                  setSearchQuery('');
                }}
                className="text-[11px] text-[#1a2f8a] hover:underline"
              >
                Reset
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Sector / Organization
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                <option value="all">All Sectors</option>
                <option value="central_govt">Central Government (SSC/UPSC)</option>
                <option value="banking">Banking & Financial (IBPS/SBI)</option>
                <option value="railways">Indian Railways (RRB)</option>
                <option value="psu">PSU / Technical</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Minimum Qualification
              </label>
              <select
                value={selectedQualification}
                onChange={e => setSelectedQualification(e.target.value)}
                className="w-full p-2 border rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                <option value="all">All Qualifications</option>
                <option value="10th">10th Pass</option>
                <option value="12th">12th Pass</option>
                <option value="Graduate">Graduation / Degree</option>
                <option value="MCA">Post Graduate / MCA</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Posting Location
              </label>
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="w-full p-2 border rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                <option value="all">All India / Pan India</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              ⚡ Age Relaxations available for SC/ST/OBC/EWS candidates.
            </div>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="flex-1 space-y-4">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
            <button
              onClick={() => setActiveTab('recommended')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'recommended'
                  ? 'border-[#1a2f8a] text-[#1a2f8a] dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Top Skill Matches
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-[#1a2f8a] text-[#1a2f8a] dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              All Open Vacancies
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'saved'
                  ? 'border-[#1a2f8a] text-[#1a2f8a] dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Bookmarked Jobs
            </button>
          </div>

          {filteredJobs.length === 0 ? (
            <EmptyState
              icon={<Briefcase className="w-12 h-12 text-slate-300" />}
              title="No job openings found"
              description="Try adjusting your filters or search keywords."
              action={
                <Button onClick={() => { setSelectedCategory('all'); setSelectedQualification('all'); setSelectedLocation('all'); setSearchQuery(''); }} variant="outline">
                  Reset Filters
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredJobs.map(job => {
                const saved = isJobSaved(job.id);
                return (
                  <Card key={job.id} className="p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-[#1a2f8a]/10 dark:bg-[#1a2f8a]/30 text-[#1a2f8a] dark:text-blue-300 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                          {job.organization.slice(0, 3).toUpperCase()}
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold text-[#0f1740] dark:text-white">
                              {job.title}
                            </h3>
                            {job.isNew && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">
                                NEW
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {job.organization} • {job.department}
                          </p>

                          <div className="flex flex-wrap gap-2 text-xs pt-1">
                            <Badge variant="outline" className="text-slate-600">
                              📍 {job.location}
                            </Badge>
                            <Badge variant="outline" className="text-slate-600">
                              💼 {job.jobType}
                            </Badge>
                            <Badge variant="outline" className="text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30">
                              ₹ {job.payScale}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-2 shrink-0">
                        <MatchBadge matchPercentage={job.matchPercentage || 85} />
                        {job.applicationDeadline && (
                          <DeadlineBadge date={job.applicationDeadline} />
                        )}
                      </div>
                    </div>

                    {/* Matched Skills strip */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Vacancies:</span>
                        <strong className="text-[#0f1740] dark:text-white font-mono">{job.vacancies || 'N/A'}</strong>
                        <span className="mx-2">•</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Age:</span>
                        <span>{job.ageLimit ? `${job.ageLimit.min}-${job.ageLimit.max} yrs` : '18-30 yrs'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveJob(job.id, job.title)}
                          className={`p-1.5 rounded transition-colors ${
                            saved ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title={saved ? "Bookmarked" : "Bookmark Job"}
                        >
                          <Bookmark className="w-5 h-5" fill={saved ? "currentColor" : "none"} />
                        </button>

                        <Button asChild size="sm" className="bg-[#1a2f8a] hover:bg-[#0f1740] text-xs">
                          <Link to={`/dashboard/jobs/${job.id}`}>View Details & Syllabus</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
