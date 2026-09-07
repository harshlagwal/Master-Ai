import {
  DomainTrack,
  WorkshopTopic,
  DayJourneyItem,
  BuildProofItem,
  ToolCategory,
  AudienceProfile,
  WhyFeature,
  FAQItem,
} from './types';

export const BRAND = {
  name: "MASTER AI",
  mentor: "Harsh Lagwal",
  role: "AI Educator • Freelancer • Digital Creator",
  coreMessage: "7-Day Live Masterclass: Master 9 High-Income AI Skills from Scratch",
  price: "₹89",
  priceDescription: "₹89 for Complete 7-Day Live Access",
  priceFull: "₹89 Total (No Extra Passes • All 9 Skills)",
  batchSize: "Strictly 20 Students / Daily Batch",
};

// UPI Payment Configuration for 100% Free / Zero-Commission payments
export const UPI_CONFIG = {
  upiId: "golulagwal890-2@oksbi",
  payeeName: "Harsh Lagwal",
  amount: "89",
  currency: "INR",
  note: "MASTER AI 7-Day Workshop Registration",
  getUpiUri: (amount: string = "89", workshopName: string = "Workshop") =>
    `upi://pay?pa=golulagwal890-2@oksbi&pn=${encodeURIComponent("Harsh Lagwal")}&am=${amount}&cu=INR&tn=${encodeURIComponent(`MASTER AI ${workshopName}`)}`,
  getQrCodeUrl: (amount: string = "89", workshopName: string = "Workshop") => {
    const upi = `upi://pay?pa=golulagwal890-2@oksbi&pn=${encodeURIComponent("Harsh Lagwal")}&am=${amount}&cu=INR&tn=${encodeURIComponent(`MASTER AI ${workshopName}`)}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=8&data=${encodeURIComponent(upi)}`;
  },
};

// 9 Core Skills Taught in the Workshop (Strictly Professional, No Emojis)
export const WORKSHOP_TOPICS: WorkshopTopic[] = [
  {
    id: "productivity",
    title: "AI Tools & Productivity",
    category: "Workflow Acceleration",
    description: "Master advanced prompt engineering, multi-turn reasoning, structured context memory, and 10x personal productivity.",
    deliverable: "Personalized Daily AI Operating System & 100+ Prompt Swipe File",
    tools: ["ChatGPT Plus", "Claude 3.5 Sonnet", "Notion AI"],
    icon: "Zap",
  },
  {
    id: "coding",
    title: "AI + Coding",
    category: "Software Development",
    description: "Write clean code, understand project architectures, and debug errors in real time using cutting-edge AI coding assistants.",
    deliverable: "Working Software Application & Verifiable GitHub Repository",
    tools: ["Cursor IDE", "GitHub Copilot", "Replit Agent"],
    icon: "Code2",
  },
  {
    id: "design",
    title: "AI Design & Content Creation",
    category: "Visual Production",
    description: "Produce high-impact presentation decks, marketing creatives, social content, and video scripts with professional polish.",
    deliverable: "Complete High-Resolution Design Asset Kit & Pitch Deck",
    tools: ["Midjourney", "Canva Magic Studio", "Gamma App"],
    icon: "Palette",
  },
  {
    id: "study-research",
    title: "AI for Study & Research",
    category: "Academic Systems",
    description: "Extract cited insights from research papers, synthesize textbooks, and prepare structured revision notes in minutes.",
    deliverable: "Academic Research Synthesis Engine & Exam Revision System",
    tools: ["Perplexity AI", "NotebookLM", "Consensus"],
    icon: "BookOpen",
  },
  {
    id: "hackathons",
    title: "Hackathons",
    category: "Competitive Building",
    description: "Find high-impact hackathons, formulate winning project ideas, build working MVPs in 24 hours, and deliver compelling judge demos.",
    deliverable: "24-Hour Hackathon MVP Architecture & Live Judge Pitch Deck",
    tools: ["v0.dev", "Bolt.new", "Supabase"],
    icon: "Trophy",
  },
  {
    id: "career",
    title: "Internships & Career",
    category: "Career Acceleration",
    description: "Create ATS-proof resumes, run AI mock interview simulations, and send high-response cold emails to hiring leads.",
    deliverable: "ATS-Optimized Resume & Executive Cold Email Outreach Templates",
    tools: ["Teal HQ", "LinkedIn AI", "Mock Interview AI"],
    icon: "Briefcase",
  },
  {
    id: "freelancing",
    title: "Freelancing",
    category: "Independent Income",
    description: "Position your service profile, write high-conversion proposals using AI, structure pricing rate cards, and secure global clients.",
    deliverable: "Complete Freelance Client Acquisition Funnel & Proposal Templates",
    tools: ["Upwork", "Loom", "Stripe"],
    icon: "CircleDollarSign",
  },
  {
    id: "automation",
    title: "AI Automation",
    category: "Systems & Workflows",
    description: "Automate repetitive daily workflows, email processing, data synchronizations, and customer alerts without coding backend servers.",
    deliverable: "3 Production-Ready Automated Business Workflows",
    tools: ["Make.com", "Zapier", "Webhooks"],
    icon: "Cpu",
  },
  {
    id: "web-apps",
    title: "Website & App Building",
    category: "Full-Stack Deployment",
    description: "Turn natural language instructions into functional, responsive web applications and landing pages hosted live online.",
    deliverable: "Live Deployed Web Application with Public Shareable Domain",
    tools: ["Vercel", "Tailwind CSS", "React"],
    icon: "Globe",
  },
];

