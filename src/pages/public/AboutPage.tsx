import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldAlert, Compass, FileCheck, HelpCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fc]">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        {/* HERO */}
        <section className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f1740] mb-6">About GovConnect</h1>
          <p className="text-xl text-gray-600">
            Bridging the gap between citizens and government services.
          </p>
        </section>

        {/* MISSION */}
        <section className="bg-white py-16 border-y border-[#e2e8f0] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-[#0d9488] mb-4">Our Mission</h2>
            <p className="text-2xl md:text-3xl font-medium text-[#0f1740] leading-relaxed">
              "Our Mission is to make government services accessible, understandable, and navigable for every Indian citizen."
            </p>
          </div>
        </section>

        {/* HOW WE HELP */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f1740] text-center mb-12">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#e2e8f0] text-center">
              <div className="w-16 h-16 bg-blue-50 text-[#1a2f8a] rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0f1740] mb-4">Discover</h3>
              <p className="text-gray-600">
                We simplify the process of finding relevant government schemes, job opportunities, and services based on your unique profile and eligibility.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#e2e8f0] text-center">
              <div className="w-16 h-16 bg-teal-50 text-[#0d9488] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0f1740] mb-4">Manage</h3>
              <p className="text-gray-600">
                Our Document Vault allows you to securely organize your personal files and certificates, making them ready to use for any application.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#e2e8f0] text-center">
              <div className="w-16 h-16 bg-blue-50 text-[#1a2f8a] rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0f1740] mb-4">Assist</h3>
              <p className="text-gray-600">
                Our AI-driven grievance assistant helps you articulate issues professionally, ensuring your complaints reach the right department effectively.
              </p>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg flex gap-4 items-start shadow-sm">
            <ShieldAlert className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">Important Disclaimer</h3>
              <p className="text-amber-800">
                GovConnect is <strong>NOT an official government portal</strong>. We are an independent, civic-tech initiative designed to aggregate information and simplify the discovery process for citizens. We do not process official applications or collect fees for government services. Final submissions must always be done on the respective official government websites.
              </p>
            </div>
          </div>
        </section>

        {/* TECH/TEAM PLACEHOLDER */}
        <section className="bg-white py-20 border-t border-[#e2e8f0] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0f1740] mb-6">Built for Scale and Security</h2>
            <p className="text-lg text-gray-600 mb-8">
              GovConnect leverages modern web technologies including React, TypeScript, and a secure backend infrastructure to ensure your data remains private and the platform remains robust even during high traffic.
            </p>
            <div className="inline-flex items-center gap-4 text-sm font-medium text-gray-500">
              <span>React 18</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>AI Integration</span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
