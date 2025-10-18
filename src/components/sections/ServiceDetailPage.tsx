"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCurrentLanguage } from '../../hooks/useCurrentLanguage';

import { getServiceDetails } from '@/data/serviceDetails';

interface ServiceDetailPageProps {
  serviceId: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId }) => {
  const currentLanguage = useCurrentLanguage();
  const service = getServiceDetails(currentLanguage, serviceId);

  if (!service) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-ink-900 mb-4">
            {currentLanguage === 'de' ? 'Service nicht gefunden' : 'Service Not Found'}
          </h1>
          <p className="text-ink-600 mb-8">
            {currentLanguage === 'de'
              ? 'Der angeforderte Service ist nicht verfügbar. Bitte kehren Sie zur Übersicht zurück.'
              : 'The requested service is not available. Please head back to the services overview.'}
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-600 text-white font-semibold transition hover:bg-brand-500"
          >
            {currentLanguage === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/60 via-white to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-500"
            >
              ← {currentLanguage === 'de' ? 'Zurück zur Übersicht' : 'Back to Overview'}
            </Link>

            <div className="flex flex-col gap-4">
              <span className="text-sm uppercase tracking-[0.28em] text-brand-600/80 font-semibold">
                {currentLanguage === 'de' ? 'Leistung' : 'Service'}
              </span>
              <h1
                className="text-4xl md:text-5xl font-bold text-ink-900 tracking-tight"
                style={{ fontFamily: 'var(--font-geist-sans), Geist, sans-serif' }}
              >
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-ink-600 leading-relaxed max-w-3xl">
                {service.longDescription}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {service.images.map((image, index) => (
              <figure
                key={`${service.id}-image-${index}`}
                className="relative overflow-hidden rounded-3xl bg-gray-100 border border-gray-100 shadow-sm h-[420px]"
              >
                <Image
                  src={image}
                  alt={`${service.title} – ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </figure>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-ink-900 mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                {currentLanguage === 'de' ? 'Unsere Leistungen im Überblick' : 'What This Service Covers'}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <li key={`${service.id}-feature-${index}`} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-600">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-base text-ink-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5 p-8 rounded-3xl border border-gray-100 bg-white shadow-sm">
              <h3 className="text-xl font-semibold text-ink-900">
                {currentLanguage === 'de' ? 'Nächste Schritte' : 'Next Steps'}
              </h3>
              <p className="text-ink-600 leading-relaxed">
                {currentLanguage === 'de'
                  ? 'Teilen Sie uns die Details Ihrer Transportanforderung mit. Wir erstellen innerhalb weniger Stunden ein maßgeschneidertes Angebot.'
                  : 'Share your transport requirements with us and we will send a tailored quote within a few hours.'}
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/?service=${service.id}#quote`}
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  {service.ctaText}
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-600 transition-all duration-200 hover:border-brand-300 hover:text-brand-500"
                >
                  {currentLanguage === 'de' ? 'Direkt Kontakt aufnehmen' : 'Contact Us Directly'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