// Domain Tracks: 7-Day Live Masterclass and SIH 2-Hour Intensive Masterclass
export const DOMAIN_TRACKS: DomainTrack[] = [
  {
    id: "demo-free",
    name: "30-Minute Free Live Demo Class (Only 2 Days)",
    shortName: "Free Demo (Only 2 Days)",
    badge: "100% Free • Available for Next 2 Days Only",
    price: "₹0 Free",
    amountNum: 0,
    sessions: "30-Minute Live Demo on Google Meet (Next 2 Days)",
    idealFor: "Anyone curious about AI tools, students & early beginners",
    highlights: [
      "100% Free Entry • Limited to Next 2 Days Only",
      "Live Interactive Demo on Google Meet",
      "Live Breakdown of ChatGPT, Claude 3.5 & Cursor IDE",
      "Live Q&A Session with Harsh Lagwal",
      "Instant Google Meet Join Link via WhatsApp & Email",
    ],
  },
  {
    id: "week-pass-299",
    name: "1-Week Live Masterclass Pass (All 9 Skills)",
    shortName: "1-Week Pass (₹299)",
    badge: "Daily Night 9:00 PM • Google Meet",
    price: "₹299",
    amountNum: 299,
    sessions: "Daily Night 9:00 PM – 10:30 PM (Google Meet)",
    idealFor: "Students, College Freshers, Coders, Creators & Freelancers",
    highlights: [
      "Daily 9:00 PM Live Intensive Training on Google Meet",
      "Hands-on Building across All 9 High-Income AI Skills",
      "Skill India & upGrad Free Certificate Claim Roadmap",
      "IIT Kanpur Campus Ambassador & Internship Guidance",
      "100+ Production Prompts, Code Repos & ATS Resume Kits",
    ],
  },
  {
    id: "flash-pass-60",
    name: "Student Flash Grant • Complete 7-Day Live Masterclass",
    shortName: "Student Flash Pass (₹60)",
    badge: "Special Launch Grant • ₹60 Only",
    price: "₹60",
    amountNum: 60,
    sessions: "All 7 Days (9:00 PM – 10:30 PM IST)",
    idealFor: "College Freshers, Students & Early Tech Aspirants",
    highlights: [
      "Special ₹60 Launch Price (Regular ₹89)",
      "Full 7-Day Live Interactive Zoom Training (All 9 Skills)",
      "Skill India & upGrad Free Certificate Claim Roadmap",
      "IIT Kanpur Campus Ambassador & Internship Guidance",
      "Ready-to-use ATS Resume & AI Prompt Swipe Files",
    ],
  },
  {
    id: "master-pass",
    name: "Complete 7-Day Live Masterclass (All 9 Skills)",
    shortName: "7-Day All 9 Skills (₹89)",
    badge: "Strictly 20 Students / Daily Batch",
    price: "₹89",
    amountNum: 89,
    sessions: "All 7 Days (9:00 PM – 10:30 PM IST)",
    idealFor: "College Freshers, Students, Aspiring Coders, Freelancers & Job Seekers",
    highlights: [
      "Full Access to all 9 Core AI & Career Skills",
      "Live Interactive Zoom Sessions with Harsh Lagwal",
      "Build Real Projects & Hackathon-Ready MVPs",
      "ATS Resume, Freelance Client Playbook & Templates",
    ],
  },
  {
    id: "sih-masterclass",
    name: "Smart India Hackathon (SIH) 2-Hour Project Sprint",
    shortName: "SIH 2-Hr Masterclass (₹199)",
    badge: "Special 2-Hour Live Masterclass",
    price: "₹199",
    amountNum: 199,
    sessions: "2-Hour Live Intensive Masterclass on Zoom + Q&A",
    idealFor: "SIH Teams, First-time Hackathon Builders, Tech & Non-Tech College Students",
    highlights: [
      "SIH Problem Statement Selection & Detailing Blueprint",
      "Live Working MVP Prototype Building using Modern AI Tools",
      "SIH-Approved Winning PPT Pitch Deck Template (.pptx)",
      "Jury Pitch Mastery: How to Speak, Present & Defend Questions",
    ],
  },
];

