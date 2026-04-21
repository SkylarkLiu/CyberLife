type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      <p className="text-xs font-medium uppercase tracking-[0.36em] text-[var(--color-accent-muted)]">
        {eyebrow}
      </p>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-[0.06em] text-white sm:text-4xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
