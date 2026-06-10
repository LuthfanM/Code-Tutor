import { notFound } from "next/navigation";
import { MDXContent } from "@/components/content/MDXContent";
import { getPost, getPostPaths } from "@/lib/blog";

export function generateStaticParams() {
  return getPostPaths();
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;

  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-accent">{post.meta.date}</p>
      <h1 className="mt-3 text-4xl font-bold text-ink">{post.meta.title}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">{post.meta.description}</p>
      <div className="mt-8 rounded-lg border border-line bg-white p-6 sm:p-8">
        <MDXContent body={post.body} />
      </div>
    </main>
  );
}
