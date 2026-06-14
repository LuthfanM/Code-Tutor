import path from "node:path";
import { getContentDir, listMdxFiles, readMdxFile } from "@/lib/mdx";

export function getPosts() {
  return listMdxFiles(getContentDir("blog"))
    .map(readMdxFile)
    .sort((a, b) => String(b.meta.date).localeCompare(String(a.meta.date)));
}

export function getPost(slug: string) {
  return readMdxFile(path.join(getContentDir("blog"), `${slug}.mdx`));
}

export function getPostPaths() {
  return getPosts().map((post) => ({ slug: post.meta.slug }));
}

export function getBlogTags() {
  return Array.from(
    new Set(getPosts().flatMap((post) => post.meta.tags ?? []))
  ).sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(tag?: string) {
  const posts = getPosts();
  if (!tag) return posts;

  return posts.filter((post) => post.meta.tags?.includes(tag));
}
