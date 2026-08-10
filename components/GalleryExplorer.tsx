"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react/dist/ssr";
import {
  galleryCategories,
  galleryItems,
  type GalleryCategory,
} from "@/content/gallery";

export function GalleryExplorer() {
  const [filter, setFilter] = useState<GalleryCategory | "wszystkie">("wszystkie");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const visible =
    filter === "wszystkie"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const openLightbox = (index: number, trigger: HTMLElement) => {
    lastFocusRef.current = trigger;
    setLightboxIndex(index);
  };

  const close = useCallback(() => {
    setLightboxIndex(null);
    lastFocusRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) =>
        current === null ? null : (current + delta + visible.length) % visible.length
      );
    },
    [visible.length]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxIndex !== null && !dialog.open) dialog.showModal();
    if (lightboxIndex === null && dialog.open) dialog.close();
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, step, close]);

  const active = lightboxIndex !== null ? visible[lightboxIndex] : null;

  return (
    <div>
      <div role="group" aria-label="Filtry galerii" className="flex flex-wrap justify-center gap-2">
        {[{ id: "wszystkie" as const, label: "Wszystkie" }, ...galleryCategories].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setFilter(cat.id);
              setLightboxIndex(null);
            }}
            aria-pressed={filter === cat.id}
            className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
              filter === cat.id
                ? "bg-action text-white"
                : "border border-ink/12 bg-white text-ink hover:border-action hover:text-action"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 columns-2 gap-3 md:columns-3 [&>li]:mb-3">
        {visible.map((item, index) => (
          <li key={item.image.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={(e) => openLightbox(index, e.currentTarget)}
              className="group block w-full overflow-hidden rounded-card"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                sizes="(min-width: 768px) 33vw, 50vw"
                className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="sr-only">Powiększ: {item.image.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label={active?.image.alt ?? "Podgląd zdjęcia"}
        className="m-auto w-[min(94vw,900px)] rounded-card bg-transparent p-0 backdrop:bg-ink/85"
      >
        {active && (
          <figure className="relative">
            <Image
              src={active.image.src}
              alt={active.image.alt}
              width={active.image.width}
              height={active.image.height}
              sizes="94vw"
              className="max-h-[82dvh] w-full rounded-card object-contain"
            />
            <figcaption className="mt-3 text-center text-sm font-medium text-white">
              {active.image.alt}
            </figcaption>
            <div className="mt-4 flex items-center justify-center gap-3 pb-2">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink hover:bg-balloon-yellow"
              >
                <span className="sr-only">Poprzednie zdjęcie</span>
                <ArrowLeft size={22} weight="bold" />
              </button>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-bold text-ink hover:bg-balloon-yellow"
              >
                <X size={20} weight="bold" aria-hidden /> Zamknij
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink hover:bg-balloon-yellow"
              >
                <span className="sr-only">Następne zdjęcie</span>
                <ArrowRight size={22} weight="bold" />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </div>
  );
}
