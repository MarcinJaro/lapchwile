import {
  Cake,
  Confetti,
  MapPin,
  Coffee,
  PuzzlePiece,
} from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: Cake, text: "Urodziny od 3 do 100 lat", card: "bg-pastel-pink", iconColor: "text-balloon-red" },
  { icon: Confetti, text: "Animacje prowadzone przez animatorów", card: "bg-pastel-blue", iconColor: "text-action" },
  { icon: PuzzlePiece, text: "Kilka stref zabawy", card: "bg-pastel-green", iconColor: "text-balloon-green" },
  { icon: MapPin, text: "Lokalizacja nad Zalewem Zegrzyńskim", card: "bg-pastel-yellow", iconColor: "text-yellow-600" },
  { icon: Coffee, text: "Rodzice mogą odpocząć", card: "bg-pastel-blue", iconColor: "text-action" },
];

export function TrustStrip() {
  return (
    <section aria-label="Dlaczego Łap Chwile" className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6">
      <ul className="flex flex-wrap items-stretch justify-center gap-3">
        {items.map(({ icon: Icon, text, card, iconColor }) => (
          <li
            key={text}
            className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-[15px] font-bold text-ink ${card}`}
          >
            <Icon size={22} weight="duotone" aria-hidden className={`shrink-0 ${iconColor}`} />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
