// Industries Data for LogisticsCo Landing Page
import type { Industry } from '@/types/content';

export const industries: Industry[] = [
  {
    id: 'automotive',
    title: 'Automotive',
    icon: 'car',
    needs: [
      'Just-in-Time Lieferungen',
      'Ersatzteillogistik'
    ]
  },
  {
    id: 'retail',
    title: 'Handel & Retail',
    icon: 'shopping-cart',
    needs: [
      'Schnelle Nachschublogistik',
      'E-Commerce Fulfillment'
    ]
  },
  {
    id: 'pharma',
    title: 'Pharma & Healthcare',
    icon: 'heart-pulse',
    needs: [
      'GDP-konforme Kühltransporte',
      'Validierte Lieferketten'
    ]
  },
  {
    id: 'manufacturing',
    title: 'Industrie & Fertigung',
    icon: 'factory',
    needs: [
      'Rohstofftransporte',
      'Projektlogistik'
    ]
  }
];
