'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, CheckCircle } from 'lucide-react';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';

// MONOCODE Principles Applied:
// - Observable Implementation: Structured logging with animations and analytics tracking
// - Explicit Error Handling: Safe content rendering with fallbacks and validation
// - Dependency Transparency: Clear external dependencies for Framer Motion and icons
// - Progressive Construction: Responsive hero with incremental reveal animations

// External Dependencies (Style Guide Section 12):
// - Framer Motion for reveal animations (section 5)
// - Lucide React for icons (section 12)
// - useCurrentLanguage hook for DE/EN toggle
// - Style guide tokens from globals.css

interface HeroSectionProps {
  variant?: 'default' | 'minimal' | 'image-background';
  className?: string;
}

interface HeroContent {
  headline: string;
  subheadline: string;
}

// MONOCODE Observable Implementation: Structured logging with analytics tracking
const logger = {
  log: (level: 'info' | 'warn' | 'error', context: string, data?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: `HeroSection.${context}`,
      component: 'HeroSection',
      ...data
    };
    
    if (typeof window !== 'undefined') {
      console.log(`[${timestamp}] HeroSection.${context}:`, data || '');
    }
    
    return logEntry;
  },
  
  // Style Guide: Analytics tracking (section 11)
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
      // Track with data-analytics attribute as specified
      const event = new CustomEvent('analytics', {
        detail: { eventName, properties }
      });
      window.dispatchEvent(event);
    }
  }
};

// MONOCODE Explicit Error Handling: Content with German microcopy (Style Guide Section 14)
const getHeroContent = (language: string): HeroContent => {
  const content: Record<string, HeroContent> = {
    de: {
      headline: "UMFASSENDE LOGISTIKBERATUNG & TRANSPORT",
      subheadline: "Wir transportieren alle Arten von Waren, beraten beim Zoll, bei der Steuer und bei der Dokumentation. Unser Service ist Door-to-Door."
    },
    en: {
      headline: "COMPREHENSIVE LOGISTICS CONSULTING & TRANSPORT", 
      subheadline: "We transport all types of goods, provide customs, tax and documentation consulting. Our service is door-to-door."
    }
  };
  
  return content[language] || content.de;
};

// Style Guide Section 5: Motion & Interaction - Animation variants
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.06, // 60ms stagger as specified
      ease: [0.2, 0.8, 0.2, 1] as const // cubic-bezier(.2,.8,.2,1)
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 4 // 4px translate as specified
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

export default function HeroSection({ 
  variant = 'default', 
  className = ''
}: HeroSectionProps) {
  const currentLanguage = useCurrentLanguage();
  const content = getHeroContent(currentLanguage);
  const [isVisible, setIsVisible] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // MONOCODE Progressive Construction: Component initialization with logging
  useEffect(() => {
    logger.log('info', 'mounted', { variant, language: currentLanguage });
    setIsVisible(true);
    
    return () => {
      logger.log('info', 'unmounted');
    };
  }, [variant, currentLanguage]);

  // Instrumentation: detect potential headline overflow on small screens
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const overflowing = el.scrollWidth > el.clientWidth;
    if (overflowing) {
      logger.log('warn', 'headline_overflow', {
        clientWidth: el.clientWidth,
        scrollWidth: el.scrollWidth,
        language: currentLanguage,
      });
    }
  }, [currentLanguage, variant]);


  return (
    // Style Guide Section 6.2: Hero with background gradient and proper spacing
    <section 
      className={`
        relative min-h-screen flex items-center 
        bg-gradient-to-br from-surface-0 via-ink-50 to-surface-alt
        ${className}
      `}
      role="banner"
      aria-labelledby="hero-headline"
    >
      {/* Style Guide Section 4: Container with max-width 1280px, centered, mobile-friendly gutter */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Style Guide Section 6.2: Content (left) - H1, subheadline, CTAs */}
          <div className="text-center lg:text-left">
            {/* Style Guide Section 3: H1 with Manrope font, 60px/1.05, -0.02em letter-spacing */}
            <motion.h1
              id="hero-headline"
              variants={itemVariants}
              className="
                font-manrope font-bold text-[34px] sm:text-[40px] md:text-[48px] lg:text-[60px]
                text-ink-900 mb-6 tracking-[-0.02em] leading-[1.05] break-keep text-pretty
              "
              style={{ hyphens: 'none' }}
              lang={currentLanguage}
              ref={headlineRef}
            >
              {content.headline}
            </motion.h1>

            {/* Style Guide Section 3: Subheadline with body text styling */}
            <motion.p
              variants={itemVariants}
              className="
                text-body-lg text-ink-600 mb-8 max-w-2xl mx-auto lg:mx-0
                leading-relaxed
              "
            >
              {content.subheadline}
            </motion.p>

          </div>

          {/* Style Guide Section 6.2: Visual (right) - European truck transport image */}
          <motion.div
            variants={itemVariants}
            className="relative lg:block"
          >
            {/* MONOCODE Explicit Error Handling: Image with fallback and proper aspect ratio */}
            <div className="
              relative w-full aspect-square lg:aspect-[4/3] max-w-lg mx-auto
              bg-gradient-to-br from-brand-100 to-brand-200 
              rounded-3xl overflow-hidden shadow-lg
            ">
              {/* MONOCODE Observable Implementation: Structured logging for image loading */}
              <Image
                src="/freepik__hyperrealistic-picture-of-a-truck-in-europe-with-o__24289.png"
                alt={currentLanguage === 'de' 
                  ? "Hyperrealistisches Bild eines LKW in Europa - Zuverlässige Logistik" 
                  : "Hyperrealistic picture of a truck in Europe - Reliable logistics"
                }
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                quality={85}
                onLoad={() => {
                  logger.log('info', 'hero_image_loaded', { 
                    image: 'truck_europe',
                    language: currentLanguage 
                  });
                }}
                onError={(e) => {
                  logger.log('error', 'hero_image_failed', { 
                    image: 'truck_europe',
                    error: e.currentTarget.src,
                    language: currentLanguage 
                  });
                }}
              />
              
              {/* MONOCODE Progressive Construction: Subtle overlay for visual enhancement */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/10 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Style Guide: Background decoration with subtle patterns */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-ink-100 rounded-full opacity-30 blur-2xl"></div>
      </div>
    </section>
  );
}
