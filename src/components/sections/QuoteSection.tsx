'use client';

import React from 'react';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';

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
const validateFormData = (data: Partial<FormData>): FormErrors => {
  const errors: FormErrors = {};

  try {
    // Required fields validation
    if (!data.company?.trim()) {
      errors.company = 'Firmenname ist erforderlich';
    }

    if (!data.contact?.trim()) {
      errors.contact = 'Ansprechpartner ist erforderlich';
    }

    if (!data.email?.trim()) {
      errors.email = 'E-Mail-Adresse ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!data.service?.trim()) {
      errors.service = 'Service-Art ist erforderlich';
    }

    if (!data.pickupPostal?.trim()) {
      errors.pickupPostal = 'PLZ Abholung ist erforderlich';
    }

    if (!data.pickupCity?.trim()) {
      errors.pickupCity = 'Ort Abholung ist erforderlich';
    }

    if (!data.deliveryPostal?.trim()) {
      errors.deliveryPostal = 'PLZ Zustellung ist erforderlich';
    }

    if (!data.deliveryCity?.trim()) {
      errors.deliveryCity = 'Ort Zustellung ist erforderlich';
    }

    if (!data.goods?.trim()) {
      errors.goods = 'Warenbeschreibung ist erforderlich';
    }

    logger.log('info', 'formValidation', {
      hasErrors: Object.keys(errors).length > 0,
      errorCount: Object.keys(errors).length,
      fields: Object.keys(data)
    });

    return errors;
  } catch (error) {
    logger.log('error', 'validateFormData', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { general: 'Validierungsfehler aufgetreten' };
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
      title: isGerman ? 'ANGEBOT ANFORDERN' : 'REQUEST QUOTE',
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
      title: 'REQUEST QUOTE',
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

  const baseInputStyles = "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-colors duration-200";
  const inputStyles = error 
    ? `${baseInputStyles} border-red-300 bg-red-50`
    : `${baseInputStyles} border-ink-300 bg-white hover:border-ink-400`;

  if (field.type === 'select') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-ink-700">
          {field.label}
        </label>
        <select
          value={value}
          onChange={handleChange}
          className={inputStyles}
          required={field.required}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-ink-700">
          {field.label}
        </label>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={`${inputStyles} min-h-[120px] resize-y`}
          required={field.required}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink-700">
        {field.label}
      </label>
      <input
        type={field.type}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        className={inputStyles}
        required={field.required}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// MONOCODE Observable Implementation: Main QuoteSection component
export const QuoteSection: React.FC<QuoteSectionProps> = ({ 
  variant = 'default',
  className = '',
  preselectedService
}) => {
  // MONOCODE Dependency Transparency: Hook dependencies
  const currentLanguage = useCurrentLanguage();

  // MONOCODE Progressive Construction: Form state management
  const [formData, setFormData] = React.useState<Partial<FormData>>({});
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showFallback, setShowFallback] = React.useState(false);

  // MONOCODE Progressive Construction: Component setup with logging
  React.useEffect(() => {
    logger.log('info', 'setup', { 
      variant, 
      language: currentLanguage,
      preselectedService
    });

    // Set preselected service from URL params or props
    const urlParams = new URLSearchParams(window.location.search);
    const serviceFromUrl = urlParams.get('service');
    const initialService = serviceFromUrl || preselectedService;

    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
      logger.log('info', 'servicePreselected', { service: initialService });
    }
  }, [variant, currentLanguage, preselectedService]);

  // MONOCODE Explicit Error Handling: Safe content retrieval
  const content = React.useMemo(() => {
    try {
      return getQuoteContent(currentLanguage);
    } catch (error) {
      logger.log('error', 'contentGeneration', {
        error: error instanceof Error ? error.message : 'Unknown error',
        language: currentLanguage
      });
      
      return getQuoteContent('en'); // Fallback to English
    }
  }, [currentLanguage]);

  // MONOCODE Progressive Construction: Form field change handler
  const handleFieldChange = React.useCallback((name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // MONOCODE Progressive Construction: Form submission with mailto fallback
  const handleSubmit = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      logger.log('info', 'formSubmissionStarted', {
        hasRequiredFields: !!(formData.company && formData.email),
        fieldCount: Object.keys(formData).length
      });

      // Validate form data
      const validationErrors = validateFormData(formData);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        logger.log('warn', 'formValidationFailed', { 
          errorCount: Object.keys(validationErrors).length,
          errors: Object.keys(validationErrors)
        });
        return;
      }

      // Generate mailto URL
      const mailtoURL = generateMailtoURL(formData as FormData, currentLanguage);
      
      // Attempt to open mailto
      try {
        window.location.href = mailtoURL;
        
        logger.log('info', 'mailtoInitiated', {
          success: true,
          dataLength: mailtoURL.length
        });
        
        // Show success message briefly
        setTimeout(() => {
          setIsSubmitting(false);
        }, 2000);
        
      } catch (mailtoError) {
        logger.log('error', 'mailtoFailed', {
          error: mailtoError instanceof Error ? mailtoError.message : 'Unknown error'
        });
        
        // Show fallback UI
        setShowFallback(true);
        setIsSubmitting(false);
      }
      
    } catch (error) {
      logger.log('error', 'formSubmission', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      setErrors({ general: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' });
      setIsSubmitting(false);
    }
  }, [formData, currentLanguage]);

  // MONOCODE Progressive Construction: Section styling
  const sectionBaseStyles = "py-20";
  const sectionStyles = variant === 'emphasized' 
    ? `${sectionBaseStyles} bg-gradient-to-br from-brand-50 to-orange-50`
    : `${sectionBaseStyles} bg-gray-50`;

  return (
    <section id="quote" className={`${sectionStyles} ${className}`.trim()}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MONOCODE Progressive Construction: Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-ink-900 mb-4 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-ink-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* MONOCODE Progressive Construction: Quote form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          
          {/* MONOCODE Progressive Construction: Fallback banner */}
          {showFallback && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                {currentLanguage === 'de' 
                  ? 'E-Mail-Client konnte nicht geöffnet werden. Bitte senden Sie Ihre Anfrage an: '
                  : 'Email client could not be opened. Please send your request to: '
                }
                <strong>quotes@logisticspro.com</strong>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* MONOCODE Progressive Construction: Form fields grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Company Information */}
              <FormField
                name="company"
                field={content.fields.company}
                value={formData.company || ''}
                error={errors.company}
                onChange={handleFieldChange}
              />
              
              <FormField
                name="contact"
                field={content.fields.contact}
                value={formData.contact || ''}
                error={errors.contact}
                onChange={handleFieldChange}
              />
              
              <FormField
                name="email"
                field={content.fields.email}
                value={formData.email || ''}
                error={errors.email}
                onChange={handleFieldChange}
              />
              
              <FormField
                name="phone"
                field={content.fields.phone}
                value={formData.phone || ''}
                error={errors.phone}
                onChange={handleFieldChange}
              />
            </div>

            {/* Service Selection */}
            <FormField
              name="service"
              field={content.fields.service}
              value={formData.service || ''}
              error={errors.service}
              onChange={handleFieldChange}
            />

            {/* Pickup and Delivery */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-ink-900 border-b border-ink-200 pb-2">
                  {currentLanguage === 'de' ? 'Abholung' : 'Pickup'}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="pickupPostal"
                    field={content.fields.pickupPostal}
                    value={formData.pickupPostal || ''}
                    error={errors.pickupPostal}
                    onChange={handleFieldChange}
                  />
                  
                  <FormField
                    name="pickupCity"
                    field={content.fields.pickupCity}
                    value={formData.pickupCity || ''}
                    error={errors.pickupCity}
                    onChange={handleFieldChange}
                  />
                </div>
                
                <FormField
                  name="pickupCountry"
                  field={content.fields.pickupCountry}
                  value={formData.pickupCountry || ''}
                  error={errors.pickupCountry}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-ink-900 border-b border-ink-200 pb-2">
                  {currentLanguage === 'de' ? 'Zustellung' : 'Delivery'}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="deliveryPostal"
                    field={content.fields.deliveryPostal}
                    value={formData.deliveryPostal || ''}
                    error={errors.deliveryPostal}
                    onChange={handleFieldChange}
                  />
                  
                  <FormField
                    name="deliveryCity"
                    field={content.fields.deliveryCity}
                    value={formData.deliveryCity || ''}
                    error={errors.deliveryCity}
                    onChange={handleFieldChange}
                  />
                </div>
                
                <FormField
                  name="deliveryCountry"
                  field={content.fields.deliveryCountry}
                  value={formData.deliveryCountry || ''}
                  error={errors.deliveryCountry}
                  onChange={handleFieldChange}
                />
              </div>
            </div>

            {/* Shipment Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-ink-900 border-b border-ink-200 pb-2">
                {currentLanguage === 'de' ? 'Sendungsdetails' : 'Shipment Details'}
              </h3>
              
              <FormField
                name="goods"
                field={content.fields.goods}
                value={formData.goods || ''}
                error={errors.goods}
                onChange={handleFieldChange}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  name="dimensions"
                  field={content.fields.dimensions}
                  value={formData.dimensions || ''}
                  error={errors.dimensions}
                  onChange={handleFieldChange}
                />
                
                <FormField
                  name="weight"
                  field={content.fields.weight}
                  value={formData.weight || ''}
                  error={errors.weight}
                  onChange={handleFieldChange}
                />
                
                <FormField
                  name="pallets"
                  field={content.fields.pallets}
                  value={formData.pallets || ''}
                  error={errors.pallets}
                  onChange={handleFieldChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="timeframe"
                  field={content.fields.timeframe}
                  value={formData.timeframe || ''}
                  error={errors.timeframe}
                  onChange={handleFieldChange}
                />
                
                <FormField
                  name="recurring"
                  field={content.fields.recurring}
                  value={formData.recurring || ''}
                  error={errors.recurring}
                  onChange={handleFieldChange}
                />
              </div>
              
              <FormField
                name="requirements"
                field={content.fields.requirements}
                value={formData.requirements || ''}
                error={errors.requirements}
                onChange={handleFieldChange}
              />
            </div>

            {/* MONOCODE Progressive Construction: General error display */}
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{errors.general}</p>
              </div>
            )}

            {/* MONOCODE Progressive Construction: Submit button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                data-analytics="mailto_initiated"
                className="w-full lg:w-auto lg:ml-auto lg:block px-8 py-4 bg-brand-600 hover:bg-brand-500 disabled:bg-gray-400 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:translate-y-px focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {currentLanguage === 'de' ? 'Wird gesendet...' : 'Sending...'}
                  </span>
                ) : (
                  content.submitButtonText
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
