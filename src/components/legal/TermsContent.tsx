'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

interface TermsSection {
  title: string
  paragraph_1?: string
  paragraph_2?: string
  paragraph_3?: string
  bullet_1?: string
  bullet_2?: string
  bullet_3?: string
  bullet_4?: string
  link_label?: string
}

interface TermsTranslation {
  title: string
  intro: string
  updated: string
  sections: {
    scope: TermsSection
    parties: TermsSection
    services: TermsSection
    customer: TermsSection
    pricing: TermsSection
    delivery: TermsSection
    liability: TermsSection
    complaints: TermsSection
    withdrawal: TermsSection
    dataProtection: TermsSection
    final: TermsSection
  }
}

const fallbackEn: TermsTranslation = {
  title: 'Terms & Conditions (AGB)',
  intro: 'The following provisions govern all transport and logistics services provided by NavaTransport.',
  updated: 'Last updated: January 2024',
  sections: {
    scope: {
      title: '1. Scope of Application',
      paragraph_1:
        'These General Terms and Conditions (“Terms”) apply to every contract, offer, and service provided by NavaTransport in the field of transport and logistics.',
      paragraph_2:
        'Deviating or supplementary terms of the customer shall only become part of the contract if NavaTransport has expressly agreed to them in text form.'
    },
    parties: {
      title: '2. Contracting Parties & Contact Details',
      paragraph_1: 'NavaTransport GmbH acts as the contractual partner and service provider.',
      paragraph_2: 'All enquiries must be submitted via the communication channels specified in these Terms.'
    },
    services: {
      title: '3. Services & Conclusion of Contract',
      paragraph_1: 'Quotations issued by NavaTransport are non-binding and refer solely to the services described therein.',
      bullet_1: 'A contract is concluded only after written order confirmation (e.g., by email) or by execution of the service.',
      bullet_2: 'Changes or extensions to the scope of services require text form and may lead to adjusted fees.',
      bullet_3: 'Time and quantity commitments remain subject to available capacity and necessary official approvals.'
    },
    customer: {
      title: '4. Customer Obligations',
      paragraph_1: 'The customer shall provide all information, documents, and access required for proper performance in due time.',
      paragraph_2:
        'The customer guarantees that all entrusted goods are properly packed, labelled, and free of third-party rights; mandatory permits must be obtained unless expressly agreed otherwise.'
    },
    pricing: {
      title: '5. Pricing & Payment Terms',
      paragraph_1: 'All prices are quoted net in euros plus the applicable statutory VAT unless stated otherwise.',
      bullet_1: 'Additional costs (e.g., customs, duties, waiting times, ancillary services) will be invoiced separately and borne by the customer.',
      bullet_2: 'Invoices are payable in full within 14 days from the invoice date.',
      bullet_3: 'In the event of default, the statutory default interest pursuant to Section 288 BGB applies.'
    },
    delivery: {
      title: '6. Delivery & Performance Deadlines',
      paragraph_1: 'Specified delivery and performance dates are non-binding unless expressly confirmed as binding.',
      paragraph_2:
        'Force majeure, transport or operational disruptions, and official measures extend agreed deadlines by the duration of the disruption plus a reasonable restart period.'
    },
    liability: {
      title: '7. Liability & Insurance',
      bullet_1: 'NavaTransport is liable for damages only in cases of intent, gross negligence, or breach of essential contractual obligations.',
      bullet_2: 'In cases of slight negligence of a cardinal duty, liability is limited to foreseeable, typical damage.',
      bullet_3: 'Statutory liability limits under the German Commercial Code (HGB) and applicable international conventions apply to cargo damage.',
      bullet_4: 'The customer must declare the value of the goods and arrange additional transport insurance if higher coverage is required.'
    },
    complaints: {
      title: '8. Complaints & Notification of Defects',
      paragraph_1:
        'Obvious defects must be reported without undue delay, at the latest within 7 calendar days after delivery; hidden defects must be notified within 7 calendar days after discovery.'
    },
    withdrawal: {
      title: '9. Withdrawal & Termination Rights',
      bullet_1: 'Consumers within the meaning of Section 13 BGB have a statutory right of withdrawal pursuant to the applicable legal provisions.',
      bullet_2: 'Entrepreneurs within the meaning of Section 14 BGB have no withdrawal right; any termination or rescission rights must be expressly agreed.'
    },
    dataProtection: {
      title: '10. Data Protection',
      paragraph_1: 'NavaTransport processes personal data strictly in accordance with the statutory requirements of the GDPR.',
      paragraph_2: 'Further details are available in our',
      link_label: 'Privacy Policy'
    },
    final: {
      title: '11. Final Provisions',
      bullet_1: 'The laws of the Federal Republic of Germany apply, excluding the UN Convention on Contracts for the International Sale of Goods (CISG).',
      bullet_2: 'Place of performance and jurisdiction for merchants is the registered office of NavaTransport.',
      bullet_3:
        'Should any provision be or become invalid, the remaining provisions remain in force; the parties shall agree on a valid provision that best reflects the economic intent.'
    }
  }
}

