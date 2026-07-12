import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-line/75 bg-white/82 p-5 shadow-[0_18px_50px_rgba(7,53,66,0.07)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
