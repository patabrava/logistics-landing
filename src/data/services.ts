// Services Data for LogisticsCo Landing Page
import type { Service } from '@/types/content';

export const services: Service[] = [
  {
    id: 'road_transport',
    title: 'Straßentransport',
    description: 'Zuverlässige Straßentransporte in ganz Europa mit modernster Fahrzeugflotte',
    bullets: [
      'Deutschland & EU · Express & Same-Day',
      'Temperaturgeführte Transporte',
      'ADR-Gefahrguttransporte (auf Anfrage)'
    ],
    icon: 'truck',
    ctaText: 'Angebot anfordern',
    isHighlighted: false
  },
  {
    id: 'air_freight',
    title: 'Luftfracht',
    description: 'Schnelle Luftfrachtlösungen für zeitkritische Sendungen weltweit',
    bullets: [
      'Express-Luftfracht weltweit',
      'Pharma & Healthcare Spezialtransporte',
      'Konsolidierungsservice verfügbar'
    ],
    icon: 'plane',
    ctaText: 'Angebot anfordern',
    isHighlighted: true
  },
  {
    id: 'sea_freight',
    title: 'Seefracht',
    description: 'Kosteneffiziente Seefrachtlösungen für Volumenladungen',
    bullets: [
      'FCL & LCL Containerverladung',
      'Import/Export Abwicklung',
      'Verzollungsservice inklusive'
    ],
    icon: 'ship',
    ctaText: 'Angebot anfordern',
    isHighlighted: false
  },
  {
    id: 'warehousing',
    title: 'Lagerlösungen',
    description: 'Flexible Lagerlösungen mit modernen Logistikzentren',
    bullets: [
      'Kurz- & Langzeitlagerung',
      'Pick & Pack Services',
      'Bestandsmanagement & WMS'
    ],
    icon: 'warehouse',
    ctaText: 'Angebot anfordern',
    isHighlighted: false
  },
  {
    id: 'last_mile',
    title: 'Letzte Meile',
    description: 'Zustellservice für die finale Lieferung zum Endkunden',
    bullets: [
      'Same-Day & Next-Day Delivery',
      'Terminierte Zustellung',
      'Retourenmanagement'
    ],
    icon: 'package',
    ctaText: 'Angebot anfordern',
    isHighlighted: false
  }
];
