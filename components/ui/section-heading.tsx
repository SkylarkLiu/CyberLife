import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
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
      <div className="flex items-center gap-3">
        <span className="seal-dot" />
        <p className="ink-eyebrow text-xs font-medium">
          {eyebrow}
        </p>
      </div>
      <div className="space-y-3 ink-divider">
        <h2 className="ink-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">{title}</h2>
        {description ? (
          <p className="max-w-2xl font-serif text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
