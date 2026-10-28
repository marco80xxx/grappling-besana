// Fonte unica del palinsesto settimanale. Da qui derivano:
// - la tabella HTML in home e in /about-us (TimetableTable.astro)
// - openingHoursSpecification nei dati strutturati (Layout.astro)
// - llms.txt
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

export interface Lezione {
  inizio: string;
  fine: string;
  corso: string;
  nota?: string;
}

export interface Giorno {
  nome: string;
  schemaDay: SchemaDay;
  lezioni: Lezione[];
}

const GRAPPLING = "Grappling";
const BJJ_GI = "BJJ con Gi";
const JUDO = "Judo";
const SC = "S&C (Strength & Conditioning)";
const OPEN_MAT = "Grappling Open Mat";
const PAUSA_PRANZO = "pausa pranzo";

export const orari: Giorno[] = [
  {
    nome: "Lunedì",
    schemaDay: "Monday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", corso: GRAPPLING, nota: PAUSA_PRANZO },
      { inizio: "18:30", fine: "19:30", corso: SC },
      { inizio: "19:30", fine: "21:00", corso: GRAPPLING },
    ],
  },
  {
    nome: "Martedì",
    schemaDay: "Tuesday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", corso: GRAPPLING, nota: PAUSA_PRANZO },
      { inizio: "19:30", fine: "21:00", corso: JUDO },
    ],
  },
  {
    nome: "Mercoledì",
    schemaDay: "Wednesday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", corso: BJJ_GI, nota: PAUSA_PRANZO },
      { inizio: "18:30", fine: "19:30", corso: SC },
      { inizio: "19:30", fine: "21:00", corso: GRAPPLING },
    ],
  },
  {
    nome: "Giovedì",
    schemaDay: "Thursday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", corso: GRAPPLING, nota: PAUSA_PRANZO },
      { inizio: "19:30", fine: "21:00", corso: JUDO },
    ],
  },
  {
    nome: "Venerdì",
    schemaDay: "Friday",
    lezioni: [
      { inizio: "12:30", fine: "13:30", corso: GRAPPLING, nota: PAUSA_PRANZO },
      { inizio: "17:30", fine: "18:30", corso: SC },
      { inizio: "18:30", fine: "20:00", corso: GRAPPLING },
    ],
  },
  {
    nome: "Sabato",
    schemaDay: "Saturday",
    lezioni: [{ inizio: "11:00", fine: "13:00", corso: OPEN_MAT }],
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
