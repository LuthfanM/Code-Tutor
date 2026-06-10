import path from "node:path";
import { guideCategories } from "@/lib/constants";
import { getContentDir, listMdxFiles, readMdxFile, sortByOrder } from "@/lib/mdx";

export function getGuides() {
  return sortByOrder(
    guideCategories.flatMap((category) =>
      listMdxFiles(getContentDir("guides", category.slug)).map((filePath) => {
        const doc = readMdxFile(filePath);
        return {
          ...doc,
          meta: { ...doc.meta, category: category.slug }
        };
      })
    )
  );
}

export function getGuidesByCategory(category: string) {
  return sortByOrder(
    listMdxFiles(getContentDir("guides", category)).map((filePath) => {
      const doc = readMdxFile(filePath);
      return { ...doc, meta: { ...doc.meta, category } };
    })
  );
}

export function getFirstGuide() {
  for (const category of guideCategories) {
    const firstGuide = getFirstGuideByCategory(category.slug);
    if (firstGuide) return firstGuide;
  }

  return null;
}

export function getFirstGuideByCategory(category: string) {
  return getGuidesByCategory(category)[0] ?? null;
}

export function getGuide(category: string, slug: string) {
  const filePath = path.join(getContentDir("guides", category), `${slug}.mdx`);
  return readMdxFile(filePath);
}

export function getAdjacentGuides(category: string, slug: string) {
  const guides = getGuidesByCategory(category);
  const index = guides.findIndex((guide) => guide.meta.slug === slug);

  return {
    previous: index > 0 ? guides[index - 1] : null,
    next: index >= 0 && index < guides.length - 1 ? guides[index + 1] : null
  };
}

export function getGuidePaths() {
  return getGuides().map((guide) => ({
    category: guide.meta.category ?? "",
    slug: guide.meta.slug
  }));
}
