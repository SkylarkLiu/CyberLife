import type { DivinationBaseResult } from "@/schemas/divination";

export type LiuyaoMethod = "铜钱" | "数字" | "时间";
export type LiuyaoInputMode = "manual" | "generated";
export type LiuyaoLinePolarity = "yin" | "yang";
export type LiuyaoRelation = "兄弟" | "子孙" | "妻财" | "官鬼" | "父母";
export type LiuyaoSixGod = "青龙" | "朱雀" | "勾陈" | "腾蛇" | "白虎" | "玄武";
export type LiuyaoLinePosition = 1 | 2 | 3 | 4 | 5 | 6;
export type LiuyaoDayStem = "甲" | "乙" | "丙" | "丁" | "戊" | "己" | "庚" | "辛" | "壬" | "癸";
export type LiuyaoLineLabel = "少阳" | "少阴" | "老阳" | "老阴";

export type LiuyaoLineState = {
  position: LiuyaoLinePosition;
  polarity: LiuyaoLinePolarity;
  moving: boolean;
};

export type LiuyaoLineInput = {
  position: LiuyaoLinePosition;
  polarity: LiuyaoLinePolarity;
  moving: boolean;
  label: LiuyaoLineLabel;
};

export type LiuyaoInput = {
  mode: LiuyaoInputMode;
  method: LiuyaoMethod;
  question: string;
  locale: string;
  timestamp: string;
  ip?: string;
  lines: LiuyaoLineInput[];
};

export type LiuyaoLine = {
  position: LiuyaoLinePosition;
  polarity: LiuyaoLinePolarity;
  moving: boolean;
  role: LiuyaoRelation;
  branch: string;
  sixGod: LiuyaoSixGod;
};

export type LiuyaoHexagram = {
  code: string;
  name: string;
  palace: string;
  selfLine: LiuyaoLinePosition;
  responseLine: LiuyaoLinePosition;
};

export type LiuyaoChart = {
  original: LiuyaoHexagram;
  changed: LiuyaoHexagram;
  movingLines: LiuyaoLinePosition[];
  lines: LiuyaoLine[];
};

export type LiuyaoEngineInput = {
  lines: LiuyaoLineState[];
  selfLine?: LiuyaoLinePosition;
  responseLine?: LiuyaoLinePosition;
  dayStem?: LiuyaoDayStem;
};

export type LiuyaoReading = DivinationBaseResult<LiuyaoInput, LiuyaoChart> & {
  module: "liuyao";
};
