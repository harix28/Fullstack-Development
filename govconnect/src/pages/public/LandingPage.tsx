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
  Sparkles,
  MapPin,
  Clock,
  Shield,
  HelpCircle,
  Layers,
  Award,
  Lock,
  Compass,
  FileCheck
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
      q: 'What is the motive of GovConnect?',
      a: 'GovConnect was engineered as a College Major Capstone Project to solve the fragmentation of citizen services in India. Currently, citizens must navigate dozens of disconnected portals (myScheme, CPGRAMS, SSC, NSP, state portals) with confusing bureaucratic jargon. GovConnect consolidates scheme matching, recruitment tracking, document storage, and grievance drafting into one unified citizen interface.'
    },
    {
      q: 'How does the platform protect citizen data?',
      a: 'GovConnect uses a privacy-first, client-side encryption architecture. Your documents and demographic information remain securely stored in your browser memory and are not uploaded to unauthorized third-party databases. You retain full control of your records.'
    },
    {
      q: 'Does GovConnect submit applications on my behalf?',
      a: 'No. Government portals mandate biometric Aadhaar verification, OTPs, and CAPTCHAs for statutory security. GovConnect acts as an intelligent preparation layer: it calculates your eligibility, verifies required documents, and drafts application packages, then provides a 1-click jump to the verified official government portal for final submission.'
    },
    {
      q: 'Does GovConnect support bilingual accessibility?',
      a: 'Yes! GovConnect provides bilingual support in both English and Hindi. Citizens can instantly toggle the language using the switch in the top navigation bar at any moment.'
    },
    {
      q: 'How does the Ask Sarkar AI assistant work?',
      a: 'Ask Sarkar AI leverages modern NLP techniques to understand natural queries in plain language, translate complex gazette rules into simple bullet points, evaluate eligibility parameters, and generate professionally structured formal grievance letters ready for CPGRAMS submission.'
    }
  ];

  const services = [
    {
      icon: FileText,
      color: 'bg-blue-50 dark:bg-blue-950/60 text-[#1a2f8a] dark:text-blue-400',
      title: 'Government Welfare Schemes',
      desc: 'Smart matching against 200+ central & state schemes with instant eligibility scores based on caste, income, and education criteria.',
      badge: '50+ Verified Schemes'
    },
    {
      icon: Briefcase,
      color: 'bg-teal-50 dark:bg-teal-950/60 text-[#0d9488] dark:text-teal-400',
      title: 'Sarkari Jobs & Recruitment',
      desc: 'Track UPSC, SSC, Banking, Railways, and State PSUs with qualification fit checklists, deadline countdowns, and official links.',
      badge: '200+ Job Roles'
    },
    {
      icon: FolderOpen,
      color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
      title: 'Digital Document Vault',
      desc: 'Securely organize Aadhaar, PAN, marksheets, and income certificates with simulated OCR data extraction for effortless reuse.',
      badge: 'Client-Side Encrypted'
    },
    {
      icon: MessageSquare,
      color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
      title: 'AI Grievance Redressal',
      desc: 'Draft formal, legally formatted grievance letters for CPGRAMS and state portals with automated departmental routing recommendations.',
      badge: 'CPGRAMS Format'
    },
    {
      icon: Bot,
      color: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
      title: 'Ask Sarkar AI Assistant',
      desc: 'Bilingual 24/7 conversational guidance to clarify complex government rules, verify eligibility conditions, and guide next steps.',
      badge: 'Hindi & English'
    },
    {
      icon: MapPin,
      color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
      title: 'Local Services Locator',
      desc: 'Find verified nearby Common Service Centres (CSC), municipal offices, hospitals, and emergency helplines with interactive map pins.',
      badge: 'Proximity Filter'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Clean Navbar: Only Mode (Theme), Language, Sign In, Register */}
      <Navbar />
      
      <main className="flex-grow">
        
        {/* ── 1. HERO SECTION & HERO CARD ── */}
        <section className="w-full bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 pt-16 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-200/70 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Copy & Motive */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800/90 shadow-xs border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#1a2f8a] dark:text-blue-400">
                <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                <span>College Major Project • Unified Citizen Services Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f1740] dark:text-white leading-[1.12] tracking-tight">
                One Platform. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] via-[#2563eb] to-[#1a2f8a]">
                  Every Citizen Service.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                GovConnect unifies 1,000+ government welfare schemes, recruitment notifications, an encrypted document vault, and AI grievance assistance into a single intuitive gateway. Designed to eliminate bureaucratic friction for 1.4 billion citizens.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link 
                  to={ROUTES.LOGIN} 
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-[#1a2f8a] to-[#2563eb] hover:from-[#0f1740] hover:to-[#1a2f8a] shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to={ROUTES.REGISTER} 
                  className="inline-flex justify-center items-center px-6 py-3.5 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-[#0f1740] dark:text-white bg-white/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Register Account
                </Link>
                <a 
                  href="#motive" 
                  className="inline-flex justify-center items-center px-4 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#1a2f8a] dark:hover:text-blue-400 transition-colors"
                >
                  Learn Motive & Services ↓
                </a>
              </div>

              {/* Stats Strip */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-[#0f1740] dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> 50+ Welfare Schemes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-[#0f1740] dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> 200+ Recruitment Exams
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-[#0f1740] dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Client-Side OCR Vault
                </span>
                <span>•</span>
                <span className="text-[#0d9488] font-bold">100% Free & Open</span>
              </div>
            </div>

            {/* Right Column: HERO SECTION CARD */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200/90 dark:border-slate-800 relative overflow-hidden">
                
                {/* Hero Card Top Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1a2f8a] flex items-center justify-center text-white font-bold shadow-xs">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0f1740] dark:text-white">GovConnect Citizen Portal</h4>
                      <p className="text-[10px] text-slate-400">Single Verified Profile</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[10px] font-bold text-[#0d9488] border border-teal-200 dark:border-teal-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                    Live System
                  </span>
                </div>

                {/* Hero Card Body Tiles */}
                <div className="mt-4 space-y-2.5">
                  {/* Scheme Item */}
                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">PM MUDRA Yojana</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">₹50K - ₹10L Loan • MSME</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md shadow-xs border border-blue-200/50 dark:border-blue-800">
                      92% Match
                    </span>
                  </div>

                  {/* Job Item */}
                  <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">SSC CGL Tier 1 Officer</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Pay Level 7 • 12 Days Left</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md shadow-xs border border-teal-200/50 dark:border-teal-800">
                      Eligible
                    </span>
                  </div>

                  {/* Document Vault Item */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                        <FolderOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Digital Document Vault</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Aadhaar, PAN & Degree OCR</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      Verified
                    </span>
                  </div>

                  {/* Ask Sarkar AI */}
                  <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Ask Sarkar AI Assistant</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Grievance draft & advice</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md shadow-xs">
                      Active
                    </span>
                  </div>
                </div>

                {/* Hero Card Footer CTA */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Client Encrypted • Zero Data Loss</span>
                  <Link to={ROUTES.LOGIN} className="font-bold text-[#1a2f8a] dark:text-blue-400 hover:underline flex items-center gap-1">
                    Open Dashboard →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 2. PROJECT MOTIVE & PROBLEM STATEMENT (ABOUT SECTION) ── */}
        <section id="motive" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1a2f8a] dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800 mb-3">
              <Compass className="w-3.5 h-3.5" /> Project Motive & Problem Statement
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1740] dark:text-white tracking-tight mb-4">
              Why We Engineered GovConnect
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              India has over 1,000 welfare programs and hundreds of competitive exams, yet millions of eligible citizens miss out every year due to fragmented portals, legal jargon, and repetitive bureaucratic obstacles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Current Problem */}
            <div className="bg-red-50/50 dark:bg-slate-900/90 rounded-2xl p-8 border border-red-100 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">The Problem in Current Governance</span>
                <h3 className="text-xl font-bold text-[#0f1740] dark:text-white mt-2 mb-4">
                  Fragmented Portals & Bureaucratic Friction
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span><strong>50+ Separate Portals:</strong> Citizens must search different websites for scholarships, farm subsidies, health aid, and employment.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span><strong>Confusing Jargon:</strong> Complex legal and gazette wording causes eligible citizens to misunderstand qualifying conditions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span><strong>Repetitive Form Filling:</strong> Citizens re-enter their caste, address, and demographics for every single application.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span><strong>Grievance Abandonment:</strong> Common citizens struggle to identify the correct ministry or draft formal legal complaints.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-red-100 dark:border-slate-800">
                Result: Billions of rupees in allocated public funds and career opportunities go unclaimed.
              </p>
            </div>

            {/* Our Engineered Solution */}
            <div className="bg-teal-50/50 dark:bg-slate-900/90 rounded-2xl p-8 border border-teal-100 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">The GovConnect Solution</span>
                <h3 className="text-xl font-bold text-[#0f1740] dark:text-white mt-2 mb-4">
                  Single Interface & AI-Assisted Empowerment
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Single Citizen Profile:</strong> Input your demographics once; dynamic eligibility rules calculate instant match scores.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Plain-Language Rules:</strong> AI translates complicated policy eligibility into visual pass/fail checklists.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Client-Side Document Vault:</strong> Secure local storage with OCR indexing prevents repetitive certificate uploading.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Assisted Official Portal Hand-off:</strong> Auto-drafts complaint letters and routes directly to authorized central/state portals.</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs text-[#0d9488] font-bold mt-6 pt-4 border-t border-teal-100 dark:border-slate-800">
                Motive: Deliver a zero-friction, transparent civic experience for every Indian citizen.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. CORE SERVICES SUITE (SERVICES SECTION) ── */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0d9488] text-xs font-bold border border-teal-200 dark:border-teal-800 mb-3">
              <Layers className="w-3.5 h-3.5" /> Comprehensive Citizen Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1740] dark:text-white tracking-tight mb-4">
              All Citizen Work Housed in One Dashboard
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Explore the core service modules. Once you log in, all tasks, applications, and vault records are managed directly from your personalized Citizen Dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0f1740] dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <Link 
                    to={ROUTES.LOGIN} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a2f8a] dark:text-blue-400 hover:underline mt-auto pt-4 border-t border-slate-100 dark:border-slate-800"
                  >
                    <span>Sign in to access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4. HOW IT WORKS WORKFLOW ── */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1740] dark:text-white tracking-tight mb-4">
              How GovConnect Works in 4 Steps
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              A streamlined, transparent workflow connecting citizens directly to authorized government benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                step: '01', 
                title: 'Single Citizen Profile', 
                desc: 'Enter demographics, caste category, income band, and education once. Saved locally in your browser.' 
              },
              { 
                step: '02', 
                title: 'AI Eligibility Engine', 
                desc: 'Rule-based matching computes match percentages and checklist passes for 200+ schemes and recruitment exams.' 
              },
              { 
                step: '03', 
                title: 'Private Document Vault', 
                desc: 'Upload Aadhaar, marksheets, and certificates. Automated simulated OCR verifies credentials for reuse.' 
              },
              { 
                step: '04', 
                title: '1-Click Official Portal', 
                desc: 'Jump directly to the official ministry portal (CPGRAMS, NSP, SSC) with pre-verified checklists in hand.' 
              }
            ].map((st) => (
              <div key={st.step} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1a2f8a] to-[#2563eb] text-white flex items-center justify-center font-black text-sm mb-4 shadow-sm">
                  {st.step}
                </div>
                <h4 className="text-base font-bold text-[#0f1740] dark:text-white mb-2">{st.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. CALL TO ACTION TO DASHBOARD ── */}
        <section className="bg-gradient-to-r from-[#0f1740] via-[#1a2f8a] to-[#0f1740] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-400" /> Secure Citizen Gateway
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Explore Your Matched Opportunities?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Sign in to your Citizen Dashboard to instantly access your matched schemes, sarkari vacancies, document vault, and grievance drafting tools.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                to={ROUTES.LOGIN}
                className="px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center gap-2"
              >
                Sign In to Citizen Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
              >
                Register Free Account
              </Link>
            </div>
          </div>
        </section>

        {/* ── 6. FAQ SECTION ── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0f1740] dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Key questions about our College Major Capstone Project architecture and usage.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 sm:p-5 text-left focus:outline-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0f1740] dark:text-white">{faq.q}</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-3",
                    openFaq === index ? "transform rotate-180 text-blue-600" : ""
                  )} />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
