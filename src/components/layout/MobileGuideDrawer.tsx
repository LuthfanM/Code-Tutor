"use client";

import { Menu } from "lucide-react";

export function MobileGuideDrawer() {
  return (
    <button
      type="button"
      className="mb-4 inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink lg:hidden"
    >
      <Menu size={16} />
      Guides
    </button>
  );
}
