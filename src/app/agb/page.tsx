import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'AGB | NavarroGroup',
  description: 'Allgemeine Geschäftsbedingungen (AGB) der NavarroGroup – rechtliche Rahmenbedingungen für Logistikdienstleistungen.',
  robots: {
    index: true,
    follow: false
  }
}

export default function AgbPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-surface-0">
        <div className="max-w-container mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <h1 className="font-geist font-bold text-5xl lg:text-6xl text-ink-900 mb-8 tracking-tight">
              ALLGEMEINE GESCHÄFTSBEDINGUNGEN (AGB)
            </h1>

            <div className="prose prose-lg prose-ink max-w-none space-y-12">
              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  1. Geltungsbereich
                </h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (&quot;AGB&quot;) regeln sämtliche Verträge, Leistungen und Angebote der{' '}
                  <strong className="text-ink-900">{COMPANY.NAME}</strong> (nachfolgend &quot;Auftragnehmer&quot;). Abweichende, entgegenstehende oder ergänzende Bedingungen
                  des Auftraggebers werden – selbst bei Kenntnis – nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich in Textform zugestimmt.
                </p>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  2. Vertragspartner & Kontaktdaten
                </h2>
                <div className="space-y-4">
                  <p>
                    Vertragspartner und Anbieter der Logistikdienstleistungen ist:
                  </p>
                  <p>
                    <strong className="text-ink-900">{COMPANY.LEGAL_NAME}</strong><br />
                    {COMPANY.ADDRESS.STREET}<br />
                    {COMPANY.ADDRESS.POSTAL_CODE} {COMPANY.ADDRESS.CITY}<br />
                    {COMPANY.ADDRESS.COUNTRY}<br />
                    Telefon: <a href={`tel:${COMPANY.CONTACT.PHONE}`} className="text-brand-600 hover:text-brand-500 underline">{COMPANY.CONTACT.PHONE}</a><br />
                    E-Mail: <a href={`mailto:${COMPANY.CONTACT.EMAIL}`} className="text-brand-600 hover:text-brand-500 underline">{COMPANY.CONTACT.EMAIL}</a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  3. Leistungsbeschreibung & Vertragsschluss
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Angebote des Auftragnehmers sind freibleibend und gelten ausschließlich für die jeweils im Angebot angegebenen Leistungen.
                  </li>
                  <li>
                    Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung (z. B. per E-Mail) oder durch tatsächliche Ausführung der Leistung zustande.
                  </li>
                  <li>
                    Änderungen oder Erweiterungen des Leistungsumfangs bedürfen der Textform und können zu angepassten Entgelten führen.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  4. Mitwirkungspflichten des Auftraggebers
                </h2>
                <p>
                  Der Auftraggeber verpflichtet sich, alle für die ordnungsgemäße Durchführung erforderlichen Informationen, Dokumente und Zugänge rechtzeitig bereitzustellen.
                  Er stellt sicher, dass die übergebenen Güter ordnungsgemäß verpackt, gekennzeichnet und frei von Rechten Dritter sind. Eventuelle behördliche Genehmigungen
                  sind durch den Auftraggeber zu beschaffen, sofern nicht anders vereinbart.
                </p>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  5. Preise, Nebenkosten & Zahlungsbedingungen
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Alle Preise verstehen sich netto in Euro zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer, sofern nichts Abweichendes ausgewiesen ist.
                  </li>
                  <li>
                    Zusätzliche Kosten (z. B. Zölle, Gebühren, Wartezeiten, Zusatzleistungen) werden nach Aufwand berechnet und sind vom Auftraggeber zu tragen.
                  </li>
                  <li>
                    Rechnungen sind binnen 14 Tagen ab Rechnungsdatum ohne Abzug zur Zahlung fällig. Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen (§ 288 BGB).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  6. Liefer- & Leistungsfristen
                </h2>
                <p>
                  Angegebene Fristen sind unverbindlich, sofern sie nicht ausdrücklich als verbindlich zugesichert werden. Ereignisse höherer Gewalt, Verkehrs- oder Betriebsstörungen,
                  behördliche Maßnahmen oder sonstige unvorhersehbare Umstände verlängern vereinbarte Fristen um die Dauer der Störung zuzüglich einer angemessenen Anlaufzeit.
                </p>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  7. Haftung & Versicherung
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Der Auftragnehmer haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten).
                  </li>
                  <li>
                    Bei leicht fahrlässiger Verletzung einer Kardinalpflicht ist die Haftung auf den vorhersehbaren, typischerweise eintretenden Schaden begrenzt.
                  </li>
                  <li>
                    Für Güterschäden gelten die gesetzlichen Haftungshöchstbeträge des Handelsgesetzbuchs (HGB) bzw. einschlägiger internationalen Übereinkommen.
                  </li>
                  <li>
                    Der Auftraggeber ist verpflichtet, den Wert der zu transportierenden Güter anzugeben und eine Transportversicherung zu beauftragen, sofern ein höherer Versicherungsschutz gewünscht ist.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  8. Reklamationen & Rügepflicht
                </h2>
                <p>
                  Offensichtliche Mängel sind unverzüglich, spätestens jedoch innerhalb von 7 Kalendertagen nach Ablieferung schriftlich anzuzeigen. Verdeckte Mängel
                  müssen innerhalb von 7 Kalendertagen nach Entdeckung gemeldet werden. Unterbleibt eine fristgerechte Anzeige, gilt die Leistung als genehmigt.
                </p>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  9. Widerrufs- & Kündigungsrechte
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Sofern der Auftraggeber Verbraucher im Sinne des § 13 BGB ist, steht ihm ein gesetzliches Widerrufsrecht nach Maßgabe der gesetzlichen Vorschriften zu.
                  </li>
                  <li>
                    Für Unternehmer im Sinne des § 14 BGB besteht kein Widerrufsrecht. Individuelle Kündigungs- oder Rücktrittsrechte sind im jeweiligen Vertrag zu vereinbaren.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  10. Datenschutz
                </h2>
                <p>
                  Der Auftragnehmer verarbeitet personenbezogene Daten ausschließlich gemäß den gesetzlichen Vorgaben. Ergänzende Informationen entnehmen Sie bitte unserer{' '}
                  <a href="/datenschutz" className="text-brand-600 hover:text-brand-500 underline">Datenschutzerklärung</a>.
                </p>
              </section>

              <section>
                <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">
                  11. Schlussbestimmungen
                </h2>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).
                  </li>
                  <li>
                    Erfüllungsort und Gerichtsstand für Kaufleute, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen ist der Sitz des Auftragnehmers.
                  </li>
                  <li>
                    Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Die Parteien verpflichten sich,
                    eine rechtswirksame Regelung zu treffen, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
                  </li>
                </ul>
                <p className="text-ink-500 text-sm mt-6">
                  Stand: Januar 2024
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
