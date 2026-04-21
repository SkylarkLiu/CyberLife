import type { DivinationBaseResult } from "@/schemas/divination";

export type ZiweiInput = {
  birthDate: string;
  birthTime: string;
  prompt?: string;
};

export type ZiweiChart = {
  palaces: string[];
};

export type ZiweiReading = DivinationBaseResult<ZiweiInput, ZiweiChart> & {
  module: "ziwei";
};
