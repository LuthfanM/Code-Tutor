import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { ContentDoc } from "@/lib/mdx";

export function BlogCard({ post }: { post: ContentDoc }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {post.meta.date}
      </p>
      <h3 className="mt-3 text-xl font-bold text-ink">{post.meta.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{post.meta.description}</p>
      <Link href={`/blog/${post.meta.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent">
        Read note
      </Link>
    </Card>
  );
}
