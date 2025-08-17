/**
 * useScrollToSection Hook
 * Smooth scrolling navigation functionality
 */

'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { UI } from '@/lib/constants';

interface UseScrollToSectionReturn {
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
  currentSection: string | null;
  isScrolling: boolean;
  registerSection: (sectionId: string, elementRef: HTMLElement | null) => void;
  unregisterSection: (sectionId: string) => void;
}

/**
 * Custom hook for smooth scrolling navigation and section tracking
 */
export function useScrollToSection(): UseScrollToSectionReturn {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [registeredSections, setRegisteredSections] = useState<Map<string, HTMLElement>>(new Map());
  
  // Use ref to access current registeredSections without dependency issues
  const registeredSectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  
  // Keep ref in sync with state
  useEffect(() => {
    registeredSectionsRef.current = registeredSections;
  }, [registeredSections]);

  /**
   * Scroll to a specific section by ID
   */
  const scrollToSection = useCallback((sectionId: string): void => {
    const element = document.getElementById(sectionId);
    
    if (!element) {
      console.warn(`Section with ID "${sectionId}" not found`);
      return;
    }

    setIsScrolling(true);

    // Calculate scroll position with offset
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - UI.SCROLL.OFFSET;

    // Smooth scroll to the position
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: UI.SCROLL.SMOOTH_BEHAVIOR as ScrollBehavior,
    });

    // Update URL hash without triggering a page jump
    if (typeof window !== 'undefined' && window.history) {
      const newUrl = `${window.location.pathname}${window.location.search}#${sectionId}`;
      window.history.pushState({ sectionId }, '', newUrl);
    }

    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 800); // Approximate scroll animation duration
  }, []);

  /**
   * Scroll to top of page
   */
  const scrollToTop = useCallback((): void => {
    setIsScrolling(true);

    window.scrollTo({
      top: 0,
      behavior: UI.SCROLL.SMOOTH_BEHAVIOR as ScrollBehavior,
    });

    // Clear URL hash
    if (typeof window !== 'undefined' && window.history) {
      const newUrl = `${window.location.pathname}${window.location.search}`;
      window.history.pushState({}, '', newUrl);
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  }, []);

  /**
   * Register a section element for tracking
   */
  const registerSection = useCallback((sectionId: string, elementRef: HTMLElement | null): void => {
    if (elementRef) {
      setRegisteredSections(prev => {
        // Check if the section is already registered with the same element to prevent unnecessary updates
        if (prev.get(sectionId) === elementRef) {
          return prev;
        }
        const newMap = new Map(prev);
        newMap.set(sectionId, elementRef);
        return newMap;
      });
    }
  }, []); // Keep empty dependencies since we use functional state update

  /**
   * Unregister a section element
   */
  const unregisterSection = useCallback((sectionId: string): void => {
    setRegisteredSections(prev => {
      if (!prev.has(sectionId)) {
        return prev; // No change needed if section doesn't exist
      }
      const newMap = new Map(prev);
      newMap.delete(sectionId);
      return newMap;
    });
  }, []); // Keep empty dependencies since we use functional state update

  /**
   * Determine which section is currently in view
   */
  const updateCurrentSection = useCallback((): void => {
    if (isScrolling || registeredSectionsRef.current.size === 0) return;

    const scrollPosition = window.scrollY + UI.SCROLL.OFFSET + 100; // Extra offset for better detection
    let currentSectionId: string | null = null;

    // Find the section that's currently in view
    for (const [sectionId, element] of registeredSectionsRef.current.entries()) {
      const sectionTop = element.offsetTop;
      const sectionBottom = sectionTop + element.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionId = sectionId;
        break;
      }
    }

    // If no section matches, check if we're near the top
    if (!currentSectionId && window.scrollY < 100) {
      // Find the first section
      const firstSection = Array.from(registeredSectionsRef.current.keys()).sort()[0];
      currentSectionId = firstSection || null;
    }

    // If no section matches and we're near the bottom, use the last section
    if (!currentSectionId) {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollBottom = window.scrollY + windowHeight;

      if (scrollBottom >= documentHeight - 100) {
        const lastSection = Array.from(registeredSectionsRef.current.keys()).sort().pop();
        currentSectionId = lastSection || null;
      }
    }

    setCurrentSection(prev => {
      if (prev !== currentSectionId) {
        return currentSectionId;
      }
      return prev;
    });
  }, [isScrolling]); // Only depend on isScrolling, use ref for registeredSections

  /**
   * Handle hash changes (e.g., from browser back/forward)
   */
  const handleHashChange = useCallback((): void => {
    const hash = window.location.hash.slice(1); // Remove the '#'
    
    if (hash && registeredSectionsRef.current.has(hash)) {
      scrollToSection(hash);
    }
  }, [scrollToSection]); // Remove registeredSections dependency, use ref instead

  /**
   * Throttled scroll event handler
   */
  const handleScroll = useCallback((): void => {
    updateCurrentSection();
  }, [updateCurrentSection]);

  /**
   * Setup scroll event listeners and hash change listeners
   */
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const throttledScrollHandler = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScroll, 100); // Throttle to 100ms
    };

    // Add event listeners
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    window.addEventListener('hashchange', handleHashChange);

    // Handle initial hash on mount
    if (typeof window !== 'undefined') {
      const initialHash = window.location.hash.slice(1);
      if (initialHash) {
        // Delay to ensure DOM is ready
        setTimeout(() => {
          scrollToSection(initialHash);
        }, 100);
      }
    }

    // Cleanup
    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleScroll, handleHashChange, scrollToSection]);

  /**
   * Update current section when registered sections change
   */
  useEffect(() => {
    if (registeredSections.size > 0) {
      // Use a timeout to avoid synchronous state updates during render
      const timeoutId = setTimeout(() => {
        updateCurrentSection();
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [registeredSections.size, updateCurrentSection]); // Only depend on size to avoid circular deps

  return {
    scrollToSection,
    scrollToTop,
    currentSection,
    isScrolling,
    registerSection,
    unregisterSection,
  };
}

/**
 * Hook for individual sections to register themselves
 */
export function useSectionRef(sectionId: string) {
  const { registerSection, unregisterSection } = useScrollToSection();

  const ref = useCallback((element: HTMLElement | null) => {
    if (element) {
      registerSection(sectionId, element);
    } else {
      // Unregister when element is null (component unmounting)
      unregisterSection(sectionId);
    }
  }, [sectionId, registerSection, unregisterSection]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      unregisterSection(sectionId);
    };
  }, [sectionId, unregisterSection]);

  return ref;
}

/**
 * Navigation link helper component hook
 */
export function useNavigationLink(targetSection: string) {
  const { scrollToSection, currentSection } = useScrollToSection();

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    scrollToSection(targetSection);
  }, [scrollToSection, targetSection]);

  const isActive = currentSection === targetSection;

  return {
    handleClick,
    isActive,
    href: `#${targetSection}`,
  };
}

export default useScrollToSection;
