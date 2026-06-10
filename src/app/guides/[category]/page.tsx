import { notFound, redirect } from "next/navigation";
import { guideCategories } from "@/lib/constants";
import { getFirstGuideByCategory } from "@/lib/guides";

export function generateStaticParams() {
  return guideCategories.map((category) => ({ category: category.slug }));
}

export default async function GuideCategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryMeta = guideCategories.find((item) => item.slug === category);
  if (!categoryMeta) notFound();

  const firstGuide = getFirstGuideByCategory(category);
  if (!firstGuide) notFound();

  redirect(`/guides/${category}/${firstGuide.meta.slug}`);
}
