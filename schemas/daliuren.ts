import type { DivinationBaseResult } from "@/schemas/divination";

export type DaliurenInput = {
  prompt: string;
  timestamp: string;
};

export type DaliurenChart = {
  heavenPlate: string[];
  earthPlate: string[];
};

export type DaliurenReading = DivinationBaseResult<DaliurenInput, DaliurenChart> & {
  module: "daliuren";
};
