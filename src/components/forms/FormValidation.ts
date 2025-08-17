/**
 * Form validation logic for quote requests
 * Provides comprehensive validation for all QuoteFormData fields with German error messages
 */

import { QuoteFormData, FormValidationErrors } from '@/types/form';
import { FORM } from '@/lib/constants';

/**
 * Validation error messages in German
 */
const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Dieses Feld ist erforderlich',
  COMPANY_TOO_SHORT: 'Firmenname muss mindestens 2 Zeichen haben',
  COMPANY_TOO_LONG: 'Firmenname darf maximal 100 Zeichen haben',
  CONTACT_PERSON_TOO_SHORT: 'Name muss mindestens 2 Zeichen haben',
  CONTACT_PERSON_TOO_LONG: 'Name darf maximal 50 Zeichen haben',
  INVALID_EMAIL: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
  INVALID_PHONE: 'Bitte geben Sie eine gültige Telefonnummer ein',
  INVALID_POSTAL_CODE: 'Bitte geben Sie eine gültige Postleitzahl ein (4-6 Ziffern)',
  CITY_TOO_SHORT: 'Stadtname muss mindestens 2 Zeichen haben',
  CITY_TOO_LONG: 'Stadtname darf maximal 50 Zeichen haben',
  COUNTRY_TOO_SHORT: 'Ländername muss mindestens 2 Zeichen haben',
  COUNTRY_TOO_LONG: 'Ländername darf maximal 50 Zeichen haben',
  GOODS_TOO_SHORT: 'Warenbeschreibung muss mindestens 5 Zeichen haben',
  GOODS_TOO_LONG: 'Warenbeschreibung darf maximal 500 Zeichen haben',
  DIMENSION_TOO_SMALL: `Abmessung muss mindestens ${FORM.VALIDATION.MIN_DIMENSION} cm sein`,
  DIMENSION_TOO_LARGE: `Abmessung darf maximal ${FORM.VALIDATION.MAX_DIMENSION} cm sein`,
  WEIGHT_TOO_SMALL: `Gewicht muss mindestens ${FORM.VALIDATION.MIN_WEIGHT} kg sein`,
  WEIGHT_TOO_LARGE: `Gewicht darf maximal ${FORM.VALIDATION.MAX_WEIGHT} kg sein`,
  PALLETS_TOO_SMALL: `Anzahl Paletten muss mindestens ${FORM.VALIDATION.MIN_PALLETS} sein`,
  PALLETS_TOO_LARGE: `Anzahl Paletten darf maximal ${FORM.VALIDATION.MAX_PALLETS} sein`,
  TIMEFRAME_TOO_SHORT: 'Zeitfenster muss mindestens 3 Zeichen haben',
  SPECIAL_REQUIREMENTS_TOO_LONG: 'Besondere Anforderungen dürfen maximal 1000 Zeichen haben',
  INVALID_NUMBER: 'Bitte geben Sie eine gültige Zahl ein',
  SAME_PICKUP_DELIVERY: 'Abholort und Zielort dürfen nicht identisch sein'
} as const;

/**
 * Validates an individual field
 */
