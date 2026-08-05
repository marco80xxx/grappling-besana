import type { ImageMetadata } from "astro";

const localImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{jpeg,jpg,png,webp}",
  { eager: true },
);

// Resolves a legacy "/images/foo.jpg" string path (as still stored in
// JSON data / markdown frontmatter) to its optimizable ImageMetadata,
// now that the file lives under src/assets/images instead of public/images.
export function getLocalImage(publicPath: string): ImageMetadata | undefined {
  const key = `/src/assets${publicPath}`;
  return localImages[key]?.default;
}
