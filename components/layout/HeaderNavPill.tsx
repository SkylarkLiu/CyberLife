"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "首页", href: "/" },
  { label: "六爻", href: "/liuyao" },
  { label: "梅花易数", href: "/meihua" },
  { label: "八卦", href: "/bagua" },
  { label: "大六壬", href: "/daliuren" },
  { label: "紫微斗数", href: "/ziwei" },
  { label: "说明", href: "/#site-notes" },
];

export function HeaderNavPill() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setHash(window.location.hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  return (
    <nav
      aria-label="站点导航"
      className="max-w-full overflow-x-auto rounded-full border border-[rgba(226,214,190,0.12)] bg-[linear-gradient(180deg,rgba(255,248,235,0.05),rgba(255,248,235,0.02)),rgba(22,18,14,0.68)] px-1.5 py-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,248,235,0.05)] backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex min-w-max items-center gap-1">
        {navItems.map((item) => {
          const active =
            item.href === "/#site-notes"
              ? pathname === "/" && hash === "#site-notes"
              : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium tracking-[0.08em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(211,176,107,0.45)] sm:px-4 ${
                active
                  ? "bg-[rgba(211,176,107,0.14)] text-[rgba(248,240,223,0.96)] shadow-[0_0_18px_rgba(211,176,107,0.12)]"
                  : "text-[rgba(233,224,208,0.72)] hover:bg-[rgba(255,248,235,0.06)] hover:text-[rgba(248,240,223,0.96)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
