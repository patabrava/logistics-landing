/**
 * QuoteForm Component
 * Main quote request form with valexport const QuoteForm: React.FC<QuoteFormProps> = ({
  onSubmit,
  onEmailGenerate,
  className,
}) => {
  const { formData, updateField, markFieldTouched, getFieldError, resetForm, setSubmitting } = useFormState();
  const { trackEvent } = useAnalytics();
  const formAnalytics = useFormAnalytics('quote_form');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasStartedForm, setHasStartedForm] = useState(false);ail generation
 */

'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField, InputField, TextareaField, SelectField } from '@/components/ui/FormField';
import { cn } from '@/lib/utils';
import { useFormState } from '@/hooks/useFormState';
import { useAnalytics, useFormAnalytics } from '@/hooks/useAnalytics';
import { QuoteFormData } from '@/types/form';
import { validateForm } from '@/components/forms/FormValidation';
import { generateEmailPreview, generateMailtoURL } from '@/components/forms/EmailGenerator';
// Temporarily comment out COUNTRIES import
// import { COUNTRIES, FORM } from '@/lib/constants';

// Service type options
const SERVICE_OPTIONS = [
  { value: 'road_transport', label: 'Straßentransport' },
  { value: 'air_freight', label: 'Luftfracht' },
  { value: 'sea_freight', label: 'Seefracht' },
  { value: 'rail_transport', label: 'Bahntransport' },
  { value: 'logistics_solutions', label: 'Logistiklösungen' },
];

// Urgency options
const URGENCY_OPTIONS = [
  { value: 'standard', label: 'Standard (2-5 Tage)' },
  { value: 'express', label: 'Express (1-2 Tage)' },
  { value: 'same_day', label: 'Same Day (innerhalb 24h)' },
  { value: 'scheduled', label: 'Terminiert (nach Vereinbarung)' },
];

// Country options (top countries first)
const COUNTRY_OPTIONS = [
  { value: 'Deutschland', label: 'Deutschland' },
  { value: 'Österreich', label: 'Österreich' },
  { value: 'Schweiz', label: 'Schweiz' },
  { value: 'Niederlande', label: 'Niederlande' },
  { value: 'Belgien', label: 'Belgien' },
  { value: 'Frankreich', label: 'Frankreich' },
  { value: 'Italien', label: 'Italien' },
  { value: 'Spanien', label: 'Spanien' },
  { value: 'Polen', label: 'Polen' },
  { value: 'Tschechien', label: 'Tschechien' },
  { value: 'Ungarn', label: 'Ungarn' },
  { value: 'Slowakei', label: 'Slowakei' },
  { value: 'Slowenien', label: 'Slowenien' },
];

export interface QuoteFormProps {
  onSubmit?: (formData: QuoteFormData) => void;
  onEmailGenerate?: (emailData: { subject: string; body: string; mailto: string }) => void;
  initialData?: Partial<QuoteFormData>;
  className?: string;
}

/**
 * Main QuoteForm component
 */
