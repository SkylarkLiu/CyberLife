import { NextResponse } from "next/server";

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

    const reading: LiuyaoReading = {
      module: "liuyao",
      title: `${chart.original.name} → ${chart.changed.name}`,
      summary:
        chart.movingLines.length > 0
          ? `本卦${chart.original.name}，变卦${chart.changed.name}，动爻在第${chart.movingLines.join("、")}爻。`
          : `本卦${chart.original.name}，无动爻，本卦即变卦${chart.changed.name}。`,
      input: body,
      chart,
      interpretation: {
        overview: `卦象为${chart.original.name}，归于${chart.original.palace}。世爻在第${chart.original.selfLine}位，应爻在第${chart.original.responseLine}位。${chart.movingLines.length > 0 ? `动爻在第${chart.movingLines.join("、")}爻，主变化。` : "无动爻，主安定。"}`,
        sections: [
          {
            key: "original",
            title: "本卦",
            body: `${chart.original.name}，属${chart.original.palace}，世爻第${chart.original.selfLine}位，应爻第${chart.original.responseLine}位。`,
          },
          {
            key: "changed",
            title: "变卦",
            body: chart.movingLines.length > 0
              ? `${chart.changed.name}，由第${chart.movingLines.join("、")}爻发动变化而来。`
              : "无动爻，本卦即为变卦。",
          },
          {
            key: "moving",
            title: "动爻分析",
            body: chart.movingLines.length > 0
              ? chart.movingLines.map((pos) => {
                  const line = chart.lines[pos - 1];
                  return `第${pos}爻：${line.polarity === "yang" ? "阳" : "阴"}爻动，${line.role}，${line.branch}，${line.sixGod}。`;
                }).join("")
              : "本次起卦无动爻，主卦象安定，变化不大。",
          },
          {
            key: "advice",
            title: "综合建议",
            body: body.question
              ? `针对「${body.question}」一事，${chart.original.name}卦提示宜审时度势，${chart.movingLines.length > 0 ? "动爻存在，事情有变数，需灵活应对。" : "无动爻，局势平稳，按部就班即可。"}`
              : `${chart.original.name}卦象整体${chart.movingLines.length > 0 ? "有变动趋势，宜顺势而为" : "较为平稳，宜守成为主"}。`,
          },
          {
            key: "meta",
            title: "起卦信息",
            body: `起卦时间：${body.timestamp}。${body.locale ? `记录信息：${body.locale}。` : ""}${body.ip ? `当前 IP：${body.ip}。` : ""}六神按${dayStem}日推定。`,
          },
        ],
      },
      disclaimer: "仅供文化研究与参考使用，不构成任何决策建议。",
    };

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
