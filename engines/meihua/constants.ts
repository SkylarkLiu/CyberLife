import { hexagramLookup, trigramDefinitions } from "@/engines/liuyao/constants";
import type {
  MeihuaHexagram,
  MeihuaJudgmentLevel,
  MeihuaRelation,
  MeihuaTrigram,
  MeihuaTrigramName,
} from "@/schemas/meihua";

const trigramNumberMap: Record<number, MeihuaTrigramName> = {
  1: "乾",
  2: "兑",
  3: "离",
  4: "震",
  5: "巽",
  6: "坎",
  7: "艮",
  8: "坤",
};

const trigramAttributeMap: Record<MeihuaTrigramName, string> = {
  乾: "健",
  兑: "悦",
  离: "明",
  震: "动",
  巽: "入",
  坎: "陷",
  艮: "止",
  坤: "顺",
};

const pinyinStemMap: Record<string, string> = {
  jia: "甲",
  yi: "乙",
  bing: "丙",
  ding: "丁",
  wu: "戊",
  ji: "己",
  geng: "庚",
  xin: "辛",
  ren: "壬",
  gui: "癸",
};

const pinyinBranchMap: Record<string, string> = {
  zi: "子",
  chou: "丑",
  yin: "寅",
  mao: "卯",
  chen: "辰",
  si: "巳",
  wu: "午",
  wei: "未",
  shen: "申",
  you: "酉",
  xu: "戌",
  hai: "亥",
};

const branchNumberMap: Record<string, number> = {
  子: 1,
  丑: 2,
  寅: 3,
  卯: 4,
  辰: 5,
  巳: 6,
  午: 7,
  未: 8,
  申: 9,
  酉: 10,
  戌: 11,
  亥: 12,
};

const hourBranchMap = [
  "子",
  "丑",
  "丑",
  "寅",
  "寅",
  "卯",
  "卯",
  "辰",
  "辰",
  "巳",
  "巳",
  "午",
  "午",
  "未",
  "未",
  "申",
  "申",
  "酉",
  "酉",
  "戌",
  "戌",
  "亥",
  "亥",
  "子",
] as const;

const lunarMonthNameMap: Record<string, number> = {
  正月: 1,
  一月: 1,
  二月: 2,
  三月: 3,
  四月: 4,
  五月: 5,
  六月: 6,
  七月: 7,
  八月: 8,
  九月: 9,
  十月: 10,
  冬月: 11,
  十一月: 11,
  腊月: 12,
  十二月: 12,
};

const chineseDayNames = [
  "",
  "初一",
  "初二",
  "初三",
  "初四",
  "初五",
  "初六",
  "初七",
  "初八",
  "初九",
  "初十",
  "十一",
  "十二",
  "十三",
  "十四",
  "十五",
  "十六",
  "十七",
  "十八",
  "十九",
  "二十",
  "廿一",
  "廿二",
  "廿三",
  "廿四",
  "廿五",
  "廿六",
  "廿七",
  "廿八",
  "廿九",
  "三十",
] as const;

export function normalizeTrigramNumber(value: number) {
  const normalized = ((value % 8) + 8) % 8;
  return normalized === 0 ? 8 : normalized;
}

export function getTrigramByNumber(value: number): MeihuaTrigram {
  const normalized = normalizeTrigramNumber(value);
  const name = trigramNumberMap[normalized];
  const definition = trigramDefinitions.find((item) => item.name === name);

  if (!definition) {
    throw new Error(`Unknown trigram number: ${value}`);
  }

  return {
    name,
    number: normalized,
    binary: definition.bits,
    element: definition.element,
    attribute: trigramAttributeMap[name],
  };
}

