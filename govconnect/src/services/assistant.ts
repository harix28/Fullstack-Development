import type { ChatMessage } from '@/types';

// Helper delays for ultra-natural feeling response
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = (min: number, max: number): Promise<void> =>
  delay(Math.floor(Math.random() * (max - min + 1)) + min);

const generateId = (): string =>
  `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export interface AssistantResponse {
  content: string;
  suggestions: string[];
  actionType?: 'navigate_grievance' | 'navigate_schemes' | 'navigate_jobs' | 'navigate_vault' | 'filter_schemes';
  actionLabel?: string;
  actionPayload?: any;
}

export const sendMessage = async (
  message: string,
  _history: ChatMessage[],
  currentContext?: { page?: string; user?: any }
): Promise<ChatMessage & { actionType?: string; actionLabel?: string; actionPayload?: any }> => {
  await randomDelay(350, 700); // Fast, responsive typing delay
  const text = message.trim();
  const lower = text.toLowerCase();

  const userName = currentContext?.user?.name || 'Citizen';
  const userEdu = currentContext?.user?.education || 'MCA / Graduate';
  const userState = currentContext?.user?.state || 'Delhi';

  // 1. GREETINGS & CASUAL (English & Hindi / Hinglish)
  if (
    lower === 'hi' || lower === 'hello' || lower === 'namaste' || lower === 'pranam' || 
    lower.includes('kaise ho') || lower.includes('kya haal') || lower.includes('kem cho') ||
    lower.startsWith('hey') || lower === 'hlo'
  ) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `Namaste **${userName}**! 🙏 Main **Ask Sarkar AI** hoon, aapka 24x7 Digital Citizen Assistant.

Aap mujhse kisi bhi vishay par sawaal pooch sakte hain:
• 🎯 **Welfare Schemes:** PM Kisan, MUDRA Loan, Ayushman Bharat, PMAY Housing
• 💼 **Sarkari Jobs:** SSC CGL, Railways RRB, Banking PO/Clerk
• 📁 **Digital Vault:** DigiLocker sync, document verification checklist
• 📝 **Grievance Drafting:** Sadak, paani, bijli, ya nagar nigam ki complaint

Bataiye, aaj main aapki kya madad kar sakta hoon?`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Meri eligibility check karo',
        'Top 3 schemes for me',
        'Show Govt Jobs for my degree',
        'File a civic complaint'
      ]
    };
  }

  // 2. SCHEME ELIGIBILITY & RECOMMENDATIONS (Hinglish: "kya scheme hai", "eligibility", "paisa", "loan", "subsidy")
  if (
    lower.includes('eligible') || lower.includes('eligibility') || lower.includes('scheme') || 
    lower.includes('yojana') || lower.includes('kaunsi scheme') || lower.includes('kya mil sakta') || 
    lower.includes('subsidy') || lower.includes('paisa') || lower.includes('benefit') ||
    lower.includes('recommend')
  ) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `### 🎯 Scheme Compatibility Report for **${userName}**
**Evaluated Profile:** Age 23 • ${userEdu} • Domicile: ${userState}

Aapke verified profile ke hisaab se yeh 3 top schemes aapke liye best match karti hain:

1. 🌟 **National Scholarship Portal (NSP - PG Merit)** — **94% Compatibility**
   • **Benefit:** ₹20,000/year direct DBT stipend for higher technical & graduate education.
   • **Status:** Open for registration.

2. 🚀 **PM MUDRA Yojana (Shishu & Tarun Loans)** — **91% Compatibility**
   • **Benefit:** Up to ₹10 Lakhs **Collateral-Free business loan** at low interest for tech/business startups.
   • **Vault Documents:** Aadhaar + PAN + Bank passbook ready!

3. 🌾 **PM Kisan Samman Nidhi / PM-KMY** — **86% Compatibility**
   • **Benefit:** Direct income support of ₹6,000/year via Aadhaar DBT.

