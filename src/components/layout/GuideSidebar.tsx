import Link from "next/link";
import { guideCategories, titleFromSlug } from "@/lib/constants";
import { getGuidesByCategory } from "@/lib/guides";

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
            const guides = getGuidesByCategory(category.slug);
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
                <div className="space-y-1">
                  {guides.map((guide) => (
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
              </section>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
