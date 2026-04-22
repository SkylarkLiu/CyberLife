import { NextResponse } from "next/server";

import { buildLiuyaoReading } from "@/content/interpretations/liuyao";
import { buildLiuyaoChart, resolveDayStem } from "@/engines/liuyao";
import type { DivinationApiResponse } from "@/schemas/divination";
import type { LiuyaoInput, LiuyaoLineState, LiuyaoReading } from "@/schemas/liuyao";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LiuyaoInput;

    const engineLines: LiuyaoLineState[] = body.lines.map((line) => ({
      position: line.position,
      polarity: line.polarity,
      moving: line.moving,
    }));

    const dayStem = resolveDayStem(body.timestamp);
    const chart = buildLiuyaoChart({ lines: engineLines, dayStem });
    const reading = buildLiuyaoReading(body, chart, dayStem);

    const response: DivinationApiResponse<LiuyaoReading> = {
      ok: true,
      data: reading,
    };

    return NextResponse.json(response);
  } catch {
    const response: DivinationApiResponse<LiuyaoReading> = {
      ok: false,
      error: {
        code: "LIUYAO_ENGINE_ERROR",
        message: "起卦计算失败，请检查输入后重试。",
      },
    };

    return NextResponse.json(response, { status: 400 });
  }
}

export async function GET() {
  const response: DivinationApiResponse<LiuyaoReading> = {
    ok: false,
    error: {
      code: "METHOD_NOT_ALLOWED",
      message: "请使用 POST 方法提交起卦数据。",
    },
  };

  return NextResponse.json(response, { status: 405 });
}
