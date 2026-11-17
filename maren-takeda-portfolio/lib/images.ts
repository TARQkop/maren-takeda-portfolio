import type { ImageLoaderProps } from "next/image";

/**
 * Every photograph on the site is a real Unsplash photo (no generated art).
 * `photoUrl` builds the canonical CDN URL from the photo id and the loader
 * asks Unsplash's imgix-backed CDN for exactly the width the browser needs,
 * so mobile devices download small files and desktops get sharp ones.
 */
export const photoUrl = (id: string) => `https://images.unsplash.com/photo-${id}`;

export function unsplashLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  return url.toString();
}

/** Static URL for social cards (1200×630). */
export const ogImage = (id: string) =>
  `${photoUrl(id)}?auto=format&fit=crop&w=1200&h=630&q=80`;
