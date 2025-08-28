'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage, getTranslation } from '@/hooks/useLanguage'
import { partnersContent } from '@/data/content'
import { cn } from '@/lib/utils'

interface PartnersSectionProps {
  className?: string
}

export function PartnersSection({ className }: PartnersSectionProps) {
  const { translations } = useLanguage()
  const t = (key: string, fallback: string) => {
    const val = getTranslation(key, translations)
    return val === key ? fallback : val
  }
  const partners = partnersContent

  return (
    <section 
      id="partners"
      className={cn(
        'py-20 bg-white scroll-mt-16 md:scroll-mt-20',
        className
      )}
    >
      <div className="container mx-auto px-4">
        
        {/* MONOCODE: Observable Implementation - Section Header Only */}
        <div className="text-center">
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
            {t('partners.headline', partners.headline)}
          </h2>
          <p className="text-xl text-ink-600 max-w-3xl mx-auto mb-8">
            {t('partners.subheadline', partners.subheadline)}
          </p>
          
          {/* CODE_EXPANSION: Adding partner logo following style.md Trust Bar guidelines */}
          <div className="flex justify-center">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <Image
                src="/logos/kuhne-nagel.svg"
                alt={t('partners.main.logo_alt', 'Kühne + Nagel Logo')}
                width={300}
                height={75}
                className="h-auto grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
