// FAQ Data for LogisticsCo Landing Page
import type { FAQ } from '@/types/content';

export const faqs: FAQ[] = [
  {
    id: 'pricing',
    question: 'Wie werden die Transportkosten berechnet?',
    answer: 'Die Kosten richten sich nach Entfernung, Gewicht, Volumen und gewünschtem Service-Level. Sondertransporte und Expresssendungen haben individuelle Tarife. Gerne erstellen wir Ihnen ein unverbindliches Angebot.',
    isOpenByDefault: true
  },
  {
    id: 'coverage',
    question: 'In welche Länder transportieren Sie?',
    answer: 'Wir bedienen ganz Europa mit Fokus auf Deutschland, Österreich, Schweiz, Benelux, Polen und Norditalien. Für weltweite Transporte arbeiten wir mit zuverlässigen Partnern zusammen.',
    isOpenByDefault: true
  },
  {
    id: 'insurance',
    question: 'Wie ist meine Sendung versichert?',
    answer: 'Alle Transporte sind standardmäßig versichert. Die Deckungssumme richtet sich nach dem deklarierten Warenwert. Zusätzliche Versicherungen können bei wertvollen Gütern abgeschlossen werden.',
    isOpenByDefault: false
  },
  {
    id: 'tracking',
    question: 'Kann ich meine Sendung verfolgen?',
    answer: 'Ja, Sie erhalten eine Sendungsnummer zur Verfolgung. Bei kritischen Transporten bieten wir Live-Tracking mit GPS-Ortung an.',
    isOpenByDefault: false
  },
  {
    id: 'dangerous_goods',
    question: 'Transportieren Sie auch Gefahrgut?',
    answer: 'Ja, wir sind ADR-zertifiziert und transportieren Gefahrgut aller Klassen. Hierfür benötigen wir spezielle Voranmeldungen und Dokumentationen.',
    isOpenByDefault: false
  },
  {
    id: 'delivery_time',
    question: 'Wie schnell erreicht meine Sendung das Ziel?',
    answer: 'Standard-Transporte innerhalb Deutschlands: 1-2 Werktage. Europa: 2-5 Werktage. Express-Services am gleichen oder nächsten Tag verfügbar.',
    isOpenByDefault: false
  }
];
