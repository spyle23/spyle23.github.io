import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { fr: absoluteUrl("/"), en: absoluteUrl("/en/") };
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: absoluteUrl("/en/"), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
