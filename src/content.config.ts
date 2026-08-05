import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';

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

export const collections = {
  staticData: jsonDataCollection,
};
