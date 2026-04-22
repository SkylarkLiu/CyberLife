import {
  getChineseCalendarContext,
  getHexagramFromTrigrams,
  getTrigramByBits,
  getTrigramByNumber,
  normalizeTrigramNumber,
  resolveMeihuaRelation,
} from "@/engines/meihua/constants";
import type { MeihuaChart, MeihuaInput } from "@/schemas/meihua";

function parseTimestamp(input: string | undefined) {
  if (!input) {
    return new Date();
  }

  const normalized = input.includes("T") ? input : input.replace(" ", "T");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function buildHexagramLines(upperBits: string, lowerBits: string) {
  return [...lowerBits.split(""), ...upperBits.split("")];
}

function toggleLine(lines: string[], movingLine: number) {
  const next = [...lines];
  const index = movingLine - 1;
  next[index] = next[index] === "1" ? "0" : "1";
  return next;
}

function buildMutualLines(lines: string[]) {
  return [lines[1], lines[2], lines[3], lines[2], lines[3], lines[4]];
}

function buildFromTime(input: MeihuaInput) {
  const date = parseTimestamp(input.timestamp);
  const calendar = getChineseCalendarContext(date);
  const base = calendar.yearBranchNumber + calendar.lunarMonth + calendar.lunarDay;

  const upperNumber = normalizeTrigramNumber(base);
  const lowerNumber = normalizeTrigramNumber(base + calendar.hourBranchNumber);
  const movingLine = ((base + calendar.hourBranchNumber) % 6 || 6);

  return {
    upperNumber,
    lowerNumber,
    movingLine,
    hourNumber: calendar.hourBranchNumber,
    lunarMonth: calendar.lunarMonth,
    lunarDay: calendar.lunarDay,
    lunarLabel: calendar.lunarLabel,
    yearGanzhi: calendar.yearGanzhi,
    yearBranchNumber: calendar.yearBranchNumber,
    hourBranchName: calendar.hourBranchName,
    seedSummary: `按农历${calendar.lunarLabel}取数，以年支数${calendar.yearBranchNumber}、月数${calendar.lunarMonth}、日数${calendar.lunarDay}、时数${calendar.hourBranchNumber}定上卦、下卦与动爻`,
  };
}

function buildFromNumbers(input: MeihuaInput) {
  const first = input.firstNumber || 1;
  const second = input.secondNumber || 1;
  const upperNumber = normalizeTrigramNumber(first);
  const lowerNumber = normalizeTrigramNumber(second);
  const movingLine = ((first + second) % 6 || 6);

  return {
    upperNumber,
    lowerNumber,
    movingLine,
    hourNumber: undefined,
    lunarMonth: undefined,
    lunarDay: undefined,
    lunarLabel: undefined,
    yearGanzhi: undefined,
    yearBranchNumber: undefined,
    hourBranchName: undefined,
    seedSummary: `以数字 ${first} / ${second} 起上卦与下卦，并由和数定动爻`,
  };
}

export function buildMeihuaChart(input: MeihuaInput): MeihuaChart {
  const sourceData = input.method === "time" ? buildFromTime(input) : buildFromNumbers(input);
  const upper = getTrigramByNumber(sourceData.upperNumber);
  const lower = getTrigramByNumber(sourceData.lowerNumber);
  const original = getHexagramFromTrigrams(upper, lower);

  const originalLines = buildHexagramLines(upper.binary, lower.binary);
  const changedLines = toggleLine(originalLines, sourceData.movingLine);
  const mutualLines = buildMutualLines(originalLines);

  const changedLower = getTrigramByBits(changedLines.slice(0, 3).join(""));
  const changedUpper = getTrigramByBits(changedLines.slice(3, 6).join(""));
  const mutualLower = getTrigramByBits(mutualLines.slice(0, 3).join(""));
  const mutualUpper = getTrigramByBits(mutualLines.slice(3, 6).join(""));
  const movingOnUpper = sourceData.movingLine >= 4;
  const bodyTrigram = movingOnUpper ? original.lower : original.upper;
  const useTrigram = movingOnUpper ? original.upper : original.lower;
  const relationType = resolveMeihuaRelation(bodyTrigram.element, useTrigram.element);
  const relationSummaryMap = {
    体用比和: "体用比和，事情主内外同气，宜顺势推进，重在把握节奏。",
    体生用: "体生用，多为自身投入较多，事情消耗我方精力，宜量力而行。",
    用生体: "用生体，多得环境助力，事情较易推进，可借势而为。",
    体克用: "体克用，主我方可控，但也要防用力过猛，宜稳中求成。",
    用克体: "用克体，外部压力较强，需先处理阻力，再谈推进。",
  } as const;

  return {
    original,
    mutual: getHexagramFromTrigrams(mutualUpper, mutualLower),
    changed: getHexagramFromTrigrams(changedUpper, changedLower),
    movingLine: sourceData.movingLine,
    bodyTrigram,
    useTrigram,
    relation: {
      type: relationType,
      summary: relationSummaryMap[relationType],
    },
    source: {
      methodLabel: input.method === "time" ? "时间起卦" : "数字起卦",
      seedSummary: sourceData.seedSummary,
      upperNumber: sourceData.upperNumber,
      lowerNumber: sourceData.lowerNumber,
      hourNumber: sourceData.hourNumber,
      lunarMonth: sourceData.lunarMonth,
      lunarDay: sourceData.lunarDay,
      lunarLabel: sourceData.lunarLabel,
      yearGanzhi: sourceData.yearGanzhi,
      yearBranchNumber: sourceData.yearBranchNumber,
      hourBranchName: sourceData.hourBranchName,
    },
  };
}
