import type { LucideIcon } from "lucide-react";
import { BookOpen, Braces, Code2, Compass, Database, Layers, Sparkles, Terminal } from "lucide-react";
import { BlogCard } from "@/components/content/BlogCard";
import { GuideCard } from "@/components/content/GuideCard";
import { PathCard } from "@/components/content/PathCard";
import { Button } from "@/components/ui/Button";
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
      text: "Tutorial bertahap yang bisa langsung dibaca dan dipraktikkan.",
      Icon: Code2
    },
    {
      title: "Learning Paths",
      text: "Urutan belajar yang menjaga kamu tetap tahu langkah berikutnya.",
      Icon: Compass
    },
    {
      title: "Code Examples",
      text: "Contoh kecil untuk memahami konsep sebelum masuk ke project.",
      Icon: Layers
    }
  ];

  return (
    <main className="overflow-hidden">
      <section className="water-hero relative border-b border-line/70 bg-gradient-to-br from-white via-cyan-50 to-emerald-50">
        <div className="absolute inset-0 -z-10 opacity-80">
          <div className="water-orbit absolute left-[6%] top-14 h-56 w-56 rounded-full bg-accent/14 blur-3xl" />
          <div className="water-orbit-delayed absolute right-[4%] top-24 h-72 w-72 rounded-full bg-leaf/14 blur-3xl" />
          <div className="water-current absolute bottom-0 left-[-10%] h-24 w-[120%] rounded-[999px] bg-white/55 blur-xl" />
        </div>

        <div className="mx-auto grid min-h-[calc(100dvh-68px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/78 px-3 py-2 text-sm font-semibold text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur">
              <BookOpen size={16} />
              Public guides, optional login
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Belajar programming dengan alur yang terasa mengalir.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Ikuti guides, paths, dan catatan interview tanpa kehilangan konteks belajar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/guides">Start Learning</Button>
              <Button href="/paths" variant="secondary">
                Browse Paths
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -left-8 top-8 hidden h-28 w-28 rounded-full border border-accent/20 bg-white/35 backdrop-blur md:block" />
            <div className="absolute -right-4 bottom-8 hidden h-40 w-40 rounded-full bg-leaf/10 blur-2xl md:block" />

            <div className="relative rounded-[2rem] border border-white/80 bg-white/62 p-4 shadow-soft backdrop-blur-xl sm:p-5">
              <div className="relative overflow-hidden rounded-[1.45rem] border border-line/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(221,244,248,0.72))] p-5 sm:p-7">
                <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_22%_20%,rgba(0,131,145,0.22),transparent_30%),radial-gradient(circle_at_76%_12%,rgba(16,132,102,0.18),transparent_26%)]" />
                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-sm font-semibold text-accent">learning.current</p>
                    <h2 className="mt-3 max-w-xs text-3xl font-bold leading-tight tracking-tight text-ink">
                      Concepts turn clearer when they move in order.
                    </h2>
                  </div>
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-white shadow-soft">
                    <Sparkles size={20} />
                  </div>
                </div>

                <div className="relative mt-10 grid gap-4">
                  {heroFeatures.map(({ title, text, Icon }, index) => (
                    <div
                      key={title}
                      className="study-token rounded-2xl border border-white/80 bg-white/72 p-4 shadow-[0_14px_40px_rgba(7,53,66,0.08)] backdrop-blur"
                      style={{ animationDelay: `${index * 0.55}s` }}
                    >
                      <div className="flex gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                          <Icon size={19} />
                        </div>
                        <div>
                          <h3 className="font-bold tracking-tight text-ink">{title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "syntax", Icon: Braces },
                    { label: "runtime", Icon: Terminal },
                    { label: "data", Icon: Database }
                  ].map(({ label, Icon }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-line/70 bg-white/62 p-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                    >
                      <Icon className="mx-auto text-accent" size={18} />
                      <p className="mt-2 text-xs font-semibold text-slate-600">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-accent">{siteConfig.domain}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Featured learning paths
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Pilih jalur yang cocok, lalu lanjutkan dari lesson kecil ke konsep yang lebih besar.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {paths.map((path) => (
            <PathCard key={path.meta.slug} path={path} />
          ))}
        </div>
      </section>

      <section className="border-y border-line/70 bg-white/45 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Popular guides</h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-600">
                Mulai dari materi yang sering dipakai saat membangun aplikasi nyata.
              </p>
            </div>
            <Button href="/guides" variant="secondary">
              View Guides
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={`${guide.meta.category}-${guide.meta.slug}`} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-20">
        <div className="lg:pt-4">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Categories</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Struktur belajar dibuat mirip documentation site: kategori jelas, sidebar,
            lesson berurutan, dan navigasi previous atau next.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {guideCategories.map((category, index) => (
            <a
              key={category.slug}
              href={`/guides/${category.slug}`}
              className={`group rounded-2xl border border-line/75 p-5 shadow-[0_14px_40px_rgba(7,53,66,0.06)] transition duration-300 hover:-translate-y-1 hover:border-accent/35 ${
                index === 0
                  ? "bg-accent/10 sm:col-span-2"
                  : index === 3
                    ? "bg-leaf/10"
                    : "bg-white/78"
              }`}
            >
              <h3 className="font-bold tracking-tight text-ink">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-line/70 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Latest notes</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Catatan pendek untuk mengunci konsep yang sering muncul saat belajar dan interview.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.meta.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
