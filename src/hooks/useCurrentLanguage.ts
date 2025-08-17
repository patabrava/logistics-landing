'use client';

import { useState, useEffect } from 'react';

// MONOCODE Principles Applied:
// - Observable Implementation: Language state changes are tracked and logged
// - Explicit Error Handling: Fallbacks for localStorage access and validation
// - Dependency Transparency: Clear browser API dependencies
// - Progressive Construction: Simple hook that can be extended

export type Language = 'en' | 'de';

const DEFAULT_LANGUAGE: Language = 'en';
const STORAGE_KEY = 'preferred-language';

// MONOCODE Observable Implementation: Language change logging
const logLanguageAccess = (language: Language, source: 'localStorage' | 'default' | 'fallback') => {
  if (typeof window !== 'undefined') {
    console.log(`[${new Date().toISOString()}] useCurrentLanguage: Retrieved language "${language}" from ${source}`);
  }
};

// MONOCODE Explicit Error Handling: Safe localStorage access
const getStoredLanguage = (): Language => {
  try {
    if (typeof window === 'undefined') {
      logLanguageAccess(DEFAULT_LANGUAGE, 'default');
      return DEFAULT_LANGUAGE;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'en' || stored === 'de')) {
      logLanguageAccess(stored as Language, 'localStorage');
      return stored as Language;
    }

    logLanguageAccess(DEFAULT_LANGUAGE, 'fallback');
    return DEFAULT_LANGUAGE;
  } catch (error) {
    console.warn('Failed to access localStorage for language preference:', error);
    logLanguageAccess(DEFAULT_LANGUAGE, 'fallback');
    return DEFAULT_LANGUAGE;
  }
};

// MONOCODE Progressive Construction: Current language hook
export const useCurrentLanguage = (): Language => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  // MONOCODE Observable Implementation: Initialize and listen for changes
  useEffect(() => {
    // Get initial language
    const initialLanguage = getStoredLanguage();
    setCurrentLanguage(initialLanguage);

    // MONOCODE Progressive Construction: Listen for language changes
    const handleLanguageChange = (event: CustomEvent<Language>) => {
      const newLanguage = event.detail;
      if (newLanguage === 'en' || newLanguage === 'de') {
        setCurrentLanguage(newLanguage);
        logLanguageAccess(newLanguage, 'default');
      }
    };

    // MONOCODE Dependency Transparency: Custom event listener for language changes
    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  return currentLanguage;
};

export default useCurrentLanguage;
