import { FilePdf } from "@phosphor-icons/react/dist/ssr";

/**
 * Download button that only becomes active when a real PDF is configured
 * in site-config. Without a file it renders an honest "in preparation" note.
 */
export function PdfDownload({ href, label }: { href: string | null; label: string }) {
  if (!href) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-[15px] font-semibold text-muted">
        <FilePdf size={20} weight="duotone" aria-hidden />
        {label}: plik w przygotowaniu
      </p>
    );
  }
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 rounded-full border-2 border-action px-6 py-3 font-bold text-action transition-colors hover:bg-action/8"
    >
      <FilePdf size={20} weight="bold" aria-hidden />
      {label} (PDF)
    </a>
  );
}
