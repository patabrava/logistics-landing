'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';

// MONOCODE Dependency Transparency: Clear external dependencies documented
// External Dependencies:
// - Lucide React for icons
// - useCurrentLanguage hook for localization

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

// MONOCODE Observable Implementation: Structured logging system
const logger = {
  log: (level: 'info' | 'warn' | 'error', context: string, data?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: `CookieSettingsModal.${context}`,
      ...data
    };
    
    if (typeof window !== 'undefined') {
      console.log(`[${timestamp}] CookieSettingsModal.${context}:`, data || '');
    }
    
    return logEntry;
  }
};

// MONOCODE Explicit Error Handling: Safe content retrieval with fallbacks
const getCookieContent = (language: string) => {
  const isGerman = language === 'de';
  
  return {
    title: isGerman ? 'Cookie-Einstellungen' : 'Cookie Settings',
    description: isGerman 
      ? 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Sie können auswählen, welche Kategorien von Cookies Sie zulassen möchten.'
      : 'We use cookies to improve your experience on our website. You can choose which categories of cookies you want to allow.',
    categories: {
      necessary: {
        title: isGerman ? 'Notwendige Cookies' : 'Necessary Cookies',
        description: isGerman
          ? 'Diese Cookies sind für das Funktionieren der Website unerlässlich und können nicht deaktiviert werden.'
          : 'These cookies are essential for the website to function and cannot be disabled.',
        required: true
      },
      analytics: {
        title: isGerman ? 'Analyse-Cookies' : 'Analytics Cookies',
        description: isGerman
          ? 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden.'
          : 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.'
      },
      marketing: {
        title: isGerman ? 'Marketing-Cookies' : 'Marketing Cookies',
        description: isGerman
          ? 'Diese Cookies werden verwendet, um Besuchern relevante Werbung und Marketingkampagnen anzuzeigen.'
          : 'These cookies are used to show visitors relevant advertising and marketing campaigns.'
      },
      preferences: {
        title: isGerman ? 'Präferenz-Cookies' : 'Preference Cookies',
        description: isGerman
          ? 'Diese Cookies ermöglichen es der Website, sich an Ihre Auswahl zu erinnern (z. B. Sprache oder Region).'
          : 'These cookies allow the website to remember choices you make (such as language or region).'
      }
    },
    buttons: {
      acceptAll: isGerman ? 'Alle akzeptieren' : 'Accept All',
      acceptSelected: isGerman ? 'Auswahl speichern' : 'Save Selection',
      rejectAll: isGerman ? 'Alle ablehnen' : 'Reject All',
      close: isGerman ? 'Schließen' : 'Close'
    }
  };
};

