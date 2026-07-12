import Link from "next/link";
import { Waves } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/82 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-fit items-center gap-2 font-bold text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white shadow-soft">
            <Waves size={19} />
          </span>
          <span className="tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-line/70 bg-white/60 p-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <SiteSearch items={searchItems} />

        <ThemeToggle />

        {user ? (
          <Link href="/me" className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-white/75">
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
