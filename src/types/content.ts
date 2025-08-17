// Content Type Definitions for LogisticsCo Landing Page

export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  ctaText: string;
  isHighlighted?: boolean;
}

export interface Industry {
  id: string;
  title: string;
  icon: string;
  needs: string[];
}

export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  isOpenByDefault?: boolean;
}

export interface TrustBadge {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface HowItWorksStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface FleetItem {
  id: string;
  type: string;
  title: string;
  bullets: string[];
  icon: string;
}

export interface CoverageHub {
  id: string;
  name: string;
  coordinates?: {
    x: number;
    y: number;
  };
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  alt: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  icon?: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  trustBadges: TrustBadge[];
  backgroundImage?: string;
}

export interface AboutContent {
  stats: {
    founded: string;
    employees: string;
    locations: string;
  };
  usps: string[];
}
