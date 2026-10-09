import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { fontVariables } from "@/lib/fonts";
import { ThemeScript } from "./ThemeScript";

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
