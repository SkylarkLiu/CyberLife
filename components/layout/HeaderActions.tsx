"use client";

import Link from "next/link";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/#site-notes"
        className="inline-flex items-center justify-center rounded-full border border-[rgba(226,214,190,0.12)] bg-[rgba(255,248,235,0.04)] px-3.5 py-2 text-sm tracking-[0.08em] text-[rgba(240,234,221,0.78)] transition hover:border-[rgba(211,176,107,0.24)] hover:bg-[rgba(255,248,235,0.08)] hover:text-[rgba(248,240,223,0.96)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(211,176,107,0.45)]"
      >
        说明入口
      </Link>
    </div>
  );
}
