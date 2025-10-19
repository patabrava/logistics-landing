export type SupportedLanguage = 'de' | 'en';

export const SERVICE_DETAIL_IDS = [
  'integrated-truckload',
  'air-freight',
  'sea-freight',
  'packaging',
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
        '/IMG_3091.jpeg',
        '/IMG_3089.jpeg',
        '/IMG_3090.jpeg',
        '/IMG_1713.jpeg',
        '/images/ltl-transport.jpg',
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
      images: ['/images/air-freight.jpg'],
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
      images: ['/IMG_3093.jpeg'],
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
      images: ['/IMG_1629.jpeg', '/IMG_1641.jpeg'],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
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
