import { QuoteFormData } from '@/types/form';
import { COMPANY, FORM } from '@/lib/constants';

function replaceTemplate(template: string, form: QuoteFormData) {
  const safe = (v: unknown) => (v === undefined || v === null ? '' : String(v));
  return template
    .replace('{{company}}', safe(form.company))
    .replace('{{contactPerson}}', safe(form.contactPerson))
    .replace('{{email}}', safe(form.email))
    .replace('{{phone}}', safe(form.phone))
    .replace('{{serviceType}}', safe(form.serviceType))
    .replace('{{pickupPostalCode}}', safe(form.pickupPostalCode))
    .replace('{{pickupCity}}', safe(form.pickupCity))
    .replace('{{pickupCountry}}', safe(form.pickupCountry))
    .replace('{{deliveryPostalCode}}', safe(form.deliveryPostalCode))
    .replace('{{deliveryCity}}', safe(form.deliveryCity))
    .replace('{{deliveryCountry}}', safe(form.deliveryCountry))
    .replace('{{goods}}', safe(form.goods))
    .replace('{{length}}', safe(form.dimensions?.length))
    .replace('{{width}}', safe(form.dimensions?.width))
    .replace('{{height}}', safe(form.dimensions?.height))
    .replace('{{weight}}', safe(form.weight))
    .replace('{{pallets}}', safe(form.pallets))
    .replace('{{timeFrame}}', safe(form.timeFrame))
    .replace('{{isRecurring}}', form.isRecurring ? 'Ja' : 'Nein')
    .replace('{{specialRequirements}}', safe(form.specialRequirements));
}

export function generateEmailPreview(form: QuoteFormData): {
  subject: string;
  textBody: string;
  isValid: boolean;
} {
  const subject = replaceTemplate(FORM.MAILTO.SUBJECT_TEMPLATE, form);
  const textBody = replaceTemplate(FORM.MAILTO.BODY_TEMPLATE, form);

  // Minimal sanity check; full validation is elsewhere
  const isValid =
    !!form.company &&
    !!form.email &&
    !!form.serviceType &&
    !!form.pickupCity &&
    !!form.deliveryCity;

  return { subject, textBody, isValid };
}

export function generateMailtoURL(form: QuoteFormData): string {
  const to = COMPANY.CONTACT.QUOTES_EMAIL || COMPANY.CONTACT.EMAIL;
  const { subject, textBody } = generateEmailPreview(form);
  const q = new URLSearchParams({
    subject: subject,
    body: textBody,
  }).toString();
  return `mailto:${to}?${q}`;
}