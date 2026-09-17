import React from 'react';
import { Search, FileText, Briefcase, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function Services() {
  const servicesList = [
    {
      title: "Government Schemes",
      description: "Discover personalized scheme recommendations based on your age, income, and category. Track eligibility criteria and deadlines.",
      icon: <Search className="h-8 w-8 text-brand-teal" />,
      link: "/login"
    },
    {
      title: "Job Opportunities",
      description: "Find central and state government vacancies. Filter by qualification, location, and department with automated match scoring.",
      icon: <Briefcase className="h-8 w-8 text-brand-teal" />,
      link: "/login"
    },
    {
      title: "Digital Document Vault",
      description: "Securely store your Aadhaar, PAN, educational certificates, and category documents to instantly apply for services.",
      icon: <FileText className="h-8 w-8 text-brand-teal" />,
      link: "/login"
    },
    {
      title: "AI Grievance Redressal",
      description: "Having trouble? Describe your issue in plain language and our AI will draft a formal complaint and route you to the correct department.",
      icon: <MessageSquare className="h-8 w-8 text-brand-teal" />,
      link: "/login"
    }
  ];

  return (
    <div className="bg-brand-light min-h-[calc(100vh-16rem)]">
      <div className="bg-brand-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            A unified catalog of citizen services designed to bring the government closer to you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="bg-gray-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">{service.description}</p>
              <div>
                <Link to={service.link}>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    Access Service <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between border border-blue-100">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <ShieldCheck className="h-12 w-12 text-blue-600" />
            <div>
              <h4 className="text-lg font-bold text-brand-navy">Data Privacy Guaranteed</h4>
              <p className="text-sm text-gray-600">Your documents and profile data are encrypted and never shared without consent.</p>
            </div>
          </div>
          <Link to="/register">
            <Button>Create Citizen Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
