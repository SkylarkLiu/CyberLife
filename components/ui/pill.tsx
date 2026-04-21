type PillProps = {
  children: string;
  tone?: "accent" | "muted" | "info";
};

const toneClassNames = {
  accent: "border-[rgba(246,200,123,0.22)] bg-[rgba(246,200,123,0.12)] text-[rgba(255,226,167,0.94)]",
  muted: "border-white/10 bg-white/6 text-white/70",
  info: "border-[rgba(140,167,255,0.22)] bg-[rgba(140,167,255,0.12)] text-[rgba(208,220,255,0.9)]",
};

export function Pill({ children, tone = "muted" }: PillProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.22em] ${toneClassNames[tone]}`}
    >
      {children}
    </span>
  );
}
