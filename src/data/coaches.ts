// Coach del club, usati nei dati strutturati (schema.org Person) collegati
// all'organizzazione. Il testo delle bio resta nelle pagine /about-us e /corsi/*.

export interface Coach {
  slug: string;
  name: string;
  jobTitle: string;
  instagram: string;
}

export const coaches: Coach[] = [
  {
    slug: "marco-beccari",
    name: "Marco Beccari",
    jobTitle: "Coach di Brazilian Jiu-Jitsu e Grappling",
    instagram: "https://www.instagram.com/bjj_marcobex/",
  },
  {
    slug: "nabil-ben-leghlid",
    name: "Nabil Ben Leghlid",
    jobTitle: "Coach di Grappling",
    instagram: "https://www.instagram.com/arabominio/",
  },
  {
    slug: "filippo-poni",
    name: "Filippo Poni",
    jobTitle: "Preparatore atletico e istruttore di Judo",
    instagram: "https://www.instagram.com/filippo_poni/",
  },
];
