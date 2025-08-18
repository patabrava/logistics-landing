/**
 * Header Component
 * Main navigation header with sticky positioning and mobile support
 * Following MONOCODE principles: Observable Implementation, Explicit Error Handling
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import LanguageToggle, { useCurrentLanguage } from './LanguageToggle';

interface HeaderProps {
  className?: string;
  variant?: 'default' | 'transparent' | 'solid';
  showCTA?: boolean;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

interface HeaderState {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string | null;
  error: string | null;
}

/**
 * Observable Implementation: Structured logging for navigation events
 */
const logNavigationEvent = (action: string, target: string, success: boolean, error?: string) => {
  const logData = {
    timestamp: new Date().toISOString(),
    component: 'Header',
    action,
    target,
    success,
    error: error || null,
    user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
  };
  
  if (success) {
    console.log('Navigation event:', logData);
  } else {
    console.error('Navigation failed:', logData);
  }
};

/**
 * Explicit Error Handling: Validate navigation targets
 */
const validateNavigationTarget = (href: string): { isValid: boolean; error?: string } => {
  if (!href || typeof href !== 'string') {
    return { isValid: false, error: 'Navigation href must be a non-empty string' };
  }
  
  // Allow relative paths, absolute URLs, and anchor links
  if (href.startsWith('/') || href.startsWith('#') || href.startsWith('http')) {
    return { isValid: true };
  }
  
  return { isValid: false, error: `Invalid navigation href format: ${href}` };
};

/**
 * Progressive Construction: Navigation items configuration
 */
const getNavigationItems = (language: string): NavigationItem[] => {
  const isGerman = language === 'de';
  
  return [
    {
      id: 'services',
      label: isGerman ? 'Leistungen' : 'Services',
      href: '#services'
    },
    {
      id: 'about',
      label: isGerman ? 'Über uns' : 'About',
      href: '#about'
    },
    {
      id: 'contact',
      label: isGerman ? 'Kontakt' : 'Contact',
      href: '#contact'
    },
    {
      id: 'quote',
      label: isGerman ? 'Angebot' : 'Quote',
      href: '#quote'
    }
  ];
};

/**
 * Progressive Construction: Main Header component
 */
