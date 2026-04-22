import Image from "next/image";
import Link from "next/link";
import siteIcon from "@/icon.png";

export function HeaderBrand() {
  return (
    <Link
      href="/"
      className="flex min-w-0 items-center gap-3 px-0.5 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(211,176,107,0.5)]"
    >
      <div className="relative h-16 w-20 shrink-0 sm:h-[4.5rem] sm:w-24">
        <Image
          src={siteIcon}
          alt="极深研几网站图标"
          fill
          priority
          sizes="(max-width: 640px) 3.5rem, 4rem"
          className="object-contain drop-shadow-[0_0_18px_rgba(211,176,107,0.12)]"
        />
      </div>

      <div className="min-w-0">
        <div className="ink-title text-base font-semibold leading-none tracking-[0.18em] text-white sm:text-lg">
          极 深 研 几
        </div>
        <div className="mt-1 font-serif text-[0.68rem] uppercase tracking-[0.22em] text-[rgba(219,205,181,0.44)] sm:text-[0.72rem]">
          Observational Rhythms
        </div>
      </div>
    </Link>
  );
}
