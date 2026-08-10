import {
  Cake,
  Confetti,
  MapPin,
  Coffee,
  PuzzlePiece,
} from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: Cake, text: "Urodziny od 3 do 100 lat", accent: "bg-balloon-red/12 text-balloon-red" },
  { icon: Confetti, text: "Animacje prowadzone przez animatorów", accent: "bg-action/10 text-action" },
  { icon: PuzzlePiece, text: "Kilka stref zabawy", accent: "bg-balloon-green/12 text-balloon-green" },
  { icon: MapPin, text: "Lokalizacja nad Zalewem Zegrzyńskim", accent: "bg-balloon-yellow/25 text-yellow-600" },
  { icon: Coffee, text: "Rodzice mogą odpocząć", accent: "bg-action/10 text-action" },
];

export function TrustStrip() {
  return (
    <section aria-label="Dlaczego Łap Chwile" className="border-y border-ink/5 bg-cream">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-3 px-4 py-6 sm:px-6">
        {items.map(({ icon: Icon, text, accent }) => (
          <li key={text} className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${accent}`}>
              <Icon size={20} weight="duotone" aria-hidden />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
