import type { DivinationBaseResult } from "@/schemas/divination";

export type MeihuaTrigramName = "乾" | "兑" | "离" | "震" | "巽" | "坎" | "艮" | "坤";
export type MeihuaElement = "金" | "木" | "水" | "火" | "土";
export type MeihuaRelation = "体用比和" | "体生用" | "用生体" | "体克用" | "用克体";
export type MeihuaJudgmentLevel = "上吉" | "吉" | "可成" | "先难后易" | "谨慎";

export type MeihuaInput = {
  method: "time" | "numbers";
  prompt: string;
  timestamp?: string;
  firstNumber?: number;
  secondNumber?: number;
};

export type MeihuaTrigram = {
  name: MeihuaTrigramName;
  number: number;
  binary: string;
  element: MeihuaElement;
  attribute: string;
};

export type MeihuaHexagram = {
  code: string;
  name: string;
  upper: MeihuaTrigram;
  lower: MeihuaTrigram;
};

export type MeihuaChart = {
  original: MeihuaHexagram;
  mutual: MeihuaHexagram;
  changed: MeihuaHexagram;
  movingLine: number;
  bodyTrigram: MeihuaTrigram;
  useTrigram: MeihuaTrigram;
  relation: {
    type: MeihuaRelation;
    summary: string;
  };
  source: {
    methodLabel: string;
    seedSummary: string;
    upperNumber: number;
    lowerNumber: number;
    hourNumber?: number;
    lunarMonth?: number;
    lunarDay?: number;
    lunarLabel?: string;
    yearGanzhi?: string;
    yearBranchNumber?: number;
    hourBranchName?: string;
  };
};

export type MeihuaReading = DivinationBaseResult<MeihuaInput, MeihuaChart> & {
  module: "meihua";
  judgment: {
    level: MeihuaJudgmentLevel;
    headline: string;
    verdict: string;
    timing: string;
    advice: string;
    caution: string;
  };
};
