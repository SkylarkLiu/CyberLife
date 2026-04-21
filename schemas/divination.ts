export type DivinationModule =
  | "liuyao"
  | "meihua"
  | "bagua"
  | "daliuren"
  | "ziwei";

export type DivinationInterpretationSection = {
  key: string;
  title: string;
  body: string;
};

export type DivinationInterpretation = {
  overview: string;
  sections: DivinationInterpretationSection[];
};

export type DivinationBaseResult<TInput, TChart> = {
  module: DivinationModule;
  title: string;
  summary: string;
  input: TInput;
  chart: TChart;
  interpretation: DivinationInterpretation;
  disclaimer: string;
};

export type DivinationApiSuccess<TData> = {
  ok: true;
  data: TData;
};

export type DivinationApiError = {
  ok: false;
  error: {
    code: string;
    message: string;
  };
};

export type DivinationApiResponse<TData> = DivinationApiSuccess<TData> | DivinationApiError;
