'use client';

import React from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';

// MONOCODE Dependency Transparency: Constants for business information
const COMPANY = {
  name: 'LogisticsPro',
  email: 'info@logisticspro.com',
  phone: '+49 123 456 7890'
};

// MONOCODE Principles Applied:
// - Observable Implementation: Structured logging for footer interactions
// - Explicit Error Handling: Validation and fallbacks for all data and links
// - Dependency Transparency: Clear external dependencies documented
// - Progressive Construction: Incremental feature building with variants

// External Dependencies:
// - Next.js Link for navigation
// - LanguageToggle component for language switching
// - useCurrentLanguage hook for localization
// - COMPANY and CONTACT constants for business information

interface FooterProps {
  variant?: 'default' | 'minimal' | 'expanded';
  className?: string;
}

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
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

// MONOCODE Explicit Error Handling: Safe link validation
const validateLink = (link: FooterLink): boolean => {
  try {
    if (!link.href || typeof link.href !== 'string') {
      logger.log('warn', 'validateLink', { 
        issue: 'Invalid href',
        link: link.href
      });
      return false;
    }

    if (!link.label || typeof link.label !== 'string') {
      logger.log('warn', 'validateLink', { 
        issue: 'Invalid label',
        link: link.label
      });
      return false;
    }

    // Basic URL validation for external links
    if (link.external && link.href.startsWith('http')) {
      try {
        new URL(link.href);
      } catch {
        logger.log('warn', 'validateLink', { 
          issue: 'Invalid external URL',
          href: link.href
        });
        return false;
      }
    }

    return true;
  } catch (error) {
    logger.log('error', 'validateLink', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      link
    });
    return false;
  }
};

// MONOCODE Explicit Error Handling: Safe section validation
const validateFooterSection = (section: FooterSection): FooterSection => {
  try {
    const validatedSection = {
      title: section.title || 'Untitled Section',
      links: (section.links || [])
        .filter(link => validateLink(link))
        .map(link => ({
          ...link,
          href: link.href || '#',
          label: link.label || 'Untitled Link'
        }))
    };

    if (validatedSection.links.length !== section.links?.length) {
      logger.log('warn', 'validateFooterSection', {
        originalLinksCount: section.links?.length || 0,
        validLinksCount: validatedSection.links.length,
        title: section.title
      });
    }

    return validatedSection;
  } catch (error) {
    logger.log('error', 'validateFooterSection', {
      error: error instanceof Error ? error.message : 'Unknown error',
      section
    });
    
    return {
      title: 'Error Section',
      links: []
    };
  }
};

// MONOCODE Progressive Construction: Footer content configuration
const getFooterContent = (language: string) => {
  try {
    const isGerman = language === 'de';
    
    const sections: FooterSection[] = [
      {
        title: isGerman ? 'Services' : 'Services',
        links: [
          { href: '/services/transport', label: isGerman ? 'Transport' : 'Transport' },
          { href: '/services/warehousing', label: isGerman ? 'Lagerung' : 'Warehousing' },
          { href: '/services/distribution', label: isGerman ? 'Verteilung' : 'Distribution' },
          { href: '/services/customs', label: isGerman ? 'Zoll' : 'Customs' }
        ]
      },
      {
        title: isGerman ? 'Unternehmen' : 'Company',
        links: [
          { href: '/about', label: isGerman ? 'Über uns' : 'About Us' },
          { href: '/careers', label: isGerman ? 'Karriere' : 'Careers' },
          { href: '/news', label: isGerman ? 'Nachrichten' : 'News' },
          { href: '/contact', label: isGerman ? 'Kontakt' : 'Contact' }
        ]
      },
      {
        title: isGerman ? 'Support' : 'Support',
        links: [
          { href: '/help', label: isGerman ? 'Hilfe' : 'Help' },
          { href: '/tracking', label: isGerman ? 'Sendungsverfolgung' : 'Track Shipment' },
          { href: '/faq', label: isGerman ? 'FAQ' : 'FAQ' },
          { href: '/documentation', label: isGerman ? 'Dokumentation' : 'Documentation' }
        ]
      }
    ];

    const legalLinks: FooterLink[] = [
      { href: '/privacy', label: isGerman ? 'Datenschutz' : 'Privacy Policy' },
      { href: '/terms', label: isGerman ? 'AGB' : 'Terms of Service' },
      { href: '/imprint', label: isGerman ? 'Impressum' : 'Imprint' },
      { href: '/cookies', label: isGerman ? 'Cookie-Richtlinie' : 'Cookie Policy' }
    ];

    const socialLinks: FooterLink[] = [
      { href: 'https://linkedin.com/company/example', label: 'LinkedIn', external: true },
      { href: 'https://twitter.com/example', label: 'Twitter', external: true },
      { href: 'https://facebook.com/example', label: 'Facebook', external: true }
    ];

    return {
      sections: sections.map(validateFooterSection),
      legalLinks: legalLinks.filter(validateLink),
      socialLinks: socialLinks.filter(validateLink),
      copyrightText: isGerman 
        ? `© ${new Date().getFullYear()} ${COMPANY.name}. Alle Rechte vorbehalten.`
        : `© ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.`
    };
  } catch (error) {
    logger.log('error', 'getFooterContent', {
      error: error instanceof Error ? error.message : 'Unknown error',
      language
    });

    // Fallback content
    return {
      sections: [],
      legalLinks: [],
      socialLinks: [],
      copyrightText: `© ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.`
    };
  }
};

