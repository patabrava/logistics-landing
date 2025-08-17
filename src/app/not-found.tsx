import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

// MONOCODE: Observable Implementation - Custom 404 page with structured navigation options
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-surface-0">
        <div className="max-w-container mx-auto px-6 py-24">
          <div className="max-w-2xl mx-auto text-center">
            {/* Style Guide: Typography and spacing following style.md */}
            <div className="mb-8">
              <div className="text-8xl lg:text-9xl font-manrope font-bold text-brand-600 mb-4">
                404
              </div>
              <h1 className="font-manrope font-bold text-4xl lg:text-5xl text-ink-900 mb-6 tracking-tight">
                SEITE NICHT GEFUNDEN
              </h1>
              <p className="text-lg text-ink-600 leading-relaxed mb-8">
                Die angeforderte Seite konnte nicht gefunden werden. Möglicherweise wurde sie verschoben, 
                gelöscht oder Sie haben eine ungültige URL eingegeben.
              </p>
            </div>

            {/* MONOCODE: Progressive Construction - Navigation options with clear CTAs */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Zur Startseite
                  </Button>
                </Link>
                <Link href="/#quote">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Angebot anfordern
                  </Button>
                </Link>
              </div>
              
              {/* MONOCODE: Explicit Error Handling - Helpful navigation suggestions */}
              <div className="pt-8 border-t border-ink-200">
                <h2 className="font-manrope font-bold text-xl text-ink-900 mb-4">
                  Beliebte Seiten
                </h2>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link 
                    href="/#services" 
                    className="text-brand-600 hover:text-brand-500 underline"
                  >
                    Unsere Services
                  </Link>
                  <Link 
                    href="/#quote" 
                    className="text-brand-600 hover:text-brand-500 underline"
                  >
                    Angebot anfordern
                  </Link>
                  <Link 
                    href="/impressum" 
                    className="text-brand-600 hover:text-brand-500 underline"
                  >
                    Impressum
                  </Link>
                  <Link 
                    href="/datenschutz" 
                    className="text-brand-600 hover:text-brand-500 underline"
                  >
                    Datenschutz
                  </Link>
                </div>
              </div>

              {/* Style Guide: Contact information in error scenarios */}
              <div className="pt-6">
                <p className="text-ink-500 text-sm">
                  Benötigen Sie Hilfe? Kontaktieren Sie uns unter{' '}
                  <a 
                    href="tel:+493012345678" 
                    className="text-brand-600 hover:text-brand-500 underline"
                  >
                    +49 30 12345678
                  </a>
                  {' '}oder{' '}
                  <a 
                    href="mailto:info@logisticsco.de" 
                    className="text-brand-600 hover:text-brand-500 underline"
                  >
                    info@logisticsco.de
                  </a>
                </p>
              </div>
            </div>

            {/* MONOCODE: Observable Implementation - Visual decoration following brand guidelines */}
            <div className="mt-16 opacity-20">
              <svg 
                className="w-32 h-32 mx-auto text-brand-600" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
