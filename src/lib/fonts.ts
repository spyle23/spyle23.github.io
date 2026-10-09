import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--ff-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--ff-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--ff-mono", display: "swap" });

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
