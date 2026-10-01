// A generic drawn watch wheel, for a 240 x 240 viewBox. Not a real component.

const C = 120;
const TEETH = 24;

// Rounded so server and client render identical strings.
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;
};

const OUTLINE =
  Array.from({ length: TEETH })
    .map((_, i) => {
      const step = 360 / TEETH;
      const a = i * step;
      return `${i === 0 ? "M" : "L"} ${pt(84, a)} L ${pt(96, a + step * 0.15)} L ${pt(96, a + step * 0.45)} L ${pt(84, a + step * 0.6)}`;
    })
    .join(" ") + " Z";

const WINDOWS = Array.from({ length: 5 }).map((_, i) => {
  const a0 = i * 72 - 80;
  const a1 = a0 + 52;
  return `M ${pt(54, a0)} A 54 54 0 0 1 ${pt(54, a1)} L ${pt(28, a1)} A 28 28 0 0 0 ${pt(28, a0)} Z`;
});

export const SCRATCH = "M 146 64 Q 166 76 182 98";

export function GearPart({ defect }: { defect?: boolean }) {
  return (
    <g>
      <path d={OUTLINE} fill="#ececef" stroke="#a3a3a3" strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={C} cy={C} r={74} fill="none" stroke="#d4d4d4" />
      {WINDOWS.map((d) => (
        <path key={d} d={d} fill="#fafafa" stroke="#a3a3a3" strokeWidth={1.5} strokeLinejoin="round" />
      ))}
      <circle cx={C} cy={C} r={16} fill="#e0e0e4" stroke="#a3a3a3" strokeWidth={1.5} />
      <circle cx={C} cy={C} r={6} fill="#fafafa" stroke="#a3a3a3" strokeWidth={1.5} />
      {defect && <path d={SCRATCH} fill="none" stroke="#525252" strokeWidth={1.6} strokeLinecap="round" />}
    </g>
  );
}
