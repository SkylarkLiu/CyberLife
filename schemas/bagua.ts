import type { DivinationBaseResult } from "@/schemas/divination";

export type BaguaInput = {
  prompt: string;
};

export type BaguaChart = {
  trigram: string;
};

export type BaguaReading = DivinationBaseResult<BaguaInput, BaguaChart> & {
  module: "bagua";
};
