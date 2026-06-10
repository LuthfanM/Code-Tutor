import path from "node:path";
import { getContentDir, listMdxFiles, readMdxFile, sortByOrder } from "@/lib/mdx";

export function getLearningPaths() {
  return sortByOrder(listMdxFiles(getContentDir("paths")).map(readMdxFile));
}

export function getLearningPath(slug: string) {
  return readMdxFile(path.join(getContentDir("paths"), `${slug}.mdx`));
}

export function getLearningPathParams() {
  return getLearningPaths().map((learningPath) => ({ slug: learningPath.meta.slug }));
}
