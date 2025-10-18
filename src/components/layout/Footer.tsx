'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';
import CookieSettingsModal from '../ui/CookieSettingsModal';

// MONOCODE Dependency Transparency: Clear external dependencies documented
// External Dependencies:
// - Next.js Link for navigation
// - LanguageToggle component for language switching  
// - useCurrentLanguage hook for localization
// - next-intl for internationalization (via useCurrentLanguage)

interface FooterProps {
  variant?: 'default' | 'minimal' | 'expanded';
  className?: string;
}

// MONOCODE Observable Implementation: Structured logging system
const logger = {
  log: (level: 'info' | 'warn' | 'error', context: string, data?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: `Footer.${context}`,
      ...data
    };
    
    if (typeof window !== 'undefined') {
      console.log(`[${timestamp}] Footer.${context}:`, data || '');
    }
    
    return logEntry;
  }
};

// MONOCODE Explicit Error Handling: Safe content retrieval with fallbacks
const getFooterContent = (language: string) => {
  try {
    const isGerman = language === 'de';
    
    return {
      company: {
        title: isGerman ? 'Unternehmen' : 'Company',
        links: [
          { href: '#about', label: isGerman ? 'Über uns' : 'About Us' },
          { href: '#services', label: isGerman ? 'Leistungen' : 'Services' },
          { href: '/careers', label: isGerman ? 'Karriere' : 'Careers' },
          { href: '/news', label: isGerman ? 'News' : 'News' }
        ]
      },
      legal: {
        title: isGerman ? 'Rechtliches' : 'Legal',
        links: [
          { href: '/impressum', label: isGerman ? 'Impressum' : 'Imprint' },
          { href: '/datenschutz', label: isGerman ? 'Datenschutz' : 'Privacy' },
          { href: '/terms', label: isGerman ? 'AGB' : 'Terms' },
          { href: '/cookies', label: isGerman ? 'Cookie-Einstellungen' : 'Cookie Settings' }
        ]
      },
      contact: {
        title: isGerman ? 'Kontakt' : 'Contact',
        address: 'NavarroGroup\nMarienstraße 6\n61440 Oberursel',
        phone: '+49 170 2846898',
        email: 'info@navarrogroup.de'
      },
      copyright: isGerman 
        ? `© ${new Date().getFullYear()} NavarroGroup. Alle Rechte vorbehalten.`
        : `© ${new Date().getFullYear()} NavarroGroup. All rights reserved.`
    };
  } catch (error) {
    logger.log('error', 'getFooterContent', {
      error: error instanceof Error ? error.message : 'Unknown error',
      language
    });

    // MONOCODE Explicit Error Handling: Graceful fallbacks
    return {
      company: { title: 'Company', links: [] },
      legal: { title: 'Legal', links: [] },
      contact: { 
        title: 'Contact', 
        address: 'NavarroGroup\nMarienstraße 6\n61440 Oberursel', 
        phone: '+49 170 2846898', 
        email: 'info@navarrogroup.de'
      },
      copyright: `© ${new Date().getFullYear()} NavarroGroup. All rights reserved.`
    };
  }
};

