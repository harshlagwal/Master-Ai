export interface DomainTrack {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  price: string;
  amountNum: number;
  sessions: string;
  idealFor: string;
  highlights: string[];
}

export interface WorkshopTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverable: string;
  tools: string[];
  icon: string;
}

export interface DayJourneyItem {
  dayNumber: string;
  dayName: string;
  time: string;
  title: string;
  domainTag?: string;
  subtitle?: string;
  topics?: string[];
  tools?: string[];
  outcome: string;
  callout?: string;
  disclaimer?: string;
  parts?: {
    partTitle: string;
    description?: string;
    points: string[];
    importantNote?: string;
  }[];
  roadmap?: string[];
  finalStatement?: string;
}

export interface BuildProofItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tag: string;
}

export interface ToolCategory {
  category: string;
  description?: string;
  tools: string[];
}

export interface AudienceProfile {
  id: string;
  title: string;
  description: string;
  category?: 'all' | 'non-tech' | 'creative' | 'tech' | 'career';
  relevantDays?: string;
  benefit?: string;
}

export interface WhyFeature {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