const fallbackDe: TermsTranslation = {
  title: 'Allgemeine Geschäftsbedingungen (AGB)',
  intro: 'Die nachfolgenden Bestimmungen regeln sämtliche Transport- und Logistikleistungen der NavaTransport.',
  updated: 'Stand: Januar 2024',
  sections: {
    scope: {
      title: '1. Geltungsbereich',
      paragraph_1:
        'Diese Allgemeinen Geschäftsbedingungen („AGB“) gelten für sämtliche Verträge, Angebote und Leistungen der NavaTransport im Bereich Transport und Logistik.',
      paragraph_2:
        'Abweichende oder ergänzende Bedingungen des Auftraggebers werden nur Vertragsbestandteil, wenn NavaTransport ihrer Geltung ausdrücklich in Textform zugestimmt hat.'
    },
    parties: {
      title: '2. Vertragspartner & Kontaktdaten',
      paragraph_1: 'Vertragspartner und Dienstleister ist die NavaTransport GmbH.',
      paragraph_2: 'Anfragen sind ausschließlich über die in diesen AGB genannten Kommunikationswege einzureichen.'
    },
    services: {
      title: '3. Leistungen & Vertragsschluss',
      paragraph_1: 'Von NavaTransport abgegebene Angebote sind freibleibend und beziehen sich ausschließlich auf die jeweils beschriebenen Leistungen.',
      bullet_1: 'Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung (z. B. per E-Mail) oder durch Ausführung der Leistung zustande.',
      bullet_2: 'Änderungen oder Erweiterungen des Leistungsumfangs bedürfen der Textform und können zu angepassten Vergütungen führen.',
      bullet_3: 'Zeit- und Mengenzusagen stehen unter dem Vorbehalt ausreichender Kapazitäten sowie erforderlicher behördlicher Genehmigungen.'
    },
    customer: {
      title: '4. Mitwirkungspflichten des Auftraggebers',
      paragraph_1: 'Der Auftraggeber stellt alle zur ordnungsgemäßen Leistungserbringung notwendigen Informationen, Dokumente und Zugänge rechtzeitig bereit.',
      paragraph_2:
        'Er gewährleistet, dass sämtliche übergebenen Güter ordnungsgemäß verpackt, gekennzeichnet und frei von Rechten Dritter sind; erforderliche behördliche Genehmigungen sind zu beschaffen, sofern nichts anderes vereinbart ist.'
    },
    pricing: {
      title: '5. Preise & Zahlungsbedingungen',
      paragraph_1: 'Alle Preise verstehen sich netto in Euro zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer, sofern nicht anders angegeben.',
      bullet_1: 'Zusätzliche Kosten (z. B. Zölle, Gebühren, Wartezeiten, Zusatzleistungen) werden gesondert berechnet und vom Auftraggeber getragen.',
      bullet_2: 'Rechnungen sind innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug zahlbar.',
      bullet_3: 'Bei Zahlungsverzug gelten die gesetzlichen Verzugszinsen gemäß § 288 BGB.'
    },
    delivery: {
      title: '6. Liefer- & Leistungsfristen',
      paragraph_1: 'Angegebene Liefer- und Leistungsfristen sind unverbindlich, sofern sie nicht ausdrücklich als verbindlich bestätigt werden.',
      paragraph_2:
        'Ereignisse höherer Gewalt, Transport- oder Betriebsstörungen sowie behördliche Maßnahmen verlängern vereinbarte Fristen um die Dauer der Störung zuzüglich einer angemessenen Wiederanlaufzeit.'
    },
    liability: {
      title: '7. Haftung & Versicherung',
      bullet_1: 'NavaTransport haftet für Schäden nur bei Vorsatz, grober Fahrlässigkeit oder Verletzung wesentlicher Vertragspflichten.',
      bullet_2: 'Bei leicht fahrlässiger Verletzung einer Kardinalpflicht ist die Haftung auf den vorhersehbaren, typischerweise eintretenden Schaden begrenzt.',
      bullet_3: 'Für Güterschäden gelten die gesetzlichen Haftungshöchstbeträge des Handelsgesetzbuchs (HGB) sowie einschlägiger internationaler Übereinkommen.',
      bullet_4: 'Der Auftraggeber hat den Warenwert anzugeben und bei Bedarf eine weitergehende Transportversicherung zu beauftragen.'
    },
    complaints: {
      title: '8. Reklamationen & Rügepflicht',
      paragraph_1:
        'Offensichtliche Mängel sind unverzüglich, spätestens jedoch innerhalb von 7 Kalendertagen nach Ablieferung schriftlich anzuzeigen; verdeckte Mängel sind innerhalb von 7 Kalendertagen nach Entdeckung mitzuteilen.'
    },
    withdrawal: {
      title: '9. Widerrufs- & Kündigungsrechte',
      bullet_1: 'Verbrauchern im Sinne des § 13 BGB steht ein gesetzliches Widerrufsrecht nach den einschlägigen Vorschriften zu.',
      bullet_2: 'Unternehmer im Sinne des § 14 BGB haben kein Widerrufsrecht; individuelle Kündigungs- oder Rücktrittsrechte sind ausdrücklich zu vereinbaren.'
    },
    dataProtection: {
      title: '10. Datenschutz',
      paragraph_1: 'NavaTransport verarbeitet personenbezogene Daten ausschließlich gemäß den gesetzlichen Vorgaben der DSGVO.',
      paragraph_2: 'Weitere Informationen entnehmen Sie bitte unserer',
      link_label: 'Datenschutzerklärung'
    },
    final: {
      title: '11. Schlussbestimmungen',
      bullet_1: 'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).',
      bullet_2: 'Erfüllungsort und Gerichtsstand für Kaufleute ist der Sitz der NavaTransport.',
      bullet_3:
        'Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Regelungen unberührt; die Parteien vereinbaren eine Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.'
    }
  }
}