// Smart India Hackathon (SIH) Masterclass Complete Data
export const SIH_WORKSHOP_DATA = {
  id: "sih",
  badge: "SPECIAL INTENSIVE EDITION • 2-HOUR LIVE SPRINT",
  headline: "Smart India Hackathon (SIH): From Idea to Winning Project",
  subheadline:
    "Want to know how to build a winning SIH project? In this 2-hour live masterclass, master comprehensive detailing, AI-powered prototype building, winning presentation architecture, and confident jury defense.",
  price: "₹199",
  originalPrice: "₹1,999",
  duration: "2 Hours Live Intensive Session",
  format: "Live on Zoom + Instant Doubt Resolution",
  pillars: [
    {
      number: "01",
      title: "Comprehensive Detailing & PS Selection",
      tagline: "Problem Statement Decoding & Feasibility",
      description:
        "Learn how to dissect official SIH problem statements to 10x your selection probability. Master category selection, evaluate technical constraints, and follow the exact blueprint to clear your college's internal screening round.",
      keyPoints: [
        "Software vs. Hardware PS: Which one to pick and why",
        "Jury evaluation rubrics and scoring weightage breakdown",
        "Feasibility & novelty matrix (what judges look for immediately)",
        "Step-by-step checklist to clear the college internal hackathon round",
      ],
      icon: "Target",
    },
    {
      number: "02",
      title: "AI-Powered Project Build (Live MVP)",
      tagline: "Zero to Working Prototype with Modern AI",
      description:
        "No prior coding barriers! Build a working, full-stack prototype in under 2 hours using Cursor, Bolt.new, v0, and modern AI tools — complete with responsive UI, integrated database, and functional core logic.",
      keyPoints: [
        "Convert plain English prompts into functional web apps and dashboards",
        "Rapid, bug-free development with modern AI coding IDEs (Cursor & Bolt)",
        "Integrate Supabase backend and authentication in under 15 minutes",
        "Deploy live working prototypes on Vercel with a shareable public URL",
      ],
      icon: "Code2",
    },
    {
      number: "03",
      title: "SIH-Approved Winning Presentation",
      tagline: "High-Impact Pitch Deck Architecture",
      description:
        "Structure a high-converting presentation deck that stands out to evaluators. Master the exact slide-by-slide sequence, AI-generated architecture diagrams, novelty differentiation, and commercial viability highlights.",
      keyPoints: [
        "Official SIH presentation guidelines & recommended slide sequence",
        "System architecture & data flow diagrams generated with AI tools",
        "Novelty factor breakdown & existing solution comparison matrix",
        "Visualizing scalability, technical stack, and social impact metrics",
      ],
      icon: "Presentation",
    },
    {
      number: "04",
      title: "Jury Pitching & Viva Defense",
      tagline: "Stage Confidence, Presentation & Q&A Mastery",
      description:
        "Even the best project fails if not presented effectively. Master the 3-minute elevator pitch, handle tough jury counter-questions with calm confidence, and communicate with authority.",
      keyPoints: [
        "3-Minute elevator pitch blueprint (Problem → Solution → Live Demo → Impact)",
        "Jury cross-examination: How to answer tricky technical questions calmly",
        "Team coordination: Defining roles on who speaks when for maximum impact",
        "Live demo disaster recovery: Fail-safe backup strategies if WiFi drops",
      ],
      icon: "Mic",
    },
  ],
  deliverables: [
    {
      title: "Winning SIH PPT Template",
      desc: "Ready-to-use professional slide deck (.pptx & Canva) designed to meet official SIH evaluation standards.",
      icon: "FileCheck",
    },
    {
      title: "AI Hackathon Prompt Swipe File",
      desc: "50+ tested prompts to generate prototypes, architectures, and database schemas in minutes.",
      icon: "Sparkles",
    },
    {
      title: "Jury Q&A & Pitch Script Sheet",
      desc: "Word-for-word 3-minute pitch template and response guide for the 15 most common jury questions.",
      icon: "MessageSquare",
    },
    {
      title: "Full 2-Hour Session Recording",
      desc: "Re-watch the entire live walkthrough with your team whenever needed before your hackathon submission.",
      icon: "Video",
    },
  ],
  timingInfo: {
    durationText: "2 Hours Live Interactive Workshop",
    timeText: "Weekend Special Live Stream • Zoom Link via WhatsApp & Email",
    languageText: "English (Clear, Practical & Beginner-Friendly)",
    seatsText: "Limited to 30 Teams / Students for Direct Mentoring",
  },
};


// Replace with external checkout link if desired. When empty, opens the sleek built-in enrollment modal.
export const PAYMENT_URL: string = "";

// Formspree endpoint for immediate email alerts on demo bookings and registrations
export const FORMSPREE_ENDPOINT: string = "https://formspree.io/f/xppzyzzk";

// Google Form URL for post-payment screenshot & registration confirmation
export const GOOGLE_FORM_URL: string =
  "https://docs.google.com/forms/d/e/1FAIpQLSf67m-nROsXjchqIOJNTtdPPEKflG6jvd-K01ZIwV3-gtyOzQ/viewform";

export async function submitLeadToFormspree(lead: {
  fullName: string;
  email: string;
  phone: string;
  trackName: string;
  category: string;
  ticketId: string;
  utrNumber?: string;
  additionalNote?: string;
}): Promise<boolean> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        "Full Name": lead.fullName,
        "Email Address": lead.email,
        "Phone Number": lead.phone,
        "Registered Program": lead.trackName,
        "Category / Type": lead.category,
        "Ticket ID": lead.ticketId,
        "UTR / Ref": lead.utrNumber || (lead.category.includes("DEMO") ? "N/A (Free Demo Class)" : "Pending Verification"),
        "Timestamp IST": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        "Lead Status": "New Student Lead Recorded",
        "Notes": lead.additionalNote || "Submitted from MASTER AI Website",
      }),
    });
    return response.ok;
  } catch (err) {
    console.warn("Formspree lead notification dispatch notice:", err);
    return false;
  }
}

// Social links configuration
export const SOCIAL_LINKS = {
  instagram: "#",
  linkedin: "https://www.linkedin.com/in/harshlagwal/",
  whatsappCommunity: "https://chat.whatsapp.com/K6Mq4sj1F9RJWe9NLV6WNk",
  contactUrl: "https://harsh-builds-five.vercel.app",
  contactEmail: "https://harsh-builds-five.vercel.app",
};

export const HERO_DATA = {
  blurLabelTitle: "Hey there, meet MASTER AI,",
  blurLabelSubtitle: "Harsh Lagwal's 7-Day AI Masterclass",
  universalBadge: "7-Day Live Masterclass • Strictly 20 Students/Batch • All 9 Skills Included",
  typewriterText:
    "Master 9 in-demand AI skills in 7 live evening sessions. Learn prompt engineering, AI coding, visual design, automations, hackathon building, and freelancing to accelerate your career.",
  microCopy: "Strictly 20 seats per daily batch for live mentoring and doubt resolution • ₹89 all-inclusive",
  actionPills: [
    { label: "7-Day Journey", href: "#journey" },
    { label: "9 Core Skills", href: "#modules" },
    { label: "Meet Harsh", href: "#mentor" },
    { label: "Reserve Seat (₹89)", href: "#pricing" },
  ],
  outlinePill: "Enroll for ₹89 →",
};

export const BIG_IDEA_DATA = {
  headline: "AI Is Just The Beginning.",
  body: "MASTER AI is not designed to be another list of random AI tools.\n\nWhether you come from arts, commerce, engineering, design, or are exploring fresh career paths — AI is a universal multiplier. We help you learn faster, create better work, build real projects, participate in hackathons, discover free learning opportunities and approach internships with a stronger profile.",
  statement: "LEARN → BUILD → SHOW → APPLY",
};

