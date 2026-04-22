import type { DivinationInterpretation } from "@/schemas/divination";
import type { LiuyaoChart, LiuyaoInput, LiuyaoReading } from "@/schemas/liuyao";

type LiuyaoInterpretationContext = {
  input: LiuyaoInput;
  chart: LiuyaoChart;
  dayStem: string;
};

function buildOverview({ chart }: LiuyaoInterpretationContext) {
  const movement =
    chart.movingLines.length > 0
      ? `动爻在第${chart.movingLines.join("、")}爻，说明局势并非静止，事情会沿着卦中提示逐步展开。`
      : "本次起卦无动爻，主局势重心较稳，变化幅度有限，更适合观察既有条件是否成熟。";

  return `本卦为${chart.original.name}，归于${chart.original.palace}，世爻居第${chart.original.selfLine}位，应爻居第${chart.original.responseLine}位。${movement}`;
}

function buildOriginalSection({ chart }: LiuyaoInterpretationContext) {
  return {
    key: "original",
    title: "本卦结构",
    body: `${chart.original.name}主当前局面，属${chart.original.palace}。世爻落第${chart.original.selfLine}位，代表自身立场；应爻落第${chart.original.responseLine}位，代表外部对象或对面条件。先看本卦，是判断事情根本态势的第一步。`,
  };
}

function buildChangedSection({ chart }: LiuyaoInterpretationContext) {
  if (chart.movingLines.length === 0) {
    return {
      key: "changed",
      title: "变卦趋势",
      body: "无动爻，因此本卦即变卦。此类卦更强调当下结构本身，而不是短期内的快速转向，宜从稳定性、执行力与节奏控制中寻找答案。",
    };
  }

  return {
    key: "changed",
    title: "变卦趋势",
    body: `变卦为${chart.changed.name}，由第${chart.movingLines.join("、")}爻发动而成。它提示事情不会停留在当前格局，而会随着关键节点被触发而转入新的阶段，判断时要兼顾“现在”与“将成之势”。`,
  };
}

function buildMovingSection({ chart }: LiuyaoInterpretationContext) {
  if (chart.movingLines.length === 0) {
    return {
      key: "moving",
      title: "动爻分析",
      body: "无动爻时，应重点观察世应关系、宫位归属与六亲分布，不必过度放大偶发变量。此时更适合稳步推进、谨慎判断，而不是频繁试探与反复调整。",
    };
  }

  const lines = chart.movingLines.map((position) => {
    const line = chart.lines[position - 1];
    return `第${position}爻为${line.polarity === "yang" ? "阳" : "阴"}爻动，临${line.sixGod}，属${line.role}，纳${line.branch}`;
  });

  return {
    key: "moving",
    title: "动爻分析",
    body: `${lines.join("；")}。动爻所在的位置，往往就是事情真正起变化、起阻滞或起突破的环节。若多爻发动，则说明变量叠加，判断时要分清主次。`,
  };
}

function buildAdviceSection({ input, chart }: LiuyaoInterpretationContext) {
  const questionLead = input.question ? `针对「${input.question}」` : "针对当前所问之事";
  const cadence =
    chart.movingLines.length > 0
      ? "更适合先识别变化点，再决定何时顺势、何时暂缓。"
      : "更适合按既定节奏推进，重在守正、验证与执行。";

  return {
    key: "advice",
    title: "综合建议",
    body: `${questionLead}，${chart.original.name}提示判断时不要只盯结果，应先辨清自己所处的位置、对方条件以及环境是否配合。${cadence}`,
  };
}

function buildMetaSection({ input, dayStem }: LiuyaoInterpretationContext) {
  const extras = [
    `起卦时间：${input.timestamp}`,
    input.locale ? `记录信息：${input.locale}` : "",
    input.ip ? `当前 IP：${input.ip}` : "",
    `六神按${dayStem}日推定`,
  ].filter(Boolean);

  return {
    key: "meta",
    title: "起卦信息",
    body: `${extras.join("。")}。`,
  };
}

export function buildLiuyaoInterpretation(
  context: LiuyaoInterpretationContext,
): DivinationInterpretation {
  return {
    overview: buildOverview(context),
    sections: [
      buildOriginalSection(context),
      buildChangedSection(context),
      buildMovingSection(context),
      buildAdviceSection(context),
      buildMetaSection(context),
    ],
  };
}

export function buildLiuyaoSummary({ chart }: Pick<LiuyaoInterpretationContext, "chart">) {
  return chart.movingLines.length > 0
    ? `本卦${chart.original.name}，变卦${chart.changed.name}，动爻在第${chart.movingLines.join("、")}爻。`
    : `本卦${chart.original.name}，无动爻，本卦即变卦${chart.changed.name}。`;
}

export function buildLiuyaoTitle({ chart }: Pick<LiuyaoInterpretationContext, "chart">) {
  return `${chart.original.name} → ${chart.changed.name}`;
}

export const liuyaoDisclaimer =
  "仅供文化研究、学习与参考使用，不构成任何现实决策建议。";

export function buildLiuyaoReading(
  input: LiuyaoInput,
  chart: LiuyaoChart,
  dayStem: string,
): LiuyaoReading {
  return {
    module: "liuyao",
    title: buildLiuyaoTitle({ chart }),
    summary: buildLiuyaoSummary({ chart }),
    input,
    chart,
    interpretation: buildLiuyaoInterpretation({ input, chart, dayStem }),
    disclaimer: liuyaoDisclaimer,
  };
}
