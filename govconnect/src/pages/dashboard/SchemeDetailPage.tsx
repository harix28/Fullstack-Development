import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Share2, Bookmark, ExternalLink, FileText, Calendar } from 'lucide-react';
import { mockSchemes } from '@/data/mockSchemes';
import { mockUser } from '@/data/mockUser';
import { Button, Card, Badge, LoadingSkeleton, MatchBadge, OfficialPortalButton } from '@/components/ui';

const SchemeDetailPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [scheme, setScheme] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = mockSchemes.find(s => s.id === id) || mockSchemes[0];
      setScheme(found);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return <div className="p-8"><LoadingSkeleton count={1} type="card" className="h-[400px]" /></div>;
  }

  if (!scheme) return <div>Scheme not found</div>;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <Link to="/dashboard/schemes" className="inline-flex items-center text-sm text-[#64748b] hover:text-[#0f1740]">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Schemes
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN */}
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">{scheme.ministry}</Badge>
              <Badge>{scheme.category || 'General'}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0f1740] mb-4">{scheme.title}</h1>
            <p className="text-[#64748b] text-lg">{scheme.description}</p>
            
            <div className="flex items-center gap-4 mt-6 border-t pt-4">
              <Button variant="outline" className="gap-2">
                <Bookmark className="w-4 h-4" /> Save
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-[#0f1740] mb-4">Overview</h2>
            <div className="prose prose-sm md:prose-base text-[#64748b]">
              <p>{scheme.description} Detailed overview goes here. The government has launched this initiative to provide support to eligible citizens.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f1740] mb-4">Who can apply?</h2>
            <Card className="p-5">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  {(mockUser.age ?? 28) >= 18 ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                  <div>
                    <p className="font-medium text-[#0f1740]">Age Requirement</p>
                    <p className="text-sm text-[#64748b]">Must be between 18 and 35 years</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#0f1740]">Income Limit</p>
                    <p className="text-sm text-[#64748b]">Annual family income below ₹8,00,000</p>
                  </div>
                </li>
              </ul>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f1740] mb-4">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scheme.benefits?.map((benefit: string, i: number) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-green-800 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  {benefit}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:w-[350px] space-y-6">
          <Card className="p-5 bg-gradient-to-br from-[#0f1740] to-[#1a2f8a] text-white">
            <h3 className="text-lg font-bold mb-4">AI Eligibility Analysis</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm opacity-90">Match Score</span>
              <span className="text-3xl font-bold">{scheme.matchPercentage || 85}%</span>
            </div>
            <div className="p-3 bg-white/10 rounded-lg text-sm leading-relaxed">
              Based on your profile, you meet the age and income criteria for this scheme.
            </div>
          </Card>

          <Card className="p-5 border-[#0d9488] border-2">
            <h3 className="font-bold text-[#0f1740] mb-2">Apply on Official Portal</h3>
            <p className="text-sm text-[#64748b] mb-4">
              GovConnect guides you. You complete the application on the official government portal.
            </p>
            <OfficialPortalButton url={scheme.portalUrl || '#'} className="w-full" />
          </Card>

          {scheme.deadline && (
            <Card className="p-5 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-[#64748b]">Application Deadline</p>
                <p className="font-bold text-[#0f1740]">{new Date(scheme.deadline).toLocaleDateString()}</p>
              </div>
            </Card>
          )}
        </div>
      </div>
      
      <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm text-center">
        <strong>Disclaimer:</strong> GovConnect is a citizen-assistance platform. Always verify information and complete applications through the official government portal.
      </div>
    </div>
  );
};

export default SchemeDetailPage;
