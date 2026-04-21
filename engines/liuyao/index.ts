import type {
  LiuyaoChart,
  LiuyaoDayStem,
  LiuyaoEngineInput,
  LiuyaoHexagram,
  LiuyaoLine,
  LiuyaoLinePosition,
  LiuyaoLinePolarity,
  LiuyaoLineState,
  LiuyaoRelation,
  LiuyaoSixGod,
} from "@/schemas/liuyao";

import {
  branchElementMap,
  hexagramLookup,
  palaceByHexagramCode,
  trigramDefinitions,
} from "@/engines/liuyao/constants";

function sortLines<T extends { position: LiuyaoLinePosition }>(lines: T[]) {
  return [...lines].sort((left, right) => left.position - right.position);
}

function assertLineSet<T extends { position: LiuyaoLinePosition }>(lines: T[]) {
  const sorted = sortLines(lines);

  if (sorted.length !== 6) {
    throw new Error("Liuyao engine requires exactly six lines.");
  }

  sorted.forEach((line, index) => {
    const expectedPosition = (index + 1) as LiuyaoLinePosition;

    if (line.position !== expectedPosition) {
      throw new Error("Liuyao engine requires line positions 1 through 6 exactly once.");
    }
  });

  return sorted;
}

function lineToBit(polarity: LiuyaoLinePolarity) {
  return polarity === "yang" ? "1" : "0";
}

function togglePolarity(polarity: LiuyaoLinePolarity): LiuyaoLinePolarity {
  return polarity === "yang" ? "yin" : "yang";
}

function resolveTrigram(bits: string) {
  const trigram = trigramDefinitions.find((item) => item.bits === bits);

  if (!trigram) {
    throw new Error(`Unknown trigram signature: ${bits}`);
  }

  return trigram;
}

function buildHexagram(lines: LiuyaoLineState[]): LiuyaoHexagram {
  const sorted = sortLines(lines);
  const lowerBits = sorted.slice(0, 3).map((line) => lineToBit(line.polarity)).join("");
  const upperBits = sorted.slice(3, 6).map((line) => lineToBit(line.polarity)).join("");
  const lowerTrigram = resolveTrigram(lowerBits);
  const upperTrigram = resolveTrigram(upperBits);
  const definition = hexagramLookup[`${upperTrigram.name}-${lowerTrigram.name}`];

  if (!definition) {
    throw new Error(`Unknown hexagram pair: ${upperTrigram.name}-${lowerTrigram.name}`);
  }

  const palaceMetadata = palaceByHexagramCode[definition.code];

  return {
    code: definition.code,
    name: definition.name,
    palace: palaceMetadata?.palace ?? `${upperTrigram.name}宫`,
    selfLine: palaceMetadata?.selfLine ?? 3,
    responseLine: palaceMetadata?.responseLine ?? 6,
  };
}

function buildChangedLineStates(lines: LiuyaoLineState[]) {
  return sortLines(lines).map((line) => ({
    ...line,
    polarity: line.moving ? togglePolarity(line.polarity) : line.polarity,
    moving: false,
  }));
}

function collectMovingLines(lines: LiuyaoLineState[]) {
  return sortLines(lines)
    .filter((line) => line.moving)
    .map((line) => line.position);
}

function generateBranches(lines: LiuyaoLineState[]) {
  const sorted = sortLines(lines);
  const lowerBits = sorted.slice(0, 3).map((line) => lineToBit(line.polarity)).join("");
  const upperBits = sorted.slice(3, 6).map((line) => lineToBit(line.polarity)).join("");
  const lowerTrigram = resolveTrigram(lowerBits);
  const upperTrigram = resolveTrigram(upperBits);

  return [
    ...lowerTrigram.lowerBranches,
    ...upperTrigram.upperBranches,
  ] as [string, string, string, string, string, string];
}

function getPalaceElement(palace: string) {
  const palaceName = palace.replace("宫", "");
  const trigram = trigramDefinitions.find((item) => item.name === palaceName);

  if (!trigram) {
    return "土";
  }

  return trigram.element;
}

function resolveRelation(palaceElement: string, branchElement: string): LiuyaoRelation {
  if (palaceElement === branchElement) {
    return "兄弟";
  }

  const generates: Record<string, string> = {
    木: "火",
    火: "土",
    土: "金",
    金: "水",
    水: "木",
  };

  const controls: Record<string, string> = {
    木: "土",
    土: "水",
    水: "火",
    火: "金",
    金: "木",
  };

  if (generates[palaceElement] === branchElement) {
    return "子孙";
  }

  if (generates[branchElement] === palaceElement) {
    return "父母";
  }

  if (controls[palaceElement] === branchElement) {
    return "妻财";
  }

  return "官鬼";
}

function getSixGodSequence(dayStem: LiuyaoDayStem): LiuyaoSixGod[] {
  const baseSequence: LiuyaoSixGod[] = ["青龙", "朱雀", "勾陈", "腾蛇", "白虎", "玄武"];
  const offsets: Record<LiuyaoDayStem, number> = {
    甲: 0,
    乙: 0,
    丙: 1,
    丁: 1,
    戊: 2,
    己: 3,
    庚: 4,
    辛: 4,
    壬: 5,
    癸: 5,
  };
  const offset = offsets[dayStem];

  return baseSequence.map((_, index) => baseSequence[(index + offset) % baseSequence.length]);
}

export function resolveDayStem(timestamp: string): LiuyaoDayStem {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "甲";
  }

  const utcDays = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000,
  );
  const stems: LiuyaoDayStem[] = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

  return stems[((utcDays + 6) % 10 + 10) % 10];
}

function enrichLines(
  lines: LiuyaoLineState[],
  originalHexagram: LiuyaoHexagram,
  dayStem: LiuyaoDayStem,
): LiuyaoLine[] {
  const branches = generateBranches(lines);
  const palaceElement = getPalaceElement(originalHexagram.palace);
  const sixGods = getSixGodSequence(dayStem);

  return sortLines(lines).map((line, index) => {
    const branch = branches[index];
    const branchElement = branchElementMap[branch];

    return {
      position: line.position,
      polarity: line.polarity,
      moving: line.moving,
      branch: `${branch}${branchElement}`,
      role: resolveRelation(palaceElement, branchElement),
      sixGod: sixGods[index],
    };
  });
}

export function buildLiuyaoChart({
  lines,
  dayStem = "甲",
}: LiuyaoEngineInput): LiuyaoChart {
  const normalizedLines = assertLineSet(lines);
  const original = buildHexagram(normalizedLines);
  const changedLines = buildChangedLineStates(normalizedLines);
  const changed = buildHexagram(changedLines);

  return {
    original,
    changed,
    movingLines: collectMovingLines(normalizedLines),
    lines: enrichLines(normalizedLines, original, dayStem),
  };
}
