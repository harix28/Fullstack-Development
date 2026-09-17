import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Briefcase, 
  FolderOpen, 
  MessageSquare, 
  User, 
  Target, 
  BookOpen, 
  RefreshCw, 
  Bot, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ROUTES from '@/constants/routes';
import { cn } from '@/utils/cn';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Is GovConnect an official government website?',
      a: 'No. GovConnect is an independent, non-governmental platform designed to help citizens discover and prepare for government services. Applications must always be submitted on official government portals.'
    },
    {
      q: 'Is my personal data safe?',
      a: 'Yes. We use a privacy-first architecture with end-to-end encryption for your documents. We do not sell your data to third parties.'
    },
    {
      q: 'Can GovConnect submit applications on my behalf?',
      a: 'No. Due to security measures like CAPTCHAs and OTPs on official portals, you must complete the final submission yourself. GovConnect helps you prepare everything you need up to that point.'
    },
    {
      q: 'Does GovConnect support Hindi?',
      a: 'Yes, GovConnect supports multiple regional languages including Hindi. You can toggle your preferred language using the language selector in the navigation bar.'
    },
    {
      q: 'Is GovConnect free?',
      a: 'Yes, GovConnect is 100% free for citizens to use.'
    },
    {
      q: 'How does the AI grievance assistant work?',
      a: 'Our AI assistant helps structure your grievance by categorizing it, identifying the correct department, and drafting a formal complaint based on your description. You then submit this draft on the official portal.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fc]">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="w-full bg-gradient-to-br from-white via-[#f0f4ff] to-[#e0eaff] pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-[#e2e8f0] text-sm font-medium text-[#1a2f8a]">
                <span className="text-lg">🏛</span> Unified Citizen Services Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f1740] leading-tight">
                One Platform. <br />
                <span className="text-[#0d9488]">Every Citizen Service.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
                Discover government schemes, opportunities, documents, and grievance assistance — all from one unified platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to={ROUTES.REGISTER} 
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#0f1740] hover:bg-[#1a2f8a] shadow-sm transition-colors"
                >
                  Get Started
                </Link>
                <a 
                  href="#services" 
                  className="inline-flex justify-center items-center px-6 py-3 border border-[#0f1740] text-base font-medium rounded-lg text-[#0f1740] bg-white hover:bg-gray-50 transition-colors"
                >
                  Explore Services
                </a>
              </div>
              <div className="pt-8 border-t border-gray-200 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-600">
                <span>50+ Schemes</span>
                <span>•</span>
                <span>200+ Job Categories</span>
                <span>•</span>
                <span>25+ Document Types</span>
                <span>•</span>
                <span className="text-[#0d9488]">100% Free</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-center relative">
              {/* Abstract GovTech SVG Illustration */}
              <svg viewBox="0 0 500 500" className="w-full max-w-md h-auto drop-shadow-2xl">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f1740" />
                    <stop offset="100%" stopColor="#1a2f8a" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
                {/* Background Blobs */}
                <circle cx="250" cy="250" r="180" fill="#f0f4ff" />
                <circle cx="350" cy="150" r="80" fill="#e0eaff" opacity="0.6" />
                
                {/* Central Shield */}
                <path d="M250 100 L330 130 V220 C330 300 250 360 250 360 C250 360 170 300 170 220 V130 Z" fill="url(#grad1)" />
                <path d="M250 130 L300 150 V210 C300 260 250 310 250 310 C250 310 200 260 200 210 V150 Z" fill="rgba(255,255,255,0.15)" />
                
                {/* Documents / Papers */}
                <rect x="130" y="240" width="80" height="100" rx="8" fill="white" transform="rotate(-15 170 290)" stroke="#e2e8f0" strokeWidth="3" />
                <line x1="145" y1="260" x2="195" y2="250" stroke="#0f1740" strokeWidth="4" strokeLinecap="round" transform="rotate(-15 170 290)" />
                <line x1="140" y1="280" x2="190" y2="270" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" transform="rotate(-15 170 290)" />
                
                <rect x="300" y="220" width="80" height="100" rx="8" fill="white" transform="rotate(15 340 270)" stroke="#e2e8f0" strokeWidth="3" />
                <line x1="315" y1="240" x2="365" y2="250" stroke="#0f1740" strokeWidth="4" strokeLinecap="round" transform="rotate(15 340 270)" />
                <line x1="310" y1="260" x2="360" y2="270" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" transform="rotate(15 340 270)" />

                {/* Connection Nodes */}
                <circle cx="250" cy="230" r="25" fill="url(#grad2)" />
                <circle cx="250" cy="230" r="12" fill="white" />
                <path d="M190 270 L230 245" stroke="#0d9488" strokeWidth="4" strokeDasharray="4 4" />
                <path d="M310 260 L270 245" stroke="#0d9488" strokeWidth="4" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1740] mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to interact with government departments, all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-blue-50 text-[#1a2f8a] rounded-full flex items-center justify-center mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0f1740] mb-3">Government Schemes</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Find government schemes based on your profile and eligibility criteria automatically.
              </p>
              <Link to={ROUTES.SERVICES} className="text-[#0d9488] font-semibold hover:underline inline-flex items-center">
                Learn more <span className="ml-1">→</span>
              </Link>
            </div>
            {/* Service 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-teal-50 text-[#0d9488] rounded-full flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0f1740] mb-3">Government Jobs</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Discover relevant government vacancies and track your application deadlines.
              </p>
              <Link to={ROUTES.SERVICES} className="text-[#0d9488] font-semibold hover:underline inline-flex items-center">
                Learn more <span className="ml-1">→</span>
              </Link>
            </div>
            {/* Service 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-blue-50 text-[#1a2f8a] rounded-full flex items-center justify-center mb-6">
                <FolderOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0f1740] mb-3">Document Vault</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Securely organise important documents for easy reuse in future applications.
              </p>
              <Link to={ROUTES.SERVICES} className="text-[#0d9488] font-semibold hover:underline inline-flex items-center">
                Learn more <span className="ml-1">→</span>
              </Link>
            </div>
            {/* Service 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#e2e8f0]">
              <div className="w-12 h-12 bg-teal-50 text-[#0d9488] rounded-full flex items-center justify-center mb-6">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0f1740] mb-3">Grievance Assistant</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Describe your issue and get AI-assisted help preparing a formal grievance.
              </p>
              <Link to={ROUTES.SERVICES} className="text-[#0d9488] font-semibold hover:underline inline-flex items-center">
                Learn more <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-20 bg-white border-t border-[#e2e8f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f1740] mb-4">How GovConnect Works</h2>
            </div>
            
            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              
              <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 relative z-10">
                {[
                  { step: 1, title: 'Create Your Profile', desc: 'Enter basic details to setup your secure citizen account.' },
                  { step: 2, title: 'Discover Personalised Services', desc: 'Our system matches you with eligible schemes and jobs.' },
                  { step: 3, title: 'Manage Documents', desc: 'Upload once, use everywhere for your applications.' },
                  { step: 4, title: 'Get AI Assistance', desc: 'Use AI to draft grievances and understand complex rules.' },
                  { step: 5, title: 'Complete Official Process', desc: 'Finish submissions on the official government portal.', highlight: true }
                ].map((item) => (
                  <div key={item.step} className="flex flex-row lg:flex-col items-center lg:text-center gap-4 lg:w-1/5 bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none shadow-sm lg:shadow-none border border-gray-100 lg:border-none">
                    <div className={cn(
                      "w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0",
                      item.highlight ? "bg-[#0d9488] text-white shadow-lg" : "bg-[#0f1740] text-white"
                    )}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#0f1740] mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">
                        {item.highlight ? <strong>{item.desc}</strong> : item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY GOVCONNECT SECTION */}
        <section className="py-20 bg-[#f0f4ff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f1740] mb-4">Why GovConnect?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: User, title: 'One Profile', desc: 'Maintain a single profile to check eligibility across hundreds of services.' },
                { icon: Target, title: 'Personalised Discovery', desc: 'Only see what matters to you based on your unique profile.' },
                { icon: BookOpen, title: 'Simplified Information', desc: 'Complex government jargon translated into easy-to-understand language.' },
                { icon: RefreshCw, title: 'Document Reuse', desc: 'Store your documents securely and reuse them for multiple applications.' },
                { icon: Bot, title: 'AI Assistance', desc: 'Get smart help drafting grievances and finding the right departments.' },
                { icon: ShieldCheck, title: 'Citizen-Controlled', desc: 'You remain in full control. Final submission happens on official portals.' }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-transparent hover:border-teal-100 transition-colors">
                  <feature.icon className="w-10 h-10 text-[#0d9488] mb-4" />
                  <h4 className="text-lg font-bold text-[#0f1740] mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f1740]">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium text-[#0f1740]">{faq.q}</span>
                    <ChevronDown className={cn(
                      "w-5 h-5 text-gray-500 transition-transform duration-200",
                      openFaq === index ? "transform rotate-180" : ""
                    )} />
                  </button>
                  {openFaq === index && (
                    <div className="pb-5 text-gray-600 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
