// Constants for LogisticsCo Landing Page
// App-wide configuration and constant values

// Company Information
export const COMPANY = {
  NAME: 'NavarroGroup',
  LEGAL_NAME: 'Navarro Group GmbH',
  FOUNDED_YEAR: 1995,
  ADDRESS: {
    STREET: 'Musterstraße 123',
    POSTAL_CODE: '10115',
    CITY: 'Berlin',
    COUNTRY: 'Deutschland',
    COUNTRY_CODE: 'DE'
  },
  CONTACT: {
    PHONE: '+49 30 12345678',
    EMAIL: 'info@logisticsco.de',
    QUOTES_EMAIL: 'quotes@logisticsco.de',
    BUSINESS_HOURS: 'Mo-Fr 8:00-18:00'
  },
  WEBSITE: {
    DOMAIN: 'logisticsco.de',
    URL: 'https://www.logisticsco.de'
  }
} as const;

// Supported Languages
export const LANGUAGES = {
  DEFAULT: 'de',
  SUPPORTED: ['de', 'en'],
  STORAGE_KEY: 'logistics-language-preference'
} as const;

// Analytics Configuration
export const ANALYTICS = {
  GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
  DEBUG_MODE: process.env.NODE_ENV === 'development',
  EVENTS: {
    // Navigation Events
    NAV_QUOTE_CLICK: 'nav_quote_click',
    
    // Hero Events  
    HERO_QUOTE_CLICK: 'hero_quote_click',
    
    // Service Events
    SERVICE_CARD_CLICK: 'service_card_click',
    
    // Industry Events
    INDUSTRY_CARD_CLICK: 'industry_card_click',
    
    // Quote Form Events
    QUOTE_FORM_OPENED: 'quote_form_opened',
    QUOTE_FORM_SUBMITTED: 'quote_form_submitted',
    QUOTE_FORM_ABANDONED: 'quote_form_abandoned',
    MAILTO_INITIATED: 'mailto_initiated',
    
    // General Events
    PAGE_VIEW: 'page_view',
    USER_ACTION: 'user_action',
    SCROLL_DEPTH: 'scroll_depth',
    LANGUAGE_CHANGE: 'language_change',
    FORM_VALIDATION_ERROR: 'form_validation_error'
  }
} as const;

// Form Configuration
export const FORM = {
  VALIDATION: {
    MIN_WEIGHT: 1,
    MAX_WEIGHT: 50000, // kg
    MIN_DIMENSION: 1,
    MAX_DIMENSION: 1000, // cm
    MIN_PALLETS: 0,
    MAX_PALLETS: 100,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
    POSTAL_CODE_REGEX: /^\d{4,6}$/
  },
  MAILTO: {
    SUBJECT_TEMPLATE: 'Angebotsanfrage – {{serviceType}} – {{company}}',
    BODY_TEMPLATE: `Firma: {{company}}
Ansprechpartner: {{contactPerson}}
E-Mail: {{email}}
Telefon: {{phone}}
Service: {{serviceType}}
Abholung: {{pickupPostalCode}}, {{pickupCity}}, {{pickupCountry}}
Zustellung: {{deliveryPostalCode}}, {{deliveryCity}}, {{deliveryCountry}}
Ware: {{goods}}
Maße: {{length}}x{{width}}x{{height}} cm
Gewicht: {{weight}} kg
Paletten: {{pallets}}
Zeitfenster: {{timeFrame}}
Wiederkehrend: {{isRecurring}}
Besondere Anforderungen: {{specialRequirements}}`
  }
} as const;

// API Endpoints (for future backend integration)
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
  ENDPOINTS: {
    QUOTE: '/api/quote',
    CONTACT: '/api/contact',
    NEWSLETTER: '/api/newsletter'
  },
  TIMEOUT: 10000 // ms
} as const;

// UI Configuration
export const UI = {
  ANIMATION: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500
    },
    EASING: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    STAGGER_DELAY: 60 // ms
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280
  },
  SCROLL: {
    OFFSET: 80, // px - offset for scroll-to-section navigation
    SMOOTH_BEHAVIOR: 'smooth'
  }
} as const;

// SEO Configuration
export const SEO = {
  DEFAULT_TITLE: 'NavarroGroup - Zuverlässige Logistik in ganz Europa',
  DEFAULT_DESCRIPTION: 'Professionelle Transportlösungen von Deutschland bis in die EU. Straßentransport, Luftfracht, Seefracht und Lagerlösungen. Angebot innerhalb weniger Stunden.',
  DEFAULT_KEYWORDS: 'Logistik, Transport, Spedition, Europa, Deutschland, Straßentransport, Luftfracht, Seefracht',
  SITE_NAME: 'NavarroGroup',
  TWITTER_HANDLE: '@logisticsco',
  DEFAULT_IMAGE: '/images/og-image.jpg',
  DEFAULT_LOCALE: 'de_DE'
} as const;

// External Services
export const EXTERNAL = {
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
} as const;

// Environment Flags
export const ENV = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test'
} as const;

// Feature Flags
export const FEATURES = {
  ANALYTICS_ENABLED: true,
  CONTACT_FORM_ENABLED: true,
  NEWSLETTER_ENABLED: false,
  LIVE_CHAT_ENABLED: false,
  MULTI_LANGUAGE_ENABLED: true
} as const;

// Error Messages
export const ERRORS = {
  GENERIC: 'Ein unerwarteter Fehler ist aufgetreten',
  NETWORK: 'Netzwerkfehler - bitte versuchen Sie es erneut',
  VALIDATION: 'Bitte überprüfen Sie Ihre Eingaben',
  EMAIL_CLIENT: 'E-Mail-Client konnte nicht geöffnet werden'
} as const;
