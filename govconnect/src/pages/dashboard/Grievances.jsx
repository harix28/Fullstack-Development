import React, { useState } from 'react';
import { ArrowRight, Wand2, ShieldAlert, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Grievances() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAnalyze = () => {
    if (!title || !description) return;
    setStep(2); // Analyzing
    setTimeout(() => {
      setStep(3); // Result
    }, 2000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-brand-navy">AI Grievance Assistant</h2>
        <p className="mt-1 text-sm text-gray-500">Let AI help you classify and draft your complaint for the official portal.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h3 className="font-medium text-brand-navy flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-brand-teal" /> Describe your issue
            </h3>
            <p className="text-sm text-gray-500 mt-1">Explain the problem in your own words. Our AI will analyze it.</p>
          </div>
          <div className="flex gap-2">
            <span className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-400'}`}>1</span>
            <span className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-400'}`}>2</span>
            <span className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 4 ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-400'}`}>3</span>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
            <input 
              type="text" 
              disabled={step > 1}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Streetlight not working in Sector 4" 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal disabled:bg-gray-50 disabled:text-gray-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              rows={5} 
              disabled={step > 1}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem, location, and any previous attempts to resolve..." 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal disabled:bg-gray-50 disabled:text-gray-500"
            ></textarea>
          </div>
          
          {step === 1 && (
            <div className="flex justify-end pt-4">
              <Button className="gap-2" onClick={handleAnalyze} disabled={!title || !description}>
                Analyze Grievance <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Simulated AI Output Area */}
      {step === 1 && (
        <div className="bg-brand-light border border-dashed border-gray-300 rounded-lg p-6 opacity-70">
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="font-medium">AI Analysis (Awaiting Input)</h3>
          </div>
          <p className="text-sm text-gray-500">
            Once you submit the details, the AI will generate a formal draft, identify the correct department, and provide a link to the official portal where you must personally complete the CAPTCHA and OTP verification.
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <Loader2 className="h-10 w-10 text-brand-teal animate-spin mb-4" />
          <h3 className="text-lg font-medium text-brand-navy">AI is analyzing your grievance...</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-md">Matching keywords, identifying the responsible department, and generating a formal complaint draft.</p>
        </div>
      )}

      {step >= 3 && (
        <div className="bg-white border border-brand-teal rounded-lg shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-brand-teal text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <h3 className="font-medium">Analysis Complete</h3>
            </div>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Confidence: 94%</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded border border-gray-100">
                <p className="text-xs text-gray-500">Detected Department</p>
                <p className="font-semibold text-brand-navy">Municipal Corporation</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-100">
                <p className="text-xs text-gray-500">Complaint Category</p>
                <p className="font-semibold text-brand-navy">Public Infrastructure / Lighting</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Generated Formal Draft:</p>
              <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm text-gray-700 font-serif leading-relaxed">
                To The Concerned Officer,<br/><br/>
                I am writing to formally register a grievance regarding: {title}. <br/>
                {description}<br/><br/>
                I kindly request immediate attention to this matter as it poses a significant inconvenience to the residents. <br/><br/>
                Sincerely,<br/>Citizen User
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Final Step Required</p>
                <p className="text-sm text-blue-800 mt-1">
                  CAPTCHA, OTP verification, and final submission must be completed by you on the official government portal.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="outline" onClick={() => setStep(1)}>Edit Input</Button>
              <Button>Proceed to Official Portal</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
