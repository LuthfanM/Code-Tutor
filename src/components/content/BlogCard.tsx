import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { ContentDoc } from "@/lib/mdx";

export function BlogCard({ post }: { post: ContentDoc }) {
  return (
    <Card className="relative h-full cursor-pointer">
      <Link
        href={`/blog/${post.meta.slug}`}
        aria-label={`Read ${post.meta.title}`}
        className="absolute inset-0 z-10 rounded-2xl"
      />
      <p className="text-sm font-semibold text-accent">
        {post.meta.date}
      </p>
      <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">{post.meta.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{post.meta.description}</p>
      {post.meta.tags?.length ? (
        <div className="relative z-20 mt-4 flex flex-wrap gap-2">
          {post.meta.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent hover:border-accent/40 hover:bg-accent/15"
            >
              {tag}
            </Link>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
