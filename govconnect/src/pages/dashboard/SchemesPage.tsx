import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Bookmark, ChevronRight } from 'lucide-react';
import { mockSchemes } from '@/data/mockSchemes';
import { Button, Card, Badge, LoadingSkeleton, DeadlineBadge, MatchBadge, SearchBar, Tabs, TabsList, TabsTrigger, EmptyState } from '@/components/ui';
import type { Scheme } from '@/types';

const SchemesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...mockSchemes];
      
      if (searchQuery) {
        filtered = filtered.filter(s => 
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          s.ministry.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (activeTab === 'recommended') {
        filtered = filtered.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
      } else if (activeTab === 'saved') {
        filtered = filtered.filter(s => s.isSaved);
      }
      
      setSchemes(filtered);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0f1740]">Government Schemes</h1>
          <p className="text-[#64748b]">Discover and apply for schemes you are eligible for.</p>
        </div>
        <div className="w-full md:w-96">
          <SearchBar placeholder="Search schemes by name or ministry..." onChange={(v) => setSearchQuery(v)} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* FILTERS (Desktop) */}
        <div className="hidden lg:block w-64 shrink-0">
          <Card className="p-5 sticky top-24">
            <h3 className="font-bold text-[#0f1740] flex items-center mb-4">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#64748b] block mb-1">Category</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option>All Categories</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Finance</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#64748b] block mb-1">Ministry</label>
                <select className="w-full p-2 border rounded-md text-sm">
                  <option>All Ministries</option>
                  <option>Ministry of Finance</option>
                  <option>Ministry of Education</option>
                </select>
              </div>
              <Button variant="outline" className="w-full">Clear Filters</Button>
            </div>
          </Card>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="all">Explore All</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
          </Tabs>

          {isLoading ? (
            <LoadingSkeleton count={6} type="card" className="grid grid-cols-1 md:grid-cols-2 gap-4" />
          ) : schemes.length === 0 ? (
            <EmptyState title="No schemes found" description="Try adjusting your filters or search query." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemes.map(scheme => (
                <Card key={scheme.id} className="p-5 flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="text-[10px]">{scheme.ministry}</Badge>
                    {activeTab === 'recommended' && <MatchBadge matchPercentage={scheme.matchPercentage || 0} />}
                  </div>
                  <h3 className="font-semibold text-[#0f1740] mb-2 line-clamp-2">{scheme.title}</h3>
                  <p className="text-sm text-[#64748b] mb-4 line-clamp-3">{scheme.description}</p>
                  
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
                        <Bookmark className="w-5 h-5" fill={scheme.isSaved ? "currentColor" : "none"} />
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
        </div>
      </div>
    </div>
  );
};

export default SchemesPage;
