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
      <GlassPanel className="paper-noise p-5 sm:p-6">
        <div className="space-y-4">
          <p className="ink-eyebrow">起卦结果</p>
          <h2 className="ink-display text-[1.75rem] text-white">本卦既成，变象已明。</h2>
          <div className="flex flex-wrap gap-2">
            <Pill tone="accent">{`本卦 ${reading.chart.original.name}`}</Pill>
            <span className="flex items-center text-[11px] tracking-[0.16em] text-white/42">
              →
            </span>
            <Pill tone="info">{`变卦 ${reading.chart.changed.name}`}</Pill>
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-4 sm:grid-cols-2">
        <DetailCard title="本卦" eyebrow="Original">
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
        <DetailCard title="变卦" eyebrow="Changed">
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

      <DetailCard title="六爻盘式" eyebrow="Line Board">
        <div className="overflow-hidden rounded-[1.45rem] border border-[rgba(211,176,107,0.1)] bg-[rgba(255,248,235,0.03)]">
          <div className="grid grid-cols-[4.2rem_minmax(0,1fr)_5.2rem_4.8rem] border-b border-[rgba(211,176,107,0.08)] px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent-muted)]">
            <span>爻位</span>
            <span>盘面信息</span>
            <span className="text-center">六神</span>
            <span className="text-right">状态</span>
          </div>
          {[...reading.chart.lines]
            .sort((a, b) => b.position - a.position)
            .map((line) => {
              const isMoving = reading.chart.movingLines.includes(line.position);
              const isSelf =
                line.position === reading.chart.original.selfLine;
              const isResponse =
                line.position === reading.chart.original.responseLine;

              return (
                <div
                  key={line.position}
                  className="grid grid-cols-[4.2rem_minmax(0,1fr)_5.2rem_4.8rem] items-center gap-4 border-t border-[rgba(211,176,107,0.06)] px-4 py-4 first:border-t-0"
                >
                  <div className="space-y-1">
                    <p className="text-xs tracking-[0.16em] text-[var(--color-accent-muted)]">
                      第{line.position}爻
                    </p>
                    <p className="text-[10px] tracking-[0.14em] text-white/32">
                      {isSelf ? "世位" : isResponse ? "应位" : "常位"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {line.role}
                      </span>
                      <span className="text-[12px] tracking-[0.12em] text-white/52">
                        {line.branch}
                      </span>
                      <span className="rounded-full border border-[rgba(211,176,107,0.14)] px-2 py-0.5 text-[10px] tracking-[0.16em] text-[rgba(247,225,178,0.88)]">
                        {line.polarity === "yang" ? "阳" : "阴"}
                      </span>
                    </div>
                    <div className="h-3 max-w-[14rem] rounded-full bg-[rgba(211,176,107,0.08)] p-[2px]">
                      <div className={`flex h-full items-center gap-[6px] ${line.polarity === "yang" ? "" : "justify-between"}`}>
                        {line.polarity === "yang" ? (
                          <span className="block h-full w-full rounded-full bg-[rgba(250,231,190,0.94)]" />
                        ) : (
                          <>
                            <span className="block h-full w-[42%] rounded-full bg-[rgba(250,231,190,0.94)]" />
                            <span className="block h-full w-[42%] rounded-full bg-[rgba(250,231,190,0.94)]" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-white/72">{line.sixGod}</div>
                  <div className="flex justify-end">
                    <Pill tone={isMoving ? "info" : "muted"}>
                      {isMoving ? "动" : "静"}
                    </Pill>
                  </div>
                </div>
              );
            })}
        </div>
      </DetailCard>

      {reading.chart.movingLines.length > 0 && (
        <DetailCard title="动爻提示" eyebrow="Moving Lines">
          <div className="grid gap-3 sm:grid-cols-2">
            {reading.chart.movingLines.map((pos) => {
              const line = reading.chart.lines[pos - 1];

              return (
                <div
                  key={pos}
                  className="rounded-[1rem] border border-[rgba(109,53,37,0.14)] bg-[rgba(109,53,37,0.08)] px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[rgba(230,191,170,0.76)]">
                    第 {pos} 爻发动
                  </p>
                  <p className="mt-1.5 text-sm leading-7 text-[var(--color-text-soft)]">
                    {line.role} · {line.branch} · {line.sixGod} · {line.polarity === "yang" ? "阳" : "阴"}爻
                  </p>
                </div>
              );
            })}
          </div>
        </DetailCard>
      )}

      <DetailCard title="总览" eyebrow="Overview">
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

      {/* 免责声明 */}
      <p className="px-1 text-center text-[11px] leading-6 text-white/28">
        {reading.disclaimer}
      </p>
    </div>
  );
}
