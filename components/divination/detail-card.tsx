import { type ReactNode } from "react";

import { GlassPanel } from "@/components/ui/glass-panel";

type DetailCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export function DetailCard({ title, eyebrow, children, className }: DetailCardProps) {
  return (
    <GlassPanel className={`p-5 sm:p-6 ${className ?? ""}`.trim()}>
      <div className="space-y-4">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-accent-muted)]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-xl font-semibold tracking-[0.06em] text-white">{title}</h2>
        </div>
        {children}
      </div>
    </GlassPanel>
  );
}
