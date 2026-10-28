// Fonte unica del palinsesto settimanale. Da qui derivano:
// - la tabella HTML in home e in /about-us (TimetableTable.astro)
// - openingHoursSpecification nei dati strutturati (Layout.astro)
// - llms.txt
// - le risposte della FAQ sugli orari (src/data/faq.ts)
// Per cambiare un orario basta modificare questo file.

export const stagione = "2026/27";

type SchemaDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Disciplina = "grappling" | "judo" | "sc" | "openmat";

export interface Lezione {
  inizio: string;
  fine: string;
  corso: string;
  /** Famiglia del corso: "BJJ con Gi" e "Grappling" sono entrambi "grappling". */
  disciplina: Disciplina;
  nota?: string;
}

export interface Giorno {
  nome: string;
  schemaDay: SchemaDay;
  lezioni: Lezione[];
}

const GRAPPLING = { corso: "Grappling", disciplina: "grappling" } as const;
export const CORSO_BJJ_GI = "BJJ con Gi";
const BJJ_GI = { corso: CORSO_BJJ_GI, disciplina: "grappling" } as const;
const JUDO = { corso: "Judo", disciplina: "judo" } as const;
const SC = {
  corso: "S&C (Strength & Conditioning)",
  disciplina: "sc",
} as const;
const OPEN_MAT = { corso: "Grappling Open Mat", disciplina: "openmat" } as const;
export const PAUSA_PRANZO = "pausa pranzo";

export const orari: Giorno[] = [
  {
    nome: "Lunedì",
    schemaDay: "Monday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", ...GRAPPLING, nota: PAUSA_PRANZO },
      { inizio: "18:30", fine: "19:30", ...SC },
      { inizio: "19:30", fine: "21:00", ...GRAPPLING },
    ],
  },
  {
    nome: "Martedì",
    schemaDay: "Tuesday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", ...GRAPPLING, nota: PAUSA_PRANZO },
      { inizio: "19:30", fine: "21:00", ...JUDO },
    ],
  },
  {
    nome: "Mercoledì",
    schemaDay: "Wednesday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", ...BJJ_GI, nota: PAUSA_PRANZO },
      { inizio: "18:30", fine: "19:30", ...SC },
      { inizio: "19:30", fine: "21:00", ...GRAPPLING },
    ],
  },
  {
    nome: "Giovedì",
    schemaDay: "Thursday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", ...GRAPPLING, nota: PAUSA_PRANZO },
      { inizio: "19:30", fine: "21:00", ...JUDO },
    ],
  },
  {
    nome: "Venerdì",
    schemaDay: "Friday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", ...GRAPPLING, nota: PAUSA_PRANZO },
      { inizio: "17:30", fine: "18:30", ...SC },
      { inizio: "18:30", fine: "20:00", ...GRAPPLING },
    ],
  },
  {
    nome: "Sabato",
    schemaDay: "Saturday",
    lezioni: [{ inizio: "11:00", fine: "13:00", ...OPEN_MAT }],
  },
];

/**
 * Fasce orarie di apertura per schema.org: le lezioni consecutive (una che
 * finisce quando inizia la successiva) vengono unite in un'unica fascia.
 */
export function getOpeningHoursSpecification() {
  const fasce: { dayOfWeek: SchemaDay; opens: string; closes: string }[] = [];

  for (const giorno of orari) {
    const lezioni = [...giorno.lezioni].sort((a, b) =>
      a.inizio.localeCompare(b.inizio),
    );
    let corrente: { opens: string; closes: string } | undefined;

    for (const lezione of lezioni) {
      if (corrente && corrente.closes === lezione.inizio) {
        corrente.closes = lezione.fine;
      } else {
        if (corrente) fasce.push({ dayOfWeek: giorno.schemaDay, ...corrente });
        corrente = { opens: lezione.inizio, closes: lezione.fine };
      }
    }
    if (corrente) fasce.push({ dayOfWeek: giorno.schemaDay, ...corrente });
  }

  return fasce.map((fascia) => ({
    "@type": "OpeningHoursSpecification",
    ...fascia,
  }));
}

// --- Riepiloghi per le risposte della FAQ ---------------------------------

const minuscolo = (nome: string) => nome.toLowerCase();

/** Lezioni di una disciplina con il nome del giorno, nell'ordine della settimana. */
export function lezioniDi(disciplina: Disciplina) {
  return orari.flatMap((giorno) =>
    giorno.lezioni
      .filter((lezione) => lezione.disciplina === disciplina)
      .map((lezione) => ({ ...lezione, giorno: giorno.nome })),
  );
}

/** Nomi dei giorni (senza ripetizioni) in cui si svolgono le lezioni indicate. */
export function giorniDelle(lezioni: { giorno: string }[]) {
  return [...new Set(lezioni.map((lezione) => lezione.giorno))];
}

/**
 * "il martedì e il giovedì", "il lunedì, il mercoledì e il venerdì";
 * se i giorni sono almeno tre e consecutivi: "dal lunedì al venerdì".
 */
export function formatGiorni(nomi: string[], { articolo = true } = {}) {
  const indici = nomi.map((nome) => orari.findIndex((g) => g.nome === nome));
  const consecutivi = indici.every((indice, i) => i === 0 || indice === indici[i - 1] + 1);

  if (articolo && nomi.length >= 3 && consecutivi) {
    return `dal ${minuscolo(nomi[0])} al ${minuscolo(nomi[nomi.length - 1])}`;
  }
  const voci = nomi.map((nome) => (articolo ? `il ${minuscolo(nome)}` : minuscolo(nome)));
  if (voci.length <= 1) return voci.join("");
  return `${voci.slice(0, -1).join(", ")} e ${voci[voci.length - 1]}`;
}

/** Fascia oraria "12:30–13:30" se tutte le lezioni indicate hanno lo stesso orario. */
export function fasciaComune(lezioni: { inizio: string; fine: string }[]) {
  const fasce = [...new Set(lezioni.map((l) => `${l.inizio}–${l.fine}`))];
  return fasce.length === 1 ? fasce[0] : undefined;
}
