import Link from "next/link";
import { Route } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { ContentDoc } from "@/lib/mdx";

export function PathCard({ path }: { path: ContentDoc }) {
  return (
    <Card>
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-md bg-green-50 text-leaf">
        <Route size={18} />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {path.meta.level ?? "Beginner"}
      </p>
      <h3 className="mt-2 text-xl font-bold text-ink">{path.meta.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{path.meta.description}</p>
      <Link href={`/paths/${path.meta.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent">
        Open path
      </Link>
    </Card>
  );
}
