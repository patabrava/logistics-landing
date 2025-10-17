// Test file to verify all type imports work correctly
import type { Service } from '@/types/content';
import type { QuoteFormData } from '@/types/form';
import type { AnalyticsEvent } from '@/types/analytics';

// This file verifies that all type definitions compile correctly
// It will be removed after verification

const testService: Service = {
  id: 'test',
  title: 'Test Service',
  description: 'Test Description',
  bullets: ['Test bullet'],
  icon: 'test-icon',
  ctaText: 'Test CTA'
};

const testFormData: QuoteFormData = {
  company: 'Test Company',
  contactPerson: 'Test Person',
  email: 'test@example.com',
  phone: '+49123456789',
  serviceType: 'road_transport',
  pickupPostalCode: '10115',
  pickupCity: 'Berlin',
  pickupCountry: 'DE',
  deliveryPostalCode: '20095',
  deliveryCity: 'Hamburg',
  deliveryCountry: 'DE',
  goods: 'Test goods',
  dimensions: { length: 100, width: 80, height: 60 },
  weight: 500,
  pallets: 2,
  timeFrame: 'standard',
  isRecurring: false,
  specialRequirements: 'None'
};

const testEvent: AnalyticsEvent = {
  eventName: 'test_event',
  parameters: { test: 'value' }
};

console.log('Types verified successfully:', { testService, testFormData, testEvent });
