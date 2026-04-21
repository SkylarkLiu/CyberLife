import type { LiuyaoReading } from "@/schemas/liuyao";

import { buildLiuyaoChart } from "@/engines/liuyao";

const mockInput: LiuyaoReading["input"] = {
  mode: "generated",
  method: "铜钱",
  question: "事业推进",
  locale: "上海",
  timestamp: "2026-04-21 11:30",
  lines: [
    { position: 1, polarity: "yang", moving: false, label: "少阳" },
    { position: 2, polarity: "yang", moving: true, label: "老阳" },
    { position: 3, polarity: "yang", moving: false, label: "少阳" },
    { position: 4, polarity: "yin", moving: false, label: "少阴" },
    { position: 5, polarity: "yin", moving: true, label: "老阴" },
    { position: 6, polarity: "yin", moving: false, label: "少阴" },
  ],
};

export function createMockLiuyaoReading(): LiuyaoReading {
  const chart = buildLiuyaoChart({
    dayStem: "甲",
    lines: [
      { position: 6, polarity: "yin", moving: false },
      { position: 5, polarity: "yin", moving: true },
      { position: 4, polarity: "yin", moving: false },
      { position: 3, polarity: "yang", moving: false },
      { position: 2, polarity: "yang", moving: true },
      { position: 1, polarity: "yang", moving: false },
    ],
  });

  return {
    module: "liuyao",
    title: "六爻示例解读",
    summary:
      "当前卦象显示事务仍在推进，但节奏更适合稳住边界、减少额外消耗，再等待一轮更清晰的外部反馈。",
    input: mockInput,
    chart,
    interpretation: {
      overview:
        "卦象更像是“有机会，但需要重新校准推进方式”的状态，优先梳理条件，而不是立刻扩张动作。",
      sections: [
        {
          key: "timing",
          title: "节奏判断",
          body:
            "这组示例结果更适合先稳住已有节奏。当前不是完全停滞，而是提醒先把资源、协作边界和预期重新收束，避免在模糊阶段追加投入。",
        },
        {
          key: "focus",
          title: "行动重点",
          body:
            "如果问题落在工作推进，优先处理信息确认、范围压缩和关键沟通。把最想达成的一件事单独拎出来，会比并行推进多个方向更有效。",
        },
        {
          key: "note",
          title: "解释层说明",
          body:
            "这里的文字仍是六爻 MVP 阶段的解读结构示例，但 chart 部分已经由 `engines/liuyao/` 计算输出，用来验证引擎层与页面层的连接。",
        },
      ],
    },
    disclaimer: "仅供文化研究、产品演示与交互设计验证使用。",
  };
}
