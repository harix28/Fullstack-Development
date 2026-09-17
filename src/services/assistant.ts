import type { ChatMessage } from '@/types';

// Helper delays
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = (min: number, max: number): Promise<void> =>
  delay(Math.floor(Math.random() * (max - min + 1)) + min);

const generateId = (): string =>
  `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export interface AssistantResponse {
  content: string;
  suggestions: string[];
  actionType?: 'navigate_grievance' | 'navigate_schemes' | 'navigate_jobs' | 'navigate_vault';
  actionLabel?: string;
  actionPayload?: any;
}

export const sendMessage = async (
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _history: ChatMessage[],
): Promise<ChatMessage & { actionType?: string; actionLabel?: string; actionPayload?: any }> => {
  await randomDelay(800, 1300);
  const lower = message.toLowerCase();

  // 1. Garbage / Sanitation grievance scenario (Section 20 of prompt)
  if (lower.includes('garbage') || lower.includes('trash') || lower.includes('waste') || lower.includes('cleanliness') || lower.includes('dustbin')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `This appears to be a **Municipal Sanitation Issue**.

**AI Classification Details:**
• **Category:** Municipal Services & Public Health
• **Suggested Department:** Municipal Corporation / Sanitation Department
• **Likely Resolution Window:** 48 – 72 hours under Swachh Bharat Urban Mission

