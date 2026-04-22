import { HeaderActions } from "@/components/layout/HeaderActions";
import { HeaderBrand } from "@/components/layout/HeaderBrand";
import { HeaderNavPill } from "@/components/layout/HeaderNavPill";

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 border-b border-[rgba(226,214,190,0.08)] bg-[linear-gradient(180deg,rgba(10,8,6,0.95),rgba(10,8,6,0.84)_72%,rgba(10,8,6,0.34))]">
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
