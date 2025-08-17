'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, AlertCircle } from 'lucide-react';
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
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceFromUrl = urlParams.get('service');
      const initialService = serviceFromUrl || preselectedService;

      if (initialService) {
        setFormData(prev => ({ ...prev, service: initialService }));
        logger.log('info', 'servicePreselected', { service: initialService });
      }
    }
  }, [variant, currentLanguage, preselectedService]);

  // Style Guide Section 11: Analytics tracking for form interaction
  React.useEffect(() => {
    const handleFirstInteraction = () => {
      logger.log('info', 'quote_form_opened', { 
        timestamp: new Date().toISOString(),
        language: currentLanguage
      });
      
      // Remove listener after first interaction
      document.removeEventListener('focusin', handleFirstInteraction);
    };

    // Track first focus in form
    document.addEventListener('focusin', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('focusin', handleFirstInteraction);
    };
  }, [currentLanguage]);

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
      const validationErrors = validateFormData(formData, currentLanguage);
      
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
      
      setErrors({ 
        general: currentLanguage === 'de' 
          ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' 
          : 'An error occurred. Please try again.'
      });
      setIsSubmitting(false);
    }
  }, [formData, currentLanguage]);

  // MONOCODE Progressive Construction: Section styling per Style Guide Section 6.12
  const sectionBaseStyles = "py-20 lg:py-24"; // Style Guide Section 4: Section rhythm 80-120px
  const sectionStyles = variant === 'emphasized' 
    ? `${sectionBaseStyles} bg-gradient-to-br from-brand-50 to-orange-50`
    : `${sectionBaseStyles} bg-ink-100`; // Light section per Style Guide

  return (
    // Style Guide Section 6.12: Quote Module - anchor id #quote  
    <section id="quote" className={`${sectionStyles} ${className}`.trim()}>
      {/* Style Guide Section 4: Container max-width 1280px, centered, 24px gutter */}
      <div className="container mx-auto px-6 max-w-container">
        
        <motion.div
          key={currentLanguage} // Force re-animation on language change
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          {/* Style Guide Section 6.12: 1-line promise */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="
              font-manrope font-bold text-h2 text-ink-900 mb-4 
              tracking-tight uppercase tracking-[-0.02em]
            ">
              {content.title}
            </h2>
            <p className="text-lg lg:text-xl text-ink-700 max-w-2xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </motion.div>

          {/* Style Guide Section 6.12: Prominent white card with 24px radius, shadow-lg */}
          <motion.div 
            variants={itemVariants}
            className="
              bg-surface-0 rounded-[24px] shadow-lg 
              p-8 lg:p-12 max-w-4xl mx-auto
              border border-gray-100
            "
          >
            
            {/* MONOCODE Explicit Error Handling: Fallback banner */}
            {showFallback && (
              <motion.div 
                variants={itemVariants}
                className="
                  mb-8 p-4 bg-blue-50 border border-blue-100 rounded-xl
                  flex items-start gap-3
                "
              >
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-blue-800 text-sm">
                  <p className="font-medium mb-1">
                    {currentLanguage === 'de' 
                      ? 'E-Mail-Client konnte nicht geöffnet werden'
                      : 'Email client could not be opened'
                    }
                  </p>
                  <p>
                    {currentLanguage === 'de' 
                      ? 'Bitte senden Sie Ihre Anfrage direkt an: '
                      : 'Please send your request directly to: '
                    }
                    <strong className="font-semibold">quotes@logisticspro.com</strong>
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Style Guide Section 6.12: 2-column layout desktop, 1-column mobile */}
              <motion.div variants={itemVariants}>
                <h3 className="
                  text-lg font-semibold text-ink-900 mb-6 
                  border-b border-gray-100 pb-3
                ">
                  {currentLanguage === 'de' ? 'Kontaktdaten' : 'Contact Information'}
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </motion.div>

              {/* Service Selection */}
              <motion.div variants={itemVariants}>
                <h3 className="
                  text-lg font-semibold text-ink-900 mb-6 
                  border-b border-gray-100 pb-3
                ">
                  {currentLanguage === 'de' ? 'Service-Auswahl' : 'Service Selection'}
                </h3>
                
                <FormField
                  name="service"
                  field={content.fields.service}
                  value={formData.service || ''}
                  error={errors.service}
                  onChange={handleFieldChange}
                />
              </motion.div>

              {/* Pickup and Delivery - Enhanced section layout */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="
                    text-lg font-semibold text-ink-900 
                    border-b border-gray-100 pb-3
                    flex items-center gap-2
                  ">
                    <span className="w-2 h-2 bg-brand-600 rounded-full"></span>
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
                  <h3 className="
                    text-lg font-semibold text-ink-900 
                    border-b border-gray-100 pb-3
                    flex items-center gap-2
                  ">
                    <span className="w-2 h-2 bg-brand-600 rounded-full"></span>
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
              </motion.div>

              {/* Shipment Details */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="
                  text-lg font-semibold text-ink-900 
                  border-b border-gray-100 pb-3
                ">
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
              </motion.div>

              {/* MONOCODE Explicit Error Handling: General error display */}
              {errors.general && (
                <motion.div variants={itemVariants} className="
                  p-4 bg-err-50 border border-red-100 rounded-xl
                  flex items-start gap-3
                ">
                  <AlertCircle className="w-5 h-5 text-err-600 mt-0.5 flex-shrink-0" />
                  <p className="text-err-800 text-sm font-medium">{errors.general}</p>
                </motion.div>
              )}

              {/* Style Guide Section 6.12: CTA button - full-width mobile, right-aligned desktop */}
              <motion.div variants={itemVariants} className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-analytics="mailto_initiated"
                  className="
                    w-full lg:w-auto px-8 py-4 
                    bg-brand-600 hover:bg-brand-500 
                    disabled:bg-ink-400 disabled:cursor-not-allowed
                    text-white font-semibold rounded-full
                    transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    hover:shadow-md hover:scale-[1.01] 
                    active:translate-y-px active:shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600
                    flex items-center justify-center gap-2
                    min-h-[48px]
                  "
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>{currentLanguage === 'de' ? 'Wird gesendet...' : 'Sending...'}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>{content.submitButtonText}</span>
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
