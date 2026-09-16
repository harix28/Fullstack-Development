import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { FileText, Search, Briefcase, MessageSquare } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              One Platform. <br/>
              <span className="text-brand-teal">Every Citizen Service.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-lg">
              Discover government schemes, opportunities, documents, and grievance assistance — all from one unified platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal/90 text-white border-none">
                  Get Started
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center z-10">
            {/* Placeholder for Hero Illustration */}
            <div className="w-full h-80 bg-brand-navy border border-gray-700 rounded-lg flex items-center justify-center shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 to-transparent rounded-lg"></div>
              <span className="text-gray-400">Hero Illustration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-navy tracking-tight">Our Core Services</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
              Everything you need to interact with government services efficiently.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<Search className="h-8 w-8 text-brand-teal" />}
              title="Government Schemes"
              description="Find government schemes based on citizen profile and eligibility."
            />
            <ServiceCard 
              icon={<Briefcase className="h-8 w-8 text-brand-teal" />}
              title="Government Jobs"
              description="Discover relevant government vacancies and track deadlines."
            />
            <ServiceCard 
              icon={<FileText className="h-8 w-8 text-brand-teal" />}
              title="Document Vault"
              description="Securely organize important documents for future applications."
            />
            <ServiceCard 
              icon={<MessageSquare className="h-8 w-8 text-brand-teal" />}
              title="Grievance Assistant"
              description="Describe an issue and receive assistance preparing a grievance."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="bg-brand-light w-14 h-14 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-brand-navy mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
