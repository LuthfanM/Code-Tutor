import Link from "next/link";
import { guideCategories } from "@/lib/constants";
import { getFirstGuideByCategory } from "@/lib/guides";

export function GuideCategoryFilter({ activeCategory }: { activeCategory?: string }) {
  return (
    <nav className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-7xl items-center overflow-x-auto px-4 sm:px-6 lg:px-8">
        {guideCategories.map((category, index) => {
          const isActive = activeCategory === category.slug;
          const firstGuide = getFirstGuideByCategory(category.slug);
          const href = firstGuide
            ? `/guides/${category.slug}/${firstGuide.meta.slug}`
            : `/guides/${category.slug}`;

          return (
            <div key={category.slug} className="flex shrink-0 items-center">
              {index > 0 ? <span className="h-5 w-px bg-line" aria-hidden="true" /> : null}
              <Link
                href={href}
                className={`px-4 py-3 text-sm transition hover:text-accent ${
                  isActive ? "font-bold text-accent" : "font-medium text-slate-600"
                }`}
              >
                {category.title}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
