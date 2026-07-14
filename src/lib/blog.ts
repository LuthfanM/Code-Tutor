import path from "node:path";
import fs from "node:fs";
import { getContentDir, readMdxFile } from "@/lib/mdx";

const blogDir = getContentDir("blog");

function listBlogMdxFiles(dir = blogDir): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return listBlogMdxFiles(entryPath);
    }

    return entry.isFile() && entry.name.endsWith(".mdx") ? [entryPath] : [];
  });
}

function getBlogFileBySlug(slug: string) {
  return listBlogMdxFiles().find((filePath) => path.basename(filePath, ".mdx") === slug);
}

export function getPosts() {
  return listBlogMdxFiles()
    .map(readMdxFile)
    .sort((a, b) => String(b.meta.date).localeCompare(String(a.meta.date)));
}

export function getPost(slug: string) {
  const filePath = getBlogFileBySlug(slug);

  if (!filePath) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  return readMdxFile(filePath);
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
