import type { ContentDoc } from "@/lib/mdx";

export function RightToc({ headings }: { headings: ContentDoc["headings"] }) {
  return (
    <aside className="hidden w-64 shrink-0 xl:block">
      <div className="sticky top-20 rounded-lg border border-line bg-white p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
          On this page
        </p>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm text-slate-600 hover:text-accent ${
                heading.level === 3 ? "pl-3" : ""
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
