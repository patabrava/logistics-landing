import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COMPANY } from '@/lib/constants';

// MONOCODE: Explicit Error Handling - Comprehensive SEO metadata for privacy page
export const metadata: Metadata = {
  title: 'Datenschutz | LogisticsCo',
  description: 'Datenschutzerklärung der LogisticsCo - Informationen zum Umgang mit personenbezogenen Daten gemäß DSGVO',
  robots: {
    index: true,
    follow: false,
  },
};

// MONOCODE: Observable Implementation - Privacy page with structured GDPR-compliant content
export default function DatenschutzPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-surface-0">
        <div className="max-w-container mx-auto px-6 py-24">
          {/* Style Guide: Typography and spacing following style.md */}
          <div className="max-w-4xl">
            <h1 className="font-manrope font-bold text-5xl lg:text-6xl text-ink-900 mb-8 tracking-tight">
              DATENSCHUTZ
            </h1>
            
            <div className="prose prose-lg prose-ink max-w-none">
              {/* MONOCODE: Dependency Transparency - Privacy content with clear structure */}
              <section className="mb-12">
                <h2 className="font-manrope font-bold text-3xl text-ink-900 mb-6">
                  1. Datenschutz auf einen Blick
                </h2>
                
                <h3 className="font-manrope font-bold text-2xl text-ink-900 mb-4">
                  Allgemeine Hinweise
                </h3>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                    passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                    persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen 
                    Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                  </p>
                </div>

                <h3 className="font-manrope font-bold text-2xl text-ink-900 mb-4 mt-8">
                  Datenerfassung auf dieser Website
                </h3>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    <strong className="text-ink-900">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                  </p>
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                    können Sie dem Abschnitt &ldquo;Hinweis zur Verantwortlichen Stelle&rdquo; in dieser Datenschutzerklärung entnehmen.
                  </p>
                  <p>
                    <strong className="text-ink-900">Wie erfassen wir Ihre Daten?</strong>
                  </p>
                  <p>
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um 
                    Daten handeln, die Sie in ein Kontaktformular eingeben.
                  </p>
                  <p>
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                    IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder 
                    Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-manrope font-bold text-3xl text-ink-900 mb-6">
                  2. Hinweis zur verantwortlichen Stelle
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                  </p>
                  <p>
                    <strong className="text-ink-900">{COMPANY.NAME}</strong><br />
                    {COMPANY.ADDRESS.STREET}<br />
                    {COMPANY.ADDRESS.POSTAL_CODE} {COMPANY.ADDRESS.CITY}<br />
                    {COMPANY.ADDRESS.COUNTRY}
                  </p>
                  <p>
                    Telefon: <a href={`tel:${COMPANY.CONTACT.PHONE}`} className="text-brand-600 hover:text-brand-500 underline">{COMPANY.CONTACT.PHONE}</a><br />
                    E-Mail: <a href={`mailto:${COMPANY.CONTACT.EMAIL}`} className="text-brand-600 hover:text-brand-500 underline">{COMPANY.CONTACT.EMAIL}</a>
                  </p>
                  <p>
                    Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über 
                    die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-manrope font-bold text-3xl text-ink-900 mb-6">
                  3. Allgemeine Hinweise und Pflichtinformationen
                </h2>
                
                <h3 className="font-manrope font-bold text-2xl text-ink-900 mb-4">
                  Datenschutz
                </h3>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
                    personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzbestimmungen sowie 
                    dieser Datenschutzerklärung.
                  </p>
                  <p>
                    Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene 
                    Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung 
                    erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                  </p>
                </div>

                <h3 className="font-manrope font-bold text-2xl text-ink-900 mb-4 mt-8">
                  Hinweis zur Datenweitergabe in die USA
                </h3>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Auf unserer Website sind unter anderem Tools von Unternehmen mit Sitz in den USA oder deren US-amerikanische 
                    Server eingebunden. Wenn diese Tools aktiv sind, können Ihre personenbezogene Daten an die US-amerikanischen 
                    Server der jeweiligen Unternehmen übertragen werden. Wir weisen darauf hin, dass die USA kein sicherer 
                    Drittstaat im Sinne des EU-Datenschutzrechts sind.
                  </p>
                </div>

                <h3 className="font-manrope font-bold text-2xl text-ink-900 mb-4 mt-8">
                  Widerruf Ihrer Einwilligung zur Datenverarbeitung
                </h3>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine 
                    bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten 
                    Datenverarbeitung bleibt vom Widerruf unberührt.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-manrope font-bold text-3xl text-ink-900 mb-6">
                  4. Datenerfassung auf dieser Website
                </h2>
                
                <h3 className="font-manrope font-bold text-2xl text-ink-900 mb-4">
                  Server-Log-Dateien
                </h3>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                    die Ihr Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                  <p>
                    Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                  </p>
                  <p>
                    Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat 
                    ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – 
                    hierzu müssen die Server-Log-Files erfasst werden.
                  </p>
                </div>

                <h3 className="font-manrope font-bold text-2xl text-ink-900 mb-4 mt-8">
                  Anfrage per E-Mail, Telefon oder Telefax
                </h3>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus 
                    hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei 
                    uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                  <p>
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage 
                    mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich 
                    ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven 
                    Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung 
                    (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
                  </p>
                  <p>
                    Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung 
                    auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt 
                    (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere 
                    gesetzliche Aufbewahrungsfristen – bleiben unberührt.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-manrope font-bold text-3xl text-ink-900 mb-6">
                  5. Ihre Rechte
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Sie haben als betroffene Person folgende Rechte:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht zu erfahren, ob und welche Daten wir von Ihnen verarbeiten.</li>
                    <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie haben das Recht, unrichtige Daten berichtigen zu lassen.</li>
                    <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie haben das Recht auf Löschung Ihrer Daten, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</li>
                    <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie haben das Recht, die Einschränkung der Verarbeitung zu verlangen.</li>
                    <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
                    <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, der Verarbeitung Ihrer Daten zu widersprechen.</li>
                  </ul>
                  <p>
                    Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: 
                    <a href={`mailto:${COMPANY.CONTACT.EMAIL}`} className="text-brand-600 hover:text-brand-500 underline ml-1">
                      {COMPANY.CONTACT.EMAIL}
                    </a>
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-manrope font-bold text-3xl text-ink-900 mb-6">
                  6. Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, 
                    insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des 
                    mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher 
                    oder gerichtlicher Rechtsbehelfe.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-manrope font-bold text-3xl text-ink-900 mb-6">
                  7. SSL- bzw. TLS-Verschlüsselung
                </h2>
                <div className="space-y-4 text-ink-700 leading-relaxed">
                  <p>
                    Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum 
                    Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. 
                    Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &ldquo;http://&rdquo; auf 
                    &ldquo;https://&rdquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                  </p>
                  <p>
                    Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht 
                    von Dritten mitgelesen werden.
                  </p>
                </div>
              </section>

              <div className="pt-8 border-t border-ink-200">
                <p className="text-ink-500 text-sm">
                  Stand: Januar 2024<br />
                  Diese Datenschutzerklärung wurde zuletzt am 15. Januar 2024 aktualisiert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
