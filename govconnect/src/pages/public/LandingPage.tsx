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
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Sparkles
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
      a: 'No. GovConnect is an independent, non-governmental citizen intelligence platform designed to help citizens discover, prepare, and track their applications. Submissions are always completed securely on official government portals (e.g., National Portal of India, State Portals).'
    },
    {
      q: 'Is my personal data safe?',
      a: 'Yes. We use a privacy-first architecture with local encryption for all uploaded documents. Your data stays in your personal device and is not monetized or shared with third parties.'
    },
    {
      q: 'Can GovConnect submit applications on my behalf?',
      a: 'No. Due to security measures like Aadhaar OTPs, biometric verification, and official CAPTCHAs, you complete the final submission yourself. GovConnect organizes your eligibility, pre-fills your application package, and gives you a 1-click jump directly to the verified official portal.'
    },
    {
      q: 'Does GovConnect support Hindi and regional languages?',
      a: 'Yes! GovConnect offers full bilingual support in English and Hindi, with seamless switching from the top navigation bar at any point in your journey.'
    },
    {
      q: 'Is GovConnect free to use?',
      a: 'Yes, GovConnect is 100% free and open for all Indian citizens as part of our SIH 2026 digital empowerment mission.'
    },
    {
      q: 'How does the Ask Sarkar AI assistant work?',
      a: 'Our AI assistant understands conversational queries in natural language, breaks down complicated government welfare guidelines, checks your eligibility criteria, and drafts formal grievance letters ready for immediate submission.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="w-full bg-gradient-to-br from-white via-blue-50/60 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 pt-16 pb-16 md:pt-24 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/60 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800/90 shadow-xs border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#1a2f8a] dark:text-blue-400">
                <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                <span>SIH 2026 Innovation Challenge • Unified Citizen Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f1740] dark:text-white leading-[1.15] tracking-tight">
                One Platform. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] to-[#2563eb]">
                  Every Citizen Service.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Discover government welfare schemes, career opportunities, organize your digital document vault, and get instant AI guidance — completely unified for 1.4 billion citizens.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link 
                  to={ROUTES.REGISTER} 
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#1a2f8a] to-[#2563eb] hover:from-[#0f1740] hover:to-[#1a2f8a] shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to={ROUTES.HOW_IT_WORKS} 
                  className="inline-flex justify-center items-center px-6 py-3.5 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-[#0f1740] dark:text-white bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
                >
                  See How It Works
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-[#0f1740] dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> 50+ Verified Welfare Schemes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-[#0f1740] dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> 200+ Recruitment Exams
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-[#0f1740] dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Secure Document OCR
                </span>
                <span>•</span>
                <span className="text-[#0d9488] font-bold">100% Free & Open</span>
              </div>
            </div>

            {/* Interactive Hero Illustration */}
            <div className="hidden lg:flex justify-center relative">
              <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1a2f8a] flex items-center justify-center text-white font-bold shadow-xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0f1740] dark:text-white">GovConnect Intelligence</h4>
                      <p className="text-[10px] text-slate-400">Single Citizen Interface</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[10px] font-bold text-[#0d9488] border border-teal-200 dark:border-teal-800">
                    Live Match
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">PM Kisan Samman Nidhi</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">₹6,000 / year • Agriculture</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md shadow-xs">
                      95% Eligible
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">SSC CGL Tier 1 Officer</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Pay Level 7 • 12 Days Left</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md shadow-xs">
                      Matched
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Ask Sarkar AI Assistant</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Grievance drafting ready</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <span>Aadhaar Demo Connected</span>
                  <span className="text-[#0d9488] font-bold">256-bit Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/50 text-[#0d9488] text-xs font-bold border border-teal-200 dark:border-teal-800 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Complete Citizen Suite
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1740] dark:text-white mb-4 tracking-tight">
              Our Core Services
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to interact with government departments, verify schemes, and protect your citizen rights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 dark:border-slate-800 flex flex-col">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-[#1a2f8a] dark:text-blue-400 rounded-xl flex items-center justify-center mb-5">
                <FileText size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#0f1740] dark:text-white mb-2">Welfare Schemes</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-5 flex-grow">
                Find Central and State government schemes matched automatically against your caste, income, and education profile.
              </p>
              <Link to={ROUTES.SERVICES} className="text-xs text-[#0d9488] font-bold hover:underline inline-flex items-center gap-1 mt-auto">
                Explore schemes <span>→</span>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 dark:border-slate-800 flex flex-col">
              <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/60 text-[#0d9488] rounded-xl flex items-center justify-center mb-5">
                <Briefcase size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#0f1740] dark:text-white mb-2">Recruitment Tracker</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-5 flex-grow">
                Discover verified UPSC, SSC, Railway, and State PCS vacancies with qualification fit checklists and countdown alerts.
              </p>
              <Link to={ROUTES.SERVICES} className="text-xs text-[#0d9488] font-bold hover:underline inline-flex items-center gap-1 mt-auto">
                Track vacancies <span>→</span>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 dark:border-slate-800 flex flex-col">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-5">
                <FolderOpen size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#0f1740] dark:text-white mb-2">Digital Document Vault</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-5 flex-grow">
                Store Aadhaar, PAN, degree marks, and income certificates securely with instant simulated OCR data extraction.
              </p>
              <Link to={ROUTES.SERVICES} className="text-xs text-[#0d9488] font-bold hover:underline inline-flex items-center gap-1 mt-auto">
                Manage documents <span>→</span>
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 dark:border-slate-800 flex flex-col">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-5">
                <MessageSquare size={22} />
              </div>
              <h3 className="text-lg font-bold text-[#0f1740] dark:text-white mb-2">Grievance Redressal</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-5 flex-grow">
                Draft professional, legally structured grievance submissions for CPGRAMS with departmental routing and tracking.
              </p>
              <Link to={ROUTES.SERVICES} className="text-xs text-[#0d9488] font-bold hover:underline inline-flex items-center gap-1 mt-auto">
                File a grievance <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#1a2f8a] dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800 mb-3">
                Simple 4-Step Process
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1740] dark:text-white mb-4 tracking-tight">
                How GovConnect Works
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                From profile setup to official submission, experience a zero-friction civic journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Setup Citizen Profile', desc: 'Enter demographics, caste category, income tier, and domicile state once.' },
                { step: '02', title: 'AI Match & Eligibility', desc: 'Our engine computes match scores and eligibility checklists against 200+ schemes.' },
                { step: '03', title: 'Vault Ready Documents', desc: 'Upload documents once and have OCR data pre-verified for any application.' },
                { step: '04', title: '1-Click Official Portal', desc: 'Jump directly to the official ministry portal with all required answers in hand.' }
              ].map((item) => (
                <div key={item.step} className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1a2f8a] to-[#2563eb] text-white flex items-center justify-center font-black text-sm mb-4 shadow-sm">
                    {item.step}
                  </div>
                  <h4 className="text-base font-bold text-[#0f1740] dark:text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link 
                to={ROUTES.HOW_IT_WORKS} 
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1a2f8a] dark:text-blue-400 hover:underline"
              >
                <span>Read detailed architecture and workflow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* WHY GOVCONNECT SECTION */}
        <section className="py-20 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1740] dark:text-white mb-4 tracking-tight">
                Why Citizens Trust GovConnect
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Designed to bridge digital divide and make governance transparent, accessible, and fast.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: User, title: 'Single Citizen Profile', desc: 'No more typing your parent details, address, and category on ten different websites.' },
                { icon: Target, title: 'Personalised Matching', desc: 'Only see opportunities and schemes you are genuinely eligible for, saving valuable time.' },
                { icon: BookOpen, title: 'Jargon-Free Explanations', desc: 'Legalese and gazette notifications translated into simple points anyone can understand.' },
                { icon: RefreshCw, title: 'Document Reuse', desc: 'Store once in your private browser vault and reuse across multiple schemes and job portals.' },
                { icon: Bot, title: 'Ask Sarkar AI', desc: 'Voice-ready and bilingual artificial intelligence assistant available 24/7 for instant answers.' },
                { icon: ShieldCheck, title: 'Privacy & Security', desc: 'You retain full control over your documents with local client-side state encryption.' }
              ].map((feature, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 hover:border-teal-400/50 transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0d9488] flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#0f1740] dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#0f1740] dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                Have questions about our citizen services platform? Here are clear answers.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-4 sm:p-5 text-left focus:outline-none cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0f1740] dark:text-white">{faq.q}</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-3",
                      openFaq === index ? "transform rotate-180 text-blue-600" : ""
                    )} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/60 dark:border-slate-700/60 pt-3 leading-relaxed">
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
