import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

const jsonDataCollection = defineCollection({
  loader: file('src/content/staticData/allStaticData.json', {
    parser: (text) => [{ id: 'main', ...JSON.parse(text) }],
  }),
  schema: z.object({
    //Define JSON-file structure
    profileImage: z.string(),
    profileAlt: z.string(),
    profileLink: z.string(),
    profileTitle: z.string(),
    profileName: z.string(),
    github: z.url(),
    timetableImage: z.string(),
    timetableTitle: z.string(),
    whereTitle: z.string(),
    email: z.email(),
    instagram: z.url(),
    whatsapp: z.url(),
    whatsappIconName: z.string(),
    telephone: z.string(),
    streetAddress: z.string(),
    addressLocality: z.string(),
    postalCode: z.string(),
    addressRegion: z.string(),
    addressCountry: z.string(),
    geoLat: z.number(),
    geoLng: z.number(),
    alias: z.string(),
    contactSectionTitle: z.string(),
    contactSectionSubtitle: z.string(),
    contactSectionButtonText: z.string(),
    contactSectionButtonIcon: z.string(),
    instagramIconName: z.string(),
    emailIconName: z.string(),
    pageTitle: z.string(),
    pageDescription: z.string(),
    OGImage: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  }),
});

// Eventi: seminari, stage, gare e open day.
// Un file .md per evento in src/content/eventi/.
// Le immagini si scrivono come percorso "/images/..." (stessa convenzione
// delle pagine disciplina): il file vero vive in src/assets/images/...
const eventiCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventi' }),
  schema: z.object({
    title: z.string(),
    // Sottotitolo breve mostrato sotto il titolo nella pagina evento
    subtitle: z.string().optional(),
    // Usata nella card e come meta description della pagina
    description: z.string(),
    // Data e ora di inizio, es. 2026-10-24T11:00:00+02:00
    startDate: z.coerce.date(),
    // Data e ora di fine: se assente si usa startDate per capire se e passato
    endDate: z.coerce.date().optional(),
    guest: z.string().optional(),
    guestFrom: z.string().optional(),
    guestCredentials: z.string().optional(),
    venue: z.object({
      name: z.string(),
      streetAddress: z.string(),
      addressLocality: z.string(),
      postalCode: z.string().optional(),
      addressRegion: z.string().optional(),
    }),
    // Programma della giornata: [{ time: "11:00", label: "Inizio seminario" }]
    schedule: z
      .array(z.object({ time: z.string(), label: z.string() }))
      .default([]),
    bookingRequired: z.boolean().default(true),
    bookingNote: z.string().optional(),
    // Avviso in evidenza, es. "Open Mat sospeso"
    notice: z.string().optional(),
    // Immagine quadrata (1:1) della card
    image: z.object({ url: z.string(), alt: z.string() }),
    // Locandina verticale opzionale, mostrata in cima alla pagina evento
    poster: z.object({ url: z.string(), alt: z.string() }).optional(),
    // true = non pubblicato in produzione
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  staticData: jsonDataCollection,
  eventi: eventiCollection,
};
