import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TermsContent from '@/components/legal/TermsContent'

export const metadata: Metadata = {
  title: 'AGB | NavarroGroup',
  description:
    'Allgemeine Geschäftsbedingungen (AGB) der NavarroGroup – rechtliche Rahmenbedingungen für Transport- und Logistikleistungen.',
  robots: {
    index: true,
    follow: false
  }
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-surface-0">
        <div className="max-w-container mx-auto px-6 py-24">
          <TermsContent />
        </div>
      </main>

      <Footer />
    </div>
  )
}
