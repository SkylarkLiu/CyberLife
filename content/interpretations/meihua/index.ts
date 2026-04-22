import type { DivinationInterpretation } from "@/schemas/divination";
import { resolveJudgmentLevel } from "@/engines/meihua/constants";
import type { MeihuaChart, MeihuaInput, MeihuaReading } from "@/schemas/meihua";

type MeihuaInterpretationContext = {
  input: MeihuaInput;
  chart: MeihuaChart;
};

function buildOverview({ chart }: MeihuaInterpretationContext) {
  return `${chart.source.methodLabel}得本卦${chart.original.name}，互卦${chart.mutual.name}，变卦${chart.changed.name}，动爻在第${chart.movingLine}爻。体卦为${chart.bodyTrigram.name}，用卦为${chart.useTrigram.name}，呈${chart.relation.type}之势。判断时宜先看本卦主局，再看互卦中程，再看变卦归趋。`;
}

function buildJudgment({ chart }: MeihuaInterpretationContext) {
  const level = resolveJudgmentLevel(chart.relation.type);
  const relationToneMap = {
    上吉: {
      headline: "体得用生，可借外势成事。",
      verdict: `体卦${chart.bodyTrigram.name}得用卦${chart.useTrigram.name}相生，局面多见助力，若所问之事已有方向，此时顺势推进往往更容易见效。`,
      timing: `互卦${chart.mutual.name}主中段转化，变卦${chart.changed.name}示后势可续，宜在中前段主动承接资源，不宜久拖。`,
      advice: "可先定主线，再借人事、时机或外部条件扩展成果。",
      caution: "忌因局面顺利而失之过急，仍需守住节度与边界。",
    },
    吉: {
      headline: "体用比和，宜稳步成局。",
      verdict: `体卦${chart.bodyTrigram.name}与用卦${chart.useTrigram.name}同气相应，事情多属内外协调型，不一定骤然见喜，但胜在局势平稳，便于循序推进。`,
      timing: `本卦${chart.original.name}主现势，互卦${chart.mutual.name}示过程较连贯，变卦${chart.changed.name}提示后续有序转化，宜重节奏而非求突进。`,
      advice: "重在持续推进、维持一致性，适合谈协调、整合、磨合与渐进落实。",
      caution: "忌反复摇摆或临阵改策，否则容易把平顺之局拖成散局。",
    },
    可成: {
      headline: "体克用，主导在我，事可经营。",
      verdict: `体卦${chart.bodyTrigram.name}克用卦${chart.useTrigram.name}，说明主动权更多在我方。所问之事不是没有阻力，但只要次序分明、取舍果断，通常仍可逐步压住外势。`,
      timing: `互卦${chart.mutual.name}提示中途仍有调度成本，变卦${chart.changed.name}代表后段可望转入可控之局，适合先难点突破，再全面展开。`,
      advice: "先抓关键变量与主导节点，把最难的一环先压住，再谈扩展。",
      caution: "忌强行硬推到底，若用力过猛，反而会激起新的牵制。",
    },
    先难后易: {
      headline: "体生用，先有耗力，后见成果。",
      verdict: `体卦${chart.bodyTrigram.name}生用卦${chart.useTrigram.name}，事情多需我方先行投入。短期看会感觉费神费力，但并非全无所得，只是收益往往滞后于付出。`,
      timing: `本卦${chart.original.name}示现阶段偏重付出，互卦${chart.mutual.name}提示中程尚需反复，待转入变卦${chart.changed.name}之后，成果才更容易显形。`,
      advice: "适合先布线、先铺垫、先整基础，把前期投入视作蓄势而非立刻回收。",
      caution: "忌急于求成，若一开始就要求快速兑现，往往会因失衡而中断。",
    },
    谨慎: {
      headline: "用克体，外势偏重，宜守机待变。",
      verdict: `用卦${chart.useTrigram.name}克体卦${chart.bodyTrigram.name}，所问之事当前多见外部压力、条件制约或人事反制。此时若急推，往往先碰阻力。`,
      timing: `互卦${chart.mutual.name}说明中程仍有牵扯，变卦${chart.changed.name}提示后局并非全无转机，但应先解阻后图进，不宜一开始就硬求结果。`,
      advice: "宜先收集信息、调整节奏、减轻正面冲突，待条件转缓后再动。",
      caution: "忌在压力未解时做重承诺、重投入或重决断，以防被外势牵制。",
    },
  } as const;

  return {
    level,
    ...relationToneMap[level],
  };
}

