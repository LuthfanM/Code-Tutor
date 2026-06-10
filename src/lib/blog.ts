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
