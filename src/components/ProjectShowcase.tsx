"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary, Locale, Project } from "@/content/types";
import { shotSrc, type ProjectMedia } from "@/content/media";
import { asset } from "@/lib/site";
import { Icon } from "./Icon";

interface Props {
  project: Project;
  media: ProjectMedia;
  locale: Locale;
  labels: Dictionary["projects"]["gallery"];
}

export function ProjectShowcase({ project, media, locale, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const count = media.gallery.length;
  const isOpen = index !== null;

  const open = (i = 0) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const go = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)), [count]);

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, go]);

  // Swipe between screenshots on touch screens
  const touchX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") touchX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const current = index !== null ? media.gallery[index] : null;

  return (
    <div className={`project-visual has-media pv-${project.visual}`}>
      <div className="pv-top">
        <span className="pv-tag">{project.tag}</span>
        <button type="button" className="pv-open" onClick={() => open(0)}>
          <Icon name="images" />
          {labels.open} ({count})
        </button>
      </div>

      <button type="button" className="shot-frame" onClick={() => open(0)} aria-label={`${labels.open} — ${project.title}`}>
        <span className="shot-bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <img
          src={asset(shotSrc(media.cover, locale))}
          alt={media.cover.caption[locale]}
          width={media.cover.width}
          height={media.cover.height}
          loading="lazy"
          decoding="async"
        />
      </button>

      {media.phone && (
        <button
          type="button"
          className="shot-phone"
          onClick={() => open(media.gallery.indexOf(media.phone!))}
          aria-label={media.phone.caption[locale]}
        >
          <img
            src={asset(shotSrc(media.phone, locale))}
            alt=""
            width={media.phone.width}
            height={media.phone.height}
            loading="lazy"
            decoding="async"
          />
        </button>
      )}

      <div className="pv-badge">
        <strong>{project.metric}</strong>
        <span>{project.metricLabel}</span>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={project.title}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && index !== null && (
          <div className="lb-inner" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <div className="lb-head">
              <span className="lb-title">{project.title}</span>
              <button type="button" className="icon-btn lb-close" onClick={close} aria-label={labels.close} autoFocus>
                <Icon name="close" />
              </button>
            </div>

            <figure className="lb-figure">
              <img
                key={index}
                src={asset(shotSrc(current, locale))}
                alt={current.caption[locale]}
                width={current.width}
                height={current.height}
                className={current.height > current.width ? "is-mobile" : undefined}
              />
              <figcaption>
                <span>{current.caption[locale]}</span>
                <span className="lb-count">
                  {index + 1} {labels.of} {count}
                </span>
              </figcaption>
            </figure>

            <button type="button" className="icon-btn lb-nav lb-prev" onClick={() => go(-1)} aria-label={labels.prev}>
              <Icon name="chevronLeft" />
            </button>
            <button type="button" className="icon-btn lb-nav lb-next" onClick={() => go(1)} aria-label={labels.next}>
              <Icon name="chevronRight" />
            </button>

            <div className="lb-thumbs">
              {media.gallery.map((shot, i) => (
                <button
                  type="button"
                  key={i}
                  className={i === index ? "active" : undefined}
                  onClick={() => setIndex(i)}
                  aria-label={shot.caption[locale]}
                  aria-current={i === index ? "true" : undefined}
                >
                  <img src={asset(shotSrc(shot, locale))} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
