import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-accent active:translate-y-0",
  secondary:
    "border border-line bg-white/82 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] hover:-translate-y-0.5 hover:border-accent/35 hover:bg-white active:translate-y-0",
  ghost: "text-ink hover:bg-white/70 active:translate-y-px"
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const classes = `inline-flex h-11 items-center justify-center whitespace-nowrap rounded-xl px-5 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
