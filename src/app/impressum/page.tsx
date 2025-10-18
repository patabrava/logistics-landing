import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COMPANY } from '@/lib/constants';

// MONOCODE: Explicit Error Handling - Comprehensive SEO metadata for legal page
export const metadata: Metadata = {
  title: 'Impressum | LogisticsCo',
  description: 'Impressum und rechtliche Informationen der LogisticsCo - Angaben gemäß § 5 TMG',
  robots: {
    index: true,
    follow: false,
  },
};

// MONOCODE: Observable Implementation - Legal page with structured content
export default function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-surface-0">
        <div className="max-w-container mx-auto px-6 py-24">
          {/* Style Guide: Typography and spacing following style.md */}
          <div className="max-w-4xl">
            <h1 className="font-geist font-bold text-5xl lg:text-6xl text-ink-900 mb-8 tracking-tight">
              IMPRESSUM
            </h1>
            
            <div className="prose prose-lg prose-ink max-w-none">
              {/* MONOCODE: Dependency Transparency - Legal content using constants */}
              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  Angaben gemäß § 5 TMG
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    <strong className="text-ink-900">{COMPANY.NAME}</strong><br />
                    {COMPANY.ADDRESS.STREET}<br />
                    {COMPANY.ADDRESS.POSTAL_CODE} {COMPANY.ADDRESS.CITY}<br />
                    {COMPANY.ADDRESS.COUNTRY}
                  </p>
                  
                  <p>
                    <strong className="text-ink-900">Vertreten durch:</strong><br />
                    Geschäftsführer: Max Mustermann
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  Kontakt
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Telefon: <a href={`tel:${COMPANY.CONTACT.PHONE}`} className="text-brand-600 hover:text-brand-500 underline">{COMPANY.CONTACT.PHONE}</a><br />
                    E-Mail: <a href={`mailto:${COMPANY.CONTACT.EMAIL}`} className="text-brand-600 hover:text-brand-500 underline">{COMPANY.CONTACT.EMAIL}</a>
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  Registereintrag
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Eintragung im Handelsregister.<br />
                    Registergericht: Amtsgericht Berlin<br />
                    Registernummer: HRB 12345 B
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  Umsatzsteuer-ID
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    DE123456789
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  EU-Streitschlichtung
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-500 underline ml-1">
                      https://ec.europa.eu/consumers/odr/
                    </a>
                    <br />
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  Verbraucherstreitbeilegung/Universalschlichtungsstelle
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                    Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  Haftung für Inhalte
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                    unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                  <p>
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                    Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
                    der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                    Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  Haftung für Links
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                    verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die 
                    verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                    Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                  </p>
                  <p>
                    Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
                    einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
                    Links umgehend entfernen.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  Urheberrecht
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
                    deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung 
                    außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors 
                    bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen 
                    Gebrauch gestattet.
                  </p>
                  <p>
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
                    Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
                    auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei 
                    Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
