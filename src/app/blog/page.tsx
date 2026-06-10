import { BlogCard } from "@/components/content/BlogCard";
import { getPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-ink">Blog & Notes</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Catatan engineering, opini, dan cerita belajar yang tetap public.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.meta.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