const sectionOrder: Array<keyof TermsTranslation['sections']> = [
  'scope',
  'parties',
  'services',
  'customer',
  'pricing',
  'delivery',
  'liability',
  'complaints',
  'withdrawal',
  'dataProtection',
  'final'
]

export const TermsContent: React.FC = () => {
  const { currentLanguage, translations } = useLanguage()

  const termsContent = useMemo<TermsTranslation>(() => {
    const localeTerms = translations && (translations as Record<string, unknown>).terms
    if (localeTerms && typeof localeTerms === 'object') {
      return localeTerms as TermsTranslation
    }
    return currentLanguage === 'de' ? fallbackDe : fallbackEn
  }, [currentLanguage, translations])

  return (
    <div className="max-w-4xl">
      <h1 className="font-geist font-bold text-5xl lg:text-6xl text-ink-900 mb-6 tracking-tight">
        {termsContent.title}
      </h1>
      <p className="text-xl text-ink-600 mb-3">{termsContent.intro}</p>
      <p className="text-sm text-ink-500 mb-12">{termsContent.updated}</p>

      <div className="prose prose-lg prose-ink max-w-none">
        {sectionOrder.map((sectionKey) => {
          const section = termsContent.sections[sectionKey]
          if (!section) {
            return null
          }

          const paragraphKeys = Object.keys(section)
            .filter((key) => key.startsWith('paragraph_'))
            .sort()
          const bulletKeys = Object.keys(section)
            .filter((key) => key.startsWith('bullet_'))
            .sort()

          return (
            <section key={sectionKey} className="mb-12 last:mb-0">
              <h2 className="font-geist font-bold text-3xl text-ink-900 mb-6">{section.title}</h2>

              {paragraphKeys.map((key) => {
                if (!section[key as keyof TermsSection]) {
                  return null
                }

                const paragraph = section[key as keyof TermsSection] as string

                if (sectionKey === 'dataProtection' && key === 'paragraph_2') {
                  return (
                    <p key={key}>
                      {paragraph}{' '}
                      <Link
                        href="/datenschutz"
                        className="text-brand-600 hover:text-brand-500 underline"
                      >
                        {section.link_label || (currentLanguage === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy')}
                      </Link>
                      .
                    </p>
                  )
                }

                return <p key={key}>{paragraph}</p>
              })}

              {bulletKeys.length > 0 && (
                <ul className="list-disc pl-6 space-y-2">
                  {bulletKeys.map((key) => {
                    const bullet = section[key as keyof TermsSection]
                    if (!bullet) {
                      return null
                    }
                    return <li key={key}>{bullet}</li>
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default TermsContent
