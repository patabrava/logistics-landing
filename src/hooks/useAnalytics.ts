/**
 * useAnalytics Hook
 * Analytics event tracking with console logging
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { ANALYTICS } from '@/lib/constants';
import { AnalyticsEvent } from '@/types/analytics';

interface UseAnalyticsReturn {
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => void;
  trackPageView: (pageName: string, properties?: Record<string, unknown>) => void;
  trackUserAction: (action: string, element: string, properties?: Record<string, unknown>) => void;
  trackFormEvent: (formName: string, eventType: 'start' | 'submit' | 'error' | 'abandon', properties?: Record<string, unknown>) => void;
  trackBusinessEvent: (eventType: string, value?: number, properties?: Record<string, unknown>) => void;
  setUserProperties: (properties: Record<string, unknown>) => void;
  isEnabled: boolean;
  debugMode: boolean;
}

/**
 * Custom hook for analytics event tracking
 */
export function useAnalytics(): UseAnalyticsReturn {
  const [isEnabled, setIsEnabled] = useState(false);
  const [debugMode] = useState(ANALYTICS.DEBUG_MODE);
  const [userProperties, setUserPropertiesState] = useState<Record<string, unknown>>({});

  /**
   * Initialize analytics
   */
  useEffect(() => {
    // Check if analytics should be enabled
    const shouldEnable = typeof window !== 'undefined' && 
                        (!!ANALYTICS.GA4_MEASUREMENT_ID || debugMode);
    
    setIsEnabled(shouldEnable);

    if (debugMode) {
      console.log('🔍 Analytics Debug Mode Enabled');
    }
  }, [debugMode]);

  /**
   * Core event tracking function
   */
  const trackEvent = useCallback((eventName: string, properties: Record<string, unknown> = {}): void => {
    if (!isEnabled) return;

    const eventData: AnalyticsEvent = {
      eventName: eventName,
      timestamp: Date.now(),
      parameters: {
        ...userProperties,
        ...properties,
        // Add standard properties
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        page_title: typeof document !== 'undefined' ? document.title : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        language: typeof navigator !== 'undefined' ? navigator.language : 'de',
        screen_resolution: typeof window !== 'undefined' 
          ? `${window.screen.width}x${window.screen.height}` 
          : '',
        viewport_size: typeof window !== 'undefined'
          ? `${window.innerWidth}x${window.innerHeight}`
          : '',
      },
    };

    // Console logging for development
    if (debugMode) {
      console.group(`📊 Analytics Event: ${eventName}`);
      console.log('Event Data:', eventData);
      console.log('Parameters:', eventData.parameters);
      console.groupEnd();
    }

    // Send to Google Analytics 4 (if configured)
    if (typeof window !== 'undefined' && window.gtag && ANALYTICS.GA4_MEASUREMENT_ID) {
      window.gtag('event', eventName, {
        ...properties,
        custom_map: eventData.parameters,
      });
    }

    // Send to other analytics providers here
    // Example: dataLayer, Facebook Pixel, etc.

  }, [isEnabled, debugMode, userProperties]);

  /**
   * Track page views
   */
  const trackPageView = useCallback((pageName: string, properties: Record<string, unknown> = {}): void => {
    trackEvent(ANALYTICS.EVENTS.PAGE_VIEW, {
      page_name: pageName,
      ...properties,
    });
  }, [trackEvent]);

  /**
   * Track user actions (clicks, form interactions, etc.)
   */
  const trackUserAction = useCallback((action: string, element: string, properties: Record<string, unknown> = {}): void => {
    trackEvent(ANALYTICS.EVENTS.USER_ACTION, {
      action,
      element,
      ...properties,
    });
  }, [trackEvent]);

  /**
   * Track form-related events
   */
  const trackFormEvent = useCallback((
    formName: string, 
    eventType: 'start' | 'submit' | 'error' | 'abandon',
    properties: Record<string, unknown> = {}
  ): void => {
    const eventMap = {
      start: ANALYTICS.EVENTS.QUOTE_FORM_OPENED,
      submit: ANALYTICS.EVENTS.QUOTE_FORM_SUBMITTED,
      error: ANALYTICS.EVENTS.FORM_VALIDATION_ERROR,
      abandon: ANALYTICS.EVENTS.QUOTE_FORM_ABANDONED,
    };

    trackEvent(eventMap[eventType], {
      form_name: formName,
      event_type: eventType,
      ...properties,
    });
  }, [trackEvent]);

  /**
   * Track business events (conversions, revenue, etc.)
   */
  const trackBusinessEvent = useCallback((
    eventType: string, 
    value?: number, 
    properties: Record<string, unknown> = {}
  ): void => {
    trackEvent(eventType, {
      value,
      currency: 'EUR',
      ...properties,
    });
  }, [trackEvent]);

  /**
   * Set user properties for all future events
   */
  const setUserProperties = useCallback((properties: Record<string, unknown>): void => {
    setUserPropertiesState(prev => ({
      ...prev,
      ...properties,
    }));

    if (debugMode) {
      console.log('👤 User Properties Updated:', properties);
    }

    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag && ANALYTICS.GA4_MEASUREMENT_ID) {
      window.gtag('config', ANALYTICS.GA4_MEASUREMENT_ID, {
        custom_map: properties,
      });
    }
  }, [debugMode]);

  return {
    trackEvent,
    trackPageView,
    trackUserAction,
    trackFormEvent,
    trackBusinessEvent,
    setUserProperties,
    isEnabled,
    debugMode,
  };
}

