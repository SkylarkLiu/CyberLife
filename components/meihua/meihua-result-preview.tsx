import type { MeihuaReading } from "@/schemas/meihua";

import { DetailCard } from "@/components/divination/detail-card";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";

type MeihuaResultPreviewProps = {
  reading: MeihuaReading;
};

function TrigramBar({ active }: { active?: boolean }) {
  return (
    <div
      className={`h-2.5 rounded-full ${
        active
          ? "bg-[rgba(246,200,123,0.9)] shadow-[0_0_20px_rgba(246,200,123,0.18)]"
          : "bg-white/16"
      }`}
    />
  );
}

function HexagramBoard({
  title,
  tone,
  reading,
  type,
}: {
  title: string;
  tone: "accent" | "info" | "muted";
  reading: MeihuaReading;
  type: "original" | "mutual" | "changed";
}) {
  const hexagram = reading.chart[type];
  const upperBits = hexagram.upper.binary.split("").reverse();
  const lowerBits = hexagram.lower.binary.split("").reverse();

  return (
    <div className="paper-noise rounded-[1.35rem] border border-[rgba(211,176,107,0.1)] bg-[rgba(255,248,235,0.04)] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="ink-eyebrow">
            {title}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{hexagram.name}</h3>
        </div>
        <Pill tone={tone}>{hexagram.code}</Pill>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/38">上卦</p>
          <div className="space-y-2 rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.03)] p-3">
            {upperBits.map((bit, index) => {
              const position = 6 - index;
              const highlight = type === "original" && reading.chart.movingLine === position;

              return (
                <TrigramBar
                  key={`${title}-upper-${position}`}
                  active={bit === "1" || highlight}
                />
              );
            })}
          </div>
          <p className="text-sm text-white/84">
            {hexagram.upper.name} · {hexagram.upper.element} · {hexagram.upper.attribute}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/38">下卦</p>
          <div className="space-y-2 rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.03)] p-3">
            {lowerBits.map((bit, index) => {
              const position = 3 - index;
              const highlight = type === "original" && reading.chart.movingLine === position;

              return (
                <TrigramBar
                  key={`${title}-lower-${position}`}
                  active={bit === "1" || highlight}
                />
              );
            })}
          </div>
          <p className="text-sm text-white/84">
            {hexagram.lower.name} · {hexagram.lower.element} · {hexagram.lower.attribute}
          </p>
        </div>
      </div>
    </div>
  );
}

export function MeihuaResultPreview({ reading }: MeihuaResultPreviewProps) {
  return (
    <div className="space-y-6">
      <GlassPanel className="paper-noise p-5 sm:p-6">
        <div className="space-y-4">
          <p className="ink-eyebrow">起卦结果</p>
          <h2 className="ink-display text-[1.75rem] text-white">三卦并陈，体用相参。</h2>
          <div className="flex flex-wrap gap-2">
            <Pill tone="accent">{`本卦 ${reading.chart.original.name}`}</Pill>
            <Pill tone="info">{`互卦 ${reading.chart.mutual.name}`}</Pill>
            <Pill>{`变卦 ${reading.chart.changed.name}`}</Pill>
          </div>
        </div>
      </GlassPanel>

      <DetailCard title="断语层级" eyebrow="Judgment">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <div className="rounded-[1.1rem] border border-[rgba(109,53,37,0.14)] bg-[rgba(109,53,37,0.08)] px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[rgba(230,191,170,0.78)]">
              结果层级
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{reading.judgment.level}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
              {reading.judgment.headline}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.04)] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-muted)]">断曰</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{reading.judgment.verdict}</p>
            </div>
            <div className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.04)] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-muted)]">时机</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{reading.judgment.timing}</p>
            </div>
            <div className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.04)] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-muted)]">宜</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{reading.judgment.advice}</p>
            </div>
            <div className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.04)] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-muted)]">忌</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{reading.judgment.caution}</p>
            </div>
          </div>
        </div>
      </DetailCard>

      <DetailCard title="三盘结构" eyebrow="Board">
        <div className="grid gap-4 xl:grid-cols-3">
          <HexagramBoard title="本卦" tone="accent" reading={reading} type="original" />
          <HexagramBoard title="互卦" tone="info" reading={reading} type="mutual" />
          <HexagramBoard title="变卦" tone="muted" reading={reading} type="changed" />
        </div>
      </DetailCard>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <DetailCard title="体用关系" eyebrow="Body / Use">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.04)] px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent-muted)]">
                体卦
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{reading.chart.bodyTrigram.name}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                {reading.chart.bodyTrigram.element} · {reading.chart.bodyTrigram.attribute}
              </p>
            </div>
            <div className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.04)] px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent-muted)]">
                用卦
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{reading.chart.useTrigram.name}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                {reading.chart.useTrigram.element} · {reading.chart.useTrigram.attribute}
              </p>
            </div>
          </div>
          <div className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.03)] px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent-muted)]">
              关系判断
            </p>
            <p className="mt-2 text-sm font-medium text-white">{reading.chart.relation.type}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
              {reading.chart.relation.summary}
            </p>
          </div>
        </DetailCard>

        <DetailCard title="起卦摘要" eyebrow="Summary">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-[var(--color-text-soft)]">
              {reading.summary}
            </p>
            <div className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.04)] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-muted)]">
                输入方式
              </p>
              <p className="mt-2 text-sm text-white/78">
                {reading.chart.source.methodLabel}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                {reading.input.prompt || "未填写占问问题"}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                {reading.chart.source.seedSummary}
              </p>
              {reading.chart.source.lunarLabel ? (
                <p className="mt-2 text-sm text-white/78">
                  农历 {reading.chart.source.lunarLabel}
                </p>
              ) : null}
              <p className="mt-2 text-sm text-white/78">
                上卦数 {reading.chart.source.upperNumber} · 下卦数 {reading.chart.source.lowerNumber}
                {reading.chart.source.hourNumber ? ` · 时数 ${reading.chart.source.hourNumber}` : ""}
              </p>
              <p className="mt-2 text-sm text-white/78">
                体卦 {reading.chart.bodyTrigram.name} · 用卦 {reading.chart.useTrigram.name} · 动爻第{" "}
                {reading.chart.movingLine} 爻
              </p>
            </div>
          </div>
        </DetailCard>
      </div>

      <DetailCard title="总览">
        <p className="text-sm leading-7 text-[var(--color-text-soft)]">
          {reading.interpretation.overview}
        </p>
      </DetailCard>

      <DetailCard title="分项解读" eyebrow="Reading Sections">
        <div className="space-y-4">
          {reading.interpretation.sections.map((section) => (
            <div
              key={section.key}
              className="rounded-[1rem] border border-[rgba(211,176,107,0.08)] bg-[rgba(255,248,235,0.04)] px-4 py-3"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-accent-muted)]">
                {section.title}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </DetailCard>

      <p className="px-1 text-center text-[11px] leading-6 text-white/28">
        {reading.disclaimer}
      </p>
    </div>
  );
}
