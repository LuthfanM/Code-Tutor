import type { LucideIcon } from "lucide-react";
import { BookOpen, Code2, Compass, Layers } from "lucide-react";
import { BlogCard } from "@/components/content/BlogCard";
import { GuideCard } from "@/components/content/GuideCard";
import { PathCard } from "@/components/content/PathCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { guideCategories, siteConfig } from "@/lib/constants";
import { getPosts } from "@/lib/blog";
import { getGuides } from "@/lib/guides";
import { getLearningPaths } from "@/lib/paths";

export default function HomePage() {
  const guides = getGuides().slice(0, 3);
  const paths = getLearningPaths().slice(0, 3);
  const posts = getPosts().slice(0, 2);
  const heroFeatures: { title: string; text: string; Icon: LucideIcon }[] = [
    {
      title: "Guides",
      text: "Tutorial step-by-step yang bisa dibaca tanpa login.",
      Icon: Code2
    },
    {
      title: "Learning Paths",
      text: "Urutan belajar untuk frontend, backend, dan database.",
      Icon: Compass
    },
    {
      title: "Code Examples",
      text: "Contoh kecil yang mudah disalin dan dipraktikkan.",
      Icon: Layers
    }
  ];

  return (
    <main>
      <section className="border-b border-line bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_34%),linear-gradient(180deg,#fbfcfe,#eef6ff)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-blue-100 bg-white/80 px-3 py-2 text-sm font-semibold text-accent">
              <BookOpen size={16} />
              Public guides, optional login
            </div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-normal text-ink sm:text-6xl">
              Belajar programming lewat guides yang praktis dan terstruktur.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Mulai dari JavaScript, React, Golang, Database, sampai Infrastructure
              dengan penjelasan sederhana dan contoh kode nyata.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/guides">Start Learning</Button>
              <Button href="/paths" variant="secondary">
                Explore Paths
              </Button>
            </div>
          </div>

          <div className="grid content-start gap-4">
            {heroFeatures.map(({ title, text, Icon }) => (
              <Card key={title} className="bg-white/85">
                <div className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-blue-50 text-accent">
                    <Icon size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-ink">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-accent">{siteConfig.domain}</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">Featured learning paths</h2>
          </div>
          <Button href="/paths" variant="ghost">
            View all
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {paths.map((path) => (
            <PathCard key={path.meta.slug} path={path} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink">Popular guides</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={`${guide.meta.category}-${guide.meta.slug}`} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-ink">Categories</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Struktur belajar dibuat mirip documentation site: kategori jelas, sidebar,
            lesson berurutan, dan navigasi previous/next.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {guideCategories.map((category) => (
            <a
              key={category.slug}
              href={`/guides/${category.slug}`}
              className="rounded-lg border border-line bg-white p-4 transition hover:border-slate-300"
            >
              <h3 className="font-bold text-ink">{category.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{category.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-ink">Latest notes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.meta.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
