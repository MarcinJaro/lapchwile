export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-4 pb-4 pt-14 text-center sm:px-6">
      {eyebrow && (
        <p className="inline-block rounded-full bg-balloon-green/12 px-4 py-1.5 text-sm font-bold text-balloon-green">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
    </header>
  );
}
