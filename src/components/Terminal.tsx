"use client";

import { useEffect, useState } from "react";
import type { TerminalLine } from "@/content/types";

const toneClass: Record<NonNullable<TerminalLine["tone"]>, string> = {
  prompt: "t-prompt",
  dim: "t-dim",
  ok: "t-ok",
  info: "t-info",
  warn: "t-warn",
  purple: "t-purple",
};

export function Terminal({ title, lines }: { title: string; lines: TerminalLine[] }) {
  // Server render shows every line so the content is readable without JS
  const [visible, setVisible] = useState(lines.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let count = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      count = count >= lines.length ? 0 : count + 1;
      setVisible(count);
      const delay = count === 0 ? 500 : count === lines.length ? 4200 : count === 1 ? 900 : 520;
      timer = setTimeout(tick, delay);
    };
    setVisible(0);
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [lines.length]);

  return (
    <div className="terminal" role="img" aria-label={lines.map((l) => l.text).join(" — ")}>
      <div className="terminal-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <div className="terminal-body" aria-hidden="true">
        {lines.map((line, i) => (
          <div key={i} className={`t-line${i < visible ? " show" : ""} ${line.tone ? toneClass[line.tone] : ""}`}>
            {line.text}
            {i === visible - 1 && <span className="caret" />}
          </div>
        ))}
        {visible === 0 && <span className="caret" />}
      </div>
    </div>
  );
}