export const JOURNEY_DAYS: DayJourneyItem[] = [
  {
    dayNumber: "DAY 01",
    dayName: "MONDAY",
    time: "9:00 PM IST",
    title: "AI STARTER → AI POWER USER",
    domainTag: "FOR ALL FIELDS • FOUNDATIONS & PROMPTING",
    topics: [
      "What AI actually is & modern model foundations",
      "ChatGPT, Gemini, Claude and modern AI tools",
      "Prompt Engineering fundamentals: Roles, Context, Tasks, Constraints",
      "How to eliminate vague responses & get precision outputs",
      "Practical student, non-tech and career use cases for daily speed",
    ],
    tools: ["ChatGPT", "Gemini", "Claude"],
    outcome:
      "Understand how to communicate with AI and use it as a practical, high-leverage assistant regardless of your background.",
  },
  {
    dayNumber: "DAY 02",
    dayName: "TUESDAY",
    time: "9:00 PM IST",
    title: "CREATE WITH AI",
    domainTag: "CREATIVE, DESIGN, MEDIA & MARKETING",
    topics: [
      "AI Presentations (pitch decks & university seminar decks)",
      "AI Photos, Posters, and Brand Visuals",
      "AI Videos, Reels & Faceless Content",
      "AI Thumbnails with high visual contrast",
      "AI Handwritten Notes generator from textbook PDFs",
      "End-to-end creative workflows without expensive software",
    ],
    tools: ["Canva AI", "Gamma", "AI Image Tools", "AI Video Tools"],
    outcome:
      "Turn ideas into professional-looking digital assets and creative deliverables much faster without needing graphic design degrees.",
  },
  {
    dayNumber: "DAY 03",
    dayName: "WEDNESDAY",
    time: "9:00 PM IST",
    title: "RESEARCH + STUDY WITH AI",
    domainTag: "ACADEMICS, STUDENTS & DEEP RESEARCH",
    topics: [
      "Perplexity Pro & real-time cited web research",
      "Google NotebookLM: turning dense PDFs into study audio & guides",
      "Deep document summarization & critical synthesis",
      "Research verification & source cross-examination",
      "Understanding AI hallucinations & guarding accuracy",
      "Building reliable, stress-free study systems for exams & papers",
    ],
    tools: ["Perplexity", "NotebookLM", "Consensus"],
    outcome:
      "Learn how to research, understand, verify and organize complex academic and domain information with AI.",
  },
  {
    dayNumber: "DAY 04",
    dayName: "THURSDAY",
    time: "9:00 PM IST",
    title: "BUILD WITH AI",
    domainTag: "DEVELOPERS, BUILDERS & NO-CODE CREATORS",
    topics: [
      "Modern AI Coding IDEs & environments (Replit & Cursor)",
      "AI-assisted creation: turning natural language into functional code",
      "Building live responsive websites & web applications without prior coding",
      "Brainstorming viable software & tool ideas from scratch",
      "GitHub basics & version control fundamentals",
      "Publishing your working prototype to the web live",
    ],
    tools: ["Replit", "Cursor", "GitHub", "Modern AI IDEs"],
    outcome:
      "Move from 'I don't know coding' toward actually building useful, deployable digital projects using plain English instructions.",
  },
  {
    dayNumber: "DAY 05",
    dayName: "FRIDAY",
    time: "9:00 PM IST",
    title: "HACKATHON → BUILD TO WIN",
    domainTag: "HACKATHONS, INNOVATION & TEAM MVPS",
    topics: [
      "What a hackathon actually is and where to discover global & Indian hackathons",
      "How to participate & strategically assemble a complementary team (tech + pitch + design)",
      "Selecting the right problem statement & identifying standout ideas",
      "Accelerating MVP development with AI frameworks",
      "Structuring high-impact pitch decks & live project presentations",
      "What jury members & judges actually look for in winning submissions",
      "Practical execution habits that maximize your placement potential",
    ],
    callout: "DON'T JUST PARTICIPATE. LEARN HOW TO BUILD TO WIN.",
    disclaimer:
      "Note: Winning a hackathon depends on multiple external evaluation factors and cannot be guaranteed. This session provides practical strategy, preparation workflows, and execution guidance.",
    outcome:
      "Master the strategic preparation, rapid prototyping, and presentation frameworks needed to compete seriously.",
  },
  {
    dayNumber: "DAY 06",
    dayName: "SATURDAY",
    time: "9:00 PM IST",
    title: "FREE CERTIFICATIONS + INTERNSHIPS",
    domainTag: "CAREER CREDENTIALS & INTERNSHIP ROADMAPS",
    parts: [
      {
        partTitle: "PART A — FREE CERTIFICATIONS",
        description:
          "Discover legitimate free learning and certification opportunities from globally recognized tech organizations across both tech and non-tech tracks.",
        points: [
          "Recognized programs from Google, Microsoft, IBM, Cisco & premier platforms",
          "Where to discover authentic opportunities without paywalls",
          "Eligibility requirements and registration walkthrough",
          "Curating a credible learning path that employers respect",
          "Adding verifiable credentials to your resume and LinkedIn",
        ],
        importantNote:
          "IMPORTANT: MASTER AI does NOT issue these external certificates. You will learn how to locate, qualify for, and earn legitimate FREE industry-recognized certificates independently.",
      },
      {
        partTitle: "PART B — INTERNSHIPS ROADMAP",
        description:
          "Systematic blueprint to uncover and apply for internship roles across startups and tech firms.",
        points: [
          "Where to search beyond crowded public job boards",
          "Paid, unpaid, remote, and company internship programs for tech, marketing, and operations",
          "How to identify relevant positions matching your skill level",
          "How to build proof-of-work projects that demand attention",
          "Refining your resume and LinkedIn for recruiter visibility",
          "Professional outreach strategies to founders and hiring managers",
        ],
        importantNote:
          "IMPORTANT: Internships, job placements, and stipends are never guaranteed. This session provides practical roadmaps, search strategies, and outreach methods.",
      },
    ],
    outcome:
      "Equip yourself with a verified roadmap to earn respected credentials and pursue internships proactively.",
  },
  {
    dayNumber: "DAY 07",
    dayName: "SUNDAY",
    time: "9:00 PM IST",
    title: "BUILD YOUR AI CAREER",
    domainTag: "PERSONAL BRANDING, FREELANCING & ROADMAP",
    topics: [
      "Connecting all pieces into a coherent digital presence",
      "LinkedIn profile architecture & personal branding for freshers in any field",
      "GitHub / Behance / Portfolio profile showcase with meaningful proof of work",
      "Portfolio creation and public proof of work",
      "Resume refinement highlighting AI workflows & projects",
      "Freelancing fundamentals: pitching initial clients & pricing services at ₹5k-₹20k",
      "Internship application systems & follow-up etiquette",
      "Your personalized Next 30-Day Execution Roadmap",
    ],
    roadmap: [
      "LEARN AI",
      "BUILD PROJECTS",
      "DISCOVER FREE CERTIFICATIONS",
      "JOIN HACKATHONS",
      "BUILD PORTFOLIO",
      "GITHUB + LINKEDIN",
      "APPLY FOR INTERNSHIPS",
      "FREELANCE / JOB OPPORTUNITIES",
    ],
    finalStatement:
      "You don't need to know everything before you start. You need the right roadmap.",
    outcome:
      "Walk away with a concrete, actionable 30-day roadmap and the confidence to showcase your proof of work in your chosen field.",
  },
];

