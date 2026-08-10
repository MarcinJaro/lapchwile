/**
 * Soft wave transition between section backgrounds. Color the wave with a
 * text-* class matching the NEXT section's background (or the previous one
 * when flipped).
 */
export function WaveDivider({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div aria-hidden className={`${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="block h-8 w-full sm:h-12"
      >
        <path
          d="M0 30 C 200 56 420 4 720 22 C 1020 40 1240 12 1440 28 L 1440 56 L 0 56 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
