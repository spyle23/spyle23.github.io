"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "@/content/types";
import { PROFILE } from "@/lib/site";
import { Icon } from "./Icon";

type FormDict = Dictionary["contact"]["form"];

export function ContactForm({ form }: { form: FormDict }) {
  const [type, setType] = useState(form.types[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const name = get("name");
    const labels = form.bodyLabels;
    const body = [
      `${labels.name}: ${name}`,
      `${labels.email}: ${get("email")}`,
      `${labels.type}: ${type}`,
      `${labels.budget}: ${get("budget")}`,
      `${labels.timeline}: ${get("timeline")}`,
      "",
      get("message"),
    ].join("\n");
    const subject = `${form.subject} — ${type}${name ? ` — ${name}` : ""}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">{form.name}</label>
          <input className="input" id="cf-name" name="name" autoComplete="name" placeholder={form.namePh} required />
        </div>
        <div className="field">
          <label htmlFor="cf-email">{form.email}</label>
          <input className="input" id="cf-email" name="email" type="email" autoComplete="email" placeholder={form.emailPh} required />
        </div>
      </div>

      <fieldset className="field">
        <legend>{form.type}</legend>
        <div className="pill-group">
          {form.types.map((t, i) => (
            <span key={t}>
              <input type="radio" id={`cf-type-${i}`} name="type" value={t} checked={type === t} onChange={() => setType(t)} />
              <label htmlFor={`cf-type-${i}`}>{t}</label>
            </span>
          ))}
        </div>
      </fieldset>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-budget">{form.budget}</label>
          <select className="input" id="cf-budget" name="budget" defaultValue={form.budgets[0]}>
            {form.budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cf-timeline">{form.timeline}</label>
          <select className="input" id="cf-timeline" name="timeline" defaultValue={form.timelines[0]}>
            {form.timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">{form.message}</label>
        <textarea className="input" id="cf-message" name="message" placeholder={form.messagePh} required />
      </div>

      <button type="submit" className="btn btn-primary">
        {form.submit}
        <Icon name="send" />
      </button>
      <p className="form-note">{form.note}</p>
    </form>
  );
}

export function CopyEmailButton({ label, done }: { label: string; done: string }) {
  const [toast, setToast] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setToast(true);
      setTimeout(() => setToast(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <>
      <button type="button" className="copy" onClick={copy}>
        {label}
      </button>
      {mounted &&
        createPortal(
          <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
            {toast ? done : ""}
          </div>,
          document.body,
        )}
    </>
  );
}
