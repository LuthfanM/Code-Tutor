export const guidesPerPage = 6;

export function getCurrentPage(page?: string) {
  const parsed = Number(page ?? "1");
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export function paginate<T>(items: T[], currentPage: number, perPage = guidesPerPage) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * perPage;

  return {
    currentPage: safePage,
    totalPages,
    items: items.slice(start, start + perPage)
  };
}
