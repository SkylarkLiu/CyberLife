"use client";

import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { MeihuaInput } from "@/schemas/meihua";

type MeihuaInputPanelProps = {
  method: MeihuaInput["method"];
  onMethodChange: (method: MeihuaInput["method"]) => void;
  prompt: string;
  onPromptChange: (value: string) => void;
  timestamp: string;
  onTimestampChange: (value: string) => void;
  firstNumber: string;
  secondNumber: string;
  onFirstNumberChange: (value: string) => void;
  onSecondNumberChange: (value: string) => void;
  onSubmit: () => void;
  canSubmit: boolean;
  isSubmitting: boolean;
};

export function MeihuaInputPanel({
  method,
  onMethodChange,
  prompt,
  onPromptChange,
  timestamp,
  onTimestampChange,
  firstNumber,
  secondNumber,
  onFirstNumberChange,
  onSecondNumberChange,
  onSubmit,
  canSubmit,
  isSubmitting,
}: MeihuaInputPanelProps) {
  return (
    <GlassPanel className="paper-noise p-6 sm:p-7">
      <div className="space-y-7">
        <div className="space-y-3">
          <p className="ink-eyebrow">梅花起式</p>
          <h2 className="ink-display text-[1.8rem] text-white sm:text-[2rem]">
            由时数入卦，由体用观变。
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-text-soft)]">
            先选起卦方式，再定问题与取数。结果页会将本卦、互卦、变卦与体用关系整理为连续的推演视图。
          </p>
          <div className="ink-divider" />
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="ink-eyebrow">起卦方式</p>
            <p className="text-sm leading-6 text-[var(--color-text-soft)]">
              先使用时间起卦与数字起卦两种基础模式，后续再继续补全梅花易数的推演规则。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-[1.2rem] border border-[rgba(211,176,107,0.14)] bg-[linear-gradient(145deg,rgba(28,23,17,0.9),rgba(14,11,8,0.78))] p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
            <button
              type="button"
              onClick={() => onMethodChange("time")}
              className={`rounded-[0.95rem] px-4 py-3 text-sm font-medium transition ${
                method === "time"
                  ? "bg-[rgba(211,176,107,0.18)] text-white shadow-[0_10px_20px_rgba(211,176,107,0.12)]"
                  : "text-white/68 hover:bg-white/5"
              }`}
            >
              时间起卦
            </button>
            <button
              type="button"
              onClick={() => onMethodChange("numbers")}
              className={`rounded-[0.95rem] px-4 py-3 text-sm font-medium transition ${
                method === "numbers"
                  ? "bg-[rgba(109,53,37,0.22)] text-white shadow-[0_10px_20px_rgba(109,53,37,0.15)]"
                  : "text-white/68 hover:bg-white/5"
              }`}
            >
              数字起卦
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="ink-eyebrow">占问问题</p>
          <input
            type="text"
            value={prompt}
            onChange={(event) => onPromptChange(event.target.value)}
            placeholder="输入当前要占问的主题..."
            className="field-ink w-full rounded-[1rem] px-4 py-3 text-sm text-white placeholder-white/28 outline-none"
          />
        </div>

        {method === "time" ? (
          <div className="space-y-3">
            <p className="ink-eyebrow">起卦时间</p>
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(event) => onTimestampChange(event.target.value)}
              className="field-ink w-full rounded-[1rem] px-4 py-3 text-sm text-white outline-none"
            />
            <p className="text-[11px] tracking-[0.14em] text-white/42">
              使用当前时刻或自定义时刻推演上卦、下卦与动爻。
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="ink-eyebrow">起卦数字</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="number"
                min="1"
                value={firstNumber}
                onChange={(event) => onFirstNumberChange(event.target.value)}
                placeholder="第一个数字"
                className="field-ink w-full rounded-[1rem] px-4 py-3 text-sm text-white placeholder-white/28 outline-none"
              />
              <input
                type="number"
                min="1"
                value={secondNumber}
                onChange={(event) => onSecondNumberChange(event.target.value)}
                placeholder="第二个数字"
                className="field-ink w-full rounded-[1rem] px-4 py-3 text-sm text-white placeholder-white/28 outline-none"
              />
            </div>
            <p className="text-[11px] tracking-[0.14em] text-white/42">
              两个数字分别映射上卦与下卦，并据和数推定动爻。
            </p>
          </div>
        )}

        <div className="paper-noise rounded-[1.35rem] border border-[rgba(211,176,107,0.12)] bg-[linear-gradient(145deg,rgba(26,21,15,0.78),rgba(12,10,7,0.68))] p-4">
          <p className="ink-eyebrow">当前模式说明</p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
            {method === "time"
              ? "时间起卦更适合作为直觉型入口，以时刻为种子得到当前盘面。"
              : "数字起卦更适合明确给出两个数字时快速建立盘面，用于验证输入、引擎与结果结构。"}
          </p>
        </div>

        <Button
          className="w-full justify-center py-3"
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? "起卦中..." : "开始起卦"}
        </Button>
      </div>
    </GlassPanel>
  );
}
