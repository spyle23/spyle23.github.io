import type { ReactNode } from "react";
import "../globals.css";
import { RootShell } from "@/components/RootShell";
import { fr } from "@/content/fr";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata(fr);

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="fr">{children}</RootShell>;
}
