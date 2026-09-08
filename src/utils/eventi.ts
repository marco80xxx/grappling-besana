import { getCollection, type CollectionEntry } from "astro:content";
import { getLocalImage } from "./images";

export type Evento = CollectionEntry<"eventi">;

/** Un evento e "passato" quando la sua ora di fine (o di inizio) e trascorsa. */
export function isPastEvent(evento: Evento, now: Date = new Date()): boolean {
  const end = evento.data.endDate ?? evento.data.startDate;
  return end.getTime() < now.getTime();
}

/**
 * Carica gli eventi divisi in "in arrivo" (dal piu vicino) e "passati"
 * (dal piu recente). Le bozze sono escluse solo in produzione.
 *
 * Nota: la divisione avviene a build time. Il sito e statico, quindi un evento
 * passa nell'archivio solo al primo deploy successivo alla sua data.
 */
export async function getEventi(now: Date = new Date()) {
  const entries = await getCollection("eventi", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );

  for (const evento of entries) {
    if (!getLocalImage(evento.data.image.url)) {
      throw new Error(
        `[eventi] Immagine della card non trovata per "${evento.id}": ` +
          `"${evento.data.image.url}" — il file deve esistere in src/assets${evento.data.image.url}`,
      );
    }
    if (evento.data.poster && !getLocalImage(evento.data.poster.url)) {
      throw new Error(
        `[eventi] Locandina non trovata per "${evento.id}": ` +
          `"${evento.data.poster.url}" — il file deve esistere in src/assets${evento.data.poster.url}`,
      );
    }
  }

  const upcoming = entries
    .filter((evento) => !isPastEvent(evento, now))
    .sort((a, b) => a.data.startDate.getTime() - b.data.startDate.getTime());

  const past = entries
    .filter((evento) => isPastEvent(evento, now))
    .sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());

  return { upcoming, past, all: entries };
}

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Rome",
});

const shortDateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Europe/Rome",
});

const timeFormatter = new Intl.DateTimeFormat("it-IT", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Rome",
});

export const formatEventDate = (date: Date) => dateFormatter.format(date);
export const formatEventDateShort = (date: Date) => shortDateFormatter.format(date);
export const formatEventTime = (date: Date) => timeFormatter.format(date);
