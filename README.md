# Portfolio — Andriatiana Jean-Marie

Portfolio bilingue (FR / EN) de développeur Full Stack freelance, construit avec **Next.js 16 (App Router)**, **React 19** et **TypeScript**, exporté en site statique pour **GitHub Pages**.

- `/` → version française
- `/en/` → version anglaise

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # vérification TypeScript
npm run build    # export statique dans ./out
npm start        # sert ./out en local
```

## Modifier le contenu

Tout le texte est dans deux fichiers typés, un par langue :

- `src/content/fr.ts`
- `src/content/en.ts`

Le type commun `src/content/types.ts` garantit que les deux versions ont la même structure. Dans les textes, `**gras**` est rendu en gras.

Coordonnées, photo et CV : `src/lib/site.ts`.

### Captures des projets

Les captures optimisées (WebP) sont dans `public/img/projects/<projet>/`. Leur liste, l'ordre de la galerie, les légendes FR / EN et les liens (démo, dépôt) sont dans `src/content/media.ts`. Un projet sans entrée dans ce fichier garde son panneau chiffré.

## Structure

```
src/
  app/
    (fr)/            layout + page FR  →  /
    (en)/en/         layout + page EN  →  /en/
    global-not-found.tsx               →  404.html
    sitemap.ts, robots.ts, globals.css
  components/        sections, en-tête, formulaire, terminal animé…
  content/           textes FR / EN
  lib/               config du site, SEO, polices
public/              fichiers servis tels quels : CV (PDF), photo, captures des projets (WebP), images Open Graph, favicon
assets/              originaux non publiés (photo, captures brutes) — ignoré par git
```

## Déploiement (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.

1. Créer le dépôt sur GitHub (idéalement **`spyle23.github.io`** pour avoir l'URL racine `https://spyle23.github.io/`).
2. Pousser le code sur la branche `main`.
3. Dans *Settings → Pages*, choisir **Source : GitHub Actions**.

Le sous-chemin (`/nom-du-repo`) est détecté automatiquement. Pour un domaine personnalisé, ajoute une variable de dépôt `SITE_URL` (ex. `https://jeanmarie.dev`) dans *Settings → Secrets and variables → Actions → Variables*.
