'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';

interface ServiceDetailPageProps {
  serviceId: string;
  onClose: () => void;
}

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  images: string[];
  ctaText: string;
}

const getServiceDetails = (language: string, serviceId: string): ServiceDetail | null => {
  const isGerman = language === 'de';
  
  const services: Record<string, ServiceDetail> = {
    'full-truckload': {
      id: 'full-truckload',
      title: isGerman ? 'Full Truckload Transport' : 'Full Truckload Transport',
      description: isGerman 
        ? 'Komplette Fahrzeugladungen für Ihre Transporte'
        : 'Complete vehicle loads for your transport needs',
      longDescription: isGerman
        ? 'Internationaler und nationaler Full Truckload Transport mit modernster Flotte. Wir bieten zuverlässige Transporte in ganz Europa mit kompletten Fahrzeugladungen für Ihre individuellen Anforderungen.'
        : 'International and national Full Truckload Transport with state-of-the-art fleet. We offer reliable transportation across Europe with complete vehicle loads for your individual requirements.',
      features: isGerman 
        ? ['Nationale und internationale Transporte', 'Transport von hochwertigen Gütern', 'Übergroßen Transport', 'Express & Same-Day', 'ADR auf Anfrage']
        : ['Domestic and international transport', 'Transport of high value goods', 'Oversized transport', 'Express & Same-Day', 'ADR on request'],
      images: ['/IMG_3091.jpeg', '/IMG_3089.jpeg', '/IMG_3090.jpeg', '/IMG_1713.jpeg'],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote'
    },
    'less-than-truckload': {
      id: 'less-than-truckload',
      title: isGerman ? 'Less than Truckload Transport' : 'Less than Truckload Transport',
      description: isGerman 
        ? 'Kosteneffiziente Teilladungen und Sammelgut'
        : 'Cost-effective partial loads and consolidated freight',
      longDescription: isGerman
        ? 'Internationaler und nationaler Less than Truckload Transport für kostenoptimierte Lösungen. Effiziente Teilladungen mit unserem europäischen Netzwerk für optimale Transportkosten.'
        : 'International and national Less than Truckload Transport for cost-optimized solutions. Efficient partial loads with our European network for optimal transportation costs.',
      features: isGerman 
        ? ['Nationale und internationale Transporte', 'Transport von hochwertigen Gütern', 'Kostenoptimierte Sammelladungen', 'Flexible Abholzeiten', 'Sendungsverfolgung']
        : ['Domestic and international transport', 'Transport of high-value goods', 'Cost-optimized consolidated shipments', 'Flexible pickup times', 'Shipment tracking'],
      images: ['/images/ltl-transport.jpg'],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote'
    },
    'air-freight': {
      id: 'air-freight',
      title: isGerman ? 'Luftfracht Import und Export' : 'Air Freight Import and Export',
      description: isGerman 
        ? 'Schnelle Luftfracht mit globalen Partnern'
        : 'Fast air freight with global partners',
      longDescription: isGerman
        ? 'Wir bieten unseren Kunden Lufttransportdienstleistungen auf Basis der direkten Zusammenarbeit mit renommierten Fluggesellschaften und in Zusammenarbeit mit einem Netzwerk zuverlässiger Agenten weltweit.'
        : 'We offer our customers air transport services based on direct cooperation with renowned airlines and in collaboration with a network of reliable agents worldwide.',
      features: isGerman 
        ? ['Direkte Zusammenarbeit mit Fluggesellschaften', 'Netzwerk zuverlässiger Agenten', 'Express und Standard Luftfracht', 'Zollabwicklung', 'Temperaturkontrollierte Transporte']
        : ['Direct cooperation with airlines', 'Network of reliable agents', 'Express and standard air freight', 'Customs clearance', 'Temperature-controlled transport'],
      images: ['/images/air-freight.jpg'],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote'
    },
    'sea-freight': {
      id: 'sea-freight',
      title: isGerman ? 'Seefracht Import und Export' : 'Sea Freight Import and Export',
      description: isGerman 
        ? 'Zuverlässige Seefrachtlösungen weltweit'
        : 'Reliable sea freight solutions worldwide',
      longDescription: isGerman
        ? 'Umfassende Seefrachtlösungen für alle Containergrößen und Schwergut. Von Full Container Load (FCL) bis Less Container Load (LCL) - wir bieten maßgeschneiderte Lösungen für Ihre globalen Transportbedürfnisse.'
        : 'Comprehensive sea freight solutions for all container sizes and heavy cargo. From Full Container Load (FCL) to Less Container Load (LCL) - we offer tailored solutions for your global transport needs.',
      features: isGerman 
        ? ['Full Container Seefracht FCL', 'LCL Sammelgut Seefracht', 'Schwergut- und Übergrößen Teile', 'Hafenabwicklung', 'Dokumentenservice']
        : ['Full container sea freight FCL', 'LCL groupage sea freight', 'Heavy cargo and oversized parts', 'Port handling', 'Documentation service'],
      images: ['/IMG_3093.jpeg'],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote'
    },
    'packaging': {
      id: 'packaging',
      title: isGerman ? 'Verpackung' : 'Packaging',
      description: isGerman 
        ? 'Professionelle Verpackungslösungen für jeden Transport'
        : 'Professional packaging solutions for every transport',
      longDescription: isGerman
        ? 'Professionelle Verpackungen für nationale und internationale Transporte. Wir verpacken normale und überdimensionierte Teile im Bereich Kartonagen, Luftfrachtverpackungen, Seefrachtverpackungen, Schwergut- und Übergrößen-Verpackungen sowie wiederverwendbare Verpackungslösungen.'
        : 'Professional packaging for national and international transport. We package normal and oversized parts in cardboard packaging, air freight packaging, sea freight packaging, heavy cargo and oversized packaging, and reusable packaging solutions.',
      features: isGerman 
        ? ['Kartonagen und Luftfrachtverpackungen', 'Schwergut- und Übergrößen-Verpackungen', 'Wiederverwendbare Verpackungslösungen', 'Spezialverpackungen', 'Lagerung und Kommissionierung']
        : ['Cardboard and air freight packaging', 'Heavy cargo and oversized packaging', 'Reusable packaging solutions', 'Special packaging', 'Storage and order fulfillment'],
      images: ['/IMG_1629.jpeg', '/IMG_1641.jpeg'],
      ctaText: isGerman ? 'Angebot anfordern' : 'Request Quote'
    }
  };

  return services[serviceId] || null;
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onClose }) => {
  const currentLanguage = useCurrentLanguage();
  const service = getServiceDetails(currentLanguage, serviceId);

  if (!service) {
    return null;
  }

  const handleQuoteRequest = () => {
    // Navigate to quote section with service preselected
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      onClose();
      setTimeout(() => {
        quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const url = new URL(window.location.href);
        url.searchParams.set('service', serviceId);
        window.history.replaceState({}, '', url.toString());
      }, 100);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 pb-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Service Images Gallery */}
          <div className="mb-8">
            {service.images.length > 1 ? (
              /* Multiple images - Grid layout */
              <div className="grid grid-cols-2 gap-4">
                {service.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-gray-100 p-4 flex items-center justify-center min-h-[220px]"
                  >
                    <img 
                      src={image} 
                      alt={`${service.title} - Image ${index + 1}`}
                      className="w-full h-auto max-h-72 object-contain"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="text-gray-500 text-center hidden">
                      <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs">{image}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Single image */
              <div className="rounded-2xl bg-gray-100 p-4 flex items-center justify-center min-h-[260px]">
                <img 
                  src={service.images[0]} 
                  alt={service.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="text-gray-500 text-center hidden">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Service Image</p>
                  <p className="text-xs text-gray-400 mt-1">{service.images[0]}</p>
                </div>
              </div>
            )}
          </div>

          {/* Service Title */}
          <h1 
            className="mb-4"
            style={{ 
              fontFamily: 'Manrope, sans-serif',
              fontSize: '36px',
              lineHeight: '1.1',
              fontWeight: '700',
              color: 'var(--ink-900)',
            }}
          >
            {service.title}
          </h1>

          {/* Service Description */}
          <p 
            className="mb-8"
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: 'var(--ink-700)',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {service.longDescription}
          </p>

          {/* Features */}
          <div className="mb-8">
            <h2 
              className="mb-4"
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--ink-900)',
                fontFamily: 'Manrope, sans-serif'
              }}
            >
              {currentLanguage === 'de' ? 'Leistungen im Detail' : 'Service Features'}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div 
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--brand-400)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <svg 
                      className="w-3 h-3"
                      style={{ color: 'var(--brand-600)' }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span 
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: 'var(--ink-700)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleQuoteRequest}
            className="w-full md:w-auto transition-all duration-200 hover:shadow-md active:translate-y-px focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{
              padding: '16px 32px',
              backgroundColor: 'var(--brand-600)',
              color: '#ffffff',
              borderRadius: '9999px',
              fontWeight: '600',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--brand-500)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--brand-600)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {service.ctaText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
