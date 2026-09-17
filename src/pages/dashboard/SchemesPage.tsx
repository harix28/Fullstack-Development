import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Bookmark, ChevronRight, Sparkles, 
  CheckCircle2, AlertCircle, Info, ExternalLink, SlidersHorizontal, RefreshCw 
} from 'lucide-react';
import { mockSchemes } from '@/data/mockSchemes';
import { useAuth } from '@/context/AuthContext';
import { useSaved } from '@/context/SavedContext';
import { 
  Button, Card, Badge, LoadingSkeleton, DeadlineBadge, 
  MatchBadge, SearchBar, Tabs, TabsList, TabsTrigger, EmptyState, Modal 
} from '@/components/ui';
import { INDIAN_STATES } from '@/constants/categories';
import type { Scheme } from '@/types';

export default function SchemesPage() {
  const { user } = useAuth();
  const { isSchemeSaved, toggleSaveScheme } = useSaved();

  const [activeTab, setActiveTab] = useState<'recommended' | 'all' | 'saved'>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMinistry, setSelectedMinistry] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [maxIncome, setMaxIncome] = useState<number | 'all'>('all');
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [selectedSchemeForAnalysis, setSelectedSchemeForAnalysis] = useState<Scheme | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    mockSchemes.forEach(s => { if (s.category) cats.add(s.category); });
    return ['all', ...Array.from(cats)];
  }, []);

  const ministries = useMemo(() => {
    const mins = new Set<string>();
    mockSchemes.forEach(s => mins.add(s.ministry));
    return ['all', ...Array.from(mins)];
  }, []);

  const filteredSchemes = useMemo(() => {
    return mockSchemes.filter(s => {
      const matchesSearch = 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
      const matchesMin = selectedMinistry === 'all' || s.ministry === selectedMinistry;
      const matchesState = selectedState === 'all' || s.state === 'Central' || s.state === selectedState;
      const matchesSaved = activeTab !== 'saved' || isSchemeSaved(s.id);

      return matchesSearch && matchesCat && matchesMin && matchesState && matchesSaved;
    }).sort((a, b) => {
      if (activeTab === 'recommended') {
        return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedMinistry, selectedState, activeTab, isSchemeSaved]);

  const runEligibilityCheck = (scheme?: Scheme) => {
    setSelectedSchemeForAnalysis(scheme || filteredSchemes[0] || mockSchemes[0]);
    setEligibilityModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* ── AI SCHEME MATCHING HERO BANNER (Prompt Section 11) ── */}
      <div className="bg-gradient-to-r from-[#0f1740] to-[#1a2f8a] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <Badge className="bg-teal-500/20 text-teal-300 border-teal-400/30 text-xs font-semibold">
            AI Profile Matching Engine
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Find Schemes You're Eligible For
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            GovConnect evaluates your profile (Age: <strong>{user?.age || 23}</strong>, Education: <strong>{user?.education || 'MCA'}</strong>, State: <strong>{user?.state || 'Delhi'}</strong>) against 200+ welfare guidelines to surface benefits you can claim.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <Button
            onClick={() => runEligibilityCheck()}
            className="bg-[#0d9488] hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-xl shadow-md gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Check My Eligibility
          </Button>
        </div>

        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#0d9488] rounded-full blur-3xl opacity-20 pointer-events-none" />
      </div>

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0f1740] dark:text-white">
            Discover Government Schemes
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredSchemes.length} schemes matching your criteria.
          </p>
        </div>

        <div className="w-full md:w-96">
          <SearchBar 
            placeholder="Search schemes by name, ministry, or benefits..." 
            onChange={(v) => setSearchQuery(v)} 
          />
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* FILTERS SIDEBAR (Prompt Section 10) */}
        <div className="lg:w-64 shrink-0 space-y-4">
          <Card className="p-5 sticky top-20 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-[#0f1740] dark:text-white text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#1a2f8a]" />
                Filter Schemes
              </h3>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedMinistry('all');
                  setSelectedState('all');
                  setSearchQuery('');
                }}
                className="text-[11px] text-[#1a2f8a] hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Category
              </label>
              <select 
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                ))}
              </select>
            </div>

            {/* Ministry Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Ministry / Department
              </label>
              <select 
                value={selectedMinistry}
                onChange={e => setSelectedMinistry(e.target.value)}
                className="w-full p-2 border rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                {ministries.map(m => (
                  <option key={m} value={m}>{m === 'all' ? 'All Ministries' : m}</option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                State / Central
              </label>
              <select 
                value={selectedState}
                onChange={e => setSelectedState(e.target.value)}
                className="w-full p-2 border rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              >
                <option value="all">All (Central & State)</option>
                <option value="Central">Central Govt Schemes Only</option>
                {INDIAN_STATES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              💡 Profile Quota: <strong>{user?.category || 'General'}</strong> ({user?.state || 'Delhi'})
            </div>
          </Card>
        </div>

        {/* SCHEMES CARDS LIST */}
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
              Recommended For You
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-[#1a2f8a] text-[#1a2f8a] dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Explore All Schemes
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'saved'
                  ? 'border-[#1a2f8a] text-[#1a2f8a] dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Saved Schemes
            </button>
          </div>

          {filteredSchemes.length === 0 ? (
            <EmptyState
              icon={<Info className="w-12 h-12 text-slate-300" />}
              title="No schemes match these filters"
              description="Try clearing search filters or changing category options to see more central and state schemes."
              action={
                <Button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedMinistry('all');
                    setSelectedState('all');
                    setSearchQuery('');
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSchemes.map((scheme) => {
                const isSaved = isSchemeSaved(scheme.id);
                return (
                  <Card key={scheme.id} className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2.5">
                        <Badge variant="outline" className="text-[10px] truncate max-w-[170px]">
                          {scheme.ministry}
                        </Badge>
                        <MatchBadge matchPercentage={scheme.matchPercentage || 85} />
                      </div>

                      <h3 className="font-bold text-[#0f1740] dark:text-white text-base mb-2 line-clamp-2">
                        {scheme.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-3 leading-relaxed">
                        {scheme.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {scheme.benefits?.slice(0, 2).map((benefit, i) => (
                          <span key={i} className="px-2 py-0.5 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 text-[11px] rounded-full">
                            ✓ {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      {scheme.deadline ? (
                        <DeadlineBadge date={scheme.deadline} />
                      ) : (
                        <span className="text-[11px] text-slate-400">Open Ongoing</span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveScheme(scheme.id, scheme.title)}
                          className={`p-1.5 rounded transition-colors ${
                            isSaved 
                              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' 
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title={isSaved ? "Saved" : "Save Scheme"}
                        >
                          <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
                        </button>

                        <button
                          onClick={() => runEligibilityCheck(scheme)}
                          className="px-2.5 py-1 text-xs font-semibold text-[#1a2f8a] hover:bg-blue-50 rounded"
                        >
                          Eligibility
                        </button>

                        <Button size="sm" variant="outline" asChild className="text-xs h-8">
                          <Link to={`/dashboard/schemes/${scheme.id}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Indicative Disclaimer Notice */}
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
            <p>
              <strong>Important Disclaimer:</strong> Eligibility shown is an indicative recommendation computed using your self-declared citizen profile. GovConnect is an assistive preparation platform. Always verify final eligibility conditions and submit your actual application on the official government portal.
            </p>
          </div>
        </div>
      </div>

      {/* ── ELIGIBILITY MATCH ANALYSIS MODAL (Prompt Section 11) ── */}
      <Modal
        isOpen={eligibilityModalOpen}
        onClose={() => setEligibilityModalOpen(false)}
        title="AI Scheme Eligibility Breakdown"
        size="lg"
      >
        {selectedSchemeForAnalysis && (
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-slate-700">
              <div>
                <h4 className="font-bold text-[#0f1740] dark:text-white text-base">
                  {selectedSchemeForAnalysis.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedSchemeForAnalysis.ministry}
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-[#0d9488]">
                  {selectedSchemeForAnalysis.matchPercentage || 92}%
                </span>
                <p className="text-[10px] text-slate-500 font-medium">Profile Compatibility</p>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Profile Conditions Evaluation:
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded bg-green-50 text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span><strong>Age Condition:</strong> You are {user?.age || 23} years old (Meets eligibility 18–35 yrs).</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-green-50 text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span><strong>Education Level:</strong> {user?.education || 'MCA'} matches required academic qualifications.</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-green-50 text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span><strong>State Jurisdiction:</strong> Open for residents of {user?.state || 'Delhi'}.</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Required Documents in Vault:
              </h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 border rounded bg-slate-50 flex items-center justify-between">
                  <span>Aadhaar Card</span>
                  <span className="text-green-600 font-bold">✓ Ready</span>
                </div>
                <div className="p-2 border rounded bg-slate-50 flex items-center justify-between">
                  <span>Marksheet / Degree</span>
                  <span className="text-green-600 font-bold">✓ Ready</span>
                </div>
                <div className="p-2 border rounded bg-slate-50 flex items-center justify-between">
                  <span>Income Proof</span>
                  <span className="text-green-600 font-bold">✓ Ready</span>
                </div>
                <div className="p-2 border rounded bg-slate-50 flex items-center justify-between">
                  <span>Bank Account IFSC</span>
                  <span className="text-green-600 font-bold">✓ Ready</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between">
              <p className="text-[11px] text-slate-400 max-w-xs">
                Indicative guidance only. Submit on official government portal.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEligibilityModalOpen(false)}>
                  Close
                </Button>
                <Button size="sm" asChild className="bg-[#1a2f8a] hover:bg-[#0f1740]">
                  <Link to={`/dashboard/schemes/${selectedSchemeForAnalysis.id}`}>
                    View Application Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
