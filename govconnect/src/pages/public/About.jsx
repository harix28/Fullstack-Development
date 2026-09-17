import React from 'react';

export default function About() {
  return (
    <div className="bg-white min-h-[calc(100vh-16rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
            About GovConnect
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Bridging the gap between citizens and government services.
          </p>
        </div>

        <div className="mt-16 prose prose-blue prose-lg text-gray-600 mx-auto max-w-3xl">
          <p>
            GovConnect is built on the vision that interacting with the government should be as simple, intuitive, and efficient as any modern consumer application. 
          </p>
          <p>
            Historically, citizens have had to navigate dozens of fragmented portals, repeatedly verify their identity, and manually search through complex eligibility criteria just to receive the benefits they are entitled to.
          </p>
          
          <h3 className="text-xl font-bold text-brand-navy mt-8 mb-4">Our Mission</h3>
          <p>
            To provide a single, unified interface where a citizen can manage their official documents, discover relevant schemes via intelligent matching, find government employment, and easily file grievances to the correct department.
          </p>

          <h3 className="text-xl font-bold text-brand-navy mt-8 mb-4">How it works</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Unified Profile:</strong> Create one profile and let the system match you with relevant opportunities.</li>
            <li><strong>AI-Powered Assistance:</strong> Our AI helps draft formal grievances and explains complex scheme criteria in plain language.</li>
            <li><strong>Security First:</strong> We do not bypass official government security. We assist you up to the point of final submission, ensuring your data remains secure while honoring official CAPTCHA and OTP workflows.</li>
          </ul>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm italic m-0">
              Note: GovConnect is a prototype platform intended to demonstrate the future of GovTech UI/UX. Always verify scheme deadlines and details on the official government portals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
