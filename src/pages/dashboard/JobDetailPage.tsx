import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Calendar, IndianRupee, Share2, Bookmark, CheckCircle2 } from 'lucide-react';
import { mockJobs } from '@/data/mockJobs';
import { Button, Card, Badge, LoadingSkeleton, OfficialPortalButton } from '@/components/ui';

const JobDetailPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = mockJobs.find(j => j.id === id) || mockJobs[0];
      setJob(found);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return <div className="p-8"><LoadingSkeleton count={1} type="card" className="h-[400px]" /></div>;
  }

  if (!job) return <div>Job not found</div>;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <Link to="/dashboard/jobs" className="inline-flex items-center text-sm text-[#64748b] hover:text-[#0f1740]">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-[#1a2f8a]/10 flex items-center justify-center font-bold text-[#1a2f8a] text-2xl">
                {job.organization.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#0f1740]">{job.title}</h1>
                <p className="text-[#64748b] text-lg">{job.organization} • {job.department}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <MapPin className="w-4 h-4" /> {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <Briefcase className="w-4 h-4" /> {job.jobType}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <IndianRupee className="w-4 h-4" /> {job.payScale || 'Not specified'}
              </div>
            </div>

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
            <h2 className="text-xl font-bold text-[#0f1740] mb-4">Job Overview</h2>
            <div className="prose prose-sm md:prose-base text-[#64748b]">
              <p>{job.description || 'Detailed description of the job profile and responsibilities.'}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f1740] mb-4">Eligibility Requirements</h2>
            <Card className="p-5 space-y-4">
              <div>
                <h4 className="font-semibold text-[#0f1740] mb-2">Education</h4>
                <p className="text-sm text-[#64748b]">{job.qualification || 'Graduation in any discipline'}</p>
              </div>
              <div className="h-px bg-slate-100 my-2"></div>
              <div>
                <h4 className="font-semibold text-[#0f1740] mb-2">Age Limit</h4>
                <p className="text-sm text-[#64748b]">18 - 30 Years (Age relaxation applicable as per govt rules)</p>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0f1740] mb-4">Selection Process</h2>
            <div className="space-y-3">
              {['Preliminary Exam', 'Main Exam', 'Personal Interview'].map((step, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-[#1a2f8a] text-white flex items-center justify-center text-xs font-bold">{i+1}</div>
                  <span className="font-medium text-[#0f1740]">{step}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:w-[350px] space-y-6">
          <Card className="p-5 bg-gradient-to-br from-[#0f1740] to-[#1a2f8a] text-white">
            <h3 className="text-lg font-bold mb-4">Match Score</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Based on your profile</span>
              <span className="text-3xl font-bold">{job.matchPercentage || 90}%</span>
            </div>
          </Card>

          <Card className="p-5 border-[#0d9488] border-2">
            <h3 className="font-bold text-[#0f1740] mb-2">Apply on Official Portal</h3>
            <p className="text-sm text-[#64748b] mb-4">
              GovConnect guides you. Complete your application on the official portal before the deadline.
            </p>
            <OfficialPortalButton url={job.portalUrl || '#'} className="w-full" />
          </Card>

          <Card className="p-5 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="text-sm text-[#64748b]">Vacancies</div>
              <div className="font-bold text-[#0f1740]">{job.vacancies || 'N/A'}</div>
            </div>
            {job.applicationDeadline && (
              <div className="flex justify-between items-center">
                <div className="text-sm text-[#64748b] flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Deadline
                </div>
                <div className="font-bold text-red-600">
                  {new Date(job.applicationDeadline).toLocaleDateString()}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
      
      <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm text-center">
        <strong>Disclaimer:</strong> GovConnect is a citizen-assistance platform. Always verify information and complete applications through the official government portal.
      </div>
    </div>
  );
};

export default JobDetailPage;
