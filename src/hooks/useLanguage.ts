/**
 * useLanguage Hook
 * Language switching functionality with localStorage persistence
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { LANGUAGES } from '@/lib/constants';

export type Language = 'de' | 'en';

interface UseLanguageReturn {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  isLanguageSupported: (lang: string) => boolean;
  toggleLanguage: () => void;
  getStoredLanguage: () => Language | null;
  translations: Record<string, unknown> | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for managing language state and translations
 */
export function useLanguage(): UseLanguageReturn {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES.DEFAULT);
  const [translations, setTranslations] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if a language is supported
   */
  const isLanguageSupported = useCallback((lang: string): boolean => {
    return LANGUAGES.SUPPORTED.includes(lang as Language);
  }, []);

  /**
   * Get stored language from localStorage
   */
  const getStoredLanguage = useCallback((): Language | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(LANGUAGES.STORAGE_KEY);
      if (stored && isLanguageSupported(stored)) {
        return stored as Language;
      }
    } catch (error) {
      console.warn('Failed to read language from localStorage:', error);
    }
    
    return null;
  }, [isLanguageSupported]);

  /**
   * Store language in localStorage
   */
  const storeLanguage = useCallback((lang: Language): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(LANGUAGES.STORAGE_KEY, lang);
    } catch (error) {
      console.warn('Failed to store language in localStorage:', error);
    }
  }, []);

  /**
   * Load translations for a specific language
   */
  const loadTranslations = useCallback(async (lang: Language): Promise<Record<string, unknown> | null> => {
    try {
      setIsLoading(true);
      setError(null);

      // Dynamic import of translation files
      const response = await fetch(`/locales/${lang}.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}: ${response.status}`);
      }

      const translationData = await response.json();
      return translationData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error loading translations';
      console.error('Error loading translations:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Set language and persist to localStorage
   */
  const setLanguage = useCallback(async (lang: Language): Promise<void> => {
    if (!isLanguageSupported(lang)) {
      console.warn(`Language ${lang} is not supported`);
      return;
    }

    if (lang === currentLanguage) {
      return; // No change needed
    }

    // Load translations for the new language
    const newTranslations = await loadTranslations(lang);
    
    if (newTranslations) {
      setCurrentLanguage(lang);
      setTranslations(newTranslations);
      storeLanguage(lang);
      
      // Update document lang attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    }
  }, [currentLanguage, isLanguageSupported, loadTranslations, storeLanguage]);

  /**
   * Toggle between supported languages
   */
  const toggleLanguage = useCallback((): void => {
    const currentIndex = LANGUAGES.SUPPORTED.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % LANGUAGES.SUPPORTED.length;
    const nextLanguage = LANGUAGES.SUPPORTED[nextIndex];
    
    setLanguage(nextLanguage);
  }, [currentLanguage, setLanguage]);

  /**
   * Initialize language on mount
   */
  useEffect(() => {
    const initializeLanguage = async () => {
      // Check for stored language preference
      const storedLanguage = getStoredLanguage();
      
      // Determine initial language
      let initialLanguage: Language = LANGUAGES.DEFAULT as Language;
      
      if (storedLanguage) {
        initialLanguage = storedLanguage;
      } else if (typeof navigator !== 'undefined') {
        // Check browser language preference
        const browserLanguage = navigator.language.split('-')[0];
        if (isLanguageSupported(browserLanguage)) {
          initialLanguage = browserLanguage as Language;
        }
      }

      // Load initial translations
      const initialTranslations = await loadTranslations(initialLanguage);
      
      if (initialTranslations) {
        setCurrentLanguage(initialLanguage);
        setTranslations(initialTranslations);
        storeLanguage(initialLanguage);
        
        // Set document lang attribute
        if (typeof document !== 'undefined') {
          document.documentElement.lang = initialLanguage;
        }
      }
    };

    initializeLanguage();
  }, [getStoredLanguage, isLanguageSupported, loadTranslations, storeLanguage]);

  /**
   * Handle storage events (when language changes in another tab)
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LANGUAGES.STORAGE_KEY && event.newValue) {
        const newLanguage = event.newValue;
        if (isLanguageSupported(newLanguage) && newLanguage !== currentLanguage) {
          setLanguage(newLanguage as Language);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentLanguage, isLanguageSupported, setLanguage]);

  /**
   * Listen for same-tab custom languageChange events
   * This ensures components using this hook update immediately when LanguageToggle dispatches the event
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLanguageChange = (event: Event) => {
      const newLanguage = (event as CustomEvent<string>).detail;
      if (typeof newLanguage === 'string' && isLanguageSupported(newLanguage) && newLanguage !== currentLanguage) {
        setLanguage(newLanguage as Language);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [currentLanguage, isLanguageSupported, setLanguage]);

  return {
    currentLanguage,
    setLanguage,
    isLanguageSupported,
    toggleLanguage,
    getStoredLanguage,
    translations,
    isLoading,
    error,
  };
}

/**
 * Translation helper function to use with the hook
 */
export function getTranslation(key: string, translations: Record<string, unknown> | null): string {
  if (!translations) return key;
  
  // Support nested keys like "common.buttons.submit"
  const keys = key.split('.');
  let value: unknown = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export default useLanguage;
