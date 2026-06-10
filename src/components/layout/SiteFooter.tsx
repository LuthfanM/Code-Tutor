import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>{siteConfig.name} is a public programming learning platform.</p>
        <div className="flex gap-4">
          <Link href="/guides" className="hover:text-ink">
            Guides
          </Link>
          <Link href="/paths" className="hover:text-ink">
            Paths
          </Link>
          <Link href="/blog" className="hover:text-ink">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
