import { BlogCard } from "@/components/content/BlogCard";
import { getBlogTags, getPostsByTag } from "@/lib/blog";
import Link from "next/link";

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const tags = getBlogTags();
  const posts = getPostsByTag(tag);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-ink">Blog & Notes</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Catatan engineering, opini, dan cerita belajar yang tetap public.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-md border px-3 py-1.5 text-sm font-semibold ${
            tag
              ? "border-line bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
              : "border-blue-200 bg-blue-50 text-blue-700"
          }`}
        >
          All
        </Link>
        {tags.map((item) => (
          <Link
            key={item}
            href={`/blog?tag=${encodeURIComponent(item)}`}
            className={`rounded-md border px-3 py-1.5 text-sm font-semibold ${
              tag === item
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-line bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {posts.length ? (
          posts.map((post) => <BlogCard key={post.meta.slug} post={post} />)
        ) : (
          <p className="text-sm text-slate-500">Belum ada blog dengan tag ini.</p>
        )}
      </div>
    </main>
  );
}
