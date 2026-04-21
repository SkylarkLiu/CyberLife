import type { DivinationBaseResult } from "@/schemas/divination";

export type MeihuaInput = {
  method: "time" | "numbers";
  prompt: string;
};

export type MeihuaChart = {
  upperTrigram: string;
  lowerTrigram: string;
  movingLine?: number;
};

export type MeihuaReading = DivinationBaseResult<MeihuaInput, MeihuaChart> & {
  module: "meihua";
};
