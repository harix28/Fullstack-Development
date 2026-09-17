import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ROUTES from '@/constants/routes';
import { FileText, Briefcase, FolderOpen, MessageSquare, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 'schemes',
      title: 'Government Schemes Discovery',
      icon: FileText,
      description: 'Stop digging through complex eligibility criteria. Our engine matches your profile directly to the schemes you qualify for.',
      features: [
        'Personalised matching algorithm',
        'State and Central schemes covered',
        'Simplified eligibility requirements',
        'Direct links to official application portals'
      ],
      color: 'navy',
      reverse: false
    },
    {
      id: 'jobs',
      title: 'Government Job Tracker',
      icon: Briefcase,
      description: 'Stay ahead in your career with timely updates on government vacancies, exams, and results across all sectors.',
      features: [
        'Filter by qualification and sector',
        'Deadline reminders',
        'Admit card and result notifications',
        'Syllabus and exam pattern insights'
      ],
      color: 'teal',
      reverse: true
    },
    {
      id: 'vault',
      title: 'Secure Document Vault',
      icon: FolderOpen,
      description: 'A personal, encrypted storage space for all your essential documents like Aadhaar, PAN, educational certificates, and income proofs.',
      features: [
        'End-to-end encrypted storage',
        'Categorised folders for easy access',
        'Quick preview and download',
        'Privacy-first architecture'
      ],
      color: 'navy',
      reverse: false
    },
    {
      id: 'grievance',
      title: 'AI Grievance Assistant',
      icon: MessageSquare,
      description: 'Filing a complaint shouldn’t be a hassle. Describe your issue in plain language, and our AI will draft a formal grievance ready for submission.',
      features: [
        'Automatic department routing suggestions',
        'Professional language formatting',
        'Multi-lingual support',
        'Guidance on next steps'
      ],
      color: 'teal',
      reverse: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fc]">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        {/* HERO */}
        <section className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f1740] mb-6">Our Services</h1>
          <p className="text-xl text-gray-600">
            A comprehensive suite of tools designed to make interacting with government systems effortless.
          </p>
        </section>

        {/* DETAILED SERVICES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service) => (
            <div 
              key={service.id} 
              id={service.id}
              className={cn(
                "flex flex-col lg:flex-row gap-12 items-center",
                service.reverse ? "lg:flex-row-reverse" : ""
              )}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center",
                  service.color === 'navy' ? "bg-blue-50 text-[#1a2f8a]" : "bg-teal-50 text-[#0d9488]"
                )}>
                  <service.icon size={32} />
                </div>
                <h2 className="text-3xl font-bold text-[#0f1740]">{service.title}</h2>
                <p className="text-lg text-gray-600">{service.description}</p>
                
                <ul className="space-y-4 pt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className={cn(
                        "w-6 h-6 flex-shrink-0 mt-0.5",
                        service.color === 'navy' ? "text-[#1a2f8a]" : "text-[#0d9488]"
                      )} />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Image/Mockup Side */}
              <div className="flex-1 w-full">
                <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-xl overflow-hidden aspect-[4/3] flex items-center justify-center relative p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
                  {/* Mockup UI representation */}
                  <div className="relative z-10 w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col p-4 opacity-80">
                    <div className="h-8 border-b border-gray-100 flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex gap-4 mb-4">
                      <div className="w-1/3 h-24 bg-gray-100 rounded-md"></div>
                      <div className="w-2/3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <div className="h-10 bg-blue-50 rounded w-full"></div>
                      <div className="h-10 bg-blue-50 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#0f1740] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to simplify your interaction with the government?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of citizens taking control of their schemes, jobs, and documents in one secure place.
              </p>
              <Link 
                to={ROUTES.REGISTER}
                className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-[#0f1740] bg-[#0d9488] hover:bg-teal-500 shadow-sm transition-colors"
              >
                Create Free Account
              </Link>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#0d9488] opacity-10"></div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
