'use client';

import React from 'react';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';

// MONOCODE Principles Applied:
// - Observable Implementation: Service interaction tracking and selection logging
// - Explicit Error Handling: Safe service rendering and selection validation
// - Dependency Transparency: Clear service data structure and dependencies
// - Progressive Construction: Modular service cards with progressive features

interface ServicesSectionProps {
  variant?: 'default' | 'compact' | 'expanded';
  className?: string;
  onServiceSelect?: (serviceId: string) => void;
}

interface ServiceFeature {
  text: string;
  available: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  features: ServiceFeature[];
  ctaText: string;
  icon: string;
  emphasized?: boolean;
}

interface ServicesContent {
  title: string;
  subtitle: string;
  services: Service[];
}

// MONOCODE Observable Implementation: Structured logging system
const logger = {
  log: (level: 'info' | 'warn' | 'error', context: string, data?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: `ServicesSection.${context}`,
      ...data
    };
    
    if (typeof window !== 'undefined') {
      console.log(`[${timestamp}] ServicesSection.${context}:`, data || '');
    }
    
    return logEntry;
  }
};

// MONOCODE Explicit Error Handling: Safe content retrieval with validation
const getServicesContent = (language: string): ServicesContent => {
  try {
    const isGerman = language === 'de';
    
    return {
      title: isGerman ? 'UNSERE LEISTUNGEN' : 'OUR SERVICES',
      subtitle: isGerman 
        ? 'Maßgeschneiderte Logistiklösungen für Ihre individuellen Anforderungen'
        : 'Tailored logistics solutions for your individual requirements',
      services: [
        {
          id: 'transport',
          title: isGerman ? 'Transport & Spedition' : 'Transport & Forwarding',
          description: isGerman 
            ? 'Zuverlässige Transporte in ganz Europa mit modernster Flotte'
            : 'Reliable transportation across Europe with state-of-the-art fleet',
          features: [
            { text: isGerman ? 'Deutschland & EU-weit' : 'Germany & EU-wide', available: true },
            { text: isGerman ? 'Express & Same-Day' : 'Express & Same-Day', available: true },
            { text: isGerman ? 'ADR (auf Anfrage)' : 'ADR (on request)', available: true }
          ],
          ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
          icon: 'truck'
        },
        {
          id: 'warehousing',
          title: isGerman ? 'Lagerung & Kommissionierung' : 'Warehousing & Picking',
          description: isGerman 
            ? 'Sichere Lagerung und professionelle Kommissionierung'
            : 'Secure storage and professional order picking',
          features: [
            { text: isGerman ? 'Hochregallager' : 'High-bay warehouse', available: true },
            { text: isGerman ? 'Temperaturkontrolle' : 'Temperature control', available: true },
            { text: isGerman ? 'WMS-Integration' : 'WMS Integration', available: true }
          ],
          ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
          icon: 'warehouse',
          emphasized: true
        },
        {
          id: 'distribution',
          title: isGerman ? 'Distribution & Letzte Meile' : 'Distribution & Last Mile',
          description: isGerman 
            ? 'Effiziente Verteilung bis zur letzten Meile'
            : 'Efficient distribution to the last mile',
          features: [
            { text: isGerman ? 'B2B & B2C' : 'B2B & B2C', available: true },
            { text: isGerman ? 'Zeitfenster-Zustellung' : 'Time window delivery', available: true },
            { text: isGerman ? 'Retouren-Management' : 'Returns management', available: true }
          ],
          ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
          icon: 'package'
        },
        {
          id: 'customs',
          title: isGerman ? 'Zoll & Außenhandel' : 'Customs & Foreign Trade',
          description: isGerman 
            ? 'Professionelle Zollabwicklung und Außenhandelsberatung'
            : 'Professional customs clearance and foreign trade consulting',
          features: [
            { text: isGerman ? 'AEO-zertifiziert' : 'AEO certified', available: true },
            { text: isGerman ? 'Zollberatung' : 'Customs consulting', available: true },
            { text: isGerman ? 'Ursprungszeugnis' : 'Certificate of origin', available: true }
          ],
          ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
          icon: 'shield'
        },
        {
          id: 'consulting',
          title: isGerman ? 'Logistik-Beratung' : 'Logistics Consulting',
          description: isGerman 
            ? 'Strategische Beratung zur Optimierung Ihrer Lieferkette'
            : 'Strategic consulting to optimize your supply chain',
          features: [
            { text: isGerman ? 'Prozessoptimierung' : 'Process optimization', available: true },
            { text: isGerman ? 'Kostenanalyse' : 'Cost analysis', available: true },
            { text: isGerman ? 'Digitalisierung' : 'Digitalization', available: true }
          ],
          ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote',
          icon: 'chart'
        }
      ]
    };
  } catch (error) {
    logger.log('error', 'getServicesContent', {
      error: error instanceof Error ? error.message : 'Unknown error',
      language
    });

    // MONOCODE Graceful Fallbacks: Minimal fallback content
    return {
      title: 'OUR SERVICES',
      subtitle: 'Professional logistics solutions for your needs',
      services: [
        {
          id: 'transport',
          title: 'Transport',
          description: 'Reliable transportation services',
          features: [
            { text: 'EU-wide coverage', available: true },
            { text: 'Express delivery', available: true }
          ],
          ctaText: 'Request Quote',
          icon: 'truck'
        }
      ]
    };
  }
};

