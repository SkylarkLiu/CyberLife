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
    <GlassPanel className={`paper-noise p-5 sm:p-6 ${className ?? ""}`.trim()}>
      <div className="space-y-4">
        <div className="space-y-2 ink-divider">
          {eyebrow ? (
            <p className="ink-eyebrow text-[11px]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="ink-title text-xl font-semibold sm:text-[1.35rem]">{title}</h2>
        </div>
        {children}
      </div>
    </GlassPanel>
  );
}