// MONOCODE Progressive Construction: Link click handler with tracking
const createLinkClickHandler = (link: FooterLink) => {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      logger.log('info', 'linkClick', {
        href: link.href,
        label: link.label,
        external: link.external,
        timestamp: new Date().toISOString()
      });

      // Additional validation for external links
      if (link.external && !link.href.startsWith('http')) {
        event.preventDefault();
        logger.log('warn', 'linkClick', {
          issue: 'Prevented navigation to invalid external link',
          href: link.href
        });
      }
    } catch (error) {
      logger.log('error', 'linkClick', {
        error: error instanceof Error ? error.message : 'Unknown error',
        link
      });
    }
  };
};

// MONOCODE Progressive Construction: Variant-based styling
const getVariantStyles = (variant: string) => {
  const baseStyles = 'bg-gray-900 text-white border-t border-gray-800';
  
  switch (variant) {
    case 'minimal':
      return `${baseStyles} py-6`;
    case 'expanded':
      return `${baseStyles} py-12`;
    default:
      return `${baseStyles} py-8`;
  }
};

const getContainerStyles = (variant: string) => {
  const baseStyles = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
  
  switch (variant) {
    case 'minimal':
      return `${baseStyles} text-center`;
    case 'expanded':
      return `${baseStyles}`;
    default:
      return `${baseStyles}`;
  }
};

// MONOCODE Progressive Construction: Footer sections component
const FooterSections: React.FC<{ sections: FooterSection[]; variant: string }> = ({ 
  sections, 
  variant 
}) => {
  if (variant === 'minimal' || sections.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {sections.map((section, index) => (
        <div key={`section-${index}`} className="space-y-4">
          <h3 className="font-semibold text-lg text-white">
            {section.title}
          </h3>
          <ul className="space-y-2">
            {section.links.map((link, linkIndex) => (
              <li key={`link-${index}-${linkIndex}`}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={createLinkClickHandler(link)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={createLinkClickHandler(link)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// MONOCODE Progressive Construction: Legal links component
const LegalLinks: React.FC<{ links: FooterLink[]; variant: string }> = ({ 
  links, 
  variant 
}) => {
  if (links.length === 0) {
    return null;
  }

  const containerClass = variant === 'minimal' 
    ? "flex flex-wrap justify-center gap-4 text-sm"
    : "flex flex-wrap gap-4 text-sm";

  return (
    <div className={containerClass}>
      {links.map((link, index) => (
        <React.Fragment key={`legal-${index}`}>
          <Link
            href={link.href}
            onClick={createLinkClickHandler(link)}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            {link.label}
          </Link>
          {index < links.length - 1 && (
            <span className="text-gray-600">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// MONOCODE Progressive Construction: Social links component
const SocialLinks: React.FC<{ links: FooterLink[]; variant: string }> = ({ 
  links, 
  variant 
}) => {
  if (links.length === 0 || variant === 'minimal') {
    return null;
  }

  return (
    <div className="flex space-x-4">
      {links.map((link, index) => (
        <a
          key={`social-${index}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={createLinkClickHandler(link)}
          className="text-gray-400 hover:text-white transition-colors duration-200"
          aria-label={link.label}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

// MONOCODE Observable Implementation: Main Footer component
export const Footer: React.FC<FooterProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  // MONOCODE Dependency Transparency: Hook dependencies
  const currentLanguage = useCurrentLanguage();

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
      
      return {
        sections: [],
        legalLinks: [],
        socialLinks: [],
        copyrightText: `© ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.`
      };
    }
  }, [currentLanguage]);

  // MONOCODE Progressive Construction: Combined styles
  const footerStyles = `${getVariantStyles(variant)} ${className}`.trim();
  const containerStyles = getContainerStyles(variant);

  return (
    <footer className={footerStyles}>
      <div className={containerStyles}>
        {/* MONOCODE Progressive Construction: Main content sections */}
        {variant !== 'minimal' && (
          <div className="space-y-8">
            {/* Company information and language toggle */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">
                  {COMPANY.name}
                </h2>
                <p className="text-gray-400 max-w-md">
                  {currentLanguage === 'de' 
                    ? 'Professionelle Logistiklösungen für Ihre globalen Transportbedürfnisse.'
                    : 'Professional logistics solutions for your global transportation needs.'
                  }
                </p>
              </div>
              
              {/* Language toggle in footer variant */}
              <LanguageToggle variant="footer" />
            </div>

            {/* Footer sections */}
            <FooterSections sections={content.sections} variant={variant} />
          </div>
        )}

        {/* MONOCODE Progressive Construction: Bottom section */}
        <div className={`${variant !== 'minimal' ? 'mt-8 pt-8 border-t border-gray-800' : ''} 
                        flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}>
          
          {/* Copyright and legal links */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
            <p className="text-gray-400 text-sm">
              {content.copyrightText}
            </p>
            <LegalLinks links={content.legalLinks} variant={variant} />
          </div>

          {/* Social links */}
          <SocialLinks links={content.socialLinks} variant={variant} />
        </div>

        {/* MONOCODE Progressive Construction: Minimal variant language toggle */}
        {variant === 'minimal' && (
          <div className="mt-4 flex justify-center">
            <LanguageToggle variant="footer" />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