export const BUILD_PROOF_ITEMS: BuildProofItem[] = [
  {
    id: "ai-presentation",
    title: "AI Presentation",
    category: "Communication",
    tag: "Pitch Decks & Seminars",
    description:
      "Structured slide decks complete with custom typography, clean outlines, and visual diagrams generated in minutes.",
  },
  {
    id: "handwritten-notes",
    title: "AI Handwritten Notes",
    category: "Academic",
    tag: "Textbook to Ink",
    description:
      "Digital textbook PDFs converted into realistic, human-style handwritten notes with margin rules and paper textures.",
  },
  {
    id: "ai-photo",
    title: "AI Photo",
    category: "Visuals",
    tag: "Studio Lighting",
    description:
      "Cinematic portraits and product photography staged with customized aperture, focal depth, and commercial styling.",
  },
  {
    id: "ai-video",
    title: "AI Video",
    category: "Media",
    tag: "Short-Form Production",
    description:
      "Engaging vertical reels with synthetic narration, auto-aligned captions, and cinematic visual transitions.",
  },
  {
    id: "ai-poster",
    title: "AI Poster",
    category: "Design",
    tag: "Event & Print Ready",
    description:
      "Editorial event posters and brand artwork created with high-resolution visual layouts and typographic hierarchy.",
  },
  {
    id: "ai-website",
    title: "AI Website",
    category: "Engineering",
    tag: "Web Experience",
    description:
      "Functional, responsive web pages and landing pages authored through natural language instructions.",
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot",
    category: "Intelligence",
    tag: "Custom Knowledge",
    description:
      "Specialized AI assistants indexed on custom documents, notes, or course syllabi to answer queries instantly.",
  },
  {
    id: "ai-research-assistant",
    title: "AI Research Assistant",
    category: "Knowledge",
    tag: "Synthesized Citations",
    description:
      "Multi-source academic summaries and audio briefs that digest dense research papers without losing key nuances.",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    category: "Productivity",
    tag: "Self-Running Workflows",
    description:
      "Connected background tasks that process spreadsheets, draft email responses, and automate repetitive busywork.",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Career",
    tag: "Proof of Work",
    description:
      "A personalized developer or creator showcase linking your projects, GitHub repositories, and live demos.",
  },
];

export const TOOLKIT_CATEGORIES: ToolCategory[] = [
  {
    category: "THINK",
    description: "Foundational reasoning and prompt-driven intellect.",
    tools: ["ChatGPT", "Gemini", "Claude"],
  },
  {
    category: "RESEARCH",
    description: "Deep investigation, cited retrieval, and document synthesis.",
    tools: ["Perplexity", "NotebookLM"],
  },
  {
    category: "CREATE",
    description: "Rapid production of visual, presentation, and video assets.",
    tools: ["Canva AI", "Gamma", "AI Image Tools", "AI Video Tools"],
  },
  {
    category: "BUILD",
    description: "Translating natural language into deployable software.",
    tools: ["Replit", "Cursor", "Modern AI Coding Tools"],
  },
  {
    category: "AUTOMATE",
    description: "Autonomous agents, background flows, and system connectors.",
    tools: ["AI Agents", "Automation Platforms", "AI Workflows"],
  },
];

export const AUDIENCE_PROFILES: AudienceProfile[] = [
  {
    id: "students",
    title: "Students & Non-Tech",
    category: "non-tech",
    relevantDays: "Days 1, 2, 3, 6, 7",
    benefit: "Academics, AI Notes & Free Certifications",
    description:
      "Whether you're in B.Com, BBA, BA, or school: streamline research, generate realistic handwritten notes, create pitch decks, and build an impressive profile without writing code.",
  },
  {
    id: "freshers",
    title: "College Freshers",
    category: "career",
    relevantDays: "Days 1, 4, 6, 7",
    benefit: "Proof of Work & Internship Discovery",
    description:
      "Stand out in a competitive job market by building live digital projects, earning legitimate recognized credentials, and presenting verifiable proof of work.",
  },
  {
    id: "freelancers",
    title: "Freelancers & Solopreneurs",
    category: "career",
    relevantDays: "Days 1, 2, 4, 7",
    benefit: "Speed Up Client Deliverables 5x",
    description:
      "Deliver client work 5x faster, expand service offerings with AI tools, build landing pages for local businesses, and pitch higher-value engagements.",
  },
  {
    id: "creators",
    title: "Content Creators & Marketers",
    category: "creative",
    relevantDays: "Days 1, 2, 3, 7",
    benefit: "Faceless Videos, Reels & Thumbnails",
    description:
      "Produce scripts, reels, posters, thumbnails, and visual assets consistently without costly production gear or agency software subscriptions.",
  },
  {
    id: "job-seekers",
    title: "Job Seekers (Any Stream)",
    category: "career",
    relevantDays: "Days 3, 6, 7",
    benefit: "ATS Resumes, Portfolios & Outreach",
    description:
      "Craft ATS-optimized resumes, build functional portfolio websites, and prepare systematically for modern workplace expectations using AI leverage.",
  },
  {
    id: "aspiring-builders",
    title: "Coders & Aspiring Builders",
    category: "tech",
    relevantDays: "Days 1, 4, 5, 7",
    benefit: "AI IDEs, Cursor & Hackathon MVPs",
    description:
      "Overcome the blank editor barrier. Turn napkin ideas into deployable web applications, explore Replit/Cursor, and learn hackathon-winning architectures.",
  },
];

