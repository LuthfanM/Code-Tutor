import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ContentDoc } from "@/lib/mdx";

export function LessonNavigation({
  category,
  previous,
  next
}: {
  category: string;
  previous: ContentDoc | null;
  next: ContentDoc | null;
}) {
  return (
    <div className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/guides/${category}/${previous.meta.slug}`}
          className="rounded-lg border border-line bg-white p-4 transition hover:border-slate-300"
        >
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <ArrowLeft size={14} /> Previous
          </span>
          <p className="font-bold text-ink">{previous.meta.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/guides/${category}/${next.meta.slug}`}
          className="rounded-lg border border-line bg-white p-4 text-right transition hover:border-slate-300"
        >
          <span className="mb-2 inline-flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Next <ArrowRight size={14} />
          </span>
          <p className="font-bold text-ink">{next.meta.title}</p>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