// MONOCODE Progressive Construction: Link click handler with tracking
const createLinkClickHandler = (href: string, label: string) => {
  return () => {
    try {
      logger.log('info', 'linkClick', {
        href,
        label,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.log('error', 'linkClick', {
        error: error instanceof Error ? error.message : 'Unknown error',
        href,
        label
      });
    }
  };
};

// MONOCODE Observable Implementation: Main Footer component following style guide v1.0
export const Footer: React.FC<FooterProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  // MONOCODE Dependency Transparency: Hook dependencies
  const currentLanguage = useCurrentLanguage();
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  // MONOCODE Progressive Construction: Component setup with logging
  React.useEffect(() => {
    logger.log('info', 'setup', { 
      variant, 
      language: currentLanguage,
      className: className || 'none'
    });
  }, [variant, currentLanguage, className]);

  // MONOCODE Explicit Error Handling: Safe content retrieval
  const content = React.useMemo(() => {
    try {
      return getFooterContent(currentLanguage);
    } catch (error) {
      logger.log('error', 'contentGeneration', {
        error: error instanceof Error ? error.message : 'Unknown error',
        language: currentLanguage
      });
      
      return getFooterContent('en'); // Fallback to English
    }
  }, [currentLanguage]);

  // Style Guide v1.0: Footer styling with design tokens
  const paddingY = variant === 'minimal' ? 'py-6' : variant === 'expanded' ? 'py-12' : 'py-8';
  const footerStyles = `bg-gray-900 text-white ${paddingY} ${className}`.trim();
  const containerStyles = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  if (variant === 'minimal') {
    return (
      <footer className={footerStyles}>
        <div className={`${containerStyles} text-center space-y-4`}>
          <p className="text-gray-400 text-sm">
            {content.copyright}
          </p>
          <div className="flex justify-center space-x-6">
            <Link 
              href="/impressum" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              onClick={createLinkClickHandler('/impressum', 'Impressum')}
            >
              {content.legal.links[0]?.label || 'Impressum'}
            </Link>
            <span className="text-gray-600">|</span>
            <Link 
              href="/datenschutz" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              onClick={createLinkClickHandler('/datenschutz', 'Datenschutz')}
            >
              {content.legal.links[1]?.label || 'Datenschutz'}
            </Link>
          </div>
          <LanguageToggle variant="footer" />
        </div>
      </footer>
    );
  }

  return (
    <footer id="contact" className={footerStyles}>
      <div className={containerStyles}>
        {/* Style Guide v1.0: 3-column layout (Unternehmen / Rechtliches / Kontakt) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* MONOCODE Progressive Construction: Company section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">
              {content.company.title}
            </h3>
            <ul className="space-y-2">
              {content.company.links.map((link, index) => (
                <li key={`company-${index}`}>
                  <Link
                    href={link.href}
                    onClick={createLinkClickHandler(link.href, link.label)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MONOCODE Progressive Construction: Legal section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">
              {content.legal.title}
            </h3>
            <ul className="space-y-2">
              {content.legal.links.map((link, index) => {
                // Special handling for cookie settings link
                if (link.href === '/cookies') {
                  return (
                    <li key={`legal-${index}`}>
                      <button
                        onClick={() => {
                          setIsCookieModalOpen(true);
                          logger.log('info', 'cookieSettingsOpened', { source: 'footer' });
                        }}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  );
                }
                
                return (
                  <li key={`legal-${index}`}>
                    <Link
                      href={link.href}
                      onClick={createLinkClickHandler(link.href, link.label)}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* MONOCODE Progressive Construction: Contact section with real text links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">
              {content.contact.title}
            </h3>
            
            {/* Style Guide v1.0: Contact details as real text with tel/email links */}
            <div className="space-y-3 text-gray-400">
              {/* Address */}
              <div className="whitespace-pre-line">
                {content.contact.address}
              </div>
              
              {/* Phone with tel link */}
              <div>
                <a 
                  href={`tel:${content.contact.phone}`}
                  className="hover:text-white transition-colors duration-200"
                  onClick={createLinkClickHandler(`tel:${content.contact.phone}`, 'Phone')}
                >
                  {content.contact.phone}
                </a>
              </div>
              
              {/* Email with email link */}
              <div>
                <a 
                  href={`mailto:${content.contact.email}`}
                  className="hover:text-white transition-colors duration-200"
                  onClick={createLinkClickHandler(`mailto:${content.contact.email}`, 'Email')}
                >
                  {content.contact.email}
                </a>
              </div>
              
            </div>
          </div>
        </div>

        {/* Style Guide v1.0: Bottom section with copyright and language toggle */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            {content.copyright}
          </p>
          
          {/* Style Guide v1.0: Language toggle repeated in footer (optional) */}
          <LanguageToggle variant="footer" />
        </div>
      </div>
      
      {/* MONOCODE Progressive Construction: Cookie settings modal */}
      <CookieSettingsModal 
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
