import Image from "next/image";
import Link from "next/link";
import siteIcon from "@/icon.png";

export function HeaderBrand() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-3 px-0.5 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(246,200,123,0.55)]"
    >
      <div className="relative h-16 w-20 shrink-0 sm:h-[4.5rem] sm:w-24">
        <Image
          src={siteIcon}
          alt="极深研几网站图标"
          fill
          priority
          sizes="(max-width: 640px) 3.5rem, 4rem"
          className="object-contain drop-shadow-[0_0_18px_rgba(170,205,255,0.12)]"
        />
      </div>

      <div className="min-w-0">
        <div className="text-base font-semibold leading-none tracking-[0.14em] text-white sm:text-lg">
          极深研几
        </div>
        <div className="mt-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/38 sm:text-[0.68rem]">
          Celestial Logic
        </div>
      </div>
    </Link>
  );
}
