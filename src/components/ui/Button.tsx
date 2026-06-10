import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary: "bg-ink text-white shadow-soft hover:bg-slate-800",
  secondary: "border border-line bg-white text-ink hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-ink hover:bg-slate-100"
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const classes = `inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold transition ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
