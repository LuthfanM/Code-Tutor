import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { GuideLayout } from "@/components/layout/GuideLayout";
import { LessonNavigation } from "@/components/content/LessonNavigation";
import { MDXContent } from "@/components/content/MDXContent";
import { getAdjacentGuides, getGuide, getGuidePaths } from "@/lib/guides";

export function generateStaticParams() {
  return getGuidePaths();
}

export default async function GuideDetailPage({
  params
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  let guide;

  try {
    guide = getGuide(category, slug);
  } catch {
    notFound();
  }

  const adjacent = getAdjacentGuides(category, slug);

  return (
    <GuideLayout category={category} slug={slug} headings={guide.headings}>
      <div className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Badge>{category}</Badge>
          <span className="text-sm text-slate-500">{guide.meta.readingTime}</span>
          <span className="text-sm text-slate-500">Updated {guide.meta.updatedAt}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-normal text-ink">{guide.meta.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{guide.meta.description}</p>
        <div className="mt-8 border-t border-line pt-2">
          <MDXContent body={guide.body} />
        </div>
        <LessonNavigation
          category={category}
          previous={adjacent.previous}
          next={adjacent.next}
        />
      </div>
    </GuideLayout>
  );
}
