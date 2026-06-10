import { PathCard } from "@/components/content/PathCard";
import { getLearningPaths } from "@/lib/paths";

export default function PathsPage() {
  const paths = getLearningPaths();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-ink">Learning Paths</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Jalur belajar yang mengurutkan guides menjadi progres yang mudah diikuti.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => (
          <PathCard key={path.meta.slug} path={path} />
        ))}
      </div>
    </main>
  );
}