export const MENTOR_DATA = {
  name: "Harsh Lagwal",
  role: "IITian • AI Systems Educator • Full-Stack Builder",
  image: "/assets/mentor-harsh.png",
  tagline: "Bridging the gap between theory and high-impact AI execution",
  quoteBadge: "Discipline Creates Freedom",
  highlights: [
    { label: "IITian Pedigree", value: "Elite Systems & Engineering Rigor" },
    { label: "Personalized", value: "Strictly 20 Students / Batch" },
    { label: "Zero Slides", value: "100% Live Practical MVP Building" },
    { label: "Hackathon Strategy", value: "SIH & National Competitions" },
  ],
  stats: [
    { number: "9+", label: "Core AI Skills" },
    { number: "100%", label: "Live Code & MVPs" },
    { number: "20", label: "Max Batch Limit" },
    { number: "1-on-1", label: "Doubt Resolution" },
  ],
  credentials: [
    "IIT Kanpur Campus Ambassador Network & Internship Guidance",
    "Smart India Hackathon (SIH) Winning Architecture & Pitch Defense",
    "Production Modern AI Stack (Cursor, Bolt, Claude 3.5, Supabase)",
    "Democratizing High-Income Tech for All Students & Non-Tech Streams",
  ],
  mainCopy: [
    "I've spent years breaking down agentic AI tools, coding architectures, and creative workflows into practical, repeatable blueprints that anyone can master.",
    "MASTER AI was built on a core IITian philosophy: Real education shouldn't be gated by branch barriers or trapped behind ₹5,000 corporate paywalls. AI is the universal multiplier.",
    "Whether you're from arts, engineering, commerce, or freelancing — the 7-day live masterclass gives you the hands-on clarity to build functional MVPs, earn recognized credentials, and showcase verified proof of work.",
  ],
  statement: "DISCIPLINE CREATES FREEDOM // LEARN • BUILD • SHOW • APPLY",
};

export const WHY_MASTER_AI: WhyFeature[] = [
  {
    number: "01",
    title: "Universal Across All Fields",
    description:
      "Tech, non-tech, design, or commerce: AI is a leverage tool for everyone, not just programmers.",
  },
  {
    number: "02",
    title: "Learn AI Practically",
    description:
      "Not theory-heavy slides. Hands-on workflows you can actually use immediately the same evening.",
  },
  {
    number: "03",
    title: "Build Tangible Projects",
    description:
      "Move from passive prompting to generating pitch decks, websites, notes, visuals, and MVPs.",
  },
  {
    number: "04",
    title: "Understand Hackathons",
    description:
      "Learn how to discover, form teams, choose ideas, and build functional prototypes that stand out.",
  },
  {
    number: "05",
    title: "Discover Free Opportunities",
    description:
      "Learn how to find legitimate free learning and certification opportunities from top tech firms.",
  },
  {
    number: "06",
    title: "Understand Internships",
    description:
      "Learn how to search, prepare and apply for paid, remote, and company opportunities strategically.",
  },
  {
    number: "07",
    title: "Build Your Digital Proof",
    description:
      "Understand GitHub, LinkedIn, portfolio design, and public proof of work in your domain.",
  },
  {
    number: "08",
    title: "Get A Clear 30-Day Roadmap",
    description:
      "Leave with a clear, step-by-step direction for what to learn, build, and pursue next.",
  },
];

export const PRICING_SECTION_DATA = {
  headline: "Full 7-Day Live Masterclass. Just ₹89.",
  statement: "9 IN-DEMAND SKILLS. STRICTLY 20 STUDENTS PER BATCH. ₹89 TOTAL.",
  copy: [
    "Most platforms charge ₹3,000 to ₹5,000 for generic recorded courses with zero support.",
    "MASTER AI gives you 7 days of direct, live interactive training covering all 9 industry skills: AI productivity, AI coding, design, academic research, hackathons, ATS resumes, freelancing, automation, and full-stack deployment.",
    "Every daily batch is capped at strictly 20 students so every question is answered live by Harsh Lagwal.",
    "One transparent fee of ₹89. No upsells, no split domain passes, and no hidden subscriptions.",
  ],
  comparison: {
    traditional: "Expensive recorded bootcamps: ₹2,000 to ₹5,000 with recorded videos and no mentoring",
    masterAi: "₹89 Live Masterclass: Strictly 20 students per batch with live hands-on builds",
  },
  inclusions: [
    "7 Days Live Interactive Zoom Sessions (9:00 PM IST)",
    "All 9 In-Demand AI & Career Skills Included",
    "Strict 20-Student Batch Size for Personalized Mentoring",
    "Complete 100+ Prompt Swipe File & Automation Templates",
    "ATS Resume Templates & Freelance Client Pitch Playbook",
    "Zero Commission Direct UPI Payment (Instant Verification)",
  ],
  cta: "RESERVE TODAY'S SEAT — ₹89",
};

