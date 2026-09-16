import React from 'react';
import { MessageSquare, ArrowRight, Wand2, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Grievances() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-brand-navy">AI Grievance Assistant</h2>
        <p className="mt-1 text-sm text-gray-500">Let AI help you classify and draft your complaint for the official portal.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h3 className="font-medium text-brand-navy flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-brand-teal" /> Describe your issue
          </h3>
          <p className="text-sm text-gray-500 mt-1">Explain the problem in your own words. Our AI will analyze it.</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
            <input type="text" placeholder="e.g. Streetlight not working in Sector 4" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={5} placeholder="Describe the problem, location, and any previous attempts to resolve..." className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal"></textarea>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button className="gap-2">
              Analyze Grievance <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Simulated AI Output Area */}
      <div className="bg-brand-light border border-dashed border-gray-300 rounded-lg p-6 opacity-70">
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <ShieldAlert className="h-5 w-5" />
          <h3 className="font-medium">AI Analysis (Awaiting Input)</h3>
        </div>
        <p className="text-sm text-gray-500">
          Once you submit the details, the AI will generate a formal draft, identify the correct department, and provide a link to the official portal where you must personally complete the CAPTCHA and OTP verification.
        </p>
      </div>
    </div>
  );
}
