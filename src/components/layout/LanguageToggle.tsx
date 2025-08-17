/**
 * LanguageToggle Component
 * DE/EN language switcher with observable state and explicit error handling
 * Following MONOCODE principles: Observable Implementation, Explicit Error Handling
 */

'use client';

import React from 'react';
import { LANGUAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'header' | 'footer' | 'inline';
  showLabels?: boolean;
  onLanguageChange?: (language: string) => void;
}

interface LanguageState {
  current: string;
  isChanging: boolean;
  error: string | null;
}

/**
 * Observable Implementation: Structured logging for language changes
 */
const logLanguageChange = (from: string, to: string, success: boolean, error?: string) => {
  const logData = {
    timestamp: new Date().toISOString(),
    component: 'LanguageToggle',
    action: 'language_change',
    from_language: from,
    to_language: to,
    success,
    error: error || null,
    user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
  };
  
  if (success) {
    console.log('Language changed successfully:', logData);
  } else {
    console.error('Language change failed:', logData);
  }
};

/**
 * Explicit Error Handling: Validate language codes
 */
const validateLanguage = (language: string): { isValid: boolean; error?: string } => {
  if (!language || typeof language !== 'string') {
    return { isValid: false, error: 'Language code must be a non-empty string' };
  }
  
  const validLanguages = [LANGUAGES.DEFAULT, 'en'];
  if (!validLanguages.includes(language)) {
    return { isValid: false, error: `Invalid language code: ${language}. Valid codes: ${validLanguages.join(', ')}` };
  }
  
  return { isValid: true };
};

/**
 * Progressive Construction: Start with basic toggle, extend with persistence
 */