export const WORKSHOP_DETAILS = [
  { label: "Format", value: "Live Evening Masterclass on Zoom" },
  { label: "Time", value: "9:00 PM – 10:30 PM IST Daily" },
  { label: "Batch Limit", value: "Strictly 20 Students / Daily Batch" },
  { label: "Total Fee", value: "₹89 (One-Time • All 9 Skills Included)" },
  { label: "Curriculum", value: "9 Industry Modules (Prompting to Deployment)" },
  { label: "Language", value: "Hindi + English (Clear, Practical Mix)" },
  { label: "Prerequisites", value: "None (Beginner to Builder)" },
  { label: "Payment", value: "Direct UPI (Zero Extra Fees)" },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is MASTER AI?",
    answer:
      "MASTER AI is a live online workshop designed by Harsh Lagwal to help beginners, students, and freshers master practical AI workflows, build working projects, prepare for hackathons, discover legitimate free certifications, and approach internships strategically.",
  },
  {
    question: "How does the ₹89 fee work? Can I pick any domain?",
    answer:
      "Yes! You pick any 1 domain track of your choice — Non-Tech & Commerce, Creative & Design, Tech & Coding, or Career & Internships — and pay only ₹89 for that track. You don't have to pay for tracks you don't need.",
  },
  {
    question: "Can I access all domains together?",
    answer:
      "If you want full access to all 4 domains across the entire curriculum, you can select the Complete All-Domains Master Pass for ₹199. However, if you only need training in your specific branch, you can choose that single domain track for just ₹89.",
  },
  {
    question: "I am from a non-tech / commerce / arts background. Which track should I pick?",
    answer:
      "The 'Non-Tech, Commerce & Academic Research Track' (₹89) is built specifically for you. It covers zero-coding workflows: deep research with Perplexity and NotebookLM, realistic handwritten notes, pitch decks, free certifications, and productivity tools.",
  },
  {
    question: "Who can join?",
    answer:
      "Anyone interested in AI — including college students (any stream), freshers, freelancers, content creators, job seekers, and aspiring builders who want a practical roadmap instead of theoretical lectures.",
  },
  {
    question: "Do I need prior coding knowledge?",
    answer:
      "No. Even for the Tech Track, the workshop starts from fundamental principles, showing how modern AI tools and IDEs (like Replit and Cursor) allow beginners to build prototypes using natural language prompts without prior software engineering experience.",
  },
  {
    question: "Is this workshop beginner friendly?",
    answer:
      "Yes, completely. Every session is conducted in a clear, accessible blend of Hindi and English with step-by-step demonstrations and real-world examples.",
  },
  {
    question: "What will I learn in 7 days?",
    answer:
      "Over seven evenings at 9:00 PM IST, you will cover: Day 1 (AI Foundations & Prompting for all streams), Day 2 (Creative Production: Presentations, Notes, Visuals & Video), Day 3 (Research & Deep Study Systems), Day 4 (Building Websites & Projects with AI IDEs), Day 5 (Hackathon Strategy & MVP Building), Day 6 (Discovering Free Legitimate Certifications & Internship Roadmaps), and Day 7 (Career Blueprint: LinkedIn, Portfolios & Freelancing).",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "MASTER AI does not issue a workshop certificate. The workshop includes guidance on how to discover legitimate FREE certification opportunities from recognized organizations and platforms (such as Google, Microsoft, IBM, and Cisco).",
  },
  {
    question: "Can I find internships after this?",
    answer:
      "The workshop provides practical guidance on finding and applying for internship opportunities. Internships are not guaranteed.",
  },
  {
    question: "Will you teach hackathons?",
    answer:
      "Yes. One complete session is dedicated to understanding hackathons, finding them, selecting ideas, building MVPs and presenting projects.",
  },
  {
    question: "What tools will we use?",
    answer:
      "Tools may include ChatGPT, Gemini, Claude, Perplexity, NotebookLM, Canva AI, Gamma, Replit, Cursor and other relevant AI tools. The exact toolkit may evolve as better tools become available.",
  },
];

// Interactive Live Workshop Popup Data (Free 30-Min Demo & ₹299 1-Week Pass on Google Meet)
export const WORKSHOP_POPUP_DATA = {
  badge: "SPECIAL INVITATION • LIVE ON GOOGLE MEET",
  headline: "Choose Your AI Learning Path",
  subheadline:
    "Join the free 30-minute interactive live demo or unlock the complete 1-Week Live Masterclass to master all 9 high-income AI skills with Harsh Lagwal.",
  demoCard: {
    id: "demo-free",
    badge: "100% FREE • ONLY 2 DAYS",
    title: "30-Min Live Demo (Only 2 Days)",
    format: "Google Meet • Interactive Live Class",
    timing: "30-Min Session • Next 2 Days Only",
    price: "₹0",
    priceLabel: "Free Access",
    perks: [
      "Special free entry available for the next 2 days only",
      "Live breakdown of ChatGPT, Claude 3.5 & Cursor IDE",
      "Live interactive Q&A with mentor Harsh Lagwal",
      "Instant Google Meet invite link sent via WhatsApp & Email",
    ],
    ctaText: "Join Free Demo Class (Only 2 Days)",
  },
  weekPassCard: {
    id: "week-pass-299",
    badge: "⭐ BEST VALUE • 88% OFF",
    title: "1-Week Workshop Pass",
    format: "Daily Night 9:00 PM Live on Google Meet",
    timing: "Full 7 Days • Daily 9:00 PM – 10:30 PM",
    price: "₹299",
    originalPrice: "₹2,499",
    priceLabel: "Complete 1-Week Access",
    perks: [
      "Daily 9:00 PM Live Class on Google Meet (1 Full Week)",
      "Hands-on building across All 9 High-Income AI Skills",
      "Skill India & upGrad Free Certificate Claim Blueprint",
      "IIT Kanpur Campus Ambassador & Internship Roadmap",
      "100+ Production Prompts, Project Repos & ATS Resume Kits",
    ],
    ctaText: "Claim ₹299 Week Pass",
  },
  skills: [
    "AI Tools & Prompts",
    "AI Coding (Cursor)",
    "AI Graphic Design",
    "AI Video & Avatars",
    "AI Voice Synthesis",
    "AI Automation (Make)",
    "AI Presentations",
    "Deep AI Research",
    "Freelance Playbook",
  ],
};

