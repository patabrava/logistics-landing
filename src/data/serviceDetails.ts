export type SupportedLanguage = 'de' | 'en';

export const SERVICE_DETAIL_IDS = [
  'integrated-truckload',
  'air-freight',
  'sea-freight',
  'packaging',
  'oldtimers',
  'digitalization',
] as const;

export type ServiceDetailId = typeof SERVICE_DETAIL_IDS[number];

export interface ServiceDetail {
  id: ServiceDetailId;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  images: string[];
  ctaText: string;
}

const buildServicesForLanguage = (
  language: SupportedLanguage,
): Record<ServiceDetailId, ServiceDetail> => {
  const isGerman = language === 'de';

  return {
    'integrated-truckload': {
      id: 'integrated-truckload',
      title: isGerman
        ? 'Integrierte Truckload Services'
        : 'Integrated Truckload Services',
      description: isGerman
        ? 'FTL- und LTL-Transporte aus einer Hand'
        : 'FTL and LTL transport from a single source',
      longDescription: isGerman
        ? 'Ganzheitliche Truckload-Lösungen für Komplett- und Teilladungen. Unser europäisches Netzwerk kombiniert flexible Kapazitäten, Expressoptionen und Premium-Service für Ihren Straßentransport.'
        : 'Comprehensive truckload solutions for full and partial loads. Our European network combines flexible capacity, express options, and premium service for your road transport needs.',
      features: isGerman
        ? [
            'Nationale und internationale Transporte',
            'Integrierte FTL & LTL Lösungen',
            'Flexible Zeitplanung und Expressoptionen',
            'ADR und hochwertige Güter auf Anfrage',
            'Sendungsverfolgung in Echtzeit',
          ]
        : [
            'Domestic and international transport',
            'Integrated FTL & LTL solutions',
            'Flexible scheduling and express options',
            'ADR and high-value goods on request',
            'Real-time shipment tracking',
          ],
      images: [
        '/Camilo/Integrierte Truckload Services/Full Truckload/IMG_1725.jpeg',
        '/Camilo/Integrierte Truckload Services/Full Truckload/IMG_1728.jpeg',
        '/Camilo/Integrierte Truckload Services/Full Truckload/IMG_1733.jpeg',
        '/Camilo/Integrierte Truckload Services/Full Truckload/IMG_1743.jpeg',
        '/Camilo/Integrierte Truckload Services/Less than truckload/IMG_1827.jpeg',
      ],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
    },
    'air-freight': {
      id: 'air-freight',
      title: isGerman ? 'Luftfracht Import und Export' : 'Air Freight Import and Export',
      description: isGerman
        ? 'Schnelle Luftfracht mit globalen Partnern'
        : 'Fast air freight with global partners',
      longDescription: isGerman
        ? 'Wir bieten unseren Kunden Lufttransportdienstleistungen auf Basis der direkten Zusammenarbeit mit renommierten Fluggesellschaften und in Zusammenarbeit mit einem Netzwerk zuverlässiger Agenten weltweit.'
        : 'We offer our customers air transport services based on direct cooperation with renowned airlines and in collaboration with a network of reliable agents worldwide.',
      features: isGerman
        ? [
            'Direkte Zusammenarbeit mit Fluggesellschaften',
            'Netzwerk zuverlässiger Agenten',
            'Express und Standard Luftfracht',
            'Zollabwicklung',
            'Temperaturkontrollierte Transporte',
          ]
        : [
            'Direct cooperation with airlines',
            'Network of reliable agents',
            'Express and standard air freight',
            'Customs clearance',
            'Temperature-controlled transport',
          ],
      images: [
        '/Camilo/Luftfracht/8c0c3342-5158-4c01-8bbe-d75492416c02.jpeg',
        '/Camilo/Luftfracht/efe48e1b-38d3-4b41-8e60-981b1ea9fc77.jpeg',
        '/Camilo/Luftfracht/f5ea605c-01e1-4b2e-a9c9-30a818225b3b.jpeg',
      ],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
    },
    'sea-freight': {
      id: 'sea-freight',
      title: isGerman ? 'Seefracht Import und Export' : 'Sea Freight Import and Export',
      description: isGerman
        ? 'Zuverlässige Seefrachtlösungen weltweit'
        : 'Reliable sea freight solutions worldwide',
      longDescription: isGerman
        ? 'Umfassende Seefrachtlösungen für alle Containergrößen und Schwergut. Von Full Container Load (FCL) bis Less Container Load (LCL) - wir bieten maßgeschneiderte Lösungen für Ihre globalen Transportbedürfnisse.'
        : 'Comprehensive sea freight solutions for all container sizes and heavy cargo. From Full Container Load (FCL) to Less Container Load (LCL) - we offer tailored solutions for your global transport needs.',
      features: isGerman
        ? [
            'Full Container Seefracht FCL',
            'LCL Sammelgut Seefracht',
            'Schwergut- und Übergrößen Teile',
            'Hafenabwicklung',
            'Dokumentenservice',
          ]
        : [
            'Full container sea freight FCL',
            'LCL groupage sea freight',
            'Heavy cargo and oversized parts',
            'Port handling',
            'Documentation service',
          ],
      images: [
        '/Camilo/Seefracht/IMG_3093.jpeg',
        '/Camilo/Seefracht/e42b1737-f000-4032-9e3c-226a3e3f42c4.jpeg',
        '/Camilo/Seefracht/f2500e60-c05d-4e69-b81a-6bd13a263a29.jpeg',
      ],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
    },
    packaging: {
      id: 'packaging',
      title: isGerman ? 'Verpackung' : 'Packaging',
      description: isGerman
        ? 'Professionelle Verpackungslösungen für jeden Transport'
        : 'Professional packaging solutions for every transport',
      longDescription: isGerman
        ? 'Professionelle Verpackungen für nationale und internationale Transporte. Wir verpacken normale und überdimensionierte Teile im Bereich Kartonagen, Luftfrachtverpackungen, Seefrachtverpackungen, Schwergut- und Übergrößen-Verpackungen sowie wiederverwendbare Verpackungslösungen.'
        : 'Professional packaging for national and international transport. We package normal and oversized parts in cardboard packaging, air freight packaging, sea freight packaging, heavy cargo and oversized packaging, and reusable packaging solutions.',
      features: isGerman
        ? [
            'Kartonagen und Luftfrachtverpackungen',
            'Schwergut- und Übergrößen-Verpackungen',
            'Wiederverwendbare Verpackungslösungen',
            'Spezialverpackungen',
            'Lagerung und Kommissionierung',
          ]
        : [
            'Cardboard and air freight packaging',
            'Heavy cargo and oversized packaging',
            'Reusable packaging solutions',
            'Special packaging',
            'Storage and order fulfillment',
          ],
      images: [
        '/Camilo/Verpackung/IMG_1629.jpeg',
        '/Camilo/Verpackung/IMG_1641.jpeg',
        '/Camilo/Verpackung/IMG_1709.jpeg',
      ],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
    },
    oldtimers: {
      id: 'oldtimers',
      title: isGerman ? 'Oldtimer Transport' : 'Classic Car Transport',
      description: isGerman
        ? 'Spezialisierter Transport für klassische Fahrzeuge'
        : 'Specialized transport for classic vehicles',
      longDescription: isGerman
        ? 'Professioneller und sicherer Transport für Oldtimer und Klassiker. Wir bieten maßgeschneiderte Lösungen für den nationalen und internationalen Transport wertvoller Fahrzeuge mit höchster Sorgfalt und Expertise.'
        : 'Professional and secure transport for classic and vintage cars. We offer tailored solutions for domestic and international transport of valuable vehicles with the highest care and expertise.',
      features: isGerman
        ? [
            'Geschlossene Transportfahrzeuge',
            'Versicherung für hochwertige Fahrzeuge',
            'Tür-zu-Tür Service',
            'Internationale Oldtimer-Transporte',
            'Fachmännische Beladung und Sicherung',
            'Klimakontrollierte Optionen',
          ]
        : [
            'Enclosed transport vehicles',
            'Insurance for high-value vehicles',
            'Door-to-door service',
            'International classic car transport',
            'Expert loading and securing',
            'Climate-controlled options',
          ],
      images: [
        '/Camilo/Oldtimers/IMG_3089.jpeg',
        '/Camilo/Oldtimers/IMG_3090.jpeg',
        '/Camilo/Oldtimers/IMG_3091.jpeg',
        '/Camilo/Oldtimers/IMG_3092.jpeg',
      ],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
    },
    digitalization: {
      id: 'digitalization',
      title: isGerman ? 'Digitalisierung und Prozessoptimierung' : 'Digitalization and Process Optimization',
      description: isGerman
        ? 'KI-gestützte Agenten für intelligente Logistikprozesse'
        : 'AI-powered agents for intelligent logistics processes',
      longDescription: isGerman
        ? 'Revolutionieren Sie Ihre Logistikprozesse mit intelligenten KI-Agenten. Unsere fortschrittlichen Automatisierungslösungen nutzen künstliche Intelligenz, um Ihre Abläufe zu optimieren, Kosten zu senken und die Effizienz zu maximieren. Von der automatischen Routenplanung bis zur prädiktiven Wartung – unsere KI-Agenten arbeiten rund um die Uhr für Ihren Erfolg.'
        : 'Revolutionize your logistics processes with intelligent AI agents. Our advanced automation solutions leverage artificial intelligence to optimize your operations, reduce costs, and maximize efficiency. From automatic route planning to predictive maintenance – our AI agents work around the clock for your success.',
      features: isGerman
        ? [
            'Autonome KI-Agenten für Prozessautomatisierung',
            'Intelligente Routenoptimierung in Echtzeit',
            'Prädiktive Analyse für Wartung und Planung',
            'Automatisierte Entscheidungsfindung',
            'Machine Learning für kontinuierliche Verbesserung',
            'KI-gestützte Kapazitätsplanung',
            'Automatische Anomalieerkennung',
            'Intelligente Dokumentenverarbeitung',
          ]
        : [
            'Autonomous AI agents for process automation',
            'Intelligent real-time route optimization',
            'Predictive analysis for maintenance and planning',
            'Automated decision-making',
            'Machine learning for continuous improvement',
            'AI-powered capacity planning',
            'Automatic anomaly detection',
            'Intelligent document processing',
          ],
      images: [],
      ctaText: isGerman ? 'Mehr erfahren' : 'Learn More',
    },
  };
};

export const isValidServiceId = (value: string): value is ServiceDetailId => {
  return SERVICE_DETAIL_IDS.includes(value as ServiceDetailId);
};

export const getServiceDetails = (
  language: SupportedLanguage,
  serviceId: string,
): ServiceDetail | null => {
  if (!isValidServiceId(serviceId)) {
    return null;
  }

  const services = buildServicesForLanguage(language);
  return services[serviceId];
};

export const getServiceMetadataDefaults = (
  serviceId: string,
): { title: string; description: string } => {
  const fallback = {
    title: 'NavaTransport Logistik Service',
    description: 'Professionelle Logistiklösungen von NavaTransport.',
  };

  if (!isValidServiceId(serviceId)) {
    return fallback;
  }

  const primary = getServiceDetails('en', serviceId);
  const secondary = getServiceDetails('de', serviceId);

  return {
    title: primary?.title ?? secondary?.title ?? fallback.title,
    description: primary?.description ?? secondary?.description ?? fallback.description,
  };
};
