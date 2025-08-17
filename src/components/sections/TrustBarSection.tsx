'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Award } from 'lucide-react';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';

// MONOCODE Principles Applied:
// - Observable Implementation: Client logo loading with performance tracking and error handling
// - Explicit Error Handling: Safe image loading with fallbacks and graceful degradation
// - Dependency Transparency: Clear external dependencies for animations, icons, and localization
// - Progressive Construction: Modular trust elements with staggered reveal animations

// External Dependencies (Style Guide Section 12):
// - Framer Motion for reveal animations (section 5)
// - Lucide React for stat icons (section 12)
// - useCurrentLanguage hook for DE/EN toggle

interface TrustBarSectionProps {
  variant?: 'default' | 'compact' | 'expanded';
  className?: string;
}

interface ClientLogo {
  name: string;
  logoUrl?: string;
  altText: string;
  fallbackText: string;
}

interface TrustStat {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

interface TrustContent {
  title: string;
  clientLogos: ClientLogo[];
  stats: TrustStat[];
}

// MONOCODE Observable Implementation: Structured logging with performance tracking
const logger = {
  log: (level: 'info' | 'warn' | 'error', context: string, data?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: `TrustBarSection.${context}`,
      component: 'TrustBarSection',
      ...data
    };
    
    if (typeof window !== 'undefined') {
      console.log(`[${timestamp}] TrustBarSection.${context}:`, data || '');
    }
    
    return logEntry;
  },
  
  trackImageLoad: (logoName: string, success: boolean, loadTime?: number) => {
    logger.log('info', 'logo_load', {
      logo_name: logoName,
      success,
      load_time_ms: loadTime,
      performance_metric: true
    });
  }
};

// MONOCODE Explicit Error Handling: Trust content with German microcopy (Style Guide Section 14)
const getTrustContent = (language: string): TrustContent => {
  const content: Record<string, TrustContent> = {
    de: {
      title: "Vertrauen Sie auf unsere Erfahrung",
      clientLogos: [
        { name: "BMW", logoUrl: "/logos/bmw.svg", altText: "BMW Logo", fallbackText: "BMW" },
        { name: "Mercedes", logoUrl: "/logos/mercedes.svg", altText: "Mercedes-Benz Logo", fallbackText: "Mercedes" },
        { name: "Volkswagen", logoUrl: "/logos/vw.svg", altText: "Volkswagen Logo", fallbackText: "VW" },
        { name: "Siemens", logoUrl: "/logos/siemens.svg", altText: "Siemens Logo", fallbackText: "Siemens" },
        { name: "SAP", logoUrl: "/logos/sap.svg", altText: "SAP Logo", fallbackText: "SAP" },
        { name: "Bosch", logoUrl: "/logos/bosch.svg", altText: "Bosch Logo", fallbackText: "Bosch" },
        { name: "BASF", logoUrl: "/logos/basf.svg", altText: "BASF Logo", fallbackText: "BASF" },
        { name: "Adidas", logoUrl: "/logos/adidas.svg", altText: "Adidas Logo", fallbackText: "Adidas" }
      ],
      stats: [
        { icon: Clock, value: "98%", label: "pünktlich" },
        { icon: CheckCircle, value: "500+", label: "zufriedene Kunden" },
        { icon: Award, value: "25+", label: "Jahre Erfahrung" }
      ]
    },
    en: {
      title: "Trust our experience",
      clientLogos: [
        { name: "BMW", logoUrl: "/logos/bmw.svg", altText: "BMW Logo", fallbackText: "BMW" },
        { name: "Mercedes", logoUrl: "/logos/mercedes.svg", altText: "Mercedes-Benz Logo", fallbackText: "Mercedes" },
        { name: "Volkswagen", logoUrl: "/logos/vw.svg", altText: "Volkswagen Logo", fallbackText: "VW" },
        { name: "Siemens", logoUrl: "/logos/siemens.svg", altText: "Siemens Logo", fallbackText: "Siemens" },
        { name: "SAP", logoUrl: "/logos/sap.svg", altText: "SAP Logo", fallbackText: "SAP" },
        { name: "Bosch", logoUrl: "/logos/bosch.svg", altText: "Bosch Logo", fallbackText: "Bosch" },
        { name: "BASF", logoUrl: "/logos/basf.svg", altText: "BASF Logo", fallbackText: "BASF" },
        { name: "Adidas", logoUrl: "/logos/adidas.svg", altText: "Adidas Logo", fallbackText: "Adidas" }
      ],
      stats: [
        { icon: Clock, value: "98%", label: "on time" },
        { icon: CheckCircle, value: "500+", label: "satisfied customers" },
        { icon: Award, value: "25+", label: "years experience" }
      ]
    }
  };
  
  return content[language] || content.de;
};

