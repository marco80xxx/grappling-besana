/** URL assoluto di un nodo del grafo schema.org del sito, es. "#organization". */
export function schemaId(site: URL | string | undefined, fragment: string) {
  return new URL(`/#${fragment}`, site ?? "https://grapplingbesana.com").href;
}

/** @id dell'organizzazione: lo stesso su tutte le pagine, cosi gli altri nodi (eventi, persone) possono riferirlo. */
export const organizationId = (site: URL | string | undefined) =>
  schemaId(site, "organization");
