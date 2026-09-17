import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink, Calendar, MapPin, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { mockSchemes } from '../../data/mockSchemes';

export default function SchemeDetails() {
  const { id } = useParams();
  
  // Find the scheme or fallback to the first one for demonstration
  const scheme = mockSchemes.find(s => s.id.toString() === id) || mockSchemes[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/dashboard/schemes" className="inline-flex items-center text-sm font-medium text-brand-teal hover:text-brand-teal/80">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Schemes
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                  {scheme.matchPercentage}% Match
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  Central Government
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-brand-navy">{scheme.name}</h1>
              <p className="mt-2 text-md text-gray-600 font-medium">{scheme.ministry}</p>
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Button className="w-full md:w-auto gap-2">
                Apply on Official Portal <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full md:w-auto">
                Save for Later
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          
          <div className="lg:col-span-2 p-6 md:p-8 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-brand-navy mb-3">Overview</h3>
              <p className="text-gray-600 leading-relaxed">
                {scheme.description}
                <br/><br/>
                This scheme is designed to provide financial and structural support to eligible citizens across the country, ensuring a basic safety net and promoting inclusive growth.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-brand-navy mb-4">Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-brand-teal mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Direct Benefit Transfer (DBT) directly into the Aadhaar-linked bank account.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-brand-teal mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Free health coverage or income support based on the specific bracket.</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="bg-gray-50 p-6 md:p-8 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Important Info</h4>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-500 text-xs">Deadline</p>
                    <p className="font-medium text-brand-navy">{scheme.deadline}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-500 text-xs">Applicable In</p>
                    <p className="font-medium text-brand-navy">Pan-India</p>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-500 text-xs">Documents Required</p>
                    <p className="font-medium text-brand-navy">Aadhaar, Bank Passbook, Income Cert.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-brand-teal" /> AI Eligibility Check
              </h4>
              <div className="space-y-2">
                {scheme.tags.map((tag, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-2 border border-green-100 rounded text-sm">
                    <span className="text-gray-600">{tag}</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
