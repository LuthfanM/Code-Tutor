import type { LucideIcon } from "lucide-react";
import { Bookmark, ChartNoAxesColumnIncreasing, Settings } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function MePage() {
  const items: {
    title: string;
    text: string;
    href: string;
    Icon: LucideIcon;
  }[] = [
    {
      title: "Progress",
      text: "Continue learning dan completion tracking.",
      href: "/me/progress",
      Icon: ChartNoAxesColumnIncreasing
    },
    {
      title: "Bookmarks",
      text: "Guide yang disimpan untuk dibaca lagi.",
      href: "/me/bookmarks",
      Icon: Bookmark
    },
    {
      title: "Settings",
      text: "Preferensi akun dan learning profile.",
      href: "/me/settings",
      Icon: Settings
    }
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-ink">My Learning</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Placeholder dashboard untuk fitur login-based training, progress, dan bookmarks.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map(({ title, text, href, Icon }) => (
          <a key={href} href={href}>
            <Card className="h-full transition hover:border-slate-300">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-blue-50 text-accent">
                <Icon size={18} />
              </div>
              <h2 className="mt-4 font-bold text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </Card>
          </a>
        ))}
      </div>
    </main>
  );
}