export const QuoteForm: React.FC<QuoteFormProps> = ({
  onSubmit,
  onEmailGenerate,
  className,
}) => {
  const { formData, updateField, markFieldTouched, getFieldError, resetForm, setSubmitting } = useFormState();
  const { trackEvent } = useAnalytics();
  const formAnalytics = useFormAnalytics('quote_form');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasStartedForm, setHasStartedForm] = useState(false);

  // Track form start
  useEffect(() => {
    if (!hasStartedForm) {
      formAnalytics.trackFormStart();
      setHasStartedForm(true);
    }
  }, [formAnalytics, hasStartedForm]);

  // Get validation errors and create validation summary
  const currentErrors = validateForm(formData);
  
  // Memoize validation summary to prevent unnecessary re-renders
  const validationSummary = useMemo(() => ({
    isValid: Object.keys(currentErrors).length === 0,
    errorCount: Object.keys(currentErrors).length,
    errors: currentErrors
  }), [currentErrors]);

  /**
   * Handle field changes with validation - supports complex types
   */
  const handleFieldChange = useCallback((fieldName: keyof QuoteFormData, value: string | number | boolean | object) => {
    if (fieldName === 'dimensions') {
      // Handle dimensions object
      setFormData(prev => ({ ...prev, dimensions: value as { length: number; width: number; height: number } }));
    } else if (fieldName === 'isRecurring') {
      // Handle boolean
      setFormData(prev => ({ ...prev, isRecurring: value as boolean }));
    } else {
      // Handle string/number fields via updateField
      updateField(fieldName, value as string | number);
    }
    formAnalytics.trackFieldInteraction(fieldName, 'change');
  }, [updateField, formAnalytics]);

  // Need direct access to setFormData
  const [localFormData, setFormData] = useState(formData);

  // Sync with useFormState
  useEffect(() => {
    setFormData(formData);
  }, [formData]);

  /**
   * Handle field blur events
   */
  const handleFieldBlur = useCallback((fieldName: keyof QuoteFormData) => {
    markFieldTouched(fieldName);
    formAnalytics.trackFieldInteraction(fieldName, 'blur');
  }, [markFieldTouched, formAnalytics]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validationSummary.isValid) {
      formAnalytics.trackFormSubmit(false, `${validationSummary.errorCount} validation errors`);
      trackEvent('quote_form_validation_error', {
        error_count: validationSummary.errorCount,
        errors: Object.keys(validationSummary.errors),
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitting(true);

    try {
      // Generate email using local form data
      const emailPreview = generateEmailPreview(localFormData);
      
      if (!emailPreview.isValid) {
        throw new Error('Email generation failed');
      }

      // Track successful form submission
      formAnalytics.trackFormSubmit(true);
      trackEvent('quote_form_submitted', {
        service_type: localFormData.serviceType,
        timeframe: localFormData.timeFrame,
        pickup_country: localFormData.pickupCountry,
        delivery_country: localFormData.deliveryCountry,
        weight: localFormData.weight,
      });

      // Call callbacks
      onSubmit?.(localFormData);
      onEmailGenerate?.({
        subject: emailPreview.subject,
        body: emailPreview.textBody,
        mailto: generateMailtoURL(localFormData)
      });

      // Open mailto link
      window.location.href = generateMailtoURL(localFormData);

    } catch (error) {
      console.error('Form submission error:', error);
      formAnalytics.trackFormSubmit(false, error instanceof Error ? error.message : 'Unknown error');
      trackEvent('quote_form_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  }, [localFormData, validationSummary, onSubmit, onEmailGenerate, formAnalytics, trackEvent, setSubmitting]);

  /**
   * Handle form reset
   */
  const handleReset = useCallback(() => {
    resetForm();
    setCurrentStep(1);
    trackEvent('quote_form_reset');
  }, [resetForm, trackEvent]);

  /**
   * Navigate between form steps
   */
  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
    trackEvent('quote_form_step_change', { step });
  }, [trackEvent]);

  return (
    <Card className={cn('max-w-4xl mx-auto', className)}>
      <CardHeader
        title="Angebot anfordern"
        subtitle="Füllen Sie das Formular aus, um ein individuelles Angebot zu erhalten"
      />

      <CardContent>
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => goToStep(step)}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                  currentStep === step
                    ? 'bg-brand-600 text-white'
                    : currentStep > step
                    ? 'bg-green-500 text-white'
                    : 'bg-ink-200 text-ink-600'
                )}
              >
                {currentStep > step ? '✓' : step}
              </button>
            ))}
          </div>
          <div className="w-full bg-ink-200 rounded-full h-1">
            <div
              className="bg-brand-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-ink-900 mb-4">Firmeninformationen</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Unternehmen"
                  required
                  error={getFieldError('company')}
                >
                  <InputField
                    value={localFormData.company}
                    onChange={(e) => handleFieldChange('company', e.target.value)}
                    onBlur={() => handleFieldBlur('company')}
                    placeholder="Ihr Firmenname"
                    error={!!getFieldError('company')}
                  />
                </FormField>

                <FormField
                  label="Ansprechpartner"
                  required
                  error={getFieldError('contactPerson')}
                >
                  <InputField
                    value={localFormData.contactPerson}
                    onChange={(e) => handleFieldChange('contactPerson', e.target.value)}
                    onBlur={() => handleFieldBlur('contactPerson')}
                    placeholder="Vor- und Nachname"
                    error={!!getFieldError('contactPerson')}
                  />
                </FormField>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="E-Mail-Adresse"
                  required
                  error={getFieldError('email')}
                >
                  <InputField
                    type="email"
                    value={localFormData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={() => handleFieldBlur('email')}
                    placeholder="ihre@email.de"
                    error={!!getFieldError('email')}
                  />
                </FormField>

                <FormField
                  label="Telefonnummer"
                  required
                  error={getFieldError('phone')}
                >
                  <InputField
                    type="tel"
                    value={localFormData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    onBlur={() => handleFieldBlur('phone')}
                    placeholder="+49 xxx xxxxxxx"
                    error={!!getFieldError('phone')}
                  />
                </FormField>
              </div>
            </div>
          )}

          {/* Step 2: Service & Route */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-ink-900 mb-4">Service & Route</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Service-Typ"
                  required
                  error={getFieldError('serviceType')}
                >
                  <SelectField
                    value={localFormData.serviceType}
                    onChange={(e) => handleFieldChange('serviceType', e.target.value)}
                    onBlur={() => handleFieldBlur('serviceType')}
                    options={SERVICE_OPTIONS}
                    placeholder="Wählen Sie einen Service"
                    error={!!getFieldError('serviceType')}
                  />
                </FormField>

                <FormField
                  label="Zeitfenster"
                  required
                  error={getFieldError('timeFrame')}
                >
                  <SelectField
                    value={localFormData.timeFrame}
                    onChange={(e) => handleFieldChange('timeFrame', e.target.value)}
                    onBlur={() => handleFieldBlur('timeFrame')}
                    options={URGENCY_OPTIONS}
                    placeholder="Wann soll transportiert werden?"
                    error={!!getFieldError('timeFrame')}
                  />
                </FormField>
              </div>

              {/* Origin */}
              <div className="space-y-4">
                <h4 className="font-medium text-ink-800">Abholort</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    label="Stadt"
                    required
                    error={getFieldError('pickupCity')}
                  >
                    <InputField
                      value={localFormData.pickupCity}
                      onChange={(e) => handleFieldChange('pickupCity', e.target.value)}
                      onBlur={() => handleFieldBlur('pickupCity')}
                      placeholder="Hamburg"
                      error={!!getFieldError('pickupCity')}
                    />
                  </FormField>

                  <FormField
                    label="Land"
                    required
                    error={getFieldError('pickupCountry')}
                  >
                    <SelectField
                      value={localFormData.pickupCountry}
                      onChange={(e) => handleFieldChange('pickupCountry', e.target.value)}
                      onBlur={() => handleFieldBlur('pickupCountry')}
                      options={COUNTRY_OPTIONS}
                      placeholder="Land wählen"
                      error={!!getFieldError('pickupCountry')}
                    />
                  </FormField>

                  <FormField
                    label="PLZ (optional)"
                    error={getFieldError('pickupPostalCode')}
                  >
                    <InputField
                      value={localFormData.pickupPostalCode || ''}
                      onChange={(e) => handleFieldChange('pickupPostalCode', e.target.value)}
                      onBlur={() => handleFieldBlur('pickupPostalCode')}
                      placeholder="20095"
                      error={!!getFieldError('pickupPostalCode')}
                    />
                  </FormField>
                </div>
              </div>

              {/* Destination */}
              <div className="space-y-4">
                <h4 className="font-medium text-ink-800">Zielort</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    label="Stadt"
                    required
                    error={getFieldError('deliveryCity')}
                  >
                    <InputField
                      value={formData.deliveryCity}
                      onChange={(e) => handleFieldChange('deliveryCity', e.target.value)}
                      onBlur={() => handleFieldBlur('deliveryCity')}
                      placeholder="München"
                      error={!!getFieldError('deliveryCity')}
                    />
                  </FormField>

                  <FormField
                    label="Land"
                    required
                    error={getFieldError('deliveryCountry')}
                  >
                    <SelectField
                      value={formData.deliveryCountry}
                      onChange={(e) => handleFieldChange('deliveryCountry', e.target.value)}
                      onBlur={() => handleFieldBlur('deliveryCountry')}
                      options={COUNTRY_OPTIONS}
                      placeholder="Land wählen"
                      error={!!getFieldError('deliveryCountry')}
                    />
                  </FormField>

                  <FormField
                    label="PLZ (optional)"
                    error={getFieldError('deliveryPostalCode')}
                  >
                    <InputField
                      value={formData.deliveryPostalCode || ''}
                      onChange={(e) => handleFieldChange('deliveryPostalCode', e.target.value)}
                      onBlur={() => handleFieldBlur('deliveryPostalCode')}
                      placeholder="80331"
                      error={!!getFieldError('deliveryPostalCode')}
                    />
                  </FormField>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Cargo Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-ink-900 mb-4">Fracht-Informationen</h3>
              
              <FormField
                label="Fracht-Beschreibung"
                required
                error={getFieldError('goods')}
                description="Beschreiben Sie die zu transportierenden Güter"
              >
                <TextareaField
                  value={formData.goods}
                  onChange={(e) => handleFieldChange('goods', e.target.value)}
                  onBlur={() => handleFieldBlur('goods')}
                  placeholder="z.B. Maschinenteile, Paletten mit Elektronik, temperaturempfindliche Ware..."
                  rows={3}
                  error={!!getFieldError('goods')}
                />
              </FormField>

              <FormField
                label="Gewicht (kg)"
                required
                error={getFieldError('weight')}
              >
                <InputField
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => handleFieldChange('weight', Number(e.target.value))}
                  onBlur={() => handleFieldBlur('weight')}
                  placeholder="1000"
                  min="0.1"
                  max="50000"
                  step="0.1"
                  error={!!getFieldError('weight')}
                />
              </FormField>

              <div className="space-y-4">
                <h4 className="font-medium text-ink-800">Abmessungen (optional)</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    label="Länge (cm)"
                    error={getFieldError('dimensions')}
                  >
                    <InputField
                      type="number"
                      value={formData.dimensions?.length || ''}
                      onChange={(e) => {
                        const newDimensions = { ...formData.dimensions, length: Number(e.target.value) };
                        handleFieldChange('dimensions', newDimensions);
                      }}
                      onBlur={() => handleFieldBlur('dimensions')}
                      placeholder="120"
                      min="1"
                      max="2000"
                      error={!!getFieldError('dimensions')}
                    />
                  </FormField>

                  <FormField
                    label="Breite (cm)"
                    error={getFieldError('dimensions')}
                  >
                    <InputField
                      type="number"
                      value={formData.dimensions?.width || ''}
                      onChange={(e) => {
                        const newDimensions = { ...formData.dimensions, width: Number(e.target.value) };
                        handleFieldChange('dimensions', newDimensions);
                      }}
                      onBlur={() => handleFieldBlur('dimensions')}
                      placeholder="80"
                      min="1"
                      max="2000"
                      error={!!getFieldError('dimensions')}
                    />
                  </FormField>

                  <FormField
                    label="Höhe (cm)"
                    error={getFieldError('dimensions')}
                  >
                    <InputField
                      type="number"
                      value={formData.dimensions?.height || ''}
                      onChange={(e) => {
                        const newDimensions = { ...formData.dimensions, height: Number(e.target.value) };
                        handleFieldChange('dimensions', newDimensions);
                      }}
                      onBlur={() => handleFieldBlur('dimensions')}
                      placeholder="100"
                      min="1"
                      max="2000"
                      error={!!getFieldError('dimensions')}
                    />
                  </FormField>
                </div>
              </div>

              <FormField
                label="Anzahl Paletten"
                error={getFieldError('pallets')}
              >
                <InputField
                  type="number"
                  value={formData.pallets || ''}
                  onChange={(e) => handleFieldChange('pallets', Number(e.target.value))}
                  onBlur={() => handleFieldBlur('pallets')}
                  placeholder="2"
                  min="0"
                  max="100"
                  error={!!getFieldError('pallets')}
                />
              </FormField>
            </div>
          )}

          {/* Step 4: Timeline & Special Requirements */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-ink-900 mb-4">Zeitplan & Besonderheiten</h3>
              
              <FormField
                label="Zeitfenster"
                required
                error={getFieldError('timeFrame')}
                description="Wann soll der Transport stattfinden?"
              >
                <SelectField
                  value={localFormData.timeFrame}
                  onChange={(e) => handleFieldChange('timeFrame', e.target.value)}
                  onBlur={() => handleFieldBlur('timeFrame')}
                  options={URGENCY_OPTIONS}
                  placeholder="Zeitfenster wählen"
                  error={!!getFieldError('timeFrame')}
                />
              </FormField>

              <FormField
                label="Wiederkehrende Sendung?"
                error={getFieldError('isRecurring')}
              >
                <SelectField
                  value={localFormData.isRecurring ? 'yes' : 'no'}
                  onChange={(e) => handleFieldChange('isRecurring', e.target.value === 'yes')}
                  onBlur={() => handleFieldBlur('isRecurring')}
                  options={[
                    { value: 'no', label: 'Nein, einmalige Sendung' },
                    { value: 'yes', label: 'Ja, regelmäßige Sendungen' }
                  ]}
                  error={!!getFieldError('isRecurring')}
                />
              </FormField>

              <FormField
                label="Zeitfenster"
                required
                error={getFieldError('timeFrame')}
                description="Wann soll der Transport stattfinden?"
              >
                <SelectField
                  value={formData.timeFrame}
                  onChange={(e) => handleFieldChange('timeFrame', e.target.value)}
                  onBlur={() => handleFieldBlur('timeFrame')}
                  options={URGENCY_OPTIONS}
                  placeholder="Zeitfenster wählen"
                  error={!!getFieldError('timeFrame')}
                />
              </FormField>

              <FormField
                label="Wiederkehrende Sendung?"
                error={getFieldError('isRecurring')}
              >
                <SelectField
                  value={formData.isRecurring ? 'yes' : 'no'}
                  onChange={(e) => handleFieldChange('isRecurring', e.target.value === 'yes')}
                  onBlur={() => handleFieldBlur('isRecurring')}
                  options={[
                    { value: 'no', label: 'Nein, einmalige Sendung' },
                    { value: 'yes', label: 'Ja, regelmäßige Sendungen' }
                  ]}
                  error={!!getFieldError('isRecurring')}
                />
              </FormField>

              <FormField
                label="Besondere Anforderungen (optional)"
                error={getFieldError('specialRequirements')}
                description="z.B. Kühlkette, Gefahrgut, besondere Handling-Anforderungen"
              >
                <TextareaField
                  value={formData.specialRequirements || ''}
                  onChange={(e) => handleFieldChange('specialRequirements', e.target.value)}
                  onBlur={() => handleFieldBlur('specialRequirements')}
                  placeholder="Spezielle Anforderungen an den Transport..."
                  rows={4}
                  error={!!getFieldError('specialRequirements')}
                />
              </FormField>

              {/* Form Summary */}
              <div className="mt-8 p-4 bg-ink-50 rounded-lg">
                <h4 className="font-medium text-ink-800 mb-2">Zusammenfassung</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Service:</span> {SERVICE_OPTIONS.find(s => s.value === formData.serviceType)?.label}</p>
                    <p><span className="font-medium">Route:</span> {formData.pickupCity} → {formData.deliveryCity}</p>
                    <p><span className="font-medium">Gewicht:</span> {formData.weight} kg</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Zeitfenster:</span> {URGENCY_OPTIONS.find(u => u.value === formData.timeFrame)?.label}</p>
                    <p><span className="font-medium">Wiederkehrend:</span> {formData.isRecurring ? 'Ja' : 'Nein'}</p>
                    <p><span className="font-medium">Kontakt:</span> {formData.contactPerson} ({formData.email})</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-ink-200">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => goToStep(currentStep - 1)}
                >
                  Zurück
                </Button>
              )}
            </div>

            <div className="flex space-x-3">
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={() => goToStep(currentStep + 1)}
                >
                  Weiter
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!validationSummary.isValid || isSubmitting}
                  isLoading={isSubmitting}
                >
                  Angebot anfordern
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Validation Summary */}
        {validationSummary.errorCount > 0 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">
              Bitte korrigieren Sie folgende Fehler ({validationSummary.errorCount}):
            </h4>
            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
              {Object.entries(validationSummary.errors).map(([field, error]) => (
                <li key={field}>{String(error)}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      <CardFooter divider>
        <div className="flex justify-between items-center w-full">
          <p className="text-sm text-ink-600">
            Alle Felder mit * sind Pflichtfelder
          </p>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
          >
            Formular zurücksetzen
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuoteForm;
