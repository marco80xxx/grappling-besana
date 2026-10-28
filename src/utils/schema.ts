/** URL assoluto di un nodo del grafo schema.org del sito, es. "#organization". */
export function schemaId(site: URL | string | undefined, fragment: string) {
  return new URL(`/#${fragment}`, site ?? "https://grapplingbesana.com").href;
}

/** @id dell'organizzazione: lo stesso su tutte le pagine, cosi gli altri nodi (eventi, persone) possono riferirlo. */
export const organizationId = (site: URL | string | undefined) =>
  schemaId(site, "organization");

// Nome ufficiale della sede nei dati strutturati. Nei testi visibili la stessa
// struttura compare come "Palazzetto E. Perego" o "Polisportiva Besanese".
export const CLUB_VENUE_NAME = "Palazzetto E. Perego – Polisportiva Besanese";

const normalizeLocality = (value: string) =>
  value
    .toLowerCase()
    .replace(/\bin\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Vero se la sede dell'evento coincide con quella del club: stesso CAP e stessa
 * localita, ignorando la forma "Besana Brianza" / "Besana in Brianza" (la
 * convenzione redazionale dei testi visibili differisce da quella ufficiale).
 */
export function isClubVenue(
  venue: { addressLocality: string; postalCode?: string },
  club: { addressLocality: string; postalCode: string },
) {
  return (
    venue.postalCode === club.postalCode &&
    normalizeLocality(venue.addressLocality) ===
      normalizeLocality(club.addressLocality)
  );
}
