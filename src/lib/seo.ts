/**
 * SEO Helper Functions
 * Utilities for generating metadata and structured data for Next.js pages
 */

import { Metadata } from 'next';
import { SERVICE_DETAIL_IDS } from '@/data/serviceDetails';
import { COMPANY, SEO } from './constants';

/**
 * Base metadata configuration
 */
export const baseMetadata: Metadata = {
  title: {
    template: `%s | ${COMPANY.NAME}`,
    default: COMPANY.NAME,
  },
  description: SEO.DEFAULT_DESCRIPTION,
  keywords: SEO.DEFAULT_KEYWORDS,
  authors: [{ name: COMPANY.NAME }],
  creator: COMPANY.NAME,
  publisher: COMPANY.NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['en_US'],
    siteName: COMPANY.NAME,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${COMPANY.NAME} - Professionelle Logistiklösungen`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@logisticsco',
    creator: '@logisticsco',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  alternates: {
    canonical: COMPANY.WEBSITE.URL,
    languages: {
      'de-DE': `${COMPANY.WEBSITE.URL}/de`,
      'en-US': `${COMPANY.WEBSITE.URL}/en`,
    },
  },
};

/**
 * Generate page-specific metadata
 */
interface PageMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export function generatePageMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title,
    description = SEO.DEFAULT_DESCRIPTION,
    keywords = [],
    image = '/og-image.jpg',
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    section,
    tags = [],
  } = options;

  const fullKeywords = [SEO.DEFAULT_KEYWORDS, ...keywords.join(', ')].join(', ');
  const pageUrl = url ? `${COMPANY.WEBSITE.URL}${url}` : COMPANY.WEBSITE.URL;

  return {
    title,
    description,
    keywords: fullKeywords,
    openGraph: {
      title: title || COMPANY.NAME,
      description,
      url: pageUrl,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || `${COMPANY.NAME} - Professionelle Logistiklösungen`,
        },
      ],
      publishedTime,
      modifiedTime,
      section,
      tags,
    },
    twitter: {
      title: title || COMPANY.NAME,
      description,
      images: [image],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

/**
 * Generate service page metadata
 */
export function generateServiceMetadata(
  serviceName: string,
  serviceDescription: string,
  serviceKeywords: string[] = []
): Metadata {
  return generatePageMetadata({
    title: `${serviceName} - Professionelle Logistiklösungen`,
    description: serviceDescription,
    keywords: ['logistik', 'transport', 'deutschland', ...serviceKeywords],
    url: `/services/${serviceName.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'article',
    section: 'Dienstleistungen',
    tags: [serviceName, 'Logistik', 'Transport'],
  });
}

/**
 * Generate structured data for the organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.NAME,
    description: SEO.DEFAULT_DESCRIPTION,
    url: COMPANY.WEBSITE.URL,
    logo: `${COMPANY.WEBSITE.URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.ADDRESS.STREET,
      addressLocality: COMPANY.ADDRESS.CITY,
      postalCode: COMPANY.ADDRESS.POSTAL_CODE,
      addressCountry: COMPANY.ADDRESS.COUNTRY,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.CONTACT.PHONE,
      email: COMPANY.CONTACT.EMAIL,
      contactType: 'customer service',
      availableLanguage: ['German', 'English'],
    },
    sameAs: [
      // Add social media URLs here when available
    ],
  };
}

/**
 * Generate structured data for services
 */
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceCategory: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    category: serviceCategory,
    provider: {
      '@type': 'Organization',
      name: COMPANY.NAME,
      url: COMPANY.WEBSITE.URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    serviceType: serviceCategory,
  };
}

/**
 * Generate structured data for local business
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': COMPANY.WEBSITE.URL,
    name: COMPANY.NAME,
    description: SEO.DEFAULT_DESCRIPTION,
    url: COMPANY.WEBSITE.URL,
    image: `${COMPANY.WEBSITE.URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.ADDRESS.STREET,
      addressLocality: COMPANY.ADDRESS.CITY,
      postalCode: COMPANY.ADDRESS.POSTAL_CODE,
      addressCountry: COMPANY.ADDRESS.COUNTRY,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '52.5200', // Berlin coordinates as example
      longitude: '13.4050',
    },
    telephone: COMPANY.CONTACT.PHONE,
    email: COMPANY.CONTACT.EMAIL,
    openingHours: [
      'Mo-Fr 08:00-18:00',
      'Sa 09:00-12:00',
    ],
    priceRange: '€€',
    acceptsReservations: true,
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${COMPANY.WEBSITE.URL}${crumb.url}`,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate review/testimonial structured data
 */
export function generateReviewSchema(reviews: {
  author: string;
  rating: number;
  text: string;
  date: string;
}[]) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
    },
    reviewBody: review.text,
    datePublished: review.date,
    itemReviewed: {
      '@type': 'Organization',
      name: COMPANY.NAME,
    },
  }));
}

/**
 * Generate website navigation structured data
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.NAME,
    url: COMPANY.WEBSITE.URL,
    description: SEO.DEFAULT_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${COMPANY.WEBSITE.URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      // Add social media URLs here when available
    ],
  };
}

/**
 * Utility to inject structured data into pages
 */
export function createStructuredDataScript(data: object | object[]) {
  const jsonData = Array.isArray(data) ? data : [data];
  
  return {
    __html: JSON.stringify(jsonData, null, 2),
  };
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  return `# Robots.txt for ${COMPANY.NAME}
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${COMPANY.WEBSITE.URL}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;
}

/**
 * Generate sitemap URLs
 */
export interface SitemapUrl {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapUrls(): SitemapUrl[] {
  const baseUrl = COMPANY.WEBSITE.URL;
  const now = new Date();

  const staticUrls: SitemapUrl[] = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const serviceUrls: SitemapUrl[] = SERVICE_DETAIL_IDS.map((serviceId) => ({
    url: `${baseUrl}/services/${serviceId}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticUrls, ...serviceUrls];
}
