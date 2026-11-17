import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/standard.css";
import "@fontsource-variable/fraunces/standard-italic.css";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { person } from "@/data/content";
import { ogImage, photoUrl } from "@/lib/images";
import { images } from "@/data/content";

const title = `${person.name} — ${person.role}, ${person.city}`;
const description =
  "Maren Takeda is a Porto-based ceramic artist making wood-fired tableware, sculptural vessels and installations from Douro river clay. Commissions open for Spring 2027.";

export const metadata: Metadata = {
  metadataBase: new URL("https://marentakeda.example"),
  title: { default: title, template: `%s · ${person.name}` },
  description,
  keywords: [
    "ceramic artist",
    "Porto ceramics",
    "wood-fired pottery",
    "restaurant tableware",
    "handmade vessels",
    "Maren Takeda",
  ],
  authors: [{ name: person.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: person.studio,
    locale: "en_GB",
    images: [{ url: ogImage(images.hero.id), width: 1200, height: 630, alt: images.hero.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage(images.hero.id)],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#efe8dc",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  description,
  image: `${photoUrl(images.hero.id)}?auto=format&fit=crop&w=1200&q=80`,
  address: { "@type": "PostalAddress", addressLocality: "Porto", addressCountry: "PT" },
  worksFor: { "@type": "Organization", name: person.studio },
  email: person.email,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
