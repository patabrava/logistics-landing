'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, Phone, MoveRight } from 'lucide-react';
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
  const phoneDisplay = '+49 170 2846898';
  const phoneHref = '+491702846898';
  const primaryCta = currentLanguage === 'de' ? 'Unverbindliche Beratung' : 'Request a consultation';
  const secondaryCta = currentLanguage === 'de' ? 'Jetzt anrufen' : 'Call us now';
  const featureCopy = currentLanguage === 'de'
    ? [
        'Tür-zu-Tür-Transporte in ganz Europa',
        'Persönliche Ansprechpartner & Echtzeit-Tracking',
        'Zoll- und Dokumentationsservice inklusive',
        'Europaweites Partnernetzwerk mit lokalen Experten'
      ]
    : [
        'Door-to-door transports across Europe',
        'Personal advisors & real-time tracking',
        'Customs and documentation handled for you',
        'Pan-European partner network with local experts'
      ];

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
    <section
      className={`
        relative flex flex-col justify-center
        min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] lg:min-h-[calc(100vh-5rem)]
        pt-6 sm:pt-10 lg:pt-14 pb-16 sm:pb-20 lg:pb-24
        overflow-hidden
        ${className}
      `}
      role="banner"
      aria-labelledby="hero-headline"
    >
      <div className="absolute inset-0">
        <Image
          src="/freepik__hyperrealistic-picture-of-a-truck-in-europe-with-o__24289.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
          onLoad={() => {
            logger.log('info', 'hero_image_loaded', {
              image: 'truck_europe_background',
              language: currentLanguage
            });
          }}
          onError={(e) => {
            logger.log('error', 'hero_image_failed', {
              image: 'truck_europe_background',
              error: e.currentTarget.src,
              language: currentLanguage
            });
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/70 to-ink-900/40" />
        <div className="absolute inset-0 bg-ink-900/20 mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="max-w-4xl space-y-10 text-left"
          >
            <motion.h1
              id="hero-headline"
              variants={itemVariants}
              className="
                font-geist font-bold text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px]
                text-white drop-shadow-2xl mb-6 tracking-[-0.02em] leading-[1.05] break-keep text-pretty
              "
              style={{ hyphens: 'none' }}
              lang={currentLanguage}
              ref={headlineRef}
            >
              {content.headline}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl"
            >
              {content.subheadline}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="
                  inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full
                  bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/30
                  hover:bg-emerald-400 transition-colors duration-200
                "
                data-analytics="hero_primary_cta"
                onClick={() => logger.trackEvent('hero_primary_cta')}
              >
                {primaryCta}
                <MoveRight className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href={`tel:${phoneHref}`}
                className="
                  inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full
                  bg-white/10 text-white font-semibold border border-white/30
                  backdrop-blur-sm hover:bg-white/20 transition-colors duration-200
                "
                data-analytics="hero_secondary_cta"
                onClick={() => logger.trackEvent('hero_secondary_cta')}
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {secondaryCta}
                <span className="hidden sm:inline text-white/70">{phoneDisplay}</span>
              </a>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-4 pt-4"
            >
              {featureCopy.map((feature, index) => (
                <motion.li
                  key={`${feature}-${index}`}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-white/85"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-300 mt-1" aria-hidden="true" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