// MONOCODE Explicit Error Handling: Safe localStorage operations
const saveCookiePreferences = (preferences: CookiePreferences) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
      logger.log('info', 'preferencesSaved', { preferences });
    }
  } catch (error) {
    logger.log('error', 'saveFailed', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

const loadCookiePreferences = (): CookiePreferences | null => {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cookiePreferences');
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch (error) {
    logger.log('error', 'loadFailed', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
  return null;
};

export const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const currentLanguage = useCurrentLanguage();
  const content = getCookieContent(currentLanguage);
  
  // MONOCODE Progressive Construction: State management with defaults
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  // MONOCODE Observable Implementation: Load saved preferences on mount
  useEffect(() => {
    const saved = loadCookiePreferences();
    if (saved) {
      setPreferences(saved);
    }
  }, []);

  // MONOCODE Explicit Error Handling: Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      logger.log('info', 'modalOpened');
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // MONOCODE Progressive Construction: Handle preference toggle
  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return; // Cannot toggle necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
    
    logger.log('info', 'preferenceToggled', { category, value: !preferences[category] });
  };

  // MONOCODE Observable Implementation: Handle save actions
  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setPreferences(allAccepted);
    saveCookiePreferences(allAccepted);
    logger.log('info', 'acceptedAll');
    onClose();
  };

  const handleRejectAll = () => {
    const allRejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setPreferences(allRejected);
    saveCookiePreferences(allRejected);
    logger.log('info', 'rejectedAll');
    onClose();
  };

  const handleSaveSelected = () => {
    saveCookiePreferences(preferences);
    logger.log('info', 'savedSelected', { preferences });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Style Guide v1.0: Modal overlay with backdrop blur */}
      <div 
        className="fixed inset-0 bg-ink-900/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Style Guide v1.0: Modal container following design tokens */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-fade-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Style Guide v1.0: Modal header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-ink-100">
            <h2 
              id="cookie-modal-title"
              className="text-2xl font-bold text-ink-900"
            >
              {content.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-ink-100 transition-colors duration-200 focus-ring"
              aria-label={content.buttons.close}
            >
              <X className="w-6 h-6 text-ink-700" />
            </button>
          </div>

          {/* Style Guide v1.0: Modal content with scroll */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            <p className="text-ink-700 mb-6 leading-relaxed">
              {content.description}
            </p>

            {/* Style Guide v1.0: Cookie categories with toggle switches */}
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="border border-ink-200 rounded-2xl p-5 bg-ink-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-900 mb-1">
                      {content.categories.necessary.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">
                      {content.categories.necessary.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-emerald-500 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-60">
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
                <span className="text-xs text-ink-500 font-medium">
                  {currentLanguage === 'de' ? 'Immer aktiv' : 'Always active'}
                </span>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-ink-200 rounded-2xl p-5 hover:border-brand-400 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-900 mb-1">
                      {content.categories.analytics.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">
                      {content.categories.analytics.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('analytics')}
                    className={`ml-4 w-12 h-6 rounded-full flex items-center transition-all duration-300 focus-ring ${
                      preferences.analytics 
                        ? 'bg-emerald-500 justify-end' 
                        : 'bg-ink-300 justify-start'
                    }`}
                    role="switch"
                    aria-checked={preferences.analytics}
                    aria-label={content.categories.analytics.title}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm mx-1" />
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-ink-200 rounded-2xl p-5 hover:border-brand-400 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-900 mb-1">
                      {content.categories.marketing.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">
                      {content.categories.marketing.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('marketing')}
                    className={`ml-4 w-12 h-6 rounded-full flex items-center transition-all duration-300 focus-ring ${
                      preferences.marketing 
                        ? 'bg-emerald-500 justify-end' 
                        : 'bg-ink-300 justify-start'
                    }`}
                    role="switch"
                    aria-checked={preferences.marketing}
                    aria-label={content.categories.marketing.title}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm mx-1" />
                  </button>
                </div>
              </div>

              {/* Preference Cookies */}
              <div className="border border-ink-200 rounded-2xl p-5 hover:border-brand-400 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-900 mb-1">
                      {content.categories.preferences.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">
                      {content.categories.preferences.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('preferences')}
                    className={`ml-4 w-12 h-6 rounded-full flex items-center transition-all duration-300 focus-ring ${
                      preferences.preferences 
                        ? 'bg-emerald-500 justify-end' 
                        : 'bg-ink-300 justify-start'
                    }`}
                    role="switch"
                    aria-checked={preferences.preferences}
                    aria-label={content.categories.preferences.title}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm mx-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Style Guide v1.0: Modal footer with action buttons */}
          <div className="p-6 border-t border-ink-100 bg-ink-50">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-emerald-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-emerald-400 transition-colors duration-200 focus-ring"
              >
                {content.buttons.acceptAll}
              </button>
              <button
                onClick={handleSaveSelected}
                className="flex-1 bg-brand-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-brand-500 transition-colors duration-200 focus-ring"
              >
                {content.buttons.acceptSelected}
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 bg-white text-ink-700 font-semibold py-3 px-6 rounded-full border border-ink-300 hover:bg-ink-50 transition-colors duration-200 focus-ring"
              >
                {content.buttons.rejectAll}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieSettingsModal;
