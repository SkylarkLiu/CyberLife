"use client";

import type { LiuyaoLineInput, LiuyaoLinePosition } from "@/schemas/liuyao";

type HexagramLinesProps = {
  lines: LiuyaoLineInput[];
  activePosition: LiuyaoLinePosition | null;
};

const positionLabels: Record<LiuyaoLinePosition, string> = {
  1: "初爻",
  2: "二爻",
  3: "三爻",
  4: "四爻",
  5: "五爻",
  6: "上爻",
};

export function HexagramLines({ lines, activePosition }: HexagramLinesProps) {
  /** 渲染顺序：第 6 爻在最上方，第 1 爻在最下方 */
  const displayOrder = [6, 5, 4, 3, 2, 1] as const;

  const lineMap = new Map(lines.map((line) => [line.position, line]));

  return (
    <div className="overflow-hidden rounded-[1.45rem] border border-white/8 bg-[rgba(255,255,255,0.03)]">
      <div className="grid grid-cols-[4.2rem_minmax(0,1fr)_6rem] border-b border-white/8 bg-[rgba(255,255,255,0.035)] px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent-muted)]">
        <span>爻位</span>
        <span className="text-center">爻象</span>
        <span className="text-right">状态</span>
      </div>
      {displayOrder.map((position) => {
        const line = lineMap.get(position);
        const isActive = activePosition === position;
        const isSettled = !!line;
        const isYang = line?.polarity === "yang";
        const isMoving = line?.moving ?? false;

        return (
          <div
            key={position}
            className={`grid grid-cols-[4.2rem_minmax(0,1fr)_6rem] items-center gap-4 border-t border-white/6 px-4 py-4 transition-all duration-300 first:border-t-0 ${
              isActive
                ? "bg-[linear-gradient(90deg,rgba(246,200,123,0.08),transparent)]"
                : isSettled
                  ? "bg-[rgba(255,255,255,0.018)]"
                  : "bg-transparent"
            }`}
          >
            <div className="space-y-1">
              <p
                className={`text-xs font-medium tracking-[0.16em] ${
                  isActive
                    ? "text-[rgba(246,200,123,0.9)]"
                    : isSettled
                      ? "text-[var(--color-accent-muted)]"
                      : "text-white/28"
                }`}
              >
                {positionLabels[position]}
              </p>
              <p className="text-[10px] tracking-[0.16em] text-white/28">第 {position} 爻</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              {isSettled ? (
                <div className="w-full max-w-[12rem]">
                  <div className="h-3 rounded-full bg-[rgba(246,200,123,0.08)] p-[2px]">
                    <div className={`flex h-full items-center gap-[6px] ${isYang ? "" : "justify-between"}`}>
                      {isYang ? (
                        <span className="block h-full w-full rounded-full bg-[rgba(255,228,176,0.9)] shadow-[0_0_18px_rgba(246,200,123,0.18)]" />
                      ) : (
                        <>
                          <span className="block h-full w-[42%] rounded-full bg-[rgba(255,228,176,0.9)] shadow-[0_0_18px_rgba(246,200,123,0.18)]" />
                          <span className="block h-full w-[42%] rounded-full bg-[rgba(255,228,176,0.9)] shadow-[0_0_18px_rgba(246,200,123,0.18)]" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[12rem]">
                  <div className="h-3 rounded-full border border-dashed border-white/12 bg-transparent" />
                </div>
              )}
              <p className="text-[11px] tracking-[0.16em] text-white/42">
                {isSettled ? line.label : isActive ? "待定中" : "未设定"}
              </p>
            </div>

            <div className="flex justify-end">
              {isSettled ? (
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] tracking-[0.18em] ${
                    isMoving
                      ? "border-[rgba(140,167,255,0.22)] bg-[rgba(140,167,255,0.12)] text-[rgba(208,220,255,0.9)]"
                      : "border-[rgba(246,200,123,0.18)] bg-[rgba(246,200,123,0.08)] text-[rgba(255,226,167,0.84)]"
                  }`}
                >
                  {isMoving ? "动爻" : "静爻"}
                </span>
              ) : isActive ? (
                <span className="text-[10px] tracking-[0.16em] text-[rgba(246,200,123,0.6)]">
                  当前
                </span>
              ) : (
                <span className="text-[10px] tracking-[0.16em] text-white/20">—</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
