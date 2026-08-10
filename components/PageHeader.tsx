import { Reveal } from "./Reveal";
import { Sparkle } from "./Sparkle";

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
    <Reveal>
      <header className="relative mx-auto max-w-3xl px-4 pb-4 pt-14 text-center sm:px-6">
        <Sparkle
          size={18}
          className="absolute left-[8%] top-16 hidden text-balloon-yellow motion-safe:animate-float sm:block"
        />
        <Sparkle
          size={13}
          className="absolute right-[10%] top-24 hidden text-balloon-red motion-safe:animate-float-slow sm:block"
        />
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
    </Reveal>
  );
}