// Launch Offer & Flash Promotion Data (₹60 Grant)
export const PROMO_OFFER_DATA = {
  badge: "LIMITED STUDENT FLASH GRANT",
  headline: "Master AI in Just ₹60",
  subheadline: "7-Day Live Masterclass • Skill India & upGrad Free Certificate Guide • IIT Kanpur Internship Prep",
  originalPrice: "₹499",
  offerPrice: "₹60",
  spotsLeft: "Limited to 50 Students",
  perks: [
    {
      title: "7-Day Live Zoom Masterclass",
      desc: "Learn 9 high-income AI tools, coding assistants, and automated workflows.",
    },
    {
      title: "Skill India & upGrad Free Certificates",
      desc: "Step-by-step roadmap to enroll, qualify, and claim verified credentials at ₹0.",
    },
    {
      title: "IIT Kanpur Internship & Ambassador Prep",
      desc: "Eligibility criteria, SOP templates, student leadership roles & LOR guidance.",
    },
  ],
  trackId: "flash-pass-60",
};

// Verified Credentials & Elite Opportunities Data
export const OPPORTUNITIES_DATA = {
  sectionTag: "10 // CREDENTIALS & LEADERSHIP OPPORTUNITIES",
  headline: "Free Recognized Certifications & Premier College Internships",
  subheadline:
    "We cut through internet spam to give you the verified, legitimate steps to earn national certifications and premier institute student ambassadorships.",
  cards: [
    {
      id: "skill-india-upgrad",
      tag: "100% FREE CREDENTIALS",
      title: "Skill India & upGrad Free Certificate Roadmap",
      subtitle: "Government & Leading EdTech Recognized Digital Badges",
      badgeColor: "emerald",
      overview:
        "Top platforms like Skill India Digital (MSDE) and upGrad provide complimentary certification modules. We give you the complete step-by-step framework to qualify and claim them.",
      steps: [
        {
          stepNumber: "01",
          title: "Build Hands-on Project",
          desc: "Complete your practical prompt engineering or web prototype during Day 1-4 of Master AI.",
        },
        {
          stepNumber: "02",
          title: "Access Partner Portals",
          desc: "Direct navigation to verified Skill India & upGrad free competency portals without hidden payment traps.",
        },
        {
          stepNumber: "03",
          title: "Pass Verification & Download",
          desc: "Apply your newly learned Master AI concepts to pass module quizzes and download your shareable digital certificate.",
        },
      ],
      highlights: [
        "No credit card or paid subscription needed",
        "Add verifiable badge to LinkedIn & Resume",
        "Recognized across corporate & government recruitments",
      ],
      ctaText: "Enroll & Learn Claim Steps",
    },
    {
      id: "iit-kanpur-ambassador",
      tag: "PREMIER INSTITUTE CALL",
      title: "IIT Kanpur Campus Ambassador & Internship Blueprint",
      subtitle: "Student Leadership & Direct Institute Exposure",
      badgeColor: "amber",
      overview:
        "Every year IIT Kanpur opens prestigious student initiatives, tech fest ambassadorships, and winter/summer research calls. Learn how to craft a winning application that gets shortlisted.",
      steps: [
        {
          stepNumber: "01",
          title: "Campus Ambassador Selection",
          desc: "Represent your college for IIT Kanpur tech initiatives. We share exact SOP templates & application prompts.",
        },
        {
          stepNumber: "02",
          title: "Exclusive Perks & Stipend Access",
          desc: "Earn official Certificates of Appreciation, free entry passes to national hackathons, and performance rewards.",
        },
        {
          stepNumber: "03",
          title: "Winter / Summer Internship Pipeline",
          desc: "Leverage ambassador credentials and your AI project repository to apply for student research and developer internships.",
        },
      ],
      highlights: [
        "Official Certificate & Letter of Recommendation (LOR)",
        "Direct networking with IIT Kanpur professors & tech leads",
        "Dramatically boosts fresher resume shortlisting",
      ],
      ctaText: "Get Application Guide",
    },
    {
      id: "global-free-badges",
      tag: "GLOBAL INDUSTRY STANDARDS",
      title: "Google, Microsoft, IBM & Cisco Free Badges",
      subtitle: "Global Tech Industry Digital Credentials",
      badgeColor: "blue",
      overview:
        "Why pay thousands for ordinary certificates when global tech giants offer completely free verified pathways? Learn how to unlock them on Day 6.",
      steps: [
        {
          stepNumber: "01",
          title: "Google Cloud Skills Boost",
          desc: "Claim student tier access to complete interactive labs and earn official Google skill badges.",
        },
        {
          stepNumber: "02",
          title: "Microsoft Learn & Cisco Academy",
          desc: "Unlock free foundational certifications in Cloud, AI, and Cybersecurity directly from Microsoft and Cisco.",
        },
        {
          stepNumber: "03",
          title: "Resume & ATS Optimization",
          desc: "Format your earned credentials into ATS-friendly keywords that get you noticed by tech recruiters.",
        },
      ],
      highlights: [
        "100% Free & Globally Recognized",
        "Shareable Credly and LinkedIn verified URLs",
        "Hands-on practice without expensive software subscriptions",
      ],
      ctaText: "View Day 6 Curriculum",
    },
  ],
};

