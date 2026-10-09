"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "@/content/types";
import { PROFILE, WEB3FORMS_KEY } from "@/lib/site";
import { Icon } from "./Icon";

type FormDict = Dictionary["contact"]["form"];
type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ form }: { form: FormDict }) {
  const [type, setType] = useState(form.types[0]);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const name = get("name");

    // Web3Forms forwards every field to the inbox; "email" becomes the reply-to address.
    // Field names must stay ASCII: Web3Forms garbles accented field names.
    const payload = new FormData();
    payload.append("access_key", WEB3FORMS_KEY);
    payload.append("subject", `${form.subject} — ${type}${name ? ` — ${name}` : ""}`);
    payload.append("from_name", "Portfolio spyle23.github.io");
    payload.append("botcheck", get("botcheck"));
    payload.append("name", name);
    payload.append("email", get("email"));
    payload.append("Type de projet", type);
    payload.append("Budget", get("budget"));
    payload.append("Delai", get("timeline"));
    payload.append("Langue du site", document.documentElement.lang.toUpperCase());
    payload.append("message", get("message"));

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("Web3Forms rejected the submission");
      formEl.reset();
      setType(form.types[0]);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="form form-success" role="status">
        <span className="service-icon">
          <Icon name="checkCircle" />
        </span>
        <h3>{form.successTitle}</h3>
        <p>{form.successText}</p>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStatus("idle")}>
          {form.again}
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      {/* Honeypot: hidden from people, filled by bots */}
      <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
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

      {status === "error" && (
        <p className="form-error" role="alert">
          {form.error} <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? form.sending : form.submit}
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
