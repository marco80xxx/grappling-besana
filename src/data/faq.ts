// Domande frequenti. Il testo delle risposte e quello fornito da Marco: non
// riscriverlo. Cio che deve restare allineato al resto del sito si ricava dai
// dati: orari (src/data/orari.ts), contatti e indirizzo (allStaticData.json).
//
// `answer` e testo semplice: e quello visibile in pagina e, identico, quello
// del JSON-LD FAQPage. I link (`links`) sono extra e restano fuori dal JSON-LD.

import {
  CORSO_BJJ_GI,
  fasciaComune,
  formatGiorni,
  giorniDelle,
  lezioniDi,
  PAUSA_PRANZO,
} from "./orari";

export interface FaqLink {
  label: string;
  href: string;
  external?: boolean;
}

/** Parola (o frase) della risposta da rendere cliccabile; il testo resta invariato. */
export interface InlineLink {
  text: string;
  href: string;
  external?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Link dentro la frase: cambiano solo il markup, non `answer` (ne il JSON-LD). */
  inline?: InlineLink[];
  links?: FaqLink[];
}

export type AnswerSegment = string | InlineLink;

/** Divide la risposta in testo semplice e link inline (prima occorrenza di ogni `text`). */
export function segmentAnswer(answer: string, inline: InlineLink[] = []): AnswerSegment[] {
  const trovati = inline
    .map((link) => {
      const index = answer.indexOf(link.text);
      if (index < 0) {
        throw new Error(`[faq] Il testo del link "${link.text}" non compare nella risposta: "${answer.slice(0, 50)}..."`);
      }
      return { link, index };
    })
    .sort((a, b) => a.index - b.index);

  const segmenti: AnswerSegment[] = [];
  let cursore = 0;
  for (const { link, index } of trovati) {
    if (index < cursore) continue;
    if (index > cursore) segmenti.push(answer.slice(cursore, index));
    segmenti.push(link);
    cursore = index + link.text.length;
  }
  if (cursore < answer.length) segmenti.push(answer.slice(cursore));
  return segmenti;
}

/** Campi di allStaticData.json usati dalla FAQ. */
export interface FaqContext {
  telephone: string;
  email: string;
  instagram: string;
  whatsapp: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
}

export const faqIntro =
  "Hai una domanda prima di salire sul tatami? Qui trovi le risposte più comuni. Se non trovi quello che cerchi, scrivici: il primo passo è sempre il più importante.";

const maiuscola = (testo: string) => testo.charAt(0).toUpperCase() + testo.slice(1);
const minuscola = (testo: string) => testo.charAt(0).toLowerCase() + testo.slice(1);

