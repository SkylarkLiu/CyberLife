import { SectionHeading } from "@/components/ui/section-heading";

export function HomeHero() {
  return (
    <section className="relative z-10 min-h-[calc(100vh-var(--topbar-height)-4rem)] px-5 py-16 sm:px-6 lg:px-10 lg:pl-28 xl:pl-32">
      <div className="flex min-h-[inherit] items-center">
        <div className="w-full max-w-[30rem] space-y-7 text-left sm:max-w-[33rem]">
          <SectionHeading
            eyebrow="极深研几"
            title="术数非迷信，乃时空之拓扑，术算之逻辑。"
          />

          <div id="site-notes" className="max-w-[34rem]">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-accent-muted)]">
              「夫易，圣人之所以极深而研几也。」
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-soft)]">
              极深以溯源，研几以见著。本站秉承《系辞》“极深研几”之旨，将传统术数视作一套精密的时空演算逻辑。通过对易理、象数的深度建模，于万象纷纭中捕捉事物萌发生长的微秒迹象，探寻随机性背后的必然律。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}