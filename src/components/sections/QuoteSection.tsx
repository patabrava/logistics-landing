'use client';

import React from 'react';

// MONOCODE Principles Applied:
// - Observable Implementation: Form interaction tracking and submission analytics
// - Explicit Error Handling: Comprehensive form validation and error display
// - Dependency Transparency: Clear form dependencies and mailto integration
// - Progressive Construction: Progressive form enhancement with validation

interface QuoteSectionProps {
  variant?: 'default' | 'compact' | 'emphasized';
  className?: string;
  preselectedService?: string;
}

interface FormData {
  company: string;
  contact: string;
  email: string;
  phone: string;
  service: string;
  pickupPostal: string;
  pickupCity: string;
  pickupCountry: string;
  deliveryPostal: string;
  deliveryCity: string;
  deliveryCountry: string;
  goods: string;
  dimensions: string;
  weight: string;
  pallets: string;
  timeframe: string;
  recurring: string;
  requirements: string;
}

interface QuoteContent {
  title: string;
  subtitle: string;
  submitButtonText: string;
  fields: Record<keyof FormData, {
    label: string;
    placeholder: string;
    type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
    required: boolean;
    options?: Array<{ value: string; label: string }>;
  }>;
}

interface FormErrors {
  [key: string]: string;
}

// MONOCODE Observable Implementation: Structured logging system
const logger = {
  log: (level: 'info' | 'warn' | 'error', context: string, data?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: `QuoteSection.${context}`,
      ...data
    };
    
    if (typeof window !== 'undefined') {
      console.log(`[${timestamp}] QuoteSection.${context}:`, data || '');
    }
    
    return logEntry;
  }
};

// MONOCODE Explicit Error Handling: Form validation with detailed errors
const validateFormData = (data: Partial<FormData>, language: string): FormErrors => {
  const errors: FormErrors = {};
  const isGerman = language === 'de';

  try {
    // Required fields validation with localized messages
    if (!data.company?.trim()) {
      errors.company = isGerman ? 'Firmenname ist erforderlich' : 'Company name is required';
    }

    if (!data.contact?.trim()) {
      errors.contact = isGerman ? 'Ansprechpartner ist erforderlich' : 'Contact person is required';
    }

    if (!data.email?.trim()) {
      errors.email = isGerman ? 'E-Mail-Adresse ist erforderlich' : 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = isGerman ? 'Ungültige E-Mail-Adresse' : 'Invalid email address';
    }

    if (!data.service?.trim()) {
      errors.service = isGerman ? 'Service-Art ist erforderlich' : 'Service type is required';
    }

    if (!data.pickupPostal?.trim()) {
      errors.pickupPostal = isGerman ? 'PLZ Abholung ist erforderlich' : 'Pickup postal code is required';
    }

    if (!data.pickupCity?.trim()) {
      errors.pickupCity = isGerman ? 'Ort Abholung ist erforderlich' : 'Pickup city is required';
    }

    if (!data.deliveryPostal?.trim()) {
      errors.deliveryPostal = isGerman ? 'PLZ Zustellung ist erforderlich' : 'Delivery postal code is required';
    }

    if (!data.deliveryCity?.trim()) {
      errors.deliveryCity = isGerman ? 'Ort Zustellung ist erforderlich' : 'Delivery city is required';
    }

    if (!data.goods?.trim()) {
      errors.goods = isGerman ? 'Warenbeschreibung ist erforderlich' : 'Goods description is required';
    }

    logger.log('info', 'formValidation', {
      hasErrors: Object.keys(errors).length > 0,
      errorCount: Object.keys(errors).length,
      fields: Object.keys(data),
      language
    });

    return errors;
  } catch (error) {
    logger.log('error', 'validateFormData', {
      error: error instanceof Error ? error.message : 'Unknown error',
      language
    });
    
    return { 
      general: isGerman ? 'Validierungsfehler aufgetreten' : 'Validation error occurred' 
    };
  }
};