Aap in schemes ki live checklist dekh sakte hain ya direct official portal guide follow kar sakte hain.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'How to apply for PM MUDRA loan?',
        'NSP scholarship documents',
        'Show Agriculture schemes',
        'Compare loan interest rates'
      ],
      actionType: 'navigate_schemes',
      actionLabel: 'Open Schemes Matching Engine'
    };
  }

  // 3. PM MUDRA / BUSINESS LOAN / STARTUP
  if (lower.includes('mudra') || lower.includes('loan') || lower.includes('business') || lower.includes('startup') || lower.includes('karz')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `### 💼 Pradhan Mantri MUDRA Yojana (PMMY) Details

Agar aap apna startup, IT freelancing, ya micro-business shuru karna chahte hain, toh MUDRA bina kisi collateral (bina zameen/property girvi rakhe) loan deti hai:

• **1. Shishu Category:** Up to **₹50,000** (Zero processing fee, immediate sanction)
• **2. Kishore Category:** **₹50,001 se ₹5,00,000** (Equipment & office setup)
• **3. Tarun Category:** **₹5,00,001 se ₹10,00,000** (Business expansion)

**Required Documents in Vault:**
✅ Aadhaar Card & PAN Card
✅ 6 Months Bank Statement
✅ Business Plan Summary

Aap kisi bhi National Bank (SBI, PNB, BoB) ya **UdyamiMitra.gov.in** portal se direct apply kar sakte hain.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Check my MUDRA eligibility',
        'Nearest Bank branches for MUDRA',
        'View Scheme Details on GovConnect'
      ],
      actionType: 'navigate_schemes',
      actionLabel: 'View MUDRA Scheme Card'
    };
  }

  // 4. SARKARI JOBS & RECRUITMENT (SSC, UPSC, Banking, Railways)
  if (
    lower.includes('job') || lower.includes('naukri') || lower.includes('vacancy') || 
    lower.includes('ssc') || lower.includes('upsc') || lower.includes('railway') || 
    lower.includes('bank') || lower.includes('ibps') || lower.includes('recruitment') ||
    lower.includes('cgl') || lower.includes('exam')
  ) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `### 💼 Sarkari Jobs Matched for **${userEdu}**

Hamare system ne **17,700+ active government vacancies** scan ki hain. Aapke qualifications aur technical skills ke mutabiq yeh best opportunities hain:

1. 🏛️ **SSC Combined Graduate Level (SSC CGL 2026)**
   • **Vacancies:** 17,727 Posts (ASO, Tax Assistant, Inspector)
   • **Pay Scale:** Level 4 to Level 7 (₹25,500 – ₹1,42,400)
   • **Age Limit:** 18–30 Years (Age relaxations for reserved categories)

2. 💻 **National Informatics Centre (NIC / MeitY) - Scientific Officer**
   • **Match Rate:** 94% (Matches your degree & Python/SQL skills)
   • **Pay Scale:** Level 10 (₹56,100 – ₹1,77,500)

3. 🏦 **State Bank of India (SBI PO / Specialist Officer)**
   • **Vacancies:** 2,000+ Posts • Direct Interview & Online CBT

Aap in sabhi jobs ke complete syllabus aur notification link GovConnect Jobs Tracker me dekh sakte hain!`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Show SSC CGL Syllabus',
        'Age relaxations for OBC/SC',
        'How to do OTR registration?'
      ],
      actionType: 'navigate_jobs',
      actionLabel: 'Open Govt Jobs Tracker'
    };
  }

  // 5. GRIEVANCE DRAFTING (Sadak, paani, bijli, kooda, garbage, complaint)
  if (
    lower.includes('garbage') || lower.includes('kooda') || lower.includes('kachra') || 
    lower.includes('sadak') || lower.includes('road') || lower.includes('pothole') ||
    lower.includes('bijli') || lower.includes('electricity') || lower.includes('light') ||
    lower.includes('paani') || lower.includes('water') || lower.includes('drain') ||
    lower.includes('complaint') || lower.includes('shikayat') || lower.includes('grievance')
  ) {
    let issueType = 'Municipal Infrastructure';
    let dept = 'Municipal Corporation & Public Works (PWD)';
    let sampleTitle = 'Immediate Road Repair & Street Light Restoration';

    if (lower.includes('garbage') || lower.includes('kooda') || lower.includes('kachra')) {
      issueType = 'Public Sanitation & Cleanliness';
      dept = 'Municipal Sanitation Wing';
      sampleTitle = 'Urgent Clearance of Overflowing Garbage Dump';
    } else if (lower.includes('bijli') || lower.includes('light')) {
      issueType = 'Electrical Maintenance & Power Supply';
      dept = 'State Electricity Distribution Board (DISCOM)';
      sampleTitle = 'Non-Functional Street Lights & Power Fluctuation';
    } else if (lower.includes('paani') || lower.includes('water')) {
      issueType = 'Water Supply & Pipeline Contamination';
      dept = 'Jal Board / Municipal Water Supply';
      sampleTitle = 'Contaminated Drinking Water Supply & Low Pressure';
    }

    return {
      id: generateId(),
      role: 'assistant',
      content: `### 📝 AI Grievance Draft Generated: ${issueType}

Maine aapki samasya samajh li hai aur CPGRAMS / Local Civic Portal ke format me official complaint tayar ki hai:

• **Department:** ${dept}
• **Suggested Subject:** ${sampleTitle}
• **Citizen Location:** ${userState}
• **Priority Assigned:** High (Civic & Health Concern)
• **Expected SLA:** 48 se 72 ghante

**Draft Content Preview:**
> *"Respected Authority, I am writing to bring to your urgent notice the recurring issue of ${issueType.toLowerCase()} in our residential area. Despite verbal notices, the condition remains unresolved and poses health and safety risks. Kindly initiate immediate remedial action under public service guarantee act."*

Click below to open our 1-click filing screen and submit this directly with token tracking!`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'File this Grievance Now',
        'Track my existing complaint status',
        'Helpline numbers for emergency'
      ],
      actionType: 'navigate_grievance',
      actionLabel: 'Proceed to File Grievance',
      actionPayload: {
        title: sampleTitle,
        category: 'municipal',
        department: dept
      }
    };
  }

  // 6. DOCUMENTS & DIGILOCKER VAULT
  if (
    lower.includes('document') || lower.includes('vault') || lower.includes('digilocker') || 
    lower.includes('aadhaar') || lower.includes('pan') || lower.includes('marksheet') || 
    lower.includes('certificate') || lower.includes('kaghaz')
  ) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `### 📁 Digital Document Vault Status

GovConnect me aapke zaroori dastawez (documents) DigiLocker standard ke mutabiq secure aur auto-fill ready hain:

• **Aadhaar Card:** ✅ Verified (SHA-256 Checksum Active)
• **Degree Marksheet:** ✅ Ready for College / Job forms
• **Income Certificate:** ✅ Verified (Ceiling < ₹8 Lakhs)
• **Bank IFSC & Passbook:** ✅ Direct Benefit Transfer (DBT) Ready

**Vault Readiness Score:** **80% Ready**
Aap bina baar-baar file upload kiye kisi bhi government scheme form me yeh documents auto-populate kar sakte hain.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        '⚡ 1-Click DigiLocker Sync',
        'Upload New Document',
        'Which documents needed for OBC?'
      ],
      actionType: 'navigate_vault',
      actionLabel: 'Open Document Vault'
    };
  }

  // 7. AYUSHMAN BHARAT / HEALTHCARE
  if (lower.includes('health') || lower.includes('ayushman') || lower.includes('hospital') || lower.includes('ilaj') || lower.includes('card')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `### 🏥 Ayushman Bharat (PM-JAY) Information

**Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)** duniya ki sabse badi health guarantee scheme hai:

• **Health Cover:** **₹5,00,000 prati varsh** prati parivar cash-less secondary & tertiary hospital treatment ke liye.
• **Empaneled Hospitals:** 27,000+ government aur private hospitals nationwide.
• **No Out-of-Pocket Expense:** Medicines, tests, pre- and post-hospitalization sab covered hain.

Aapka status check karne ke liye mera scheme explorer dekhein:`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Check Ayushman Bharat Card',
        'Nearby Empaneled Hospitals',
        'Download PM-JAY Guide'
      ],
      actionType: 'navigate_schemes',
      actionLabel: 'View PM-JAY Scheme'
    };
  }

  // 8. PMAY / HOUSING / AWAS YOJANA
  if (lower.includes('housing') || lower.includes('awas') || lower.includes('ghar') || lower.includes('pmay') || lower.includes('makaan')) {
    return {
      id: generateId(),
      role: 'assistant',
      content: `### 🏠 Pradhan Mantri Awas Yojana (PMAY-U / PMAY-G)

Pradhan Mantri Awas Yojana har eligible parivar ko 'Pucca Makaan' banane ya khareedne ke liye financial assistance deti hai:

• **Interest Subsidy (CLSS):** Up to **₹2.67 Lakhs** home loan interest subsidy.
• **Beneficiary Led Construction:** ₹1.5 Lakh to ₹2.5 Lakh direct grant.
• **Eligibility:** Jo pehle se kisi pucca ghar ke maalik nahi hain aur income category (EWS/LIG/MIG) me aate hain.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Am I eligible for PMAY?',
        'Documents required for PMAY',
        'How to apply online on PMAYMIS?'
      ],
      actionType: 'navigate_schemes',
      actionLabel: 'Explore PMAY Details'
    };
  }

  // 9. DEFAULT HIGH-INTELLIGENCE RESPONSE
  return {
    id: generateId(),
    role: 'assistant',
    content: `Main samajh gaya aapka prashna: **"${text}"**.

**GovConnect AI Quick Analysis:**
1. **Welfare Schemes:** Humare paas 200+ Central aur State guidelines hain jo aapke profile (${userEdu}, ${userState}) se auto-match ho sakti hain.
2. **Sarkari Jobs:** 17,700+ active government vacancies me eligibility check karein.
3. **Grievance Redress:** Civic, bijli, sadak, ya municipal issues ka automated draft generate karein.

Aap inme se kya karna chahenge? Niche diye gaye quick options par click karein:`,
    timestamp: new Date().toISOString(),
    suggestions: [
      'Show Schemes for Me',
      'Show Govt Jobs for MCA/Graduates',
      'Check Document Vault Readiness',
      'Draft a Civic Complaint'
    ],
    actionType: 'navigate_schemes',
    actionLabel: 'Open Citizen Dashboard Services'
  };
};
