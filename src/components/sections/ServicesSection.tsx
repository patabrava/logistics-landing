'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
      title: isGerman ? 'Unsere Leistungen' : 'Our services',
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
          id: 'distribution',
          title: isGerman ? 'Expresszustellung' : 'Express Delivery',
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
      title: 'Our services',
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
        {/* Cargo box */}
        <rect x="3.25" y="9.25" width="8.75" height="5.5" rx="1.4" ry="1.4" strokeWidth={1.5} />
        {/* Cab */}
        <path d="M12.5 9.25h3.1l2.65 2.75v2.75H12.5z" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        {/* Wheels */}
        <circle cx="7.25" cy="17.25" r="1.35" strokeWidth={1.5} />
        <circle cx="17.25" cy="17.25" r="1.35" strokeWidth={1.5} />
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

// Style Guide Section 5: Motion & Interaction - Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.06, // 60ms stagger per style guide
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 4 // 4px translate per style guide
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
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

  // Style Guide Section 6.4: Service card styling with exact specifications
  // Section 1: Clean B2B SaaS vibe with soft rounded panels and subtle depth
  return (
    <motion.div
      variants={itemVariants}
      className="group cursor-pointer"
      style={{
        padding: '24px', // 6 * 4px = 24px as per style guide
        borderRadius: 'var(--radius-lg)', // 24px per style guide
        backgroundColor: 'var(--surface-0)', // White background
        border: '1px solid #f3f4f6', // gray-100 - subtle, non-black border
        boxShadow: 'var(--shadow-sm)', // Subtle depth
        transition: 'all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)', // Style guide easing
      }}
      whileHover={{
        // Style Guide Section 5: Hover - lift +2-4px, scale 1.01, shadow up one step
        y: -3,
        scale: 1.01,
        boxShadow: 'var(--shadow-md)',
        transition: {
          duration: 0.3,
          ease: [0.2, 0.8, 0.2, 1]
        }
      }}
      onHoverStart={() => {
        // MONOCODE Observable Implementation: Track hover interaction
        logger.log('info', 'serviceCardHover', { serviceId: service.id });
      }}
    >
      {/* Style Guide Section 6.4: Icon circle (40px) */}
      <div 
        className="mb-6 transition-all duration-300"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--brand-400)', // Subtle brand accent
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--brand-600)' // Primary brand color for icon
        }}
      >
        {getServiceIconSVG(service.icon)}
      </div>

      {/* Style Guide Section 3: Typography with exact specifications */}
      <h3 
        className="group-hover:text-white transition-colors duration-300"
        style={{
          fontSize: '20px', // 18-20 bold per style guide
          fontWeight: '700', // Bold
          lineHeight: '1.2',
          color: 'var(--ink-900)', // Primary text
          marginBottom: '12px',
          fontFamily: 'Inter, sans-serif' // Body/UI font
        }}
      >
        {service.title}
      </h3>
      
      <p 
        className="group-hover:text-white/90 transition-colors duration-300"
        style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: 'var(--ink-500)', // Secondary text
          marginBottom: '20px',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {service.description}
      </p>

      {/* Style Guide Section 6.4: 2-3 bullets with line-clamp 3 */}
      <ul className="space-y-3 mb-6">
        {service.features.slice(0, 3).map((feature, featureIndex) => (
          <li 
            key={`feature-${index}-${featureIndex}`}
            className="flex items-center gap-3"
          >
            <div 
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <svg 
                className="w-3 h-3 group-hover:text-white transition-colors duration-300"
                style={{ color: 'var(--brand-600)' }}
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
            <span 
              className="group-hover:text-white/90 transition-colors duration-300"
              style={{
                fontSize: '13px', // Micro text per style guide
                lineHeight: '1.45',
                color: 'var(--ink-500)'
              }}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Style Guide Section 6.4: "Angebot anfordern" inline link/pill */}
      <button
        onClick={handleServiceSelect}
        className="w-full transition-all duration-200 hover:shadow-md active:translate-y-px focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        style={{
          padding: '12px 20px', // px 20-24 / py 14-16 adapted for smaller button
          backgroundColor: 'var(--brand-600)',
          color: '#ffffff',
          borderRadius: '9999px', // pill radius per style guide
          fontWeight: '600', // semibold
          fontSize: '14px',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          // Style Guide Section 7: Hover bg --brand/500, add shadow
          e.currentTarget.style.backgroundColor = 'var(--brand-500)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--brand-600)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        onMouseDown={(e) => {
          // Style Guide Section 7: Active translate-y(1px), shadow/sm
          e.currentTarget.style.transform = 'translateY(1px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        data-analytics="service_card_cta_click"
        data-service-id={service.id}
      >
        {service.ctaText}
      </button>
    </motion.div>
  );
};

// MONOCODE Progressive Construction: Style guide compliant section variants
const getSectionStyles = (variant: string) => {
  // Style Guide Section 4: 80-120px vertical spacing with subtle background
  const baseStyles = 'py-24 bg-white min-h-[calc(100vh-60px)] bg-gradient-to-b from-gray-50/30 to-white';
  
  switch (variant) {
    case 'compact':
      return `py-16 bg-white`; // 64px for compact
    case 'expanded':
      return `py-32 bg-white min-h-screen bg-gradient-to-b from-gray-50/50 to-white`; // 128px for expanded
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
      {/* Style Guide Section 4: Container max-width 1280px, centered, 24px gutter */}
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          key={currentLanguage} // Force re-animation on language change
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {/* Style Guide Section 3: Typography with exact specifications */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            {/* Style Guide Section 3: H2 ALL CAPS with Manrope font and -0.02em letter-spacing */}
            <h2 
              className="uppercase mb-6 tracking-tight"
              style={{ 
                fontFamily: 'Manrope, sans-serif',
                fontSize: '40px', // H2 40px per style guide
                lineHeight: '1.1', // H2 line height
                letterSpacing: '-0.02em', // H2 letter spacing
                fontWeight: '700', // Bold
                color: 'var(--ink-900)', // Primary text
              }}
            >
              {content.title}
            </h2>
            {/* Style Guide Section 3: Body large 18px with proper line height */}
            <p 
              className="max-w-3xl mx-auto"
              style={{
                fontSize: '18px', // Body 16-18px
                lineHeight: '1.6', // Body line height
                color: 'var(--ink-500)', // Secondary text
                fontFamily: 'Inter, sans-serif' // Body/UI font
              }}
            >
              {content.subtitle}
            </p>
          </motion.div>

          {/* Style Guide Section 4: Services grid 4→2→1 responsive */}
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
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