// MONOCODE Progressive Construction: Icon mapping with proper style guide icons
const getServiceIconSVG = (iconName: string): React.ReactElement => {
  const iconMap: Record<string, React.ReactElement> = {
    truck: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8m-8 0V9a2 2 0 012-2h6a2 2 0 012 2v3m-8 0v3a2 2 0 002 2h6a2 2 0 002-2v-3M3 12h2m14 0h2" />
      </svg>
    ),
    warehouse: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l2-1 2 1 2-1 2 1 2-1 2 1z" />
      </svg>
    ),
    package: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    shield: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    chart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  };

  return iconMap[iconName] || (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

// MONOCODE Progressive Construction: Service selection handler with analytics
const createServiceSelectHandler = (
  serviceId: string,
  onServiceSelect?: (serviceId: string) => void
) => {
  return (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      
      logger.log('info', 'serviceSelected', {
        serviceId,
        timestamp: new Date().toISOString()
      });

      // MONOCODE Explicit Error Handling: Safe callback execution
      if (onServiceSelect) {
        try {
          onServiceSelect(serviceId);
        } catch (callbackError) {
          logger.log('error', 'onServiceSelect', {
            error: callbackError instanceof Error ? callbackError.message : 'Callback error',
            serviceId
          });
        }
      }
      
      // MONOCODE Progressive Construction: Scroll to quote section with service preselection
      const quoteSection = document.getElementById('quote');
      if (quoteSection) {
        quoteSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Set service in URL params for form preselection
        const url = new URL(window.location.href);
        url.searchParams.set('service', serviceId);
        window.history.replaceState({}, '', url.toString());
      } else {
        logger.log('warn', 'scrollToQuote', { 
          issue: 'Quote section not found',
          serviceId
        });
      }
    } catch (error) {
      logger.log('error', 'serviceSelectHandler', {
        error: error instanceof Error ? error.message : 'Unknown error',
        serviceId
      });
    }
  };
};

// MONOCODE Progressive Construction: Service card component with style guide compliance
const ServiceCard: React.FC<{
  service: Service;
  index: number;
  onServiceSelect?: (serviceId: string) => void;
}> = ({ service, index, onServiceSelect }) => {
  const handleServiceSelect = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const handler = createServiceSelectHandler(service.id, onServiceSelect);
    handler(event);
  }, [service.id, onServiceSelect]);

  // MONOCODE Progressive Construction: Style guide compliant card styling - unified white-to-navy design
  const cardBaseStyles = "relative p-6 border transition-all duration-300 cursor-pointer group";
  const cardStyles = `${cardBaseStyles} bg-white border-gray-100 hover:text-white hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]`;

  // Style guide section 6.4: Service card anatomy with proper design tokens - consistent white base with navy hover
  const cardStyle = {
    backgroundColor: 'var(--surface-0)',
    borderColor: 'var(--ink-300)',
    borderRadius: 'var(--radius-lg)',
  };

  // MONOCODE Progressive Construction: Navy hover style using CSS custom properties
  const cardHoverStyle = {
    '--hover-bg': 'var(--navy-900)',
    '--hover-border': 'var(--navy-800)',
  } as React.CSSProperties;

  const iconContainerStyles = "w-10 h-10 text-brand-600 group-hover:text-white flex items-center justify-center mb-4 transition-all duration-200";

  const iconContainerStyle = {
    backgroundColor: 'var(--brand-400)',
    borderRadius: '50%', // Make it circular as per style guide
  };

  const titleStyles = "text-lg font-bold mb-3 text-ink-900 group-hover:text-white transition-colors duration-300";

  const descriptionStyles = "text-ink-500 group-hover:text-white/80 mb-6 leading-relaxed text-sm transition-colors duration-300";

  return (
    <div 
      className={cardStyles} 
      style={{...cardStyle, ...cardHoverStyle}}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--navy-900)';
        e.currentTarget.style.borderColor = 'var(--navy-800)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--surface-0)';
        e.currentTarget.style.borderColor = 'var(--ink-300)';
      }}
    >
      {/* MONOCODE Progressive Construction: Service icon with style guide tokens - consistent orange icon */}
      <div 
        className={iconContainerStyles} 
        style={iconContainerStyle}
      >
        {getServiceIconSVG(service.icon)}
      </div>

      {/* MONOCODE Progressive Construction: Service content with style guide typography */}
      <h3 className={titleStyles}>
        {service.title}
      </h3>
      
      <p className={descriptionStyles}>
        {service.description}
      </p>

      {/* MONOCODE Progressive Construction: Feature list with proper style guide tokens */}
      <ul className="space-y-2 mb-6">
        {service.features.map((feature, featureIndex) => (
          <li 
            key={`feature-${index}-${featureIndex}`}
            className="flex items-center gap-3"
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: 'var(--brand-400)',
              }}
            >
              <svg 
                className="w-3 h-3 text-brand-600 group-hover:text-white transition-colors duration-300"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <span className="text-sm leading-relaxed text-ink-600 group-hover:text-white/90 transition-colors duration-300">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* MONOCODE Progressive Construction: CTA button with style guide button specs - consistent orange */}
      <button
        onClick={handleServiceSelect}
        className="w-full py-3 px-6 font-semibold text-base transition-all duration-200 text-white hover:shadow-md active:translate-y-px focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
        style={{
          backgroundColor: 'var(--brand-600)',
          borderRadius: '9999px', // pill shape as per style guide
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--brand-500)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--brand-600)';
        }}
        data-analytics="service_card_cta_click"
        data-service-id={service.id}
      >
        {service.ctaText}
      </button>
    </div>
  );
};

// MONOCODE Progressive Construction: Style guide compliant section variants
const getSectionStyles = (variant: string) => {
  // Style guide section 4: 80-120px vertical spacing
  const baseStyles = 'py-20 bg-white'; // 80px = py-20
  
  switch (variant) {
    case 'compact':
      return `${baseStyles} py-16`; // 64px for compact
    case 'expanded':
      return `${baseStyles} py-30`; // 120px for expanded
    default:
      return baseStyles;
  }
};

// MONOCODE Observable Implementation: Main ServicesSection component
export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  variant = 'default',
  className = '',
  onServiceSelect
}) => {
  // MONOCODE Dependency Transparency: Hook dependencies
  const currentLanguage = useCurrentLanguage();

  // MONOCODE Progressive Construction: Component setup with logging
  React.useEffect(() => {
    logger.log('info', 'setup', { 
      variant, 
      language: currentLanguage,
      hasServiceSelectCallback: !!onServiceSelect
    });
  }, [variant, currentLanguage, onServiceSelect]);

  // MONOCODE Explicit Error Handling: Safe content retrieval
  const content = React.useMemo(() => {
    try {
      return getServicesContent(currentLanguage);
    } catch (error) {
      logger.log('error', 'contentGeneration', {
        error: error instanceof Error ? error.message : 'Unknown error',
        language: currentLanguage
      });
      
      return getServicesContent('en'); // Fallback to English
    }
  }, [currentLanguage]);

  // MONOCODE Progressive Construction: Combined styles
  const sectionStyles = `${getSectionStyles(variant)} ${className}`.trim();

  return (
    <section className={sectionStyles} id="services">
      {/* Style guide section 4: Container max-width 1200-1280px with 24px gutter */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* MONOCODE Progressive Construction: Section header with style guide typography */}
        <div className="text-center mb-16">
          {/* Style guide section 3: H2 ALL CAPS with Manrope font and -0.02em letter-spacing */}
          <h2 
            className="font-bold text-4xl lg:text-5xl mb-6 tracking-tight uppercase"
            style={{ 
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'var(--font-size-h2, 40px)',
              lineHeight: 'var(--line-height-h2, 1.1)',
              letterSpacing: 'var(--letter-spacing-h2, -0.02em)',
              color: 'var(--ink-900)',
            }}
          >
            {content.title}
          </h2>
          {/* Style guide section 3: Body large 18px with proper line height */}
          <p 
            className="max-w-3xl mx-auto leading-relaxed"
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: 'var(--ink-500)',
            }}
          >
            {content.subtitle}
          </p>
        </div>

        {/* MONOCODE Progressive Construction: Services grid - Style guide section 4: 4→2→1 responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.services.map((service, index) => (
            <ServiceCard
              key={`service-${service.id}`}
              service={service}
              index={index}
              onServiceSelect={onServiceSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
