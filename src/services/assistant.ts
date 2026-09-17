import type { ChatMessage } from '@/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = (min: number, max: number): Promise<void> =>
  delay(Math.floor(Math.random() * (max - min + 1)) + min);

const generateId = (): string =>
  `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// ─── Keyword Response Map ─────────────────────────────────────────────────────

interface KeywordResponse {
  keywords: string[];
  response: string;
  suggestions: string[];
}

const KEYWORD_RESPONSES: KeywordResponse[] = [
  {
    keywords: ['scheme', 'yojana', 'benefit', 'subsidy', 'welfare'],
    response: `I can help you discover government schemes you may be eligible for! Based on your profile, here are some popular schemes:

• **PM MUDRA Yojana** – Micro-finance loans up to ₹10 lakh for small businesses and entrepreneurs.
• **National Scholarship Portal (NSP)** – Central and state scholarships for students at all education levels.
• **PM Awas Yojana (PMAY)** – Housing assistance for EWS, LIG, and MIG income groups.
• **Pradhan Mantri Jan Dhan Yojana** – Zero-balance bank accounts with accident insurance cover.

Would you like me to check your eligibility for any specific scheme? I can also filter schemes by category, state, or income group.`,
    suggestions: [
      'Check my eligibility for PMAY',
      'Show education schemes',
      'Agriculture schemes in my state',
    ],
  },
  {
    keywords: ['job', 'vacancy', 'recruitment', 'sarkari', 'government job', 'opening'],
    response: `Great! I can help you find government job openings matching your qualifications. Here are some actively recruiting organizations:

• **SSC (Staff Selection Commission)** – CGL, CHSL, MTS exams for central government posts.
• **IBPS (Institute of Banking Personnel Selection)** – PO, Clerk, and SO posts in public sector banks.
• **Railway Recruitment Board (RRB)** – NTPC, Group D, JE, and ALP vacancies across zones.
• **UPSC** – Civil Services, IFS, and central group A & B service examinations.
• **State Public Service Commissions** – State-level administrative and technical posts.

I can filter jobs by your qualification, preferred state, or job category. What are you looking for?`,
    suggestions: [
      'SSC CGL eligibility',
      'Banking jobs for graduates',
      'Show jobs in my state',
    ],
  },
  {
    keywords: ['grievance', 'complaint', 'problem', 'issue', 'report'],
    response: `I can guide you through filing a grievance effectively. Here's how GovConnect's AI-powered grievance system works:

1. **Describe your issue** – Write a detailed description of your complaint.
2. **AI Analysis** – Our AI automatically identifies the correct department and suggests the appropriate government portal.
3. **Draft Generation** – AI generates a formal complaint letter you can review and edit.
4. **Submit** – Submit directly to CPGRAMS, state portals, or print for offline submission.

**Key portals I support:**
• CPGRAMS (Central) – pgportal.gov.in
• Consumer INGRAM – consumerhelpline.gov.in
• CVC (Anti-corruption) – cvc.gov.in

Would you like to start filing a grievance now?`,
    suggestions: [
      'File a new grievance',
      'Track my existing complaint',
      'Which portal for electricity complaints?',
    ],
  },
  {
    keywords: ['document', 'aadhaar', 'pan', 'certificate', 'upload', 'kyc'],
    response: `Your document locker keeps all your important documents in one secure place. Here's what you can store:

**Identity Documents**
• Aadhaar Card, PAN Card, Voter ID, Passport, Driving Licence

**Academic Documents**
• Marksheets, Degree Certificates, Diplomas

**Income & Category**
• Income Certificate, Caste Certificate, EWS Certificate

**Address Proof**
• Ration Card, Electricity Bill, Bank Passbook

Once uploaded, our OCR system automatically extracts key data, making form-filling for schemes and jobs much faster. Would you like to upload a document now?`,
    suggestions: [
      'Upload my Aadhaar card',
      'What documents do I need for PMAY?',
      'Show my saved documents',
    ],
  },
  {
    keywords: ['eligib', 'qualify', 'criteria', 'who can apply', 'am i eligible'],
    response: `Eligibility matching is one of GovConnect's most powerful features! Here's how it works:

**Profile-Based Matching**
Your eligibility score is calculated using:
• Age and gender
• Category (General / OBC / SC / ST / EWS)
• Annual household income
• Education level and occupation
• State of residence

**Match Percentage**
Each scheme and job shows a match % based on your profile. A score of 80%+ means you're highly likely to qualify.

**To improve your match accuracy**, complete your profile under Settings → My Profile. The more information you provide, the more accurate your recommendations will be.

Would you like me to show your top recommended schemes right now?`,
    suggestions: [
      'Show my recommended schemes',
      'Update my profile',
      'Why is my match score low?',
    ],
  },
  {
    keywords: ['language', 'hindi', 'english', 'bhasha'],
    response: `GovConnect supports **English** and **Hindi** interfaces. You can switch languages anytime from the top navigation bar or from Settings → Preferences.

All scheme descriptions, job listings, and AI-generated content adapt to your selected language. Our AI assistant also understands queries in Hinglish (mixed Hindi-English).

Would you like me to switch the interface language for you?`,
    suggestions: [
      'Switch to Hindi',
      'Change notification language',
    ],
  },
  {
    keywords: ['notification', 'alert', 'remind', 'deadline'],
    response: `GovConnect sends you timely notifications so you never miss an important deadline:

• **Scheme Deadlines** – Alerts 7 days and 1 day before application closes
• **Job Application Deadlines** – Reminders for upcoming government job last dates
• **Document Expiry** – Alerts when your Aadhaar, PAN, or certificates are nearing expiry
• **Grievance Updates** – Status updates when your complaints are processed
• **New Schemes** – Alerts when new schemes matching your profile are launched

You can manage notification preferences under Settings → Notifications. Is there a specific alert you'd like to configure?`,
    suggestions: [
      'Enable scheme deadline alerts',
      'Turn off email notifications',
      'Show my recent notifications',
    ],
  },
  {
    keywords: ['profile', 'account', 'settings', 'update', 'personal'],
    response: `Your profile drives everything in GovConnect — the more complete it is, the better your scheme matches and job recommendations!

**Profile Sections:**
• Personal Information (name, DOB, gender, contact)
• Location (state, district)
• Socio-economic Details (category, income, family size)
• Education & Occupation
• Disability Status

**Profile Completion Tips:**
✅ Add your annual income for income-based scheme filtering
✅ Set your education level for job qualification matching
✅ Add your category (OBC/SC/ST/EWS) to unlock reserved quota schemes

Head to **Settings → My Profile** to update your information. Shall I guide you there?`,
    suggestions: [
      'Go to my profile',
      'How to update my income',
      'Change my state',
    ],
  },
];

const DEFAULT_RESPONSE: Omit<KeywordResponse, 'keywords'> = {
  response: `Hello! I'm **GovConnect Assistant**, your personal guide to government services. I can help you with:

🏛️ **Government Schemes** – Find schemes you're eligible for (PM MUDRA, PMAY, NSP, and 200+ more)
💼 **Job Opportunities** – Discover SSC, IBPS, Railways, and state government openings
📋 **Grievance Filing** – AI-powered complaint drafting and portal routing
📁 **Document Management** – Secure digital locker for all your important documents
🎯 **Eligibility Matching** – Profile-based recommendation engine

Just type your question in plain language! For example:
• "Show me schemes for farmers"
• "IBPS PO eligibility criteria"
• "How to file a complaint about electricity"

How can I assist you today?`,
  suggestions: [
    'Show recommended schemes',
    'Find government jobs',
    'File a grievance',
    'Upload a document',
  ],
};

// ─── Assistant Service ────────────────────────────────────────────────────────

/**
 * Send a message to the AI assistant and receive a contextual response.
 * Keyword matching simulates intelligent routing.
 *
 * Future: POST to API_ENDPOINTS.assistant.chat with full history
 */
export const sendMessage = async (
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _history: ChatMessage[],
): Promise<ChatMessage> => {
  await randomDelay(1000, 1500);

  const lower = message.toLowerCase();

  const matched = KEYWORD_RESPONSES.find((entry) =>
    entry.keywords.some((kw) => lower.includes(kw)),
  );

  const { response, suggestions } = matched ?? DEFAULT_RESPONSE;

  return {
    id: generateId(),
    role: 'assistant',
    content: response,
    timestamp: new Date().toISOString(),
    suggestions,
  };
};
