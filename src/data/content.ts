// Main Content Data for LogisticsCo Landing Page - Aggregates all content
import type { 
  HeroContent, 
  TrustBadge, 
  HowItWorksStep, 
  FleetItem, 
  CoverageHub, 
  ClientLogo, 
  Statistic, 
  AboutContent 
} from '@/types/content';

import { services } from './services';
import { industries } from './industries';
import { faqs } from './faq';
import { testimonials } from './testimonials';

// Hero Section Content
export const heroContent: HeroContent = {
  headline: 'ZUVERLÄSSIGE LOGISTIK IN GANZ EUROPA',
  subheadline: 'Schnell, sicher, planbar. Ihr Partner für professionelle Transportlösungen von Deutschland bis in die EU.',
  primaryCTA: 'Angebot anfordern',
  secondaryCTA: '+49 30 12345678',
  trustBadges: [
    { id: 'iso9001', name: 'ISO 9001', icon: '/images/badges/iso-9001.svg' },
    { id: 'aeo', name: 'AEO Zertifiziert', icon: '/images/badges/aeo.svg' }
  ],
  backgroundImage: '/images/hero-truck.jpg'
};

// Trust Bar Content
export const clientLogos: ClientLogo[] = [
  { id: 'bmw', name: 'BMW', logo: '/images/clients/bmw.svg', alt: 'BMW Logo' },
  { id: 'siemens', name: 'Siemens', logo: '/images/clients/siemens.svg', alt: 'Siemens Logo' },
  { id: 'bosch', name: 'Bosch', logo: '/images/clients/bosch.svg', alt: 'Bosch Logo' },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '/images/clients/mercedes.svg', alt: 'Mercedes-Benz Logo' },
  { id: 'sap', name: 'SAP', logo: '/images/clients/sap.svg', alt: 'SAP Logo' },
  { id: 'volkswagen', name: 'Volkswagen', logo: '/images/clients/volkswagen.svg', alt: 'Volkswagen Logo' }
];

export const trustStatistics: Statistic[] = [
  { id: 'ontime', value: '98%', label: 'pünktlich', icon: 'clock' },
  { id: 'clients', value: '500+', label: 'zufriedene Kunden', icon: 'users' },
  { id: 'countries', value: '25+', label: 'EU-Länder', icon: 'map' }
];

// How It Works Steps
export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 'request',
    step: 1,
    title: 'Anfrage stellen',
    description: 'Senden Sie uns Ihre Transportanfrage',
    icon: 'send'
  },
  {
    id: 'quote',
    step: 2,
    title: 'Angebot erhalten',
    description: 'Binnen weniger Stunden erhalten Sie unser Angebot',
    icon: 'file-text'
  },
  {
    id: 'pickup',
    step: 3,
    title: 'Abholung',
    description: 'Wir holen Ihre Sendung termingerecht ab',
    icon: 'truck'
  },
  {
    id: 'delivery',
    step: 4,
    title: 'Zustellung',
    description: 'Sichere Lieferung zum gewünschten Termin',
    icon: 'package-check'
  }
];

// Fleet Information
export const fleetItems: FleetItem[] = [
  {
    id: 'trucks',
    type: 'Lkw-Flotte',
    title: 'Moderne Lkw-Flotte',
    bullets: [
      '7,5t bis 40t Nutzlast',
      'Euro 6 Abgasnorm',
      'GPS-Tracking Standard'
    ],
    icon: 'truck'
  },
  {
    id: 'trailers',
    type: 'Spezialanhänger',
    title: 'Spezialanhänger',
    bullets: [
      'Kühltransporter (-25°C bis +25°C)',
      'Plane, Koffer, Pritsche',
      'ADR für Gefahrgut'
    ],
    icon: 'container'
  },
  {
    id: 'equipment',
    type: 'Zusatzausrüstung',
    title: 'Zusatzausrüstung',
    bullets: [
      'Ladekran & Hubwagen',
      'Ladungssicherung',
      'Temperaturüberwachung'
    ],
    icon: 'wrench'
  }
];

// Coverage Areas
export const coverageHubs: CoverageHub[] = [
  { id: 'berlin', name: 'Berlin', coordinates: { x: 52.5, y: 13.4 } },
  { id: 'hamburg', name: 'Hamburg', coordinates: { x: 53.5, y: 10.0 } },
  { id: 'munich', name: 'München', coordinates: { x: 48.1, y: 11.6 } },
  { id: 'cologne', name: 'Köln', coordinates: { x: 50.9, y: 6.9 } },
  { id: 'leipzig', name: 'Leipzig', coordinates: { x: 51.3, y: 12.4 } }
];

// Certifications
export const certifications: TrustBadge[] = [
  { id: 'iso9001', name: 'ISO 9001:2015', icon: '/images/certs/iso-9001.svg', description: 'Qualitätsmanagement' },
  { id: 'aeo', name: 'AEO-F', icon: '/images/certs/aeo.svg', description: 'Zugelassener Wirtschaftsbeteiligter' },
  { id: 'tapa', name: 'TAPA FSR-A', icon: '/images/certs/tapa.svg', description: 'Sicherheitsstandard' },
  { id: 'gdp', name: 'GDP', icon: '/images/certs/gdp.svg', description: 'Good Distribution Practice' }
];

// About Content
export const aboutContent: AboutContent = {
  stats: {
    founded: '1995',
    employees: '150+',
    locations: '5'
  },
  usps: [
    'Über 25 Jahre Erfahrung in der Logistik',
    'Zertifizierte Qualitäts- und Sicherheitsstandards',
    'Persönlicher Ansprechpartner für jeden Kunden'
  ]
};

// Aggregate all content for easy import
export const allContent = {
  hero: heroContent,
  services,
  industries,
  howItWorks: howItWorksSteps,
  fleet: fleetItems,
  coverage: coverageHubs,
  testimonials,
  certifications,
  faq: faqs,
  about: aboutContent,
  trustBar: {
    logos: clientLogos,
    statistics: trustStatistics
  }
};

// Individual exports for specific imports
export { services, industries, faqs, testimonials };