export default function LanguageToggle({ 
  className,
  variant = 'header',
  showLabels = true,
  onLanguageChange
}: LanguageToggleProps) {
  // Deterministic State: Local state with clear initialization
  const [state, setState] = React.useState<LanguageState>({
    current: LANGUAGES.DEFAULT,
    isChanging: false,
    error: null
  });

  // Observable Implementation: Load persisted language on mount
  React.useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('logistics-language') || LANGUAGES.DEFAULT;
      const validation = validateLanguage(savedLanguage);
      
      if (validation.isValid) {
        setState(prev => ({ ...prev, current: savedLanguage }));
        logLanguageChange('system', savedLanguage, true);
      } else {
        console.warn('Invalid saved language, using default:', validation.error);
        setState(prev => ({ ...prev, current: LANGUAGES.DEFAULT, error: validation.error || null }));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown storage error';
      console.error('Failed to load language preference:', errorMessage);
      setState(prev => ({ ...prev, error: errorMessage }));
    }
  }, []);

  // Explicit Error Handling: Graceful language switching with fallbacks
  const handleLanguageChange = React.useCallback(async (newLanguage: string) => {
    const previousLanguage = state.current;
    
    // Fail Fast: Validate input immediately
    const validation = validateLanguage(newLanguage);
    if (!validation.isValid) {
      const error = validation.error || 'Invalid language';
      setState(prev => ({ ...prev, error }));
      logLanguageChange(previousLanguage, newLanguage, false, error);
      return;
    }
    
    // Same language, no change needed
    if (newLanguage === previousLanguage) {
      return;
    }

    setState(prev => ({ ...prev, isChanging: true, error: null }));

    try {
      // Dependency Transparency: Clear localStorage operation
      localStorage.setItem('logistics-language', newLanguage);
      
      // Deterministic State: Update state atomically
      setState(prev => ({ 
        ...prev, 
        current: newLanguage, 
        isChanging: false,
        error: null 
      }));

      // Observable Implementation: Log successful change
      logLanguageChange(previousLanguage, newLanguage, true);
      
      // MONOCODE Progressive Construction: Emit custom event for other components
      if (typeof window !== 'undefined') {
        const languageChangeEvent = new CustomEvent('languageChange', {
          detail: newLanguage
        });
        window.dispatchEvent(languageChangeEvent);
      }
      
      // External callback with error boundary
      if (onLanguageChange) {
        try {
          onLanguageChange(newLanguage);
        } catch (callbackError) {
          const errorMessage = callbackError instanceof Error ? callbackError.message : 'Callback error';
          console.error('Language change callback failed:', errorMessage);
          // Don't revert the language change, just log the callback error
        }
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Graceful Fallbacks: Revert state on storage failure
      setState(prev => ({ 
        ...prev, 
        current: previousLanguage,
        isChanging: false,
        error: `Failed to save language preference: ${errorMessage}`
      }));
      
      logLanguageChange(previousLanguage, newLanguage, false, errorMessage);
    }
  }, [onLanguageChange, state]); // Include state dependency for React hooks compliance

  // Progressive Construction: Simple variant styles
  const getVariantStyles = (currentVariant: string) => {
    const baseStyles = 'inline-flex items-center rounded-md transition-all duration-200';
    
    switch (currentVariant) {
      case 'header':
        return `${baseStyles} bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20`;
      case 'footer':
        return `${baseStyles} bg-gray-800 border border-gray-600 hover:bg-gray-700`;
      case 'inline':
        return `${baseStyles} bg-gray-100 border border-gray-300 hover:bg-gray-200`;
      default:
        return baseStyles;
    }
  };

  const getButtonStyles = (isActive: boolean) => {
    const baseStyles = 'px-3 py-1.5 text-sm font-medium rounded transition-colors duration-200';
    
    if (isActive) {
      switch (variant) {
        case 'header':
          return `${baseStyles} bg-white text-gray-900`;
        case 'footer':
          return `${baseStyles} bg-emerald-600 text-white`;
        case 'inline':
          return `${baseStyles} bg-emerald-600 text-white`;
        default:
          return `${baseStyles} bg-emerald-600 text-white`;
      }
    }
    
    switch (variant) {
      case 'header':
        return `${baseStyles} text-white hover:bg-white/10`;
      case 'footer':
        return `${baseStyles} text-gray-300 hover:text-white hover:bg-gray-600`;
      case 'inline':
        return `${baseStyles} text-gray-600 hover:text-gray-900 hover:bg-gray-50`;
      default:
        return `${baseStyles} text-gray-600 hover:text-gray-900`;
    }
  };

  // Observable Implementation: Error state visibility
  if (state.error) {
    console.warn('LanguageToggle error state:', state.error);
  }

  return (
    <div className={cn('relative', className)} role="group" aria-label="Language selection">
      {/* Explicit Error Handling: Show error state to user */}
      {state.error && (
        <div className="absolute -top-8 left-0 right-0 text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
          {state.error}
        </div>
      )}
      
      <div className={getVariantStyles(variant)}>
        {/* German Language Button */}
        <button
          type="button"
          onClick={() => handleLanguageChange('de')}
          disabled={state.isChanging}
          className={getButtonStyles(state.current === 'de')}
          aria-pressed={state.current === 'de'}
          aria-label="Switch to German"
        >
          {showLabels ? 'DE' : '🇩🇪'}
        </button>
        
        {/* English Language Button */}
        <button
          type="button"
          onClick={() => handleLanguageChange('en')}
          disabled={state.isChanging}
          className={getButtonStyles(state.current === 'en')}
          aria-pressed={state.current === 'en'}
          aria-label="Switch to English"
        >
          {showLabels ? 'EN' : '🇬🇧'}
        </button>
        
        {/* Observable Implementation: Loading indicator */}
        {state.isChanging && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Dependency Transparency: Export current language hook for other components
 */
export function useCurrentLanguage() {
  const [language, setLanguage] = React.useState<string>(LANGUAGES.DEFAULT);
  
  React.useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('logistics-language') || LANGUAGES.DEFAULT;
      const validation = validateLanguage(savedLanguage);
      setLanguage(validation.isValid ? savedLanguage : LANGUAGES.DEFAULT);
    } catch {
      setLanguage(LANGUAGES.DEFAULT);
    }
  }, []);
  
  return language;
}

/**
 * Progressive Construction: Export validation utilities for testing
 */
export { validateLanguage, logLanguageChange };
