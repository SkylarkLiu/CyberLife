import type { LiuyaoReading } from "@/schemas/liuyao";

import { DetailCard } from "@/components/divination/detail-card";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Pill } from "@/components/ui/pill";

type LiuyaoResultPreviewProps = {
  reading: LiuyaoReading;
};

export function LiuyaoResultPreview({ reading }: LiuyaoResultPreviewProps) {
  return (
    <div className="space-y-6">
      {/* 结果预览头部 */}
      <GlassPanel className="p-5 sm:p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-[0.06em] text-white">
            结果预览
          </h2>
          <div className="flex flex-wrap gap-2">
            <Pill tone="accent">{reading.chart.original.name}</Pill>
            <span className="flex items-center text-[11px] tracking-[0.16em] text-white/42">
              →
            </span>
            <Pill tone="info">{reading.chart.changed.name}</Pill>
          </div>
        </div>
      </GlassPanel>

      {/* 本卦 & 变卦 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailCard title="本卦">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">
              {reading.chart.original.name}
            </h3>
            <p className="text-sm leading-7 text-[var(--color-text-soft)]">
              {reading.chart.original.palace} · 世爻第 {reading.chart.original.selfLine} 位 · 应爻第{" "}
              {reading.chart.original.responseLine} 位
            </p>
          </div>
        </DetailCard>
        <DetailCard title="变卦">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">
              {reading.chart.changed.name}
            </h3>
            <p className="text-sm leading-7 text-[var(--color-text-soft)]">
              {reading.chart.movingLines.length > 0
                ? `由第 ${reading.chart.movingLines.join("、")} 爻发动而成`
                : "无动爻，本卦即变卦"}
            </p>
          </div>
        </DetailCard>
      </div>

      {/* 动爻 */}
      {reading.chart.movingLines.length > 0 && (
        <DetailCard title="动爻">
          <div className="space-y-3">
            {reading.chart.movingLines.map((pos) => {
              const line = reading.chart.lines[pos - 1];

              return (
                <div
                  key={pos}
                  className="rounded-[1rem] border border-white/8 bg-white/4 px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-accent-muted)]">
                    第 {pos} 爻
                  </p>
                  <p className="mt-1.5 text-sm leading-7 text-[var(--color-text-soft)]">
                    {line.role} · {line.branch} · {line.sixGod} ·{" "}
                    {line.polarity === "yang" ? "阳" : "阴"}爻
                  </p>
                </div>
              );
            })}
          </div>
        </DetailCard>
      )}

      {/* 总览 */}
      <DetailCard title="总览">
        <p className="text-sm leading-7 text-[var(--color-text-soft)]">
          {reading.interpretation.overview}
        </p>
      </DetailCard>

      {/* 分项解读 */}
      <DetailCard title="分项解读">
        <div className="space-y-4">
          {reading.interpretation.sections.map((section) => (
            <div
              key={section.key}
              className="rounded-[1rem] border border-white/8 bg-white/4 px-4 py-3"
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

      {/* 免责声明 */}
      <p className="px-1 text-center text-[11px] leading-6 text-white/28">
        {reading.disclaimer}
      </p>
    </div>
  );
}