// Style Guide Section 5: Motion & Interaction - Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.06, // 60ms stagger
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 4 
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

// MONOCODE Explicit Error Handling: Safe logo component with fallbacks
const ClientLogoComponent: React.FC<{ 
  logo: ClientLogo;
}> = ({ logo }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loadStartTime] = useState(Date.now());

  const handleImageLoad = () => {
    const loadTime = Date.now() - loadStartTime;
    setImageLoaded(true);
    logger.trackImageLoad(logo.name, true, loadTime);
  };

  const handleImageError = () => {
    setImageError(true);
    logger.trackImageLoad(logo.name, false);
  };

  return (
    <motion.div
      variants={itemVariants}
      className="
        flex items-center justify-center p-4 h-16
        grayscale opacity-60 hover:opacity-100 hover:grayscale-0
        transition-all duration-brand ease-brand
      "
    >
      {!imageError && logo.logoUrl ? (
        <img
          src={logo.logoUrl}
          alt={logo.altText}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`
            max-h-8 max-w-full object-contain
            transition-opacity duration-brand
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          loading="lazy"
        />
      ) : (
        // Style Guide: Fallback with brand typography
        <span className="
          text-ink-600 font-medium text-sm tracking-wide
          px-3 py-2 border border-ink-200 rounded-md
        ">
          {logo.fallbackText}
        </span>
      )}
    </motion.div>
  );
};

export default function TrustBarSection({ 
  variant = 'default', 
  className = '' 
}: TrustBarSectionProps) {
  const currentLanguage = useCurrentLanguage();
  const content = getTrustContent(currentLanguage);

  // MONOCODE Progressive Construction: Component initialization
  useEffect(() => {
    logger.log('info', 'mounted', { variant, language: currentLanguage });
    
    return () => {
      logger.log('info', 'unmounted');
    };
  }, [variant, currentLanguage]);

  return (
    // Style Guide Section 6.3: Light section following specifications
    <section 
      className={`
        section bg-ink-50 
        ${className}
      `}
      aria-label="Client trust indicators"
    >
      {/* Style Guide Section 4: Container with proper spacing */}
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          {/* Optional title for expanded variant */}
          {variant === 'expanded' && (
            <motion.h2
              variants={itemVariants}
              className="
                font-manrope font-bold text-h3 text-ink-900 mb-12
                tracking-tight
              "
            >
              {content.title}
            </motion.h2>
          )}

          {/* Style Guide Section 6.3: Client logos (6-8) in grayscale */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div className="
              grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4
              max-w-6xl mx-auto
            ">
              {content.clientLogos.map((logo) => (
                <ClientLogoComponent 
                  key={logo.name}
                  logo={logo}
                />
              ))}
            </div>
          </motion.div>

          {/* Style Guide Section 6.3: Small stat chips */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6"
          >
            {content.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="
                  stat-chip bg-surface-0 border border-ink-100
                  hover:shadow-md hover:scale-105 
                  transition-all duration-brand ease-brand
                  cursor-default
                "
              >
                <stat.icon 
                  className="w-4 h-4 text-brand-600" 
                  aria-hidden="true" 
                />
                <span className="font-semibold text-ink-900">
                  {stat.value}
                </span>
                <span className="text-ink-600">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
