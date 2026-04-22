import { type ReactNode } from "react";

import { HomeBackgroundBagua } from "@/components/home/home-background-bagua";
import { GlassPanel } from "@/components/ui/glass-panel";

type ModuleShellProps = {
  title: string;
  subtitle: string;
  description: string;
  aside?: ReactNode;
  children: ReactNode;
  showHeader?: boolean;
  compact?: boolean;
};

export function ModuleShell({
  title,
  subtitle,
  description,
  aside,
  children,
  showHeader = true,
  compact = false,
}: ModuleShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(117,106,82,0.16),transparent_24%),radial-gradient(circle_at_76%_18%,rgba(158,45,52,0.06),transparent_18%),linear-gradient(180deg,transparent,rgba(0,0,0,0.18))]" />
      <HomeBackgroundBagua variant="ambient" />
      <div className={`mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 ${compact ? "py-2 sm:py-3" : "py-6 sm:py-8"} lg:px-8 xl:px-10`}>
        {showHeader ? (
          <GlassPanel className="paper-noise relative z-10 p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="ink-eyebrow text-xs">
                  {subtitle}
                </p>
                <h1 className="ink-display text-4xl font-semibold tracking-[0.08em] text-white sm:text-5xl">
                  {title}
                </h1>
                <p className="font-serif text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
                  {description}
                </p>
              </div>
              {aside ? <div className="lg:max-w-sm">{aside}</div> : null}
            </div>
          </GlassPanel>
        ) : null}
        <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(22rem,0.78fr)]">
          {children}
        </div>
      </div>
    </main>
  );
}
