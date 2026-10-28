import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { orari, stagione } from "../data/orari";
import { coaches } from "../data/coaches";
import { CLUB_VENUE_NAME } from "../utils/schema";

// /llms.txt: sintesi del sito per i modelli linguistici (formato llmstxt.org).
// Generato dai dati del sito (palinsesto, coach, pagine corso) cosi non si
// disallinea: niente da aggiornare a mano quando cambia un orario.

interface CorsoFrontmatter {
  title: string;
  heading?: string;
  description: string;
}

export const GET: APIRoute = async ({ site }) => {
  const [staticData] = await getCollection("staticData");
  const {
    profileName,
    pageDescription,
    streetAddress,
    addressLocality,
    postalCode,
    addressRegion,
    email,
    telephone,
    whatsapp,
    instagram,
  } = staticData.data;

  const abs = (path: string) => new URL(path, site).href;

  const corsi = Object.values(
    import.meta.glob<{ frontmatter: CorsoFrontmatter; url: string }>(
      "./corsi/*.md",
      { eager: true },
    ),
  ).map(
    (corso) =>
      `- [${corso.frontmatter.heading ?? corso.frontmatter.title}](${abs(`${corso.url}/`)}): ${corso.frontmatter.description}`,
  );

  const righeOrari = orari.map((giorno) => {
    const lezioni = giorno.lezioni
      .map(
        (l) =>
          `${l.inizio}–${l.fine} ${l.corso}${l.nota ? ` (${l.nota})` : ""}`,
      )
      .join("; ");
    return `- ${giorno.nome}: ${lezioni}`;
  });

  const testo = `# ${profileName}

> ${pageDescription}

${profileName} è un club di Brazilian Jiu-Jitsu (gi e no-gi), Grappling, Judo e preparazione atletica a ${addressLocality} (${addressRegion}), nato a gennaio 2025. I corsi sono per principianti ed esperti.

## Dove siamo

- Sede: ${CLUB_VENUE_NAME}, ${streetAddress}, ${postalCode} ${addressLocality} (${addressRegion}), Italia
- Telefono e WhatsApp: ${telephone} (${whatsapp.split("?")[0]})
- Email: ${email}
- Instagram: ${instagram}

## Orari stagione ${stagione}

${righeOrari.join("\n")}

## Corsi

${corsi.join("\n")}

## Allenatori

${coaches.map((c) => `- ${c.name}: ${c.jobTitle}`).join("\n")}

## Pagine principali

- [Home](${abs("/")}): corsi, orari, sede e contatti
- [Chi siamo](${abs("/about-us/")}): il team, la filosofia, gli insegnanti e i loro risultati
- [Eventi](${abs("/eventi/")}): seminari con ospiti, raduni ed eventi a cui partecipiamo
- [Informativa privacy](${abs("/privacy/")})
`;

  return new Response(testo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
