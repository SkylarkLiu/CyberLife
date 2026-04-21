"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import type { DivinationApiResponse } from "@/schemas/divination";
import type {
  LiuyaoInputMode,
  LiuyaoLineInput,
  LiuyaoLinePosition,
  LiuyaoReading,
} from "@/schemas/liuyao";

import { formatLocation } from "@/components/liuyao/location-selector";
import { GlassPanel } from "@/components/ui/glass-panel";
import { HexagramLines } from "@/components/liuyao/hexagram-lines";
import { LiuyaoInputPanel } from "@/components/liuyao/liuyao-input-preview";
import { LiuyaoResultPreview } from "@/components/liuyao/liuyao-result-preview";

const allPositions: LiuyaoLinePosition[] = [1, 2, 3, 4, 5, 6];

type ResultState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; reading: LiuyaoReading };

type ClientContextState = {
  status: "idle" | "loading" | "ready" | "error";
  ip: string;
};

function toDateTimeLocalValue(date: Date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

function toReadableTimestamp(value: string) {
  return value ? value.replace("T", " ") : "";
}

export function LiuyaoPageContent() {
  const [mode, setMode] = useState<LiuyaoInputMode>("manual");
  const [lines, setLines] = useState<LiuyaoLineInput[]>([]);
  const [question, setQuestion] = useState("");
  const [manualTimestamp, setManualTimestamp] = useState(() =>
    toDateTimeLocalValue(new Date()),
  );
  const [manualLocation, setManualLocation] = useState<string[]>([]);
  const [generatedTimestamp, setGeneratedTimestamp] = useState("");
  const [clientContext, setClientContext] = useState<ClientContextState>({
    status: "idle",
    ip: "",
  });
  const [result, setResult] = useState<ResultState>({ status: "idle" });

  /** 当前应操作的爻位，null 表示六爻已完成 */
  const currentStep: LiuyaoLinePosition | null =
    lines.length < 6
      ? (allPositions[lines.length] as LiuyaoLinePosition)
      : null;

  const resultRef = useRef<HTMLDivElement>(null);

  /** 设置某一爻并自动推进 */
  const handleLineSet = useCallback(
    (position: LiuyaoLinePosition, line: LiuyaoLineInput) => {
      setLines((prev) => {
        const withoutCurrent = prev.filter((l) => l.position !== position);
        return [...withoutCurrent, line].sort((a, b) => a.position - b.position);
      });
    },
    [],
  );

  const initializeGeneratedContext = useCallback(async () => {
    setGeneratedTimestamp(toReadableTimestamp(toDateTimeLocalValue(new Date())));
    setClientContext({ status: "loading", ip: "" });

    try {
      const response = await fetch("/api/client-context", { cache: "no-store" });
      const payload = (await response.json()) as { ip: string | null };

      setClientContext({
        status: payload.ip ? "ready" : "error",
        ip: payload.ip ?? "",
      });
    } catch {
      setClientContext({
        status: "error",
        ip: "",
      });
    }
  }, []);

  /** 切换模式时重置爻数据 */
  const handleModeChange = useCallback(
    (newMode: LiuyaoInputMode) => {
      setMode(newMode);
      setLines([]);
      setResult({ status: "idle" });

      if (newMode === "generated") {
        void initializeGeneratedContext();
      }
    },
    [initializeGeneratedContext],
  );

  /** 提交起卦 */
  const handleSubmit = useCallback(async () => {
    if (lines.length !== 6) {
      return;
    }

    setResult({ status: "loading" });

    const timestamp =
      mode === "manual"
        ? toReadableTimestamp(manualTimestamp)
        : generatedTimestamp || toReadableTimestamp(toDateTimeLocalValue(new Date()));
    const locale =
      mode === "manual"
        ? formatLocation(manualLocation)
        : clientContext.ip || "当前地址不可用";
    const ip =
      mode === "generated" && clientContext.status === "ready"
        ? clientContext.ip
        : undefined;

    const payload = {
      mode,
      method: "铜钱" as const,
      question: question.trim() || "未指定问题",
      locale,
      timestamp,
      ip,
      lines,
    };

    try {
      const response = await fetch("/api/divination/liuyao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data =
        (await response.json()) as DivinationApiResponse<LiuyaoReading>;

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
  }, [clientContext.ip, clientContext.status, generatedTimestamp, lines, manualLocation, manualTimestamp, mode, question]);

  const canSubmit = useMemo(() => {
    if (lines.length !== 6 || result.status === "loading") {
      return false;
    }

    if (mode === "manual") {
      return Boolean(manualTimestamp && formatLocation(manualLocation));
    }

    return Boolean(generatedTimestamp);
  }, [generatedTimestamp, lines.length, manualLocation, manualTimestamp, mode, result.status]);
  const isSubmitting = result.status === "loading";

  return (
    <div className="space-y-5">
      <div className="grid gap-6 lg:grid-cols-[minmax(23rem,26rem)_minmax(24rem,1fr)] xl:grid-cols-[minmax(24rem,27rem)_minmax(26rem,1fr)]">
        <section>
          <LiuyaoInputPanel
            mode={mode}
            onModeChange={handleModeChange}
            currentStep={currentStep}
            lines={lines}
            onLineSet={handleLineSet}
            question={question}
            onQuestionChange={setQuestion}
            manualTimestamp={manualTimestamp}
            onManualTimestampChange={setManualTimestamp}
            manualLocation={manualLocation}
            onManualLocationChange={setManualLocation}
            generatedTimestamp={generatedTimestamp}
            generatedIp={clientContext.ip}
            generatedIpStatus={clientContext.status}
            canSubmit={canSubmit}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </section>

        <section>
          <GlassPanel className="p-5 sm:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-[0.06em] text-white">
                  六爻结构预览
                </h2>
                <p className="text-[11px] tracking-[0.16em] text-white/42">
                  第一爻在底部，第六爻在顶部
                </p>
              </div>
              <HexagramLines lines={lines} activePosition={currentStep} />
            </div>
          </GlassPanel>
        </section>
      </div>

      {/* ===== 下半屏：结果预览（仅在起卦后显示） ===== */}
      {result.status === "loading" && (
        <section ref={resultRef} className="space-y-4">
          <GlassPanel className="p-5 sm:p-6">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-[0.06em] text-white">
                结果预览
              </h2>
              <div className="space-y-3">
                <div className="h-28 animate-pulse rounded-[1.25rem] border border-white/8 bg-white/4" />
                <div className="h-40 animate-pulse rounded-[1.25rem] border border-white/8 bg-white/4" />
                <div className="h-32 animate-pulse rounded-[1.25rem] border border-white/8 bg-white/4" />
              </div>
            </div>
          </GlassPanel>
        </section>
      )}

      {result.status === "error" && (
        <section ref={resultRef} className="space-y-4">
          <GlassPanel className="p-5 sm:p-6">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-[0.06em] text-white">
                起卦失败
              </h2>
              <p className="text-sm leading-7 text-[var(--color-text-soft)]">
                {result.message}
              </p>
            </div>
          </GlassPanel>
        </section>
      )}

      {result.status === "ready" && (
        <section ref={resultRef}>
          <LiuyaoResultPreview reading={result.reading} />
        </section>
      )}
    </div>
  );
}
