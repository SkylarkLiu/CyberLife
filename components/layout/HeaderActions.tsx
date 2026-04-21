"use client";

import Link from "next/link";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/#site-notes"
        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-3.5 py-2 text-sm text-white/78 transition hover:border-[rgba(246,200,123,0.22)] hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(246,200,123,0.55)]"
      >
        说明入口
      </Link>
    </div>
  );
}
