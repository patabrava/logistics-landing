/**
 * useFormState Hook
 * Quote form state management with validation
 */

'use client';

import { useState, useCallback } from 'react';
import { QuoteFormData, FormValidationErrors } from '@/types/form';
import { FORM } from '@/lib/constants';

interface UseFormStateReturn {
  formData: QuoteFormData;
  errors: FormValidationErrors;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  touchedFields: Set<keyof QuoteFormData>;
  updateField: (field: keyof QuoteFormData, value: string | number) => void;
  validateField: (field: keyof QuoteFormData) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  markFieldTouched: (field: keyof QuoteFormData) => void;
  getFieldError: (field: keyof QuoteFormData) => string | undefined;
  hasFieldError: (field: keyof QuoteFormData) => boolean;
  setSubmitting: (submitting: boolean) => void;
}

const initialFormData: QuoteFormData = {
  // Company Information
  company: '',
  contactPerson: '',
  email: '',
  phone: '',
  
  // Service Details
  serviceType: '',
  
  // Pickup Details
  pickupPostalCode: '',
  pickupCity: '',
  pickupCountry: '',
  
  // Delivery Details
  deliveryPostalCode: '',
  deliveryCity: '',
  deliveryCountry: '',
  
  // Shipment Details
  goods: '',
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  weight: 0,
  pallets: 0,
  
  // Timing
  timeFrame: '',
  isRecurring: false,
  
  // Special Requirements
  specialRequirements: '',
};

/**
 * Custom hook for managing quote form state and validation
 */
export function useFormState(): UseFormStateReturn {
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<keyof QuoteFormData>>(new Set());

  /**
   * Validate email format
   */
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  /**
   * Validate phone format (German format)
   */
  const validatePhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^(\+49|0)[1-9]\d{8,11}$/;
    return phoneRegex.test(phone.replace(/[\s\-]/g, ''));
  }, []);

  /**
   * Validate required field
   */
  const validateRequired = useCallback((value: string): boolean => {
    return value.trim().length >= 1; // Basic required field validation
  }, []);

  /**
   * Validate specific field
   */
  const validateField = useCallback((field: keyof QuoteFormData): void => {
    const newErrors = { ...errors };
    const fieldValue = formData[field];

    // Clear existing error for this field (only if it exists in FormValidationErrors)
    if (field in newErrors) {
      delete (newErrors as Record<string, unknown>)[field];
    }

    switch (field) {
      case 'company':
        if (!validateRequired(fieldValue as string)) {
          newErrors.company = 'Firmenname ist erforderlich';
        } else if ((fieldValue as string).length < 2) {
          newErrors.company = 'Firmenname muss mindestens 2 Zeichen haben';
        }
        break;

      case 'contactPerson':
        if (!validateRequired(fieldValue as string)) {
          newErrors.contactPerson = 'Ansprechpartner ist erforderlich';
        } else if ((fieldValue as string).length < 2) {
          newErrors.contactPerson = 'Name muss mindestens 2 Zeichen haben';
        }
        break;

      case 'email':
        if (!validateRequired(fieldValue as string)) {
          newErrors.email = 'E-Mail ist erforderlich';
        } else if (!validateEmail(fieldValue as string)) {
          newErrors.email = 'Ungültige E-Mail-Adresse';
        }
        break;

      case 'phone':
        if (!validateRequired(fieldValue as string)) {
          newErrors.phone = 'Telefonnummer ist erforderlich';
        } else if (!validatePhone(fieldValue as string)) {
          newErrors.phone = 'Ungültige Telefonnummer (deutsches Format erwartet)';
        }
        break;

      case 'serviceType':
        if (!validateRequired(fieldValue as string)) {
          newErrors.serviceType = 'Service-Typ ist erforderlich';
        }
        break;

      case 'pickupPostalCode':
        if (!validateRequired(fieldValue as string)) {
          newErrors.pickupPostalCode = 'PLZ für Abholung ist erforderlich';
        }
        break;

      case 'deliveryPostalCode':
        if (!validateRequired(fieldValue as string)) {
          newErrors.deliveryPostalCode = 'PLZ für Lieferung ist erforderlich';
        }
        break;

      case 'goods':
        if (!validateRequired(fieldValue as string)) {
          newErrors.goods = 'Warenbeschreibung ist erforderlich';
        }
        break;

      case 'weight':
        if (typeof fieldValue === 'number' && fieldValue <= 0) {
          newErrors.weight = 'Gewicht muss größer als 0 sein';
        } else if (typeof fieldValue === 'number' && fieldValue > FORM.VALIDATION.MAX_WEIGHT) {
          newErrors.weight = `Gewicht darf ${FORM.VALIDATION.MAX_WEIGHT}kg nicht überschreiten`;
        }
        break;

      case 'timeFrame':
        if (!validateRequired(fieldValue as string)) {
          newErrors.timeFrame = 'Zeitrahmen ist erforderlich';
        }
        break;
    }

    setErrors(newErrors);
  }, [errors, formData, validateEmail, validatePhone, validateRequired]);

  /**
   * Validate entire form
   */
  const validateForm = useCallback((): boolean => {
    const fieldsToValidate: (keyof QuoteFormData)[] = [
      'company',
      'contactPerson', 
      'email',
      'phone',
      'serviceType',
      'pickupPostalCode',
      'deliveryPostalCode',
      'goods',
      'weight',
      'timeFrame'
    ];

    fieldsToValidate.forEach(validateField);

    // Check if there are any errors after validation
    return Object.keys(errors).length === 0;
  }, [errors, validateField]);

  /**
   * Update a specific field
   */
  const updateField = useCallback((field: keyof QuoteFormData, value: string | number): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    setIsDirty(true);
    
    // Auto-validate field after update if it was touched
    if (touchedFields.has(field)) {
      setTimeout(() => validateField(field), 100);
    }
  }, [touchedFields, validateField]);

  /**
   * Mark a field as touched
   */
  const markFieldTouched = useCallback((field: keyof QuoteFormData): void => {
    setTouchedFields(prev => new Set([...prev, field]));
  }, []);

  /**
   * Get error for a specific field
   */
  const getFieldError = useCallback((field: keyof QuoteFormData): string | undefined => {
    return (errors as Record<string, unknown>)[field] as string | undefined;
  }, [errors]);

  /**
   * Check if field has error
   */
  const hasFieldError = useCallback((field: keyof QuoteFormData): boolean => {
    return Boolean((errors as Record<string, unknown>)[field]);
  }, [errors]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback((): void => {
    setFormData(initialFormData);
    setErrors({});
    setIsDirty(false);
    setTouchedFields(new Set());
    setIsSubmitting(false);
  }, []);

  /**
   * Set submitting state
   */
  const setSubmitting = useCallback((submitting: boolean): void => {
    setIsSubmitting(submitting);
  }, []);

  /**
   * Calculate if form is valid
   */
  const isValid = Object.keys(errors).length === 0 && isDirty;

  return {
    formData,
    errors,
    isValid,
    isSubmitting,
    isDirty,
    touchedFields,
    updateField,
    validateField,
    validateForm,
    resetForm,
    markFieldTouched,
    getFieldError,
    hasFieldError,
    setSubmitting,
  };
}

export default useFormState;
