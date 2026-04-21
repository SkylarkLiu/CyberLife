import { HeaderActions } from "@/components/layout/HeaderActions";
import { HeaderBrand } from "@/components/layout/HeaderBrand";
import { HeaderNavPill } from "@/components/layout/HeaderNavPill";

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[linear-gradient(180deg,rgba(6,10,18,0.94),rgba(6,10,18,0.82)_72%,rgba(6,10,18,0.38))]">
      <div className="mx-auto flex max-w-[min(1380px,94vw)] items-center justify-between gap-3 px-3 py-3 sm:px-5 sm:py-4">
        <div className="pointer-events-auto min-w-0 shrink-0">
          <HeaderBrand />
        </div>
        <div className="pointer-events-auto flex min-w-0 flex-1 justify-center">
          <HeaderNavPill />
        </div>
        <div className="pointer-events-auto flex shrink-0 justify-end">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}
