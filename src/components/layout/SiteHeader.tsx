import Link from "next/link";
import { BookOpen } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { getUser, hasSupabaseEnv } from "@/lib/auth";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getSearchIndex } from "@/lib/search";

export async function SiteHeader() {
  const user = await getUser();
  const avatar = user?.user_metadata?.avatar_url as string | undefined;
  const name = (user?.user_metadata?.full_name as string | undefined) ?? user?.email;
  const searchItems = getSearchIndex();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-fit items-center gap-2 font-bold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white">
            <BookOpen size={18} />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <SiteSearch items={searchItems} />

        <ThemeToggle />

        {user ? (
          <Link href="/me" className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white">
            <Avatar name={name} src={avatar} />
            <span className="hidden text-sm font-semibold text-ink sm:inline">My Learning</span>
          </Link>
        ) : (
          <Button href="/login" variant={hasSupabaseEnv() ? "primary" : "secondary"}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
