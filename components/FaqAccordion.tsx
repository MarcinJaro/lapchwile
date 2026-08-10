"use client";

import { useId, useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { faqItems } from "@/content/faq";

const openColors = [
  "bg-pastel-yellow",
  "bg-pastel-blue",
  "bg-pastel-green",
  "bg-pastel-pink",
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {faqItems.map((item, i) => {
        const open = openIndex === i;
        const headerId = `${baseId}-naglowek-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={item.question}
            className={`rounded-card transition-all duration-300 ${
              open
                ? `${openColors[i % openColors.length]} shadow-lg shadow-ink/5`
                : "bg-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5"
            }`}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-bold text-ink"
              >
                {item.question}
                <span
                  aria-hidden
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    open ? "rotate-45 bg-white text-ink shadow-sm" : "bg-pastel-blue text-action"
                  }`}
                >
                  <Plus size={18} weight="bold" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!open}
              className="px-6 pb-6 text-[15px] leading-relaxed text-ink/75"
            >
              {item.answer ?? (
                <>
                  Odpowiedź przygotowujemy. Zadzwoń lub napisz, a od razu
                  odpowiemy:{" "}
                  <a href="/kontakt" className="font-semibold text-action hover:underline">
                    dane kontaktowe
                  </a>
                  .
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
