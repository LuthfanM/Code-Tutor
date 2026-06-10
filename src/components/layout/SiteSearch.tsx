"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { SearchItem } from "@/lib/search";

export function SiteSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return items
      .filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.type}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [items, normalizedQuery]);

  return (
    <div className="relative ml-auto hidden min-w-64 lg:block">
      <div className="flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3 text-sm text-slate-500 transition focus-within:border-accent focus-within:ring-2 focus-within:ring-blue-100">
        <Search size={16} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search guides"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-slate-400"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="grid h-6 w-6 place-items-center rounded text-slate-500 hover:bg-slate-100 hover:text-ink"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>

      {query ? (
        <div className="absolute right-0 top-12 z-50 w-[28rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-line bg-white shadow-soft">
          {results.length ? (
            <div className="max-h-96 overflow-y-auto p-2">
              {results.map((item) => (
                <Link
                  key={`${item.type}-${item.href}`}
                  href={item.href}
                  onClick={() => setQuery("")}
                  className="block rounded-md px-3 py-3 transition hover:bg-slate-100"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                    <span className="rounded border border-line px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="p-4 text-sm text-slate-600">No results found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
