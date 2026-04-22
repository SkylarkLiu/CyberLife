import { NextResponse } from "next/server";

import { buildMeihuaReading } from "@/content/interpretations/meihua";
import { buildMeihuaChart } from "@/engines/meihua";
import type { DivinationApiResponse } from "@/schemas/divination";
import type { MeihuaInput, MeihuaReading } from "@/schemas/meihua";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MeihuaInput;
    const chart = buildMeihuaChart(body);
    const reading = buildMeihuaReading(body, chart);

    const response: DivinationApiResponse<MeihuaReading> = {
      ok: true,
      data: reading,
    };

    return NextResponse.json(response);
  } catch {
    const response: DivinationApiResponse<MeihuaReading> = {
      ok: false,
      error: {
        code: "MEIHUA_ENGINE_ERROR",
        message: "梅花易数起卦失败，请检查输入后重试。",
      },
    };

    return NextResponse.json(response, { status: 400 });
  }
}

export async function GET() {
  const response: DivinationApiResponse<MeihuaReading> = {
    ok: false,
    error: {
      code: "METHOD_NOT_ALLOWED",
      message: "请使用 POST 方法提交梅花易数起卦数据。",
    },
  };

  return NextResponse.json(response, { status: 405 });
}
