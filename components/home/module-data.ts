export type ModuleStatus = "mvp" | "next" | "placeholder";

export type ModuleItem = {
  href: string;
  key: string;
  name: string;
  subtitle: string;
  description: string;
  status: ModuleStatus;
};

export type PageMeta = {
  pathname: string;
  label: string;
  subtitle: string;
};

export const modules: ModuleItem[] = [
  {
    key: "liuyao",
    name: "六爻",
    subtitle: "MVP 优先实现",
    description: "以完整体验为第一阶段核心模块，后续将接入起卦、排盘与分层解读。",
    href: "/liuyao",
    status: "mvp",
  },
  {
    key: "meihua",
    name: "梅花易数",
    subtitle: "第二阶段",
    description: "作为第二个完整实现模块，保留与六爻一致的结果结构与视觉语言。",
    href: "/meihua",
    status: "next",
  },
  {
    key: "bagua",
    name: "八卦",
    subtitle: "占位模块",
    description: "先提供入口与产品骨架，后续再接入更完整的交互与解释层。",
    href: "/bagua",
    status: "placeholder",
  },
  {
    key: "daliuren",
    name: "大六壬",
    subtitle: "占位模块",
    description: "先保留未来模块位置，方便后续按统一架构逐步推进实现。",
    href: "/daliuren",
    status: "placeholder",
  },
  {
    key: "ziwei",
    name: "紫微斗数",
    subtitle: "占位模块",
    description: "后续作为独立体系接入，现阶段只保留页面入口和一致性的视觉框架。",
    href: "/ziwei",
    status: "placeholder",
  },
];

export const pageMeta: PageMeta[] = [
  { pathname: "/", label: "首页", subtitle: "沉浸式入口界面" },
  { pathname: "/liuyao", label: "六爻", subtitle: "MVP 页面骨架" },
  { pathname: "/meihua", label: "梅花易数", subtitle: "第二阶段模块" },
  { pathname: "/bagua", label: "八卦", subtitle: "占位模块" },
  { pathname: "/daliuren", label: "大六壬", subtitle: "占位模块" },
  { pathname: "/ziwei", label: "紫微斗数", subtitle: "占位模块" },
];

export function getPageMeta(pathname: string) {
  return pageMeta.find((item) => item.pathname === pathname) ?? pageMeta[0];
}

export function getStatusLabel(status: ModuleStatus) {
  if (status === "mvp") {
    return "MVP";
  }

  if (status === "next") {
    return "NEXT";
  }

  return "PLACEHOLDER";
}