export function validateField(fieldName: keyof QuoteFormData, value: any): string | undefined {
  const stringValue = typeof value === 'string' ? value.trim() : String(value || '');
  const numericValue = typeof value === 'number' ? value : parseFloat(stringValue);

  switch (fieldName) {
    case 'company':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      if (stringValue.length < 2) return VALIDATION_MESSAGES.COMPANY_TOO_SHORT;
      if (stringValue.length > 100) return VALIDATION_MESSAGES.COMPANY_TOO_LONG;
      break;

    case 'contactPerson':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      if (stringValue.length < 2) return VALIDATION_MESSAGES.CONTACT_PERSON_TOO_SHORT;
      if (stringValue.length > 50) return VALIDATION_MESSAGES.CONTACT_PERSON_TOO_LONG;
      break;

    case 'email':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      if (!FORM.VALIDATION.EMAIL_REGEX.test(stringValue)) return VALIDATION_MESSAGES.INVALID_EMAIL;
      break;

    case 'phone':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      if (!FORM.VALIDATION.PHONE_REGEX.test(stringValue)) return VALIDATION_MESSAGES.INVALID_PHONE;
      break;

    case 'serviceType':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      break;

    case 'pickupPostalCode':
    case 'deliveryPostalCode':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      if (!FORM.VALIDATION.POSTAL_CODE_REGEX.test(stringValue)) return VALIDATION_MESSAGES.INVALID_POSTAL_CODE;
      break;

    case 'pickupCity':
    case 'deliveryCity':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      if (stringValue.length < 2) return VALIDATION_MESSAGES.CITY_TOO_SHORT;
      if (stringValue.length > 50) return VALIDATION_MESSAGES.CITY_TOO_LONG;
      break;

    case 'pickupCountry':
    case 'deliveryCountry':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      if (stringValue.length < 2) return VALIDATION_MESSAGES.COUNTRY_TOO_SHORT;
      if (stringValue.length > 50) return VALIDATION_MESSAGES.COUNTRY_TOO_LONG;
      break;

    case 'goods':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      if (stringValue.length < 5) return VALIDATION_MESSAGES.GOODS_TOO_SHORT;
      if (stringValue.length > 500) return VALIDATION_MESSAGES.GOODS_TOO_LONG;
      break;

    case 'weight':
      if (isNaN(numericValue) || numericValue <= 0) return VALIDATION_MESSAGES.INVALID_NUMBER;
      if (numericValue < FORM.VALIDATION.MIN_WEIGHT) return VALIDATION_MESSAGES.WEIGHT_TOO_SMALL;
      if (numericValue > FORM.VALIDATION.MAX_WEIGHT) return VALIDATION_MESSAGES.WEIGHT_TOO_LARGE;
      break;

    case 'pallets':
      if (isNaN(numericValue) || numericValue < 0) return VALIDATION_MESSAGES.INVALID_NUMBER;
      if (numericValue < FORM.VALIDATION.MIN_PALLETS) return VALIDATION_MESSAGES.PALLETS_TOO_SMALL;
      if (numericValue > FORM.VALIDATION.MAX_PALLETS) return VALIDATION_MESSAGES.PALLETS_TOO_LARGE;
      break;

    case 'timeFrame':
      if (!stringValue) return VALIDATION_MESSAGES.REQUIRED_FIELD;
      break;

    case 'specialRequirements':
      if (stringValue && stringValue.length > 1000) return VALIDATION_MESSAGES.SPECIAL_REQUIREMENTS_TOO_LONG;
      break;
  }

  return undefined;
}

/**
 * Validates the entire form
 */
export function validateForm(formData: QuoteFormData): FormValidationErrors {
  const errors: FormValidationErrors = {};

  // Validate each field
  (Object.keys(formData) as Array<keyof QuoteFormData>).forEach(fieldName => {
    if (fieldName === 'dimensions') {
      // Handle dimensions separately
      const dimensionErrors: any = {};
      if (formData.dimensions.length < FORM.VALIDATION.MIN_DIMENSION) {
        dimensionErrors.length = VALIDATION_MESSAGES.DIMENSION_TOO_SMALL;
      }
      if (formData.dimensions.width < FORM.VALIDATION.MIN_DIMENSION) {
        dimensionErrors.width = VALIDATION_MESSAGES.DIMENSION_TOO_SMALL;
      }
      if (formData.dimensions.height < FORM.VALIDATION.MIN_DIMENSION) {
        dimensionErrors.height = VALIDATION_MESSAGES.DIMENSION_TOO_SMALL;
      }
      if (Object.keys(dimensionErrors).length > 0) {
        errors.dimensions = dimensionErrors;
      }
    } else {
      const fieldError = validateField(fieldName, formData[fieldName]);
      if (fieldError) {
        (errors as any)[fieldName] = fieldError;
      }
    }
  });

  return errors;
}

/**
 * Gets validation errors as a flat array of strings
 */
export function getErrorMessages(errors: FormValidationErrors): string[] {
  const messages: string[] = [];

  Object.entries(errors).forEach(([field, error]) => {
    if (typeof error === 'string') {
      messages.push(error);
    } else if (typeof error === 'object' && error !== null) {
      Object.values(error).forEach(nestedError => {
        if (typeof nestedError === 'string') {
          messages.push(nestedError);
        }
      });
    }
  });

  return messages;
}
