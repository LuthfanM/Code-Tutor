import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export function Pagination({
  basePath,
  currentPage,
  totalPages
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
      <Link
        href={pageHref(basePath, previousPage)}
        aria-disabled={currentPage === 1}
        className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold transition ${
          currentPage === 1
            ? "pointer-events-none border-line bg-slate-50 text-slate-300"
            : "border-line bg-white text-ink hover:border-slate-300"
        }`}
      >
        <ArrowLeft size={16} />
        Previous
      </Link>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Link
            key={page}
            href={pageHref(basePath, page)}
            className={`grid h-10 w-10 place-items-center rounded-md border text-sm font-semibold transition ${
              page === currentPage
                ? "border-ink bg-ink text-white shadow-soft"
                : "border-line bg-white text-slate-700 hover:border-slate-300 hover:text-ink"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={pageHref(basePath, nextPage)}
        aria-disabled={currentPage === totalPages}
        className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold transition ${
          currentPage === totalPages
            ? "pointer-events-none border-line bg-slate-50 text-slate-300"
            : "border-line bg-white text-ink hover:border-slate-300"
        }`}
      >
        Next
        <ArrowRight size={16} />
      </Link>
    </nav>
  );
}
