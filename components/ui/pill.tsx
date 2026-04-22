type PillProps = {
  children: string;
  tone?: "accent" | "muted" | "info";
};

const toneClassNames = {
  accent: "border-[rgba(211,176,107,0.24)] bg-[rgba(211,176,107,0.1)] text-[rgba(240,218,172,0.95)]",
  muted: "border-[rgba(226,214,190,0.1)] bg-[rgba(255,248,235,0.045)] text-[rgba(240,234,221,0.72)]",
  info: "border-[rgba(158,45,52,0.22)] bg-[rgba(158,45,52,0.12)] text-[rgba(246,219,221,0.9)]",
};

export function Pill({ children, tone = "muted" }: PillProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.26em] ${toneClassNames[tone]}`}
    >
      {children}
    </span>
  );
}
