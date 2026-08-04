// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const jsonDataCollection = defineCollection({
  type: 'data',
  schema: z.object({
    //Define JSON-file structure
    profileImage: z.string(),
    profileAlt: z.string(),
    profileLink: z.string(),
    profileTitle: z.string(),
    profileName: z.string(),
    github: z.string().url(),
    timetableImage: z.string(),
    timetableTitle: z.string(),
    whereTitle: z.string(),
    email: z.string().email(),
    instagram: z.string().url(),
    whatsapp: z.string().url().optional(),
    whatsappIconName: z.string().optional(),
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
