import type { ReactNode } from "react";
import { GuideCategoryFilter } from "@/components/content/GuideCategoryFilter";
import { GuideSidebar } from "@/components/layout/GuideSidebar";
import { MobileGuideDrawer } from "@/components/layout/MobileGuideDrawer";
import { RightToc } from "@/components/layout/RightToc";
import type { ContentDoc } from "@/lib/mdx";

export function GuideLayout({
  category,
  slug,
  headings,
  children
}: {
  category: string;
  slug: string;
  headings: ContentDoc["headings"];
  children: ReactNode;
}) {
  return (
    <>
      <GuideCategoryFilter activeCategory={category} />
      <div className="flex min-h-screen bg-paper">
        <GuideSidebar activeCategory={category} activeSlug={slug} />
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <MobileGuideDrawer />
          <div className="mx-auto flex max-w-5xl gap-8">
            <article className="min-w-0 flex-1">{children}</article>
            <RightToc headings={headings} />
          </div>
        </main>
      </div>
    </>
  );
}
