import fs from "node:fs";
import path from "node:path";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export type ContentMeta = {
  title: string;
  description: string;
  slug: string;
  category?: string;
  order?: number;
  readingTime?: string;
  updatedAt?: string;
  date?: string;
  level?: string;
};

export type ContentDoc = {
  meta: ContentMeta;
  body: string;
  code: string;
  headings: { id: string; text: string; level: number }[];
};

const contentRoot = path.join(process.cwd(), "src", "content");

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getContentDir(...segments: string[]) {
  return path.join(contentRoot, ...segments);
}

export function listMdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
}

export function readMdxFile(filePath: string): ContentDoc {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const slug = path.basename(filePath, ".mdx");
  const meta = {
    slug,
    title: parsed.data.title ?? slug,
    description: parsed.data.description ?? "",
    ...parsed.data
  } as ContentMeta;

  return {
    meta,
    body: parsed.content,
    code: "",
    headings: extractHeadings(parsed.content)
  };
}

export async function compileMdx(body: string) {
  const compiled = await compile(body, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug]
  });

  return String(compiled);
}

export function sortByOrder<T extends { meta: ContentMeta }>(items: T[]) {
  return items.sort((a, b) => {
    const orderA = a.meta.order ?? 999;
    const orderB = b.meta.order ?? 999;
    return orderA - orderB || a.meta.title.localeCompare(b.meta.title);
  });
}

export function extractHeadings(body: string) {
  return body
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const level = line.startsWith("###") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s/, "").trim();
      return { id: slugify(text), text, level };
    });
}
