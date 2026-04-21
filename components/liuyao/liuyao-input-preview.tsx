"use client";

import type { LiuyaoInputMode, LiuyaoLineInput, LiuyaoLineLabel, LiuyaoLinePosition } from "@/schemas/liuyao";

import { LocationSelector } from "@/components/liuyao/location-selector";
import { GlassPanel } from "@/components/ui/glass-panel";

type LiuyaoInputPanelProps = {
  mode: LiuyaoInputMode;
  onModeChange: (mode: LiuyaoInputMode) => void;
  currentStep: LiuyaoLinePosition | null;
  lines: LiuyaoLineInput[];
  onLineSet: (position: LiuyaoLinePosition, line: LiuyaoLineInput) => void;
  question: string;
  onQuestionChange: (q: string) => void;
  manualTimestamp: string;
  onManualTimestampChange: (value: string) => void;
  manualLocation: string[];
  onManualLocationChange: (value: string[]) => void;
  generatedTimestamp: string;
  generatedIp: string;
  generatedIpStatus: "idle" | "loading" | "ready" | "error";
  canSubmit: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
};

const lineOptions: {
  label: LiuyaoLineLabel;
  polarity: "yin" | "yang";
  moving: boolean;
  description: string;
}[] = [
  { label: "少阳", polarity: "yang", moving: false, description: "阳爻 · 静" },
  { label: "少阴", polarity: "yin", moving: false, description: "阴爻 · 静" },
  { label: "老阳", polarity: "yang", moving: true, description: "阳爻 · 动" },
  { label: "老阴", polarity: "yin", moving: true, description: "阴爻 · 动" },
];

const positionLabels: Record<LiuyaoLinePosition, string> = {
  1: "第一爻（初爻）",
  2: "第二爻",
  3: "第三爻",
  4: "第四爻",
  5: "第五爻",
  6: "第六爻（上爻）",
};

const allPositions: LiuyaoLinePosition[] = [1, 2, 3, 4, 5, 6];

