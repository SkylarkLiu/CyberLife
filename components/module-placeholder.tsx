import Link from "next/link";

import { GlassPanel } from "@/components/ui/glass-panel";

type ModulePlaceholderProps = {
  title: string;
  subtitle: string;
  description: string;
};

export function ModulePlaceholder({
  title,
  subtitle,
  description,
}: ModulePlaceholderProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-5 py-10 sm:px-6 lg:px-8">
      <GlassPanel className="paper-noise w-full p-6 sm:p-8">
        <p className="ink-eyebrow text-xs">
          {subtitle}
        </p>
        <h1 className="ink-display mt-4 text-4xl font-semibold tracking-[0.08em] text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-base leading-8 text-[var(--color-text-soft)]">
          {description}
        </p>
        <div className="mt-8 rounded-[1.75rem] border border-[rgba(226,214,190,0.1)] bg-[rgba(255,248,235,0.04)] p-5 font-serif text-sm leading-7 text-[var(--color-text-muted)]">
          当前阶段仅保留模块入口与页面骨架，后续会按统一 schema、引擎层与解释层逐步补齐。
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-[rgba(226,214,190,0.12)] bg-[rgba(255,248,235,0.05)] px-4 py-2 text-sm tracking-[0.08em] text-white transition hover:bg-[rgba(255,248,235,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(211,176,107,0.45)] motion-reduce:transition-none"
        >
          返回首页
        </Link>
      </GlassPanel>
    </main>
  );
}
