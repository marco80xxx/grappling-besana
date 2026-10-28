// Domande frequenti: SOLO STRUTTURA, risposte da fornire.
// Una voce senza `answer` non viene mostrata ne inserita nei dati strutturati
// (FAQPage). Non inventare le risposte: devono arrivare da Marco.
//
// Per pubblicare la pagina:
//   1. scrivere le risposte qui sotto;
//   2. rinominare src/pages/_faq.astro in src/pages/faq.astro (il prefisso "_"
//      la esclude dal sito e dalla sitemap);
//   3. aggiungere un link alla pagina (es. nel footer).

export interface FaqItem {
  question: string;
  /** Risposta in testo semplice. Assente = TODO: la voce resta nascosta. */
  answer?: string;
}

export const faq: FaqItem[] = [
  { question: "Posso fare una lezione di prova gratuita?" }, // TODO risposta
  { question: "Da che età si può iniziare?" }, // TODO risposta
  { question: "Cosa devo portare alla prima lezione?" }, // TODO risposta
  { question: "Quanto costa frequentare i corsi?" }, // TODO: decide Marco se e come comunicare i prezzi
  { question: "Come mi iscrivo?" }, // TODO risposta
];

export const answeredFaq = faq.filter(
  (item): item is FaqItem & { answer: string } => !!item.answer?.trim(),
);
