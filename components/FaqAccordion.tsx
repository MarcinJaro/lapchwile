"use client";

import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { faqItems } from "@/content/faq";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-ink/8 rounded-card border border-ink/8 bg-cream">
      {faqItems.map((item, i) => {
        const open = openIndex === i;
        const headerId = `${baseId}-naglowek-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-bold text-ink hover:text-action"
              >
                {item.question}
                <CaretDown
                  size={20}
                  weight="bold"
                  aria-hidden
                  className={`shrink-0 text-action transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!open}
              className="px-6 pb-5 text-[15px] leading-relaxed text-muted"
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
