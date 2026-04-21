import Link from "next/link";
import { type ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  className?: string;
};

type ButtonAsButtonProps = SharedProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
};

type ButtonAsLinkProps = SharedProps & {
  href: string;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const buttonClassName =
  "inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-4 py-2.5 text-sm font-medium tracking-[0.06em] text-white transition duration-300 hover:border-[rgba(246,200,123,0.32)] hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(246,200,123,0.55)] motion-reduce:transition-none";

export function Button(props: ButtonProps) {
  if ("href" in props && typeof props.href === "string") {
    return (
      <Link href={props.href} className={`${buttonClassName} ${props.className ?? ""}`.trim()}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={`${buttonClassName} ${props.className ?? ""}`.trim()}
    >
      {props.children}
    </button>
  );
}
