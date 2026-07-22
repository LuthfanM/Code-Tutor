import Link from "next/link";
import { guideCategories, titleFromSlug } from "@/lib/constants";
import { getGuidesByCategory } from "@/lib/guides";
import type { ContentDoc } from "@/lib/mdx";

const defaultGuideSections: Record<string, Record<string, string>> = {
  javascript: {
    introduction: "JavaScript Basics"
  }
};

function withDefaultSections(category: string, guides: ContentDoc[]) {
  const sections = defaultGuideSections[category];
  if (!sections) return guides;

  return guides.map((guide) => {
    const section = guide.meta.section ?? sections[guide.meta.slug];
    if (!section || section === guide.meta.section) return guide;

    return {
      ...guide,
      meta: {
        ...guide.meta,
        section
      }
    };
  });
}

function groupGuides(guides: ContentDoc[]) {
  if (!guides.some((guide) => guide.meta.section)) {
    return [{ title: null, guides }];
  }

  return guides.reduce<{ title: string | null; guides: ContentDoc[] }[]>((groups, guide) => {
    const title = guide.meta.section ?? null;
    const lastGroup = groups[groups.length - 1];

    if (lastGroup?.title === title) {
      lastGroup.guides.push(guide);
      return groups;
    }

    groups.push({ title, guides: [guide] });
    return groups;
  }, []);
}

export function GuideSidebar({
  activeCategory,
  activeSlug
}: {
  activeCategory?: string;
  activeSlug?: string;
}) {
  const categories = activeCategory
    ? guideCategories.filter((category) => category.slug === activeCategory)
    : guideCategories;

  return (
    <aside className="hidden w-72 shrink-0 border-r border-line bg-white/70 lg:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-5 py-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
          Guides
        </p>
        <div className="space-y-5">
          {categories.map((category) => {
            const guides = withDefaultSections(category.slug, getGuidesByCategory(category.slug));
            const groups = groupGuides(guides);
            return (
              <section key={category.slug}>
                <Link
                  href={`/guides/${category.slug}`}
                  className={`mb-2 block text-sm font-bold ${
                    activeCategory === category.slug ? "text-accent" : "text-ink"
                  }`}
                >
                  {category.title}
                </Link>
                <div className="space-y-4">
                  {groups.map((group, groupIndex) => (
                    <div key={group.title ?? `group-${groupIndex}`}>
                      {group.title ? (
                        <p className="mb-1 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          {group.title}
                        </p>
                      ) : null}
                      <div className="space-y-1">
                        {group.guides.map((guide) => (
                          <Link
                            key={guide.meta.slug}
                            href={`/guides/${category.slug}/${guide.meta.slug}`}
                            className={`block rounded-md px-3 py-2 text-sm transition ${
                              activeSlug === guide.meta.slug && activeCategory === category.slug
                                ? "bg-blue-50 font-semibold text-accent"
                                : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                            }`}
                          >
                            {guide.meta.title || titleFromSlug(guide.meta.slug)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
