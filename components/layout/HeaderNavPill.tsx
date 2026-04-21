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
      className="max-w-full overflow-x-auto rounded-full border border-white/10 bg-[rgba(18,24,37,0.52)] px-1.5 py-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
              className={`rounded-full px-3.5 py-2 text-sm font-medium tracking-[0.03em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(246,200,123,0.55)] sm:px-4 ${
                active
                  ? "bg-[rgba(163,184,208,0.18)] text-white shadow-[0_0_18px_rgba(151,177,214,0.18)]"
                  : "text-white/72 hover:bg-white/8 hover:text-white"
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