export function buildFaq(ctx: FaqContext): FaqItem[] {
  // --- orari -------------------------------------------------------------
  const grappling = lezioniDi("grappling");
  const grapplingPranzo = grappling.filter((l) => l.nota === PAUSA_PRANZO);
  const grapplingSera = grappling.filter((l) => l.nota !== PAUSA_PRANZO);
  const bjjGi = grappling.filter((l) => l.corso === CORSO_BJJ_GI);
  const judo = lezioniDi("judo");
  const sc = lezioniDi("sc");
  const openMat = lezioniDi("openmat");

  const giorniGrappling = formatGiorni(giorniDelle(grappling));
  const giorniJudo = formatGiorni(giorniDelle(judo));
  const giorniSc = formatGiorni(giorniDelle(sc));
  const giornoOpenMat = formatGiorni(giorniDelle(openMat)); // "il sabato"
  const giornoOpenMatNudo = formatGiorni(giorniDelle(openMat), { articolo: false });
  const giorniSeraNudi = formatGiorni(giorniDelle(grapplingSera), { articolo: false });
  const lezioniGiSettimanali =
    bjjGi.length === 1 ? "una lezione settimanale" : `${bjjGi.length} lezioni settimanali`;

  const pranzo = fasciaComune(grapplingPranzo) ?? "";
  const orarioOpenMat = openMat[0];
  const inizioJudo = judo[0]?.inizio;

  // --- contatti e indirizzo ---------------------------------------------
  const handleInstagram = new URL(ctx.instagram).pathname.replace(/\//g, "");
  const via = minuscola(ctx.streetAddress);
  // Azioni per prenotare la prova: messaggio/oggetto precompilati, cosi chi
  // scrive arriva gia con la richiesta giusta.
  const whatsappProva = `${ctx.whatsapp.split("?")[0]}?text=${encodeURIComponent("Ciao, vorrei prenotare una lezione di prova")}`;
  const emailProva = `mailto:${ctx.email}?subject=${encodeURIComponent("Richiesta lezione di prova")}`;
  const mapsQuery = encodeURIComponent(
    `Polisportiva Besanese, ${ctx.streetAddress}, ${ctx.addressLocality}`,
  );

  return [
    {
      id: "iniziare-da-zero",
      question: "Non ho mai praticato arti marziali, posso iniziare?",
      answer:
        "Sì. A Grappling Besana la maggior parte degli atleti ha iniziato da zero. Per chi è nuovo c'è un percorso guidato: si parte dai fondamentali e si è seguiti passo dopo passo dai coach e dalle cinture più esperte. Non serve essere già in forma: la forma arriva allenandosi.",
    },
    {
      id: "lezione-di-prova",
      question: "Posso fare una lezione di prova?",
      answer:
        "Sì, la prima lezione di prova è gratuita. Va prenotata scrivendoci su WhatsApp, su Instagram o via email: ti diciamo quale lezione è più adatta per iniziare.",
      inline: [
        { text: "WhatsApp", href: whatsappProva, external: true },
        { text: "Instagram", href: ctx.instagram, external: true },
        { text: "email", href: emailProva },
      ],
    },
    {
      id: "eta-minima",
      question: "Da che età si può iniziare?",
      answer:
        "I corsi di Grappling Besana sono pensati per ragazzi e adulti, indicativamente dai 14 anni in su.",
    },
    {
      id: "cosa-portare",
      question: "Cosa devo portare alla prima lezione?",
      answer:
        "Una maglietta aderente (o una rashguard), pantaloncini senza zip né tasche, ciabatte per spostarti fuori dal tatami e il necessario per la doccia.",
    },
    {
      id: "certificato-medico",
      question: "Serve il certificato medico?",
      answer:
        "Sì, per allenarsi serve il certificato medico sportivo. Va bene quello non agonistico.",
    },
    {
      id: "grappling-e-bjj",
      question: "Che differenza c'è tra Grappling e Brazilian Jiu-Jitsu?",
      answer: `Il Brazilian Jiu-Jitsu (BJJ) è un'arte marziale di lotta a terra basata su controllo, posizioni e sottomissioni (leve e strangolamenti). Grappling è il termine generale per la lotta corpo a corpo senza colpi, e di solito indica la versione senza kimono, detta anche no-gi. A Grappling Besana alleniamo soprattutto no-gi, con ${lezioniGiSettimanali} di BJJ con il gi.`,
    },
    {
      id: "gi-o-no-gi",
      question: "Ci si allena con il kimono (gi) o senza (no-gi)?",
      answer: `La maggior parte delle lezioni è no-gi, in maglietta aderente e pantaloncini. ${maiuscola(formatGiorni(giorniDelle(bjjGi)))} alle ${bjjGi[0]?.inizio} c'è la lezione di BJJ con il gi.`,
    },
    {
      id: "orari",
      question: "Che orari ci sono?",
      answer: `Il Grappling si allena ${giorniGrappling}, sia in pausa pranzo (${pranzo}) sia la sera. Il Judo è ${giorniJudo} alle ${inizioJudo}. La Preparazione Atletica (S&C) è ${giorniSc}. ${maiuscola(giornoOpenMat)} dalle ${orarioOpenMat?.inizio} alle ${orarioOpenMat?.fine} c'è l'Open Mat.`,
      links: [{ label: "Vedi la tabella completa degli orari", href: "/#timetable" }],
    },
    {
      id: "abbonamenti",
      question: "Che differenza c'è tra abbonamento Base e Full?",
      answer: `L'abbonamento Base comprende le lezioni serali di Grappling del ${giorniSeraNudi} e l'Open Mat del ${giornoOpenMatNudo}. L'abbonamento Full dà accesso a tutto il palinsesto: Grappling in pausa pranzo e la sera, Judo e Preparazione Atletica. Partendo dal Base si può aggiungere una singola disciplina. Tutte le quote comprendono iscrizione societaria e assicurazione: per i costi scrivici su WhatsApp, Instagram o via email.`,
    },
    {
      id: "open-mat",
      question: `Cos'è l'Open Mat del ${giornoOpenMatNudo}?`,
      answer: `È una sessione libera ${giornoOpenMat} dalle ${orarioOpenMat?.inizio} alle ${orarioOpenMat?.fine}, senza lezione guidata: si fa sparring e si ripassa la tecnica con i compagni. È compresa in entrambi gli abbonamenti ed è aperta gratuitamente anche ad atleti di altre accademie, purché iscritti presso la propria palestra e con regolare visita medica sportiva.`,
    },
    {
      id: "gare",
      question: "Partecipate alle gare?",
      answer:
        "Sì. Il team partecipa a diversi circuiti di Brazilian Jiu-Jitsu e Grappling, principalmente UIJJ, Grappling Industries, BJJ Italia e IBJJF. Gareggiare non è obbligatorio: chi vuole viene seguito nella preparazione, chi preferisce si allena e basta.",
    },
    {
      id: "ragazze",
      question: "Ci sono ragazze nel team?",
      answer:
        "Sì, e la presenza femminile a Grappling Besana è in continua crescita. Le lezioni sono aperte a tutti e ci si allena insieme, con compagni scelti in base a livello ed esperienza.",
    },
    {
      id: "coach",
      question: "Chi sono i coach?",
      answer:
        "Il Grappling è tenuto da Marco Beccari, cintura nera e Maestro di Brazilian Jiu-Jitsu riconosciuto FIJLKAM/CONI, e da Nabil Ben Leghlid, cintura marrone, nelle lezioni in pausa pranzo del lunedì e del venerdì. Il Judo è a cura di Besanese Judo con il Maestro Alessandro Comi. La Preparazione Atletica è seguita da Filippo Poni, laureato in Scienze Motorie e cintura nera di Judo.",
      links: [{ label: "Chi siamo", href: "/about-us/#i-nostri-insegnanti" }],
    },
    {
      id: "dove-parcheggio",
      question: "Dove vi trovate? C'è parcheggio?",
      answer: `Siamo presso la Polisportiva Besanese, in ${via} a ${ctx.addressLocality} (${ctx.addressRegion}). Ci sono due ampi parcheggi sempre disponibili e docce in entrambi gli spogliatoi.`,
      links: [
        {
          label: "Apri in Google Maps",
          href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
          external: true,
        },
      ],
    },
    {
      id: "contatti",
      question: "Come posso contattarvi?",
      answer: `Su WhatsApp al ${ctx.telephone}, su Instagram (@${handleInstagram}) o via email a ${ctx.email}.`,
      links: [
        { label: "Scrivici su WhatsApp", href: ctx.whatsapp, external: true },
        { label: "Instagram", href: ctx.instagram, external: true },
        { label: "Email", href: `mailto:${ctx.email}` },
      ],
    },
  ];
}
