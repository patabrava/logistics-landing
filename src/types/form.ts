// Form Type Definitions for LogisticsCo Landing Page

export interface QuoteFormData {
  // Company Information
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  
  // Service Details
  serviceType: string;
  
  // Pickup Details
  pickupPostalCode: string;
  pickupCity: string;
  pickupCountry: string;
  
  // Delivery Details
  deliveryPostalCode: string;
  deliveryCity: string;
  deliveryCountry: string;
  
  // Shipment Details
  goods: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  pallets: number;
  
  // Timing
  timeFrame: string;
  isRecurring: boolean;
  
  // Special Requirements
  specialRequirements: string;
}

export interface FormValidationErrors {
  company?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  pickupPostalCode?: string;
  pickupCity?: string;
  pickupCountry?: string;
  deliveryPostalCode?: string;
  deliveryCity?: string;
  deliveryCountry?: string;
  goods?: string;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
  };
  weight?: string;
  pallets?: string;
  timeFrame?: string;
  specialRequirements?: string;
}

export interface FormFieldConfig {
  name: keyof QuoteFormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: string | number) => string | undefined;
  };
}

export interface FormState {
  data: QuoteFormData;
  errors: FormValidationErrors;
  isSubmitting: boolean;
  isValid: boolean;
  preselectedService?: string;
}

export interface ServiceTypeOption {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface CountryOption {
  code: string;
  name: string;
  label: string;
}

export interface TimeFrameOption {
  id: string;
  label: string;
  value: string;
}

export interface MailtoConfig {
  to: string;
  subject: string;
  body: string;
}
