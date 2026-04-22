import Link from "next/link";
import { type ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type ButtonAsButtonProps = SharedProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type ButtonAsLinkProps = SharedProps & {
  href: string;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const buttonClassName =
  "inline-flex items-center justify-center rounded-full border border-[rgba(226,214,190,0.12)] bg-[linear-gradient(180deg,rgba(255,248,235,0.05),rgba(255,248,235,0.02))] px-4 py-2.5 text-sm font-medium tracking-[0.08em] text-[rgba(245,241,231,0.94)] transition duration-300 hover:border-[rgba(211,176,107,0.28)] hover:bg-[rgba(255,248,235,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(211,176,107,0.4)] disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none";

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
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${buttonClassName} ${props.className ?? ""}`.trim()}
    >
      {props.children}
    </button>
  );
}