/**
 * Hook for tracking specific navigation events
 */
export function useNavigationAnalytics() {
  const { trackUserAction } = useAnalytics();

  const trackNavigation = useCallback((destination: string, source: string = 'navigation') => {
    trackUserAction('navigate', 'navigation_link', {
      destination,
      source,
    });
  }, [trackUserAction]);

  const trackScrollToSection = useCallback((sectionId: string, method: string = 'scroll') => {
    trackUserAction('scroll_to_section', 'section_navigation', {
      section_id: sectionId,
      method,
    });
  }, [trackUserAction]);

  const trackCTAClick = useCallback((ctaText: string, location: string) => {
    trackUserAction('cta_click', 'button', {
      cta_text: ctaText,
      location,
    });
  }, [trackUserAction]);

  return {
    trackNavigation,
    trackScrollToSection,
    trackCTAClick,
  };
}

/**
 * Hook for tracking form analytics
 */
export function useFormAnalytics(formName: string) {
  const { trackFormEvent, trackUserAction } = useAnalytics();
  const [formStartTime, setFormStartTime] = useState<number | null>(null);

  const trackFormStart = useCallback(() => {
    setFormStartTime(Date.now());
    trackFormEvent(formName, 'start');
  }, [formName, trackFormEvent]);

  const trackFormSubmit = useCallback((success: boolean, errorDetails?: string) => {
    const timeSpent = formStartTime ? Date.now() - formStartTime : 0;
    
    if (success) {
      trackFormEvent(formName, 'submit', {
        time_spent_ms: timeSpent,
        time_spent_seconds: Math.round(timeSpent / 1000),
      });
    } else {
      trackFormEvent(formName, 'error', {
        time_spent_ms: timeSpent,
        error_details: errorDetails,
      });
    }
  }, [formName, trackFormEvent, formStartTime]);

  const trackFormAbandon = useCallback(() => {
    const timeSpent = formStartTime ? Date.now() - formStartTime : 0;
    
    trackFormEvent(formName, 'abandon', {
      time_spent_ms: timeSpent,
      time_spent_seconds: Math.round(timeSpent / 1000),
    });
  }, [formName, trackFormEvent, formStartTime]);

  const trackFieldInteraction = useCallback((fieldName: string, action: 'focus' | 'blur' | 'change') => {
    trackUserAction('field_interaction', 'form_field', {
      form_name: formName,
      field_name: fieldName,
      action,
    });
  }, [formName, trackUserAction]);

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormAbandon,
    trackFieldInteraction,
  };
}

/**
 * Hook for tracking performance metrics
 */
export function usePerformanceAnalytics() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    const trackPerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        trackEvent('page_performance', {
          load_time_ms: navigation.loadEventEnd - navigation.loadEventStart,
          dom_content_loaded_ms: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          first_paint_ms: navigation.loadEventEnd - navigation.fetchStart,
          page_load_type: navigation.type,
        });
      }
    };

    // Track performance when page is fully loaded
    if (document.readyState === 'complete') {
      trackPerformance();
    } else {
      window.addEventListener('load', trackPerformance);
      return () => window.removeEventListener('load', trackPerformance);
    }
  }, [trackEvent]);

  const trackCustomTiming = useCallback((name: string, duration: number, description?: string) => {
    trackEvent('custom_timing', {
      timing_name: name,
      duration_ms: duration,
      description,
    });
  }, [trackEvent]);

  return {
    trackCustomTiming,
  };
}

// Global gtag type declaration
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export default useAnalytics;
