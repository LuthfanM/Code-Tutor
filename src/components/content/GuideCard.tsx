import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ContentDoc } from "@/lib/mdx";

export function GuideCard({ guide }: { guide: ContentDoc }) {
  const category = guide.meta.category ?? "guides";

  return (
    <Card className="group h-full">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge>{category}</Badge>
        <span className="text-xs font-medium text-slate-500">{guide.meta.readingTime}</span>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-ink">{guide.meta.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{guide.meta.description}</p>
      <Link
        href={`/guides/${category}/${guide.meta.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent"
      >
        Read guide <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
      </Link>
    </Card>
  );
}