export function LiuyaoInputPanel({
  mode,
  onModeChange,
  currentStep,
  lines,
  onLineSet,
  question,
  onQuestionChange,
  manualTimestamp,
  onManualTimestampChange,
  manualLocation,
  onManualLocationChange,
  generatedTimestamp,
  generatedIp,
  generatedIpStatus,
  canSubmit,
  onSubmit,
  isSubmitting,
}: LiuyaoInputPanelProps) {
  const settledCount = lines.length;
  const isComplete = settledCount === 6;
  const lineMap = new Map(lines.map((line) => [line.position, line]));

  /** 手动模式：选择当前爻 */
  function handleSelectCurrentLine(option: (typeof lineOptions)[number]) {
    if (!currentStep) {
      return;
    }

    onLineSet(currentStep, {
      position: currentStep,
      polarity: option.polarity,
      moving: option.moving,
      label: option.label,
    });
  }

  /** 系统生成模式：随机生成当前爻 */
  function handleGenerateCurrent() {
    if (!currentStep) {
      return;
    }

    const option = lineOptions[Math.floor(Math.random() * lineOptions.length)];
    onLineSet(currentStep, {
      position: currentStep,
      polarity: option.polarity,
      moving: option.moving,
      label: option.label,
    });
  }

  /** 重置 */
  function handleReset() {
    onModeChange(mode);
  }

  return (
    <GlassPanel className="p-6 sm:p-7">
      <div className="space-y-7">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-accent-muted)]">
              起卦方式
            </p>
            <p className="text-sm leading-6 text-[var(--color-text-soft)]">
              选择手动输入逐爻设定，或使用系统生成逐步起卦。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-[1.2rem] border border-white/8 bg-[rgba(255,255,255,0.04)] p-1.5">
            <button
              type="button"
              onClick={() => onModeChange("manual")}
              className={`rounded-[0.95rem] px-4 py-3 text-sm font-medium transition ${
                mode === "manual"
                  ? "bg-[rgba(246,200,123,0.16)] text-white shadow-[0_10px_20px_rgba(246,200,123,0.08)]"
                  : "text-white/68 hover:bg-white/5"
              }`}
            >
              手动输入
            </button>
            <button
              type="button"
              onClick={() => onModeChange("generated")}
              className={`rounded-[0.95rem] px-4 py-3 text-sm font-medium transition ${
                mode === "generated"
                  ? "bg-[rgba(140,167,255,0.16)] text-white shadow-[0_10px_20px_rgba(140,167,255,0.08)]"
                  : "text-white/68 hover:bg-white/5"
              }`}
            >
              系统生成
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-muted)]">
            起卦进度
          </p>
          <div className="flex gap-1.5">
            {allPositions.map((pos) => {
              const isSettled = !!lineMap.get(pos);
              const isCurrent = currentStep === pos;

              return (
                <div
                  key={pos}
                  className={`flex h-2 flex-1 items-center rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "bg-[rgba(246,200,123,0.7)]"
                      : isSettled
                        ? "bg-[rgba(246,200,123,0.35)]"
                        : "bg-white/8"
                  }`}
                />
              );
            })}
          </div>
          <p className="text-[11px] tracking-[0.14em] text-white/42">
            {isComplete
              ? "六爻已全部确定，可以开始起卦"
              : currentStep
                ? `正在确定${positionLabels[currentStep]}（${settledCount}/6）`
                : `已确定 ${settledCount}/6 爻`}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-muted)]">
            起卦时间
          </p>
          {mode === "manual" ? (
            <input
              type="datetime-local"
              value={manualTimestamp}
              onChange={(e) => onManualTimestampChange(e.target.value)}
              className="w-full rounded-[1rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-white outline-none transition focus:border-[rgba(246,200,123,0.28)] focus:bg-white/6"
            />
          ) : (
            <div className="rounded-[1rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/82">
              {generatedTimestamp || "时间初始化中"}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-muted)]">
            起卦地点
          </p>
          {mode === "manual" ? (
            <LocationSelector value={manualLocation} onChange={onManualLocationChange} />
          ) : (
            <div className="rounded-[1rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/82">
              {generatedIpStatus === "loading"
                ? "当前 IP 获取中"
                : generatedIpStatus === "error"
                  ? "当前地址不可用"
                  : generatedIp || "当前地址不可用"}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-muted)]">
            占问问题（可选）
          </p>
          <input
            type="text"
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder="输入您想占问的事项..."
            className="w-full rounded-[1rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-white placeholder-white/28 outline-none transition focus:border-[rgba(246,200,123,0.28)] focus:bg-white/6"
          />
        </div>

        {!isComplete && currentStep ? (
          <div className="space-y-3 rounded-[1.35rem] border border-white/8 bg-[rgba(255,255,255,0.035)] p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-muted)]">
                当前爻操作
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-soft)]">{positionLabels[currentStep]}</p>
            </div>

            {mode === "manual" ? (
              <div className="space-y-2">
                {lineOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleSelectCurrentLine(option)}
                    className="flex w-full items-center justify-between rounded-[0.9rem] border border-white/6 bg-white/3 px-3 py-3 text-sm text-white/76 transition hover:border-white/12 hover:bg-white/6"
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="text-[11px] tracking-[0.14em] text-white/42">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm leading-6 text-[var(--color-text-soft)]">
                  点击按钮，系统将为当前爻随机生成状态。
                </p>
                <button
                  type="button"
                  onClick={handleGenerateCurrent}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[rgba(140,167,255,0.22)] bg-[rgba(140,167,255,0.1)] px-4 py-3 text-sm font-medium tracking-[0.06em] text-white transition duration-300 hover:bg-[rgba(140,167,255,0.18)]"
                >
                  生成第 {currentStep} 爻
                </button>
              </div>
            )}
          </div>
        ) : null}

        {settledCount > 0 ? (
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent-muted)]">
              已确定爻象
            </p>
            <div className="flex flex-wrap gap-2">
              {lines.map((line) => (
                <span
                  key={line.position}
                  className={`rounded-full border px-2.5 py-1 text-[11px] tracking-[0.14em] ${
                    line.moving
                      ? "border-[rgba(140,167,255,0.22)] bg-[rgba(140,167,255,0.12)] text-[rgba(208,220,255,0.9)]"
                      : "border-[rgba(246,200,123,0.22)] bg-[rgba(246,200,123,0.1)] text-[rgba(255,226,167,0.9)]"
                  }`}
                >
                  {positionLabels[line.position].replace("（", "\u00A0·\u00A0").replace("）", "")}
                  {" · "}
                  {line.label}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit || isSubmitting}
            className={`inline-flex items-center justify-center rounded-full border border-white/12 px-4 py-3 text-sm font-medium tracking-[0.06em] text-white transition duration-300 ${
              canSubmit && !isSubmitting
                ? "bg-[rgba(246,200,123,0.14)] hover:bg-[rgba(246,200,123,0.22)]"
                : "cursor-not-allowed opacity-40"
            }`}
          >
            {isSubmitting ? "起卦中..." : "开始起卦"}
          </button>
          {settledCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-full border border-white/8 bg-transparent px-4 py-3 text-sm font-medium tracking-[0.06em] text-white/56 transition duration-300 hover:bg-white/6"
            >
              重新起卦
            </button>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}
