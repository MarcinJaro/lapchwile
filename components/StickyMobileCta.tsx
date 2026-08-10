import Link from "next/link";

/** Sticky bottom CTA bar, mobile only. */
export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 bg-cream/95 p-3 backdrop-blur-md md:hidden">
      <Link
        href="/rezerwacja"
        className="block rounded-full bg-action px-6 py-3.5 text-center font-bold text-white"
      >
        Zarezerwuj termin
      </Link>
    </div>
  );
}
