import {
  Cake,
  Confetti,
  MapPin,
  Coffee,
  PuzzlePiece,
} from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: Cake, text: "Urodziny od 3 do 100 lat" },
  { icon: Confetti, text: "Animacje prowadzone przez animatorów" },
  { icon: PuzzlePiece, text: "Kilka stref zabawy" },
  { icon: MapPin, text: "Lokalizacja nad Zalewem Zegrzyńskim" },
  { icon: Coffee, text: "Rodzice mogą odpocząć" },
];

export function TrustStrip() {
  return (
    <section aria-label="Dlaczego Łap Chwile" className="border-y border-ink/5 bg-cream">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 py-6 sm:px-6">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
            <Icon size={22} weight="duotone" className="shrink-0 text-action" aria-hidden />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
