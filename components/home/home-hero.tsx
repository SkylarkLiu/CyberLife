import { SectionHeading } from "@/components/ui/section-heading";

export function HomeHero() {
  return (
    <section className="relative z-10 min-h-[calc(100vh-var(--topbar-height)-4rem)] px-5 py-16 sm:px-6 lg:px-10 lg:pl-28 xl:pl-32">
      <div className="flex min-h-[inherit] items-center">
        <div className="w-full max-w-[31rem] space-y-8 text-left sm:max-w-[35rem]">
          <SectionHeading
            eyebrow="极深研几"
              title={ <>
              极深以溯源，
              <br />
              研几以知微。
              </>
}
            description="术数非迷信，乃时空之拓扑，术算之逻辑。"
          />

          <div id="site-notes" className="max-w-[36rem] rounded-[2rem] border border-[rgba(226,214,190,0.1)] bg-[linear-gradient(180deg,rgba(255,248,235,0.045),rgba(255,248,235,0.02)),rgba(255,255,255,0.03)] p-6 paper-noise">
            <p className="ink-eyebrow text-[11px]">系辞引语</p>
            <p className="mt-3 ink-display text-2xl leading-[1.5] text-[rgba(244,234,217,0.92)] sm:text-[2rem]">
              夫易，圣人之所以极深而研几也。
            </p>
            <p className="mt-5 font-serif text-base leading-8 text-[var(--color-text-soft)]">
              夫易者，象也；数者，理也。 本站取法《道德经》之“玄微”，承袭《易经》之“变通”。集八卦、六爻、六壬、紫微之大成，旨在通过数理模型的精密推演，捕捉时空波动中的“几”与“兆”。我们不迷信于命运的定格，而致力于在瞬息万变的万物中，为您梳理出一条顺天应时、趋吉避凶的通达之路。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
