import type { Metadata, Viewport } from "next";
import type { Dictionary } from "@/content/types";
import { PROFILE, SITE_URL, BASE_PATH, absoluteUrl } from "./site";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07090d" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f1" },
  ],
  width: "device-width",
  initialScale: 1,
};

export function buildMetadata(dict: Dictionary): Metadata {
  const path = dict.locale === "fr" ? "/" : "/en/";
  return {
    metadataBase: new URL(`${SITE_URL}${BASE_PATH}/`),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: PROFILE.name, url: PROFILE.linkedin }],
    creator: PROFILE.name,
    alternates: {
      canonical: absoluteUrl(path),
      languages: { fr: absoluteUrl("/"), en: absoluteUrl("/en/"), "x-default": absoluteUrl("/") },
    },
    openGraph: {
      type: "profile",
      url: absoluteUrl(path),
      siteName: PROFILE.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: dict.locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: dict.locale === "fr" ? ["en_US"] : ["fr_FR"],
      images: [{ url: absoluteUrl(`/og/${dict.locale}.png`), width: 1200, height: 630, alt: dict.meta.ogAlt }],
      firstName: "Jean-Marie",
      lastName: "Andriatiana",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [absoluteUrl(`/og/${dict.locale}.png`)],
    },
    robots: { index: true, follow: true },
    icons: { icon: `${BASE_PATH}/icon.svg` },
  };
}
