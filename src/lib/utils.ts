// Utility Functions for LogisticsCo Landing Page
// General-purpose helper functions used throughout the application

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number for display
 * @param phone - Raw phone number string
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Basic formatting for German phone numbers
  if (cleaned.startsWith('+49')) {
    const number = cleaned.slice(3);
    if (number.length >= 10) {
      return `+49 ${number.slice(0, 2)} ${number.slice(2, 4)}${number.slice(4, 6)}${number.slice(6, 8)}${number.slice(8)}`;
    }
  }
  
  return cleaned;
}

/**
 * Format weight for display
 * @param weight - Weight in kg
 * @returns Formatted weight string
 */
export function formatWeight(weight: number): string {
  if (!weight || weight <= 0) return '0 kg';
  
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(1)} t`;
  }
  
  return `${weight} kg`;
}

/**
 * Format dimensions for display
 * @param length - Length in cm
 * @param width - Width in cm  
 * @param height - Height in cm
 * @returns Formatted dimensions string
 */
export function formatDimensions(length: number, width: number, height: number): string {
  if (!length || !width || !height) return '';
  return `${length} × ${width} × ${height} cm`;
}

/**
 * Calculate volume from dimensions
 * @param length - Length in cm
 * @param width - Width in cm
 * @param height - Height in cm
 * @returns Volume in cubic meters
 */
export function calculateVolume(length: number, width: number, height: number): number {
  if (!length || !width || !height || length <= 0 || width <= 0 || height <= 0) {
    return 0;
  }
  
  // Convert cm³ to m³
  return (length * width * height) / 1000000;
}

/**
 * Format volume for display
 * @param volume - Volume in cubic meters
 * @returns Formatted volume string
 */
export function formatVolume(volume: number): string {
  if (!volume || volume <= 0) return '0 m³';
  
  if (volume < 1) {
    return `${(volume * 1000).toFixed(0)} l`;
  }
  
  return `${volume.toFixed(2)} m³`;
}

/**
 * Validate email address
 * @param email - Email string to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate phone number
 * @param phone - Phone string to validate
 * @returns Boolean indicating if phone is valid
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  
  const phoneRegex = /^\+?[\d\s\-\(\)]{8,}$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Validate postal code
 * @param postalCode - Postal code to validate
 * @returns Boolean indicating if postal code is valid
 */
export function isValidPostalCode(postalCode: string): boolean {
  if (!postalCode || typeof postalCode !== 'string') return false;
  
  const postalRegex = /^\d{4,6}$/;
  return postalRegex.test(postalCode.trim());
}

/**
 * Sanitize string input for safe display
 * @param input - Raw string input
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
}

/**
 * Generate URL-safe slug from string
 * @param text - Text to convert to slug
 * @returns URL-safe slug
 */
export function createSlug(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[äöüß]/g, (char) => {
      const map: Record<string, string> = {
        'ä': 'ae',
        'ö': 'oe', 
        'ü': 'ue',
        'ß': 'ss'
      };
      return map[char] || char;
    })
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Debounce function to limit function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function to limit function calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Format currency for display
 * @param amount - Amount in cents
 * @param currency - Currency code (default: EUR)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  if (!amount || isNaN(amount)) return `0,00 ${currency}`;
  
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  });
  
  return formatter.format(amount / 100);
}

/**
 * Format date for display
 * @param date - Date object or ISO string
 * @param locale - Locale for formatting (default: de-DE)
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale: string = 'de-DE'): string {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) return '';
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(dateObj);
  } catch {
    return '';
  }
}

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 * @param value - Value to check
 * @returns Boolean indicating if value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length === 0;
  return false;
}

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as unknown as T;
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

/**
 * Generate a random ID string
 * @param length - Length of the ID (default: 8)
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}

/**
 * Smooth scroll to element with ID
 * @param elementId - ID of element to scroll to
 * @param offset - Offset in pixels (default: 80)
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found`);
      return;
    }
    
    const targetPosition = element.offsetTop - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  } catch (error) {
    console.error('Error scrolling to element:', error);
  }
}
