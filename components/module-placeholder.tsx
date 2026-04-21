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
      <GlassPanel className="w-full p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--color-accent-muted)]">
          {subtitle}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[0.08em] text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-soft)]">
          {description}
        </p>
        <div className="mt-8 rounded-[1.75rem] border border-white/8 bg-white/5 p-5 text-sm leading-7 text-[var(--color-text-muted)]">
          当前阶段仅保留模块入口与页面骨架，后续会按统一 schema、引擎层与解释层逐步补齐。
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(246,200,123,0.55)] motion-reduce:transition-none"
        >
          返回首页
        </Link>
      </GlassPanel>
    </main>
  );
}
