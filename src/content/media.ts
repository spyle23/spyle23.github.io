import type { Locale } from "./types";

type Localized = Record<Locale, string>;

export interface Shot {
  /** Path under /public; a per-locale path when the screenshot itself is translated */
  src: string | Localized;
  width: number;
  height: number;
  caption: Localized;
}

export interface ProjectLink {
  href: string;
  kind: "live" | "repo" | "store";
  label: Localized;
}

export interface ProjectMedia {
  cover: Shot;
  phone?: Shot;
  /** Lightbox order; the cover and phone shots should be included */
  gallery: Shot[];
  links?: ProjectLink[];
}

const desktop = (src: string | Localized, fr: string, en: string, height = 900, width = 1440): Shot => ({
  src,
  width,
  height,
  caption: { fr, en },
});

const mobile = (src: string, fr: string, en: string, width = 390, height = 844): Shot => ({
  src,
  width,
  height,
  caption: { fr, en },
});

const spa = (name: string) => ({ fr: `/img/projects/spa/fr-${name}.webp`, en: `/img/projects/spa/en-${name}.webp` });
const stay = (name: string) => `/img/projects/stay/${name}.webp`;
const ngo = (name: string) => `/img/projects/ngo/${name}.webp`;

const spaShots = [
  desktop(spa("1-accueil"), "Page d'accueil du SaaS : prise de rendez-vous et accès au salon", "SaaS landing page: booking and salon access", 1000, 1600),
  desktop(spa("2-vitrine-salon"), "Vitrine publique d'un salon : prestations, équipe et horaires", "Public salon page: services, team and opening hours", 1000, 1600),
  desktop(spa("3-reservation-creneau"), "Choix du créneau en temps réel, praticien choisi ou premier disponible", "Real-time slot picker, chosen or first-available practitioner", 1000, 1600),
  desktop(spa("4-planning-salon"), "Back-office : planning du jour par praticien", "Back office: daily calendar per practitioner", 1000, 1600),
];

const stayPhone = mobile(stay("52-mobile-fiche-hotel"), "Mobile : fiche hôtel", "Mobile: hotel page");
const stayShots = [
  desktop(stay("04b-recherche-grille-hotels"), "Marketplace : résultats de recherche avec disponibilités réelles", "Marketplace: search results with real availability"),
  desktop(stay("05-fiche-hotel"), "Marketplace : fiche hôtel", "Marketplace: hotel page"),
  desktop(stay("06-fiche-chambre"), "Marketplace : fiche chambre", "Marketplace: room page"),
  desktop(stay("22-reservation-paiement"), "Tunnel de réservation : étape de paiement Stripe", "Booking flow: Stripe payment step"),
  desktop(stay("31-sombre-recherche"), "Thème sombre", "Dark mode"),
  stayPhone,
  mobile(stay("54-mobile-reservation"), "Mobile : réservation", "Mobile: booking"),
  desktop(stay("10-manager-dashboard"), "Back-office manager : tableau de bord", "Manager back office: dashboard"),
  desktop(stay("13-manager-reservations"), "Back-office : gestion des réservations", "Back office: reservation management"),
  desktop(stay("12b-hotel-chambres"), "Back-office : gestion des chambres", "Back office: room management"),
  desktop(stay("15-manager-analytics"), "Back-office : taux d'occupation et revenus", "Back office: occupancy and revenue analytics"),
  desktop(stay("20-admin-dashboard"), "Super admin : vue d'ensemble de la plateforme", "Super admin: platform overview"),
  desktop(stay("25-admin-analytique"), "Super admin : abonnements et revenus", "Super admin: subscriptions and revenue"),
];

const ngoPhone = mobile(ngo("20-mobile-accueil"), "Mobile : accueil", "Mobile: home", 520, 1125);
const ngoShots = [
  desktop(ngo("01-accueil-hero"), "Page d'accueil de Paika", "Paika landing page", 1000, 1600),
  desktop(ngo("03-marketplace-ongs"), "Marketplace des ONG certifiées", "Certified NGO marketplace", 1000, 1600),
  desktop(ngo("05-fiche-ong"), "Fiche publique d'une ONG avec son score de transparence", "Public NGO profile with its transparency score", 1000, 1600),
  desktop(ngo("07-bailleur-tableau-de-bord"), "Espace bailleur : suivi des dons", "Donor dashboard: donation tracking", 1000, 1600),
  desktop(ngo("09-ong-tableau-de-bord"), "Espace ONG : tableau de bord", "NGO dashboard", 1000, 1600),
  desktop(ngo("10-ong-parcours-certification"), "Espace ONG : parcours de certification", "NGO area: certification journey", 1000, 1600),
  desktop(ngo("11-ong-score-transparence"), "Espace ONG : détail du score de transparence", "NGO area: transparency score breakdown", 1000, 1600),
  desktop(ngo("15-ong-documents"), "Coffre-fort documentaire", "Document vault", 1000, 1600),
  desktop(ngo("17-admin-pipeline-verification"), "Admin : pipeline de vérification (Kanban)", "Admin: verification pipeline (Kanban)", 952, 1600),
  desktop(ngo("18-admin-algorithme-score"), "Admin : algorithme de score versionné", "Admin: versioned scoring algorithm", 952, 1600),
  desktop(ngo("19-admin-dons-commissions"), "Admin : dons et commissions", "Admin: donations and commissions", 952, 1600),
  ngoPhone,
  mobile(ngo("22-mobile-fiche-ong"), "Mobile : fiche ONG", "Mobile: NGO profile", 520, 1125),
];

export const projectMedia: Record<string, ProjectMedia> = {
  spa: { cover: spaShots[0], gallery: spaShots },
  stay: { cover: stayShots[0], phone: stayPhone, gallery: stayShots },
  ngo: {
    cover: ngoShots[0],
    phone: ngoPhone,
    gallery: ngoShots,
    links: [
      {
        href: "https://paika-ong.netlify.app/",
        kind: "live",
        label: { fr: "Voir la démo en ligne", en: "View live demo" },
      },
    ],
  },
};

export const shotSrc = (shot: Shot, locale: Locale) => (typeof shot.src === "string" ? shot.src : shot.src[locale]);
