import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import { fontVariables } from "@/lib/fonts";
import { asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "404 — Andriatiana Jean-Marie",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <div className="bg-decor" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
        </div>
        <main className="container" style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center" }}>
          <div>
            <p className="eyebrow">Error 404</p>
            <h1 style={{ margin: "18px 0" }}>
              <span className="grad">404</span>
            </h1>
            <p style={{ color: "var(--muted)", marginBottom: 32 }}>
              Cette page n&apos;existe pas. · This page doesn&apos;t exist.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={asset("/")} className="btn btn-primary">
                Retour à l&apos;accueil
              </a>
              <a href={asset("/en/")} className="btn btn-ghost">
                Back to home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
