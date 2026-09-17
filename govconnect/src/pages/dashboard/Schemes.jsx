import React, { useState } from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../store/useStore';
import { mockSchemes } from '../../data/mockSchemes';

export default function Schemes() {
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const savedSchemes = useStore(state => state.savedSchemes);
  const toggleSaveScheme = useStore(state => state.toggleSaveScheme);

  // Filter logic
  let displaySchemes = mockSchemes;
  if (activeTab === 'saved') {
    displaySchemes = mockSchemes.filter(s => savedSchemes.includes(s.id));
  } else if (activeTab === 'recommended') {
    displaySchemes = mockSchemes.filter(s => s.matchPercentage > 80);
  }

  if (searchQuery) {
    displaySchemes = displaySchemes.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.ministry.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

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
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes..." 
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-teal focus:border-brand-teal sm:text-sm" 
            />
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
              {tab} Schemes {tab === 'saved' && `(${savedSchemes.length})`}
            </button>
          ))}
        </nav>
      </div>

      {displaySchemes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No schemes found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displaySchemes.map(scheme => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${scheme.matchPercentage >= 90 ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-blue-50 text-blue-700 ring-blue-600/20'}`}>
                    {scheme.matchPercentage}% Match
                  </span>
                  <span className="text-xs font-medium text-brand-warning bg-brand-warning/10 px-2 py-1 rounded">{scheme.deadline}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-navy">{scheme.name}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{scheme.ministry}</p>
                <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                  {scheme.description}
                </p>
                
                <div className="mt-4 space-y-2">
                  {scheme.tags.slice(0, 2).map((tag, i) => (
                    <div key={i} className="flex items-start text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
                <Button 
                  variant={savedSchemes.includes(scheme.id) ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => toggleSaveScheme(scheme.id)}
                >
                  {savedSchemes.includes(scheme.id) ? 'Saved' : 'Save'}
                </Button>
                <Link to={`/dashboard/schemes/${scheme.id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