export default function Header({ 
  className,
  variant = 'default',
  showCTA = true
}: HeaderProps) {
  const currentLanguage = useCurrentLanguage();
  
  // Deterministic State: Local state with clear initialization
  const [state, setState] = React.useState<HeaderState>({
    isScrolled: false,
    isMobileMenuOpen: false,
    activeSection: null,
    error: null
  });

  // Observable Implementation: Scroll detection for sticky behavior
  React.useEffect(() => {
    let mounted = true;
    
    const handleScroll = () => {
      if (!mounted) return;
      
      try {
        const scrolled = window.scrollY > 50;
        setState(prev => ({ ...prev, isScrolled: scrolled, error: null }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Scroll detection error';
        setState(prev => ({ ...prev, error: errorMessage }));
        console.error('Header scroll detection failed:', errorMessage);
      }
    };

    // Explicit Error Handling: Safe event listener setup
    try {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Event listener setup error';
      setState(prev => ({ ...prev, error: errorMessage }));
    }

    return () => {
      mounted = false;
      try {
        window.removeEventListener('scroll', handleScroll);
      } catch (error) {
        console.warn('Failed to remove scroll listener:', error);
      }
    };
  }, []);

  // Explicit Error Handling: Safe navigation with error boundaries
  const handleNavigation = React.useCallback((item: NavigationItem, event?: React.MouseEvent) => {
    const validation = validateNavigationTarget(item.href);
    if (!validation.isValid) {
      setState(prev => ({ ...prev, error: validation.error || null }));
      logNavigationEvent('click', item.href, false, validation.error);
      return;
    }

    try {
      // Close mobile menu on navigation
      setState(prev => ({ ...prev, isMobileMenuOpen: false, error: null }));
      
      // Handle anchor links with smooth scrolling
      if (item.href.startsWith('#')) {
        event?.preventDefault();
        const targetId = item.href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          setState(prev => ({ ...prev, activeSection: targetId }));
          logNavigationEvent('scroll_to_section', targetId, true);
        } else {
          console.warn(`Target section not found: ${targetId}`);
          logNavigationEvent('scroll_to_section', targetId, false, 'Target not found');
        }
      } else {
        logNavigationEvent('external_navigation', item.href, true);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Navigation error';
      setState(prev => ({ ...prev, error: errorMessage }));
      logNavigationEvent('click', item.href, false, errorMessage);
    }
  }, []);

  // Progressive Construction: Mobile menu toggle
  const toggleMobileMenu = React.useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isMobileMenuOpen: !prev.isMobileMenuOpen,
      error: null
    }));
  }, []);

  // Dependency Transparency: Navigation items based on current language
  const navigationItems = React.useMemo(() => 
    getNavigationItems(currentLanguage), 
    [currentLanguage]
  );

  // Progressive Construction: Dynamic styling based on variant and scroll state
  const getHeaderStyles = () => {
    const baseStyles = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
    
    if (variant === 'transparent' && !state.isScrolled) {
      return `${baseStyles} bg-transparent`;
    }
    
    if (variant === 'solid' || state.isScrolled) {
      return `${baseStyles} bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200`;
    }
    
    return `${baseStyles} bg-white shadow-sm border-b border-gray-100`;
  };

  const getLogoStyles = () => {
    const baseStyles = 'flex items-center transition-all duration-300';
    
    if (variant === 'transparent' && !state.isScrolled) {
      return `${baseStyles} opacity-90 hover:opacity-100`;
    }
    
    return `${baseStyles} opacity-100 hover:opacity-90`;
  };

  const getNavLinkStyles = (isActive: boolean = false) => {
    const baseStyles = 'px-4 py-2 rounded-md transition-all duration-200 font-medium';
    
    if (variant === 'transparent' && !state.isScrolled) {
      return isActive 
        ? `${baseStyles} text-white bg-white/20`
        : `${baseStyles} text-white/90 hover:text-white hover:bg-white/10`;
    }
    
    return isActive
      ? `${baseStyles} text-emerald-600 bg-emerald-50`
      : `${baseStyles} text-gray-700 hover:text-emerald-600 hover:bg-gray-50`;
  };

  // Observable Implementation: Error state visibility
  if (state.error) {
    console.warn('Header error state:', state.error);
  }

  return (
    <header className={cn(getHeaderStyles(), className)}>
      {/* Explicit Error Handling: Show error state to user */}
      {state.error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2">
          <p className="text-sm text-red-600 text-center">
            Navigation error: {state.error}
          </p>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Company Logo */}
          <div className="flex items-center">
            <Link 
              href="/"
              className={getLogoStyles()}
              onClick={() => logNavigationEvent('logo_click', '/', true)}
              aria-label={`${COMPANY.NAME} - Home`}
            >
              <Image
                src="/ChatGPT Image 18. Aug. 2025, 03_01_25.png"
                alt={`${COMPANY.NAME} Logo`}
                width={48}
                height={48}
                className="h-10 w-auto transition-all duration-300"
                priority
              />
              <span className="ml-3 font-bold text-xl">
                {COMPANY.NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavigation(item, e)}
                className={getNavLinkStyles(state.activeSection === item.id)}
                aria-current={state.activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle 
              variant={variant === 'transparent' && !state.isScrolled ? 'header' : 'inline'}
            />
            
            {showCTA && (
              <button
                onClick={(e) => handleNavigation({ id: 'cta', label: 'CTA', href: '#quote' }, e)}
                className={cn(
                  'px-6 py-2 rounded-md font-medium transition-all duration-200',
                  variant === 'transparent' && !state.isScrolled
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                )}
              >
                {currentLanguage === 'de' ? 'Angebot erhalten' : 'Get Quote'}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className={cn(
                'p-2 rounded-md transition-colors duration-200',
                variant === 'transparent' && !state.isScrolled
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
              aria-expanded={state.isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={cn(
                  'block w-full h-0.5 bg-current transform transition-transform duration-200',
                  state.isMobileMenuOpen && 'rotate-45 translate-y-1.5'
                )} />
                <span className={cn(
                  'block w-full h-0.5 bg-current transition-opacity duration-200',
                  state.isMobileMenuOpen && 'opacity-0'
                )} />
                <span className={cn(
                  'block w-full h-0.5 bg-current transform transition-transform duration-200',
                  state.isMobileMenuOpen && '-rotate-45 -translate-y-1.5'
                )} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          'md:hidden transition-all duration-300 overflow-hidden',
          state.isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        )}>
          <nav className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavigation(item, e)}
                className={cn(
                  'text-left px-4 py-3 rounded-md transition-colors duration-200',
                  state.activeSection === item.id
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                )}
              >
                {item.label}
              </button>
            ))}
            
            {showCTA && (
              <button
                onClick={(e) => handleNavigation({ id: 'mobile-cta', label: 'Mobile CTA', href: '#quote' }, e)}
                className="mt-4 px-4 py-3 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors duration-200"
              >
                {currentLanguage === 'de' ? 'Angebot erhalten' : 'Get Quote'}
              </button>
            )}
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              <LanguageToggle variant="inline" />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

/**
 * Progressive Construction: Export navigation utilities for testing
 */
export { validateNavigationTarget, logNavigationEvent, getNavigationItems };
