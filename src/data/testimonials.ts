// Testimonials Data for LogisticsCo Landing Page
import type { Testimonial } from '@/types/content';

export const testimonials: Testimonial[] = [
  {
    id: 'mueller_automotive',
    content: 'Zuverlässige Just-in-Time Lieferungen seit 3 Jahren. Nie Produktionsstillstand durch Logistik.',
    author: {
      name: 'Thomas Müller',
      title: 'Einkaufsleiter',
      company: 'AutoTech GmbH',
      avatar: '/images/testimonials/thomas-mueller.jpg'
    }
  },
  {
    id: 'schmidt_pharma',
    content: 'GDP-konforme Kühltransporte perfekt umgesetzt. Kompetenter Partner für Pharmalogistik.',
    author: {
      name: 'Dr. Anna Schmidt',
      title: 'Supply Chain Manager',
      company: 'PharmaVital AG',
      avatar: '/images/testimonials/anna-schmidt.jpg'
    }
  },
  {
    id: 'weber_retail',
    content: 'Schnelle E-Commerce Abwicklung, auch in der Hochsaison. Unser Fulfillment-Partner des Vertrauens.',
    author: {
      name: 'Michael Weber',
      title: 'Geschäftsführer',
      company: 'Retail Solutions GmbH',
      avatar: '/images/testimonials/michael-weber.jpg'
    }
  }
];