Would you like me to generate an official complaint draft ready for review? You can edit the text and proceed directly to CPGRAMS or your local municipal grievance portal.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Create Grievance Draft',
        'Which portal handles garbage in Delhi?',
        'What photo proofs should I attach?'
      ],
      actionType: 'navigate_grievance',
      actionLabel: 'Create Grievance Draft',
      actionPayload: {
        title: 'Improper garbage disposal and overflowing bin',
        category: 'municipal',
        department: 'Municipal Corporation / Sanitation Department',
        description: 'Overflowing public garbage bin causing foul odor, health hazards, and blocking pedestrian movement. Requires urgent clearance and regular sanitation servicing.'
      }
    };
  }

  // 2. Street lights / electricity complaints
  if (lower.includes('street light') || lower.includes('streetlight') || lower.includes('light pole') || lower.includes('dark road')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `This issue relates to **Municipal Street Lighting & Public Infrastructure**.

**AI Classification:**
• **Category:** Municipal Corporation / Electrical Maintenance Wing
• **Priority:** Medium (Safety Concern)
• **Emergency Helpline:** Dial 1912 (Electricity Helpline) or lodge via local municipal portal.

I have prepared the groundwork for a formal complaint draft. Click below to review and customize it with your exact street name and pole number.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Create Grievance Draft',
        'Helpline number 1912 details',
        'Track my existing complaint'
      ],
      actionType: 'navigate_grievance',
      actionLabel: 'Create Grievance Draft',
      actionPayload: {
        title: 'Non-functional street lights in residential sector',
        category: 'municipal',
        department: 'Municipal Corporation / Electrical Wing',
        description: 'Street lights on the main road have been completely non-functional for past 5 days, causing severe safety hazards for commuters and pedestrians at night.'
      }
    };
  }

  // 3. Scholarship / Education documents query (Section 19 of prompt)
  if (lower.includes('scholarship') || lower.includes('student') || lower.includes('nsp') || lower.includes('mca') || lower.includes('college fee')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `Based on your profile as an **MCA / Postgraduate student**, you are eligible to explore several central and state scholarships on the National Scholarship Portal (NSP):

**Key Required Documents for Scholarship Applications:**
1. **Aadhaar Card** (Identity & Bank seeding)
2. **Previous Marksheets** (Graduation Degree / 12th Certificate)
3. **Current Year College Fee Receipt & Bonafide Certificate**
4. **Income Certificate** (Issued by Tehsildar / Revenue Department)
5. **Bank Passbook** (Aadhaar linked for DBT disbursement)
6. **Domicile / Residence Certificate**

Your GovConnect Document Vault already has your **Aadhaar, Marksheets, and Degree Certificates** ready for reuse!`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Explore Education Schemes',
        'Upload Income Certificate',
        'Check NSP deadlines'
      ],
      actionType: 'navigate_schemes',
      actionLabel: 'View Education Schemes'
    };
  }

  // 4. Which schemes am I eligible for? (Section 19 of prompt)
  if (lower.includes('eligible') || lower.includes('which scheme') || lower.includes('my scheme') || lower.includes('recommend scheme')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `Based on your stored citizen profile (**Age 23, Education: MCA, Location: Delhi, Skills: Python/SQL**), here are your highest-probability scheme matches:

1. 🌟 **National Scholarship Portal (NSP - PG Merit Scheme)** — **94% Match**
   • Direct benefit scholarship up to ₹20,000/year for higher technical education.

2. 🚀 **PM MUDRA Yojana (Shishu & Kishore)** — **88% Match**
   • Collateral-free business loans up to ₹10 Lakh for software and tech freelancing ventures.

3. 💻 **Digital India Internship Scheme (MeitY)** — **92% Match**
   • Stipend of ₹10,000/month with central government IT ministries.

All matches are computed through GovConnect's profile engine. Final criteria must be verified on official government portals.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Open Schemes Explorer',
        'Check PMAY eligibility',
        'How to apply for MUDRA loan?'
      ],
      actionType: 'navigate_schemes',
      actionLabel: 'Explore All Matches'
    };
  }

  // 5. How can I apply for a government job? (Section 19 of prompt)
  if (lower.includes('job') || lower.includes('vacancy') || lower.includes('ssc') || lower.includes('recruitment') || lower.includes('sarkari')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `Applying for government jobs follows a structured 4-step process:

1. **Profile & Eligibility Verification:**
   • Check age limits (usually 18–30 for general, with age relaxations for OBC/SC/ST/EWS).
   • Ensure educational criteria match (e.g. Graduation/MCA for SSC CGL or IBPS PO).

2. **One-Time Registration (OTR):**
   • SSC, UPSC, and State PSCs require OTR registration with photo and signature.

3. **Application Submission:**
   • Fill out exam preferences, upload caste/category documents from your vault, and pay fees via Bharatkosh / UPI.

4. **Admit Card & Exam Stage:**
   • Track CBT Tier 1 and Tier 2 examination schedules.

We found **3 active recruitments** matching your technical and graduate profile!`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'View Recommended Jobs',
        'SSC CGL Vacancies',
        'Banking Jobs 2026'
      ],
      actionType: 'navigate_jobs',
      actionLabel: 'View Matched Jobs'
    };
  }

  // 6. Explain this scheme in simple language
  if (lower.includes('explain') || lower.includes('simple language') || lower.includes('what is mudra') || lower.includes('pmay')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `Here is a plain-language summary of **Pradhan Mantri MUDRA Yojana (PMMY)**:

• **What is it?**
  A central government scheme that helps anyone start or expand a small business without needing to pledge property or collateral to the bank.

• **How much loan can you get?**
  - **Shishu:** Loans up to ₹50,000 (ideal for tiny shops, freelance kits)
  - **Kishore:** Loans from ₹50,001 to ₹5,00,000 (for machines, small offices)
  - **Tarun:** Loans from ₹5,00,001 to ₹10,00,000 (for business expansion)

• **Who can apply?**
  Any Indian citizen with a feasible business or self-employment idea. No collateral needed.

• **Where to apply?**
  At any commercial bank, RRB, or Small Finance Bank, or online via UdyamiMitra.gov.in.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Check my eligibility for MUDRA',
        'Documents needed for loan',
        'Nearby Bank branches'
      ],
      actionType: 'navigate_schemes',
      actionLabel: 'View MUDRA Scheme'
    };
  }

  // Default intelligent assistant response
  return {
    id: generateId(),
    role: 'assistant',
    content: `Hello! I am **Ask Sarkar**, your GovConnect AI assistant for citizen services.

I can guide you through:
🏛️ **Scheme Discovery & Eligibility** (NSP, PM MUDRA, PMAY, PM-JAY)
💼 **Job Openings & Requirements** (SSC, IBPS, Railways, PSUs)
📋 **Grievance Classification & Letter Drafting** (CPGRAMS, Municipal, Electricity)
📁 **Required Documents Checklist** for official applications

What would you like to explore today?`,
    timestamp: new Date().toISOString(),
    suggestions: [
      'Which schemes am I eligible for?',
      'What documents do I need for a scholarship?',
      'How can I apply for a government job?',
      'I want to complain about garbage.'
    ]
  };
};
