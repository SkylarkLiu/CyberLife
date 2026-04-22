"use client";

import { useMemo, useRef, useState } from "react";

import { DetailCard } from "@/components/divination/detail-card";
import { MeihuaInputPanel } from "@/components/meihua/meihua-input-panel";
import { MeihuaResultPreview } from "@/components/meihua/meihua-result-preview";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { DivinationApiResponse } from "@/schemas/divination";
import type { MeihuaInput, MeihuaReading } from "@/schemas/meihua";

type ResultState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; reading: MeihuaReading };

function toDateTimeLocalValue(date: Date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

export function MeihuaPageContent() {
  const [method, setMethod] = useState<MeihuaInput["method"]>("time");
  const [prompt, setPrompt] = useState("");
  const [timestamp, setTimestamp] = useState(() => toDateTimeLocalValue(new Date()));
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState<ResultState>({ status: "idle" });
  const resultRef = useRef<HTMLDivElement>(null);

  const canSubmit = useMemo(() => {
    if (result.status === "loading") {
      return false;
    }

    if (method === "time") {
      return Boolean(timestamp);
    }

    return Boolean(firstNumber && secondNumber);
  }, [firstNumber, method, result.status, secondNumber, timestamp]);

  const previewSummary =
    method === "time"
      ? `当前将使用 ${timestamp ? timestamp.replace("T", " ") : "当前时间"} 作为起卦种子。`
      : `当前将使用数字 ${firstNumber || "—"} 与 ${secondNumber || "—"} 作为上卦、下卦输入，并由两数之和推定动爻。`;

  async function handleSubmit() {
    setResult({ status: "loading" });

    const payload: MeihuaInput = {
      method,
      prompt: prompt.trim() || "未指定问题",
      timestamp: method === "time" ? timestamp.replace("T", " ") : undefined,
      firstNumber: method === "numbers" ? Number(firstNumber) : undefined,
      secondNumber: method === "numbers" ? Number(secondNumber) : undefined,
    };

    try {
      const response = await fetch("/api/divination/meihua", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as DivinationApiResponse<MeihuaReading>;

      if (!data.ok) {
        setResult({ status: "error", message: data.error.message });
        return;
      }

      setResult({ status: "ready", reading: data.data });

      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setResult({ status: "error", message: "网络请求失败，请稍后重试。" });
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-6 lg:grid-cols-[minmax(24rem,27rem)_minmax(24rem,1fr)] xl:grid-cols-[minmax(25rem,28rem)_minmax(28rem,1fr)]">
        <section>
          <MeihuaInputPanel
            method={method}
            onMethodChange={setMethod}
            prompt={prompt}
            onPromptChange={setPrompt}
            timestamp={timestamp}
            onTimestampChange={setTimestamp}
            firstNumber={firstNumber}
            secondNumber={secondNumber}
            onFirstNumberChange={setFirstNumber}
            onSecondNumberChange={setSecondNumber}
            onSubmit={handleSubmit}
            canSubmit={canSubmit}
            isSubmitting={result.status === "loading"}
          />
        </section>

        <section className="space-y-6">
          <GlassPanel className="paper-noise p-5 sm:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="ink-eyebrow">起卦预览</p>
                <h2 className="ink-display text-[1.65rem] text-white">
                  一盘观三卦，先明体与用。
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
                  当前已经形成本卦、互卦、变卦与体用的基础盘式。输入区收敛在左，右侧先给出起卦意图与方法预判。
                </p>
                <div className="ink-divider" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailCard title="当前方法" eyebrow="Method" className="p-0">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-white">
                      {method === "time" ? "时间起卦" : "数字起卦"}
                    </p>
                    <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                      {previewSummary}
                    </p>
                  </div>
                </DetailCard>
                <DetailCard title="当前问题" eyebrow="Prompt" className="p-0">
                  <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                    {prompt || "尚未输入占问问题，可直接以当前主题进行起卦。"}
                  </p>
                </DetailCard>
              </div>
            </div>
          </GlassPanel>
        </section>
      </div>

      {result.status === "loading" && (
        <section ref={resultRef}>
          <GlassPanel className="paper-noise p-5 sm:p-6">
            <div className="space-y-3">
              <p className="ink-eyebrow">正在起卦</p>
              <h2 className="ink-display text-[1.55rem] text-white">盘式正在生成。</h2>
              <div className="space-y-3">
                <div className="h-28 animate-pulse rounded-[1.25rem] border border-[rgba(211,176,107,0.12)] bg-[rgba(255,245,225,0.04)]" />
                <div className="h-40 animate-pulse rounded-[1.25rem] border border-[rgba(211,176,107,0.12)] bg-[rgba(255,245,225,0.04)]" />
              </div>
            </div>
          </GlassPanel>
        </section>
      )}

      {result.status === "error" && (
        <section ref={resultRef}>
          <GlassPanel className="paper-noise p-5 sm:p-6">
            <div className="space-y-3">
              <p className="ink-eyebrow">起卦异常</p>
              <h2 className="ink-display text-[1.55rem] text-white">此次推演未能完成。</h2>
              <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                {result.message}
              </p>
            </div>
          </GlassPanel>
        </section>
      )}

      {result.status === "ready" && (
        <section ref={resultRef}>
          <MeihuaResultPreview reading={result.reading} />
        </section>
      )}
    </div>
  );
}
