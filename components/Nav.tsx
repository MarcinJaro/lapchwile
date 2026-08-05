"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { media } from "@/content/media";

const links = [
  { href: "/urodziny", label: "Urodziny" },
  { href: "/atrakcje", label: "Atrakcje" },
  { href: "/wydarzenia", label: "Wydarzenia" },
  { href: "/dla-szkol-i-przedszkoli", label: "Dla grup" },
  { href: "/galeria", label: "Galeria" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // close the mobile menu on navigation
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cloud/90 backdrop-blur-md">
      <nav
        aria-label="Nawigacja główna"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Łap Chwile, strona główna">
          <Image
            src={media.logo.src}
            alt={media.logo.alt}
            width={96}
            height={73}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-semibold transition-colors hover:bg-action/8 hover:text-action ${
                  pathname.startsWith(link.href) ? "text-action" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/rezerwacja"
            className="hidden whitespace-nowrap rounded-full bg-action px-5 py-2.5 text-[15px] font-bold text-white transition-colors hover:bg-action-dark sm:inline-block"
          >
            Zarezerwuj
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobilne"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-action/8 lg:hidden"
          >
            <span className="sr-only">{open ? "Zamknij menu" : "Otwórz menu"}</span>
            {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="menu-mobilne"
          ref={panelRef}
          className="border-t border-ink/5 bg-cloud lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-2xl px-4 py-3.5 text-lg font-semibold text-ink hover:bg-action/8 hover:text-action"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 px-2">
              <Link
                href="/rezerwacja"
                className="block rounded-full bg-action px-5 py-3.5 text-center text-lg font-bold text-white hover:bg-action-dark"
              >
                Zarezerwuj
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
