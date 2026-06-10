import { getPosts } from "@/lib/blog";
import { getGuides } from "@/lib/guides";
import { getLearningPaths } from "@/lib/paths";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: "Guide" | "Blog" | "Path";
};

export function getSearchIndex(): SearchItem[] {
  const guides = getGuides().map((guide) => ({
    title: guide.meta.title,
    description: guide.meta.description,
    href: `/guides/${guide.meta.category}/${guide.meta.slug}`,
    type: "Guide" as const
  }));

  const posts = getPosts().map((post) => ({
    title: post.meta.title,
    description: post.meta.description,
    href: `/blog/${post.meta.slug}`,
    type: "Blog" as const
  }));

  const paths = getLearningPaths().map((learningPath) => ({
    title: learningPath.meta.title,
    description: learningPath.meta.description,
    href: `/paths/${learningPath.meta.slug}`,
    type: "Path" as const
  }));

  return [...guides, ...paths, ...posts];
}
