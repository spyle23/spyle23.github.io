import type { ReactNode } from "react";
import "../../globals.css";
import { RootShell } from "@/components/RootShell";
import { en } from "@/content/en";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata(en);

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