export function getTrigramByBits(bits: string): MeihuaTrigram {
  const definition = trigramDefinitions.find((item) => item.bits === bits);

  if (!definition) {
    throw new Error(`Unknown trigram bits: ${bits}`);
  }

  const number = Number(
    Object.entries(trigramNumberMap).find(([, name]) => name === definition.name)?.[0],
  );

  return {
    name: definition.name as MeihuaTrigramName,
    number,
    binary: definition.bits,
    element: definition.element,
    attribute: trigramAttributeMap[definition.name as MeihuaTrigramName],
  };
}

function translateYearName(yearName: string) {
  const [stem, branch] = yearName.toLowerCase().split("-");
  if (!stem || !branch || !pinyinStemMap[stem] || !pinyinBranchMap[branch]) {
    return "";
  }

  return `${pinyinStemMap[stem]}${pinyinBranchMap[branch]}`;
}

export function getChineseCalendarContext(date: Date) {
  const zhFormatter = new Intl.DateTimeFormat("zh-Hans-CN-u-ca-chinese", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  });
  const enFormatter = new Intl.DateTimeFormat("en-US-u-ca-chinese", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai",
  });

  const zhParts = zhFormatter.formatToParts(date);
  const enParts = enFormatter.formatToParts(date);
  const monthLabel = zhParts.find((part) => part.type === "month")?.value ?? "正月";
  const normalizedMonthLabel = monthLabel.replace("闰", "");
  const lunarMonth = lunarMonthNameMap[normalizedMonthLabel] ?? 1;
  const lunarDay = Number(zhParts.find((part) => part.type === "day")?.value ?? "1");
  const yearName =
    (enParts.find((part) => (part.type as string) === "yearName")?.value as string | undefined) ??
    "";
  const yearGanzhi = translateYearName(yearName);
  const yearBranch = yearGanzhi.slice(-1);
  const yearBranchNumber = branchNumberMap[yearBranch] ?? 1;
  const hourBranchName = hourBranchMap[date.getHours()];

  return {
    lunarMonth,
    lunarDay,
    lunarMonthLabel: monthLabel,
    lunarDayLabel: chineseDayNames[lunarDay] ?? `${lunarDay}`,
    yearGanzhi,
    yearBranchNumber,
    hourBranchName,
    hourBranchNumber: branchNumberMap[hourBranchName],
    lunarLabel: `${yearGanzhi ? `${yearGanzhi}年 ` : ""}${monthLabel}${chineseDayNames[lunarDay] ?? lunarDay}${hourBranchName}时`,
  };
}

export function getHexagramFromTrigrams(
  upper: MeihuaTrigram,
  lower: MeihuaTrigram,
): MeihuaHexagram {
  const definition = hexagramLookup[`${upper.name}-${lower.name}`];

  if (!definition) {
    throw new Error(`Unknown hexagram pair: ${upper.name}-${lower.name}`);
  }

  return {
    code: definition.code,
    name: definition.name,
    upper,
    lower,
  };
}

export function resolveMeihuaRelation(
  bodyElement: MeihuaTrigram["element"],
  useElement: MeihuaTrigram["element"],
): MeihuaRelation {
  if (bodyElement === useElement) {
    return "体用比和";
  }

  const generates: Record<MeihuaTrigram["element"], MeihuaTrigram["element"]> = {
    木: "火",
    火: "土",
    土: "金",
    金: "水",
    水: "木",
  };

  const controls: Record<MeihuaTrigram["element"], MeihuaTrigram["element"]> = {
    木: "土",
    土: "水",
    水: "火",
    火: "金",
    金: "木",
  };

  if (generates[bodyElement] === useElement) {
    return "体生用";
  }

  if (generates[useElement] === bodyElement) {
    return "用生体";
  }

  if (controls[bodyElement] === useElement) {
    return "体克用";
  }

  return "用克体";
}

export function resolveJudgmentLevel(relation: MeihuaRelation): MeihuaJudgmentLevel {
  switch (relation) {
    case "用生体":
      return "上吉";
    case "体用比和":
      return "吉";
    case "体克用":
      return "可成";
    case "体生用":
      return "先难后易";
    case "用克体":
    default:
      return "谨慎";
  }
}