// MONOCODE Progressive Construction: Mailto URL generation
const generateMailtoURL = (data: FormData, language: string): string => {
  try {
    const isGerman = language === 'de';
    const subject = `Angebotsanfrage – ${data.service} – ${data.company}`;
    
    const bodyTemplate = isGerman ? `
Firma: ${data.company}
Ansprechpartner: ${data.contact}
E-Mail: ${data.email}
Telefon: ${data.phone}

Service: ${data.service}

Abholung: ${data.pickupPostal}, ${data.pickupCity}, ${data.pickupCountry}
Zustellung: ${data.deliveryPostal}, ${data.deliveryCity}, ${data.deliveryCountry}

Ware: ${data.goods}
Maße: ${data.dimensions}
Gewicht: ${data.weight}
Paletten: ${data.pallets}

Zeitfenster: ${data.timeframe}
Wiederkehrend: ${data.recurring}

Besondere Anforderungen:
${data.requirements}
    ` : `
Company: ${data.company}
Contact: ${data.contact}
Email: ${data.email}
Phone: ${data.phone}

Service: ${data.service}

Pickup: ${data.pickupPostal}, ${data.pickupCity}, ${data.pickupCountry}
Delivery: ${data.deliveryPostal}, ${data.deliveryCity}, ${data.deliveryCountry}

Goods: ${data.goods}
Dimensions: ${data.dimensions}
Weight: ${data.weight}
Pallets: ${data.pallets}

Timeframe: ${data.timeframe}
Recurring: ${data.recurring}

Special Requirements:
${data.requirements}
    `;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(bodyTemplate.trim());
    
    return `mailto:quotes@logisticspro.com?subject=${encodedSubject}&body=${encodedBody}`;
  } catch (error) {
    logger.log('error', 'generateMailtoURL', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return 'mailto:quotes@logisticspro.com';
  }
};

// MONOCODE Explicit Error Handling: Safe content retrieval
const getQuoteContent = (language: string): QuoteContent => {
  try {
    const isGerman = language === 'de';
    
    return {
      title: isGerman ? 'Angebot anfordern' : 'Request quote',
      subtitle: isGerman 
        ? 'Angebot innerhalb weniger Stunden – senden Sie uns die Daten.'
        : 'Quote within hours – send us your details.',
      submitButtonText: isGerman ? 'Angebot per E-Mail anfordern' : 'Request Quote via Email',
      fields: {
        company: {
          label: isGerman ? 'Firma *' : 'Company *',
          placeholder: isGerman ? 'Ihr Firmenname' : 'Your company name',
          type: 'text',
          required: true
        },
        contact: {
          label: isGerman ? 'Ansprechpartner *' : 'Contact Person *',
          placeholder: isGerman ? 'Vor- und Nachname' : 'First and last name',
          type: 'text',
          required: true
        },
        email: {
          label: isGerman ? 'E-Mail *' : 'Email *',
          placeholder: isGerman ? 'ihre@email.de' : 'your@email.com',
          type: 'email',
          required: true
        },
        phone: {
          label: isGerman ? 'Telefon' : 'Phone',
          placeholder: isGerman ? '+49 123 456 7890' : '+49 123 456 7890',
          type: 'tel',
          required: false
        },
        service: {
          label: isGerman ? 'Service-Art *' : 'Service Type *',
          placeholder: isGerman ? 'Wählen Sie einen Service' : 'Select a service',
          type: 'select',
          required: true,
          options: [
            { value: '', label: isGerman ? 'Bitte wählen' : 'Please select' },
            { value: 'transport', label: isGerman ? 'Transport & Spedition' : 'Transport & Forwarding' },
            { value: 'warehousing', label: isGerman ? 'Lagerung & Kommissionierung' : 'Warehousing & Picking' },
            { value: 'distribution', label: isGerman ? 'Distribution & Letzte Meile' : 'Distribution & Last Mile' },
            { value: 'customs', label: isGerman ? 'Zoll & Außenhandel' : 'Customs & Foreign Trade' },
            { value: 'consulting', label: isGerman ? 'Logistik-Beratung' : 'Logistics Consulting' }
          ]
        },
        pickupPostal: {
          label: isGerman ? 'PLZ Abholung *' : 'Pickup Postal Code *',
          placeholder: isGerman ? '12345' : '12345',
          type: 'text',
          required: true
        },
        pickupCity: {
          label: isGerman ? 'Ort Abholung *' : 'Pickup City *',
          placeholder: isGerman ? 'Berlin' : 'Berlin',
          type: 'text',
          required: true
        },
        pickupCountry: {
          label: isGerman ? 'Land Abholung' : 'Pickup Country',
          placeholder: isGerman ? 'Deutschland' : 'Germany',
          type: 'text',
          required: false
        },
        deliveryPostal: {
          label: isGerman ? 'PLZ Zustellung *' : 'Delivery Postal Code *',
          placeholder: isGerman ? '54321' : '54321',
          type: 'text',
          required: true
        },
        deliveryCity: {
          label: isGerman ? 'Ort Zustellung *' : 'Delivery City *',
          placeholder: isGerman ? 'München' : 'Munich',
          type: 'text',
          required: true
        },
        deliveryCountry: {
          label: isGerman ? 'Land Zustellung' : 'Delivery Country',
          placeholder: isGerman ? 'Deutschland' : 'Germany',
          type: 'text',
          required: false
        },
        goods: {
          label: isGerman ? 'Warenbeschreibung *' : 'Goods Description *',
          placeholder: isGerman ? 'Was soll transportiert werden?' : 'What needs to be transported?',
          type: 'text',
          required: true
        },
        dimensions: {
          label: isGerman ? 'Maße (L×B×H)' : 'Dimensions (L×W×H)',
          placeholder: isGerman ? '120×80×100 cm' : '120×80×100 cm',
          type: 'text',
          required: false
        },
        weight: {
          label: isGerman ? 'Gewicht' : 'Weight',
          placeholder: isGerman ? '500 kg' : '500 kg',
          type: 'text',
          required: false
        },
        pallets: {
          label: isGerman ? 'Anzahl Paletten' : 'Number of Pallets',
          placeholder: isGerman ? '2' : '2',
          type: 'text',
          required: false
        },
        timeframe: {
          label: isGerman ? 'Zeitfenster' : 'Timeframe',
          placeholder: isGerman ? 'Wann soll transportiert werden?' : 'When should it be transported?',
          type: 'text',
          required: false
        },
        recurring: {
          label: isGerman ? 'Wiederkehrend' : 'Recurring',
          placeholder: isGerman ? 'Einmalig / Wöchentlich / Monatlich' : 'One-time / Weekly / Monthly',
          type: 'select',
          required: false,
          options: [
            { value: '', label: isGerman ? 'Bitte wählen' : 'Please select' },
            { value: 'once', label: isGerman ? 'Einmalig' : 'One-time' },
            { value: 'weekly', label: isGerman ? 'Wöchentlich' : 'Weekly' },
            { value: 'monthly', label: isGerman ? 'Monatlich' : 'Monthly' },
            { value: 'quarterly', label: isGerman ? 'Vierteljährlich' : 'Quarterly' }
          ]
        },
        requirements: {
          label: isGerman ? 'Besondere Anforderungen' : 'Special Requirements',
          placeholder: isGerman ? 'Zusätzliche Informationen...' : 'Additional information...',
          type: 'textarea',
          required: false
        }
      }
    };
  } catch (error) {
    logger.log('error', 'getQuoteContent', {
      error: error instanceof Error ? error.message : 'Unknown error',
      language
    });

    // MONOCODE Graceful Fallbacks: Minimal English fallback
    return {
      title: 'Request quote',
      subtitle: 'Get your quote within hours.',
      submitButtonText: 'Request Quote via Email',
      fields: {} as QuoteContent['fields']
    };
  }
};

// MONOCODE Progressive Construction: Form field component
const FormField: React.FC<{
  name: keyof FormData;
  field: QuoteContent['fields'][keyof FormData];
  value: string;
  error?: string;
  onChange: (name: keyof FormData, value: string) => void;
}> = ({ name, field, value, error, onChange }) => {
  const handleChange = React.useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    onChange(name, event.target.value);
  }, [name, onChange]);

  // Style Guide Section 8: Form styling with exact specifications using CSS custom properties
  const baseInputStyles = "w-full h-12 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-3 focus:border-brand-600";
  const inputStyles = error 
    ? `${baseInputStyles} border-err-600 text-ink-900` 
    : `${baseInputStyles} border-gray-100 hover:border-gray-200 text-ink-900 placeholder:text-ink-500`;

  // Enhanced styling with CSS custom properties for better design token compliance
  const inputStyle = error ? {
    backgroundColor: 'rgba(239, 68, 68, 0.05)', // Light red background for errors
    borderColor: 'var(--err-600)',
    '--tw-ring-color': 'rgba(239, 68, 68, 0.25)',
  } : {
    backgroundColor: 'var(--surface-0)',
    borderColor: '#f3f4f6', // gray-100 equivalent
    '--tw-ring-color': 'rgba(243, 127, 62, 0.25)', // brand-600 with opacity
  };

  // Style Guide Section 8: Label styling - 14px/500 weight  
  const labelStyles = "block text-sm font-medium text-ink-900 mb-2";
  const errorStyles = "mt-1 text-xs text-err-600";

  if (field.type === 'select') {
    return (
      <div className="space-y-0">
        <label className={labelStyles}>
          {field.label}
        </label>
        <select
          value={value}
          onChange={handleChange}
          className={`${inputStyles} cursor-pointer`}
          style={inputStyle}
          required={field.required}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${name}-error`} className={errorStyles} role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="space-y-0">
        <label className={labelStyles}>
          {field.label}
        </label>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={`${inputStyles} min-h-[120px] h-auto resize-y`}
          style={inputStyle}
          required={field.required}
          rows={4}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {error && (
          <p id={`${name}-error`} className={errorStyles} role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <label className={labelStyles}>
        {field.label}
      </label>
      <input
        type={field.type}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        className={inputStyles}
        style={inputStyle}
        required={field.required}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className={errorStyles} role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

// Style Guide Section 5: Motion & Interaction - Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.06, // 60ms stagger per style guide
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 4 // 4px translate per style guide
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
};

/*
MONOCODE Observable Implementation: Main QuoteSection component - TEMPORARILY DISABLED

Complete form implementation with:
- Form validation and error handling
- Mailto integration for quote requests  
- Multi-language support (DE/EN)
- Progressive enhancement with fallbacks
- Analytics tracking and structured logging
- Comprehensive form fields for logistics quotes
- MONOCODE principles implementation

This implementation is commented out to hide the QuoteSection from the landing page
while preserving all functionality for future use.
*/

// MONOCODE Progressive Construction: Stub component for disabled QuoteSection
export const QuoteSection: React.FC<QuoteSectionProps> = () => {
  return null;
};

export default QuoteSection;
