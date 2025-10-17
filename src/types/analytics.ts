// Analytics Type Definitions for LogisticsCo Landing Page

export interface AnalyticsEvent {
  eventName: string;
  parameters?: Record<string, string | number | boolean>;
  timestamp?: number;
}

export interface NavigationEvent extends AnalyticsEvent {
  eventName: 'nav_quote_click';
  parameters: {
    section: 'header' | 'footer';
    page_location: string;
  };
}

export interface HeroEvent extends AnalyticsEvent {
  eventName: 'hero_quote_click';
  parameters: {
    cta_type: 'primary' | 'secondary';
    page_location: string;
  };
}

export interface ServiceEvent extends AnalyticsEvent {
  eventName: 'service_card_click';
  parameters: {
    service_type: string;
    service_id: string;
    page_location: string;
  };
}

export interface IndustryEvent extends AnalyticsEvent {
  eventName: 'industry_card_click';
  parameters: {
    industry_type: string;
    industry_id: string;
    page_location: string;
  };
}

export interface QuoteFormEvent extends AnalyticsEvent {
  eventName: 'quote_form_opened';
  parameters: {
    referrer_section: 'hero' | 'services' | 'industries' | 'nav' | 'direct';
    preselected_service?: string;
    page_location: string;
  };
}

export interface MailtoEvent extends AnalyticsEvent {
  eventName: 'mailto_initiated';
  parameters: {
    service_type: string;
    form_completion_rate: number;
    page_location: string;
  };
}

export interface PageViewEvent extends AnalyticsEvent {
  eventName: 'page_view';
  parameters: {
    page_title: string;
    page_location: string;
    page_referrer?: string;
  };
}

export interface ScrollEvent extends AnalyticsEvent {
  eventName: 'scroll_depth';
  parameters: {
    scroll_depth: number;
    page_location: string;
  };
}

export interface LanguageEvent extends AnalyticsEvent {
  eventName: 'language_change';
  parameters: {
    from_language: 'de' | 'en';
    to_language: 'de' | 'en';
    page_location: string;
  };
}

export interface ErrorEvent extends AnalyticsEvent {
  eventName: 'form_validation_error';
  parameters: {
    error_field: string;
    error_type: string;
    error_message: string;
    page_location: string;
  };
}

// Union type of all possible analytics events
export type AnyAnalyticsEvent = 
  | NavigationEvent
  | HeroEvent
  | ServiceEvent
  | IndustryEvent
  | QuoteFormEvent
  | MailtoEvent
  | PageViewEvent
  | ScrollEvent
  | LanguageEvent
  | ErrorEvent;

// Analytics configuration
export interface AnalyticsConfig {
  measurementId: string;
  enableDebug: boolean;
  trackingConsent: boolean;
}

// Analytics provider interface
export interface AnalyticsProvider {
  initialize: (config: AnalyticsConfig) => void;
  trackEvent: (event: AnyAnalyticsEvent) => void;
  trackPageView: (event: PageViewEvent) => void;
  setUserProperties: (properties: Record<string, string>) => void;
}
