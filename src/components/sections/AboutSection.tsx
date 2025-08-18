'use client'

import React from 'react'
import { useLanguage, getTranslation } from '@/hooks/useLanguage'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Card } from '@/components/ui/Card'
import { aboutContent } from '@/data/content'
import { cn } from '@/lib/utils'

interface AboutSectionProps {
  className?: string
}

export function AboutSection({ className }: AboutSectionProps) {
  const { translations } = useLanguage()
  const t = (key: string, fallback: string) => getTranslation(key, translations) || fallback
  const { scrollToSection } = useScrollToSection()
  const { trackEvent } = useAnalytics()
  const about = aboutContent

  const handleCTA = () => {
    trackEvent('about_cta_click', { section: 'about' })
    scrollToSection('quote')
  }

  const handleContactClick = () => {
    trackEvent('about_contact_click', { section: 'about' })
  }

  return (
    <section 
      id="about"
      className={cn(
        'py-20 bg-gradient-to-br from-ink-50 via-white to-brand-50',
        className
      )}
    >
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-4">
            {t('about.headline', about.headline)}
          </h2>
          <p className="text-xl text-ink-600 max-w-3xl mx-auto">
            {t('about.subheadline', about.subheadline)}
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Story Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-ink-900">
              {t('about.story.title', about.story.title)}
            </h3>
            <div className="space-y-4">
              {about.story.content.map((paragraph: string, index: number) => (
                <p key={index} className="text-ink-600 leading-relaxed">
                  {t(`about.story.paragraph_${index + 1}`, paragraph)}
                </p>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-brand-50 to-orange-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-ink-900 mb-3">
                {t('about.mission.title', about.mission.title)}
              </h4>
              <p className="text-ink-700 font-medium italic">
                "{t('about.mission.statement', about.mission.content)}"
              </p>
            </div>
          </div>

          {/* Company Image Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-brand-100 to-orange-100 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-brand-600 font-medium">
                  {t('about.image_placeholder', 'Unternehmenszentrale')}
                </p>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-lg border-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">15+</div>
                  <div className="text-sm text-ink-600">Jahre Erfahrung</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">24/7</div>
                  <div className="text-sm text-ink-600">Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Team */}
          <Card variant="default" padding="lg" rounded="xl" hoverable className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-ink-900 mb-3">
              {t('about.team.title', about.team.title)}
            </h3>
            <p className="text-ink-600 text-sm mb-4">
              {t('about.team.description', about.team.description)}
            </p>
            <div className="text-sm text-brand-600 font-medium">
              {about.team.stat}
            </div>
          </Card>

          {/* Innovation */}
          <Card variant="default" padding="lg" rounded="xl" hoverable className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-ink-900 mb-3">
              {t('about.innovation.title', about.innovation.title)}
            </h3>
            <p className="text-ink-600 text-sm mb-4">
              {t('about.innovation.description', about.innovation.description)}
            </p>
            <div className="text-sm text-brand-600 font-medium">
              {about.innovation.stat}
            </div>
          </Card>

          {/* Sustainability */}
          <Card variant="default" padding="lg" rounded="xl" hoverable className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-ink-900 mb-3">
              {t('about.sustainability.title', about.sustainability.title)}
            </h3>
            <p className="text-ink-600 text-sm mb-4">
              {t('about.sustainability.description', about.sustainability.description)}
            </p>
            <div className="text-sm text-brand-600 font-medium">
              {about.sustainability.stat}
            </div>
          </Card>
        </div>

        {/* Company Timeline */}
        <Card variant="default" padding="xl" rounded="xl" className="mb-16">
          <h3 className="text-2xl font-bold text-ink-900 mb-8 text-center">
            {t('about.timeline.title', 'Unser Weg zum Erfolg')}
          </h3>
          
          <div className="space-y-8">
            {about.timeline.map((milestone, index: number) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mr-6">
                  <div className="w-6 h-6 bg-brand-600 rounded-full"></div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <span className="text-brand-600 font-bold text-lg mr-4">
                      {milestone.year}
                    </span>
                    <h4 className="font-semibold text-ink-900">
                      {t(`about.timeline.${index}.title`, milestone.title)}
                    </h4>
                  </div>
                  <p className="text-ink-600">
                    {t(`about.timeline.${index}.description`, milestone.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Contact Details */}
          <Card variant="default" padding="lg" rounded="xl">
            <h3 className="text-xl font-semibold text-ink-900 mb-6">
              {t('about.contactSection.title', about.contact.title)}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-ink-900 mb-1">Adresse</h4>
                  <p className="text-ink-600 text-sm">
                    {about.contact.address.street}<br />
                    {about.contact.address.zip} {about.contact.address.city}<br />
                    {about.contact.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-ink-900 mb-1">Telefon</h4>
                  <a 
                    href={`tel:${about.contact.phone}`}
                    className="text-brand-600 text-sm hover:underline"
                    onClick={handleContactClick}
                  >
                    {about.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-ink-900 mb-1">E-Mail</h4>
                  <a 
                    href={`mailto:${about.contact.email}`}
                    className="text-brand-600 text-sm hover:underline"
                    onClick={handleContactClick}
                  >
                    {about.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Business Hours */}
          <Card variant="default" padding="lg" rounded="xl">
            <h3 className="text-xl font-semibold text-ink-900 mb-6">
              {t('about.hours.title', about.hours.title)}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-ink-600">Montag - Freitag</span>
                <span className="font-medium text-ink-900">8:00 - 18:00 Uhr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-600">Samstag</span>
                <span className="font-medium text-ink-900">9:00 - 14:00 Uhr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-600">Sonntag</span>
                <span className="text-ink-900">Geschlossen</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-ok-50 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-ok-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-ok-800 font-medium text-sm">
                  24/7 Notfallservice verfügbar
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-50 to-orange-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-ink-900 mb-4">
              {t('about.cta.headline', about.cta.headline)}
            </h3>
            <p className="text-ink-600 mb-6 max-w-2xl mx-auto">
              {t('about.cta.description', about.cta.description)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCTA}
                className="bg-brand-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:bg-brand-700 hover:shadow-lg text-lg"
              >
                {t('about.cta.buttonText', about.cta.buttonText)}
              </button>
              <button
                onClick={() => {
                  trackEvent('about_contact_button_click', { section: 'about' })
                  window.location.href = `tel:${about.contact.phone}`
                }}
                className="border-2 border-brand-600 text-brand-600 font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:bg-brand-600 hover:text-white hover:shadow-lg text-lg"
              >
                {t('about.cta.callText', about.cta.callText)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
