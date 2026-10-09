import type { Dictionary } from "@/content/types";
import { PROFILE, absoluteUrl } from "@/lib/site";

export function JsonLd({ dict }: { dict: Dictionary }) {
  const url = absoluteUrl(dict.locale === "fr" ? "/" : "/en/");
  const personId = `${absoluteUrl("/")}#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PROFILE.name,
        jobTitle: dict.locale === "fr" ? "Développeur Full Stack Freelance" : "Freelance Full Stack Developer",
        email: `mailto:${PROFILE.email}`,
        url,
        image: absoluteUrl(PROFILE.photo),
        address: { "@type": "PostalAddress", addressLocality: "Antananarivo", addressCountry: "MG" },
        sameAs: [PROFILE.linkedin, PROFILE.github],
        knowsAbout: dict.marquee,
        knowsLanguage: ["fr", "mg", "en"],
      },
      {
        "@type": "ProfessionalService",
        name: `${PROFILE.name} — ${dict.locale === "fr" ? "Développement web & mobile" : "Web & mobile development"}`,
        url,
        description: dict.meta.description,
        founder: { "@id": personId },
        areaServed: "Worldwide",
        availableLanguage: ["French", "English"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: dict.services.title,
          itemListElement: dict.services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.text },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: dict.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
