'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage, getTranslation } from '@/hooks/useLanguage'
import { Card } from '@/components/ui/Card'
import { aboutContent } from '@/data/content'
import { cn } from '@/lib/utils'

interface AboutSectionProps {
  className?: string
}

export function AboutSection({ className }: AboutSectionProps) {
  const { translations } = useLanguage()
  const t = (key: string, fallback: string) => {
    const val = getTranslation(key, translations)
    return val === key ? fallback : val
  }
  const about = aboutContent


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
          <h2
            className="uppercase tracking-tight mb-4"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '40px',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: 'var(--ink-900)'
            }}
          >
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
                &ldquo;{t('about.mission.statement', about.mission.content)}&rdquo;
              </p>
            </div>
          </div>

          {/* Company Image Placeholder */}
          <div className="relative">
            <div className="relative rounded-2xl h-96 overflow-hidden">
              <Image
                src="/ChatGPT Image 18. Aug. 2025, 03_06_23.png"
                alt={t('about.image_placeholder', 'Unternehmenszentrale')}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-6 bg-white rounded-xl p-6 shadow-lg border-0">
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
        {/* Company Timeline removed by request */}

        {/* Contact Information removed by request */}

        {/* Bottom CTA removed by request */}
      </div>
    </section>
  )
}

export default AboutSection