function buildStructureSection({ chart }: MeihuaInterpretationContext) {
  return {
    key: "structure",
    title: "卦象结构",
    body: `本卦为${chart.original.name}，上卦${chart.original.upper.name}、下卦${chart.original.lower.name}。本卦主当前局面，互卦${chart.mutual.name}主中段过程，变卦${chart.changed.name}主后续归趋，三者应合参而不是只看一卦。`,
  };
}

function buildMutualSection({ chart }: MeihuaInterpretationContext) {
  return {
    key: "mutual",
    title: "互卦观察",
    body: `互卦为${chart.mutual.name}。互卦不直接代表表面现象，而更像事情内部正在酝酿的中段结构，用来辅助判断局面为何如此发展。`,
  };
}

function buildChangedSection({ chart }: MeihuaInterpretationContext) {
  return {
    key: "changed",
    title: "变卦趋势",
    body: `第${chart.movingLine}爻发动后，变卦转为${chart.changed.name}。这通常提示事情从现状继续推进时，最可能出现的方向变化与结果倾向。`,
  };
}

function buildElementSection({ chart }: MeihuaInterpretationContext) {
  return {
    key: "body-use",
    title: "体用关系",
    body: `体卦${chart.bodyTrigram.name}属${chart.bodyTrigram.element}，用卦${chart.useTrigram.name}属${chart.useTrigram.element}，当前为${chart.relation.type}。${chart.relation.summary}`,
  };
}

function buildJudgmentSection(context: MeihuaInterpretationContext) {
  const judgment = buildJudgment(context);

  return {
    key: "judgment",
    title: `断语层级 · ${judgment.level}`,
    body: `${judgment.verdict} ${judgment.timing} 宜：${judgment.advice} 忌：${judgment.caution}`,
  };
}

function buildTimingSection({ chart }: MeihuaInterpretationContext) {
  return {
    key: "timing",
    title: "时势节奏",
    body: `本卦${chart.original.name}看眼前，互卦${chart.mutual.name}看中段，变卦${chart.changed.name}看归趋。若所问之事需要判断快慢，宜先看当前是否已成势，再看互卦提示的中途牵连，最后以变卦衡量后势是否收束。`,
  };
}

function buildInputSection({ input, chart }: MeihuaInterpretationContext) {
  const pieces = [
    `起卦方式：${chart.source.methodLabel}`,
    chart.source.seedSummary,
    chart.source.lunarLabel ? `农历基准：${chart.source.lunarLabel}` : "",
    `上卦数 ${chart.source.upperNumber} / 下卦数 ${chart.source.lowerNumber}`,
    chart.source.hourNumber ? `时数 ${chart.source.hourNumber}` : "",
    input.prompt ? `占问主题：${input.prompt}` : "",
  ].filter(Boolean);

  return {
    key: "input",
    title: "起卦信息",
    body: `${pieces.join("。")}。`,
  };
}

export function buildMeihuaInterpretation(
  context: MeihuaInterpretationContext,
): DivinationInterpretation {
  return {
    overview: buildOverview(context),
    sections: [
      buildJudgmentSection(context),
      buildStructureSection(context),
      buildMutualSection(context),
      buildChangedSection(context),
      buildElementSection(context),
      buildTimingSection(context),
      buildInputSection(context),
    ],
  };
}

export function buildMeihuaReading(input: MeihuaInput, chart: MeihuaChart): MeihuaReading {
  const judgment = buildJudgment({ input, chart });

  return {
    module: "meihua",
    title: chart.original.name,
    summary: `${judgment.level} · 本卦${chart.original.name}，互卦${chart.mutual.name}，变卦${chart.changed.name}，动爻第${chart.movingLine}爻。`,
    input,
    chart,
    judgment,
    interpretation: buildMeihuaInterpretation({ input, chart }),
    disclaimer: "仅供文化研究、学习与参考使用，不构成任何现实决策建议。",
  };
}
