import { redirect } from "next/navigation";
import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { hasSupabaseEnv } from "@/lib/auth";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next = "/me" } = await searchParams;

  async function signInWithGoogle() {
    "use server";

    if (!hasSupabaseEnv()) {
      redirect("/login?missingEnv=1");
    }

    const encodedNext = encodeURIComponent(next);
    redirect(`/auth/google?next=${encodedNext}`);
  }

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-12">
      <div className="w-full rounded-lg border border-line bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-ink">Login</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Login opsional untuk fitur future seperti progress, bookmarks, dan private training.
          Guides tetap bisa dibaca tanpa login.
        </p>
        <form action={signInWithGoogle} className="mt-6">
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Chrome size={17} />
            Continue with Google
          </button>
        </form>
        {!hasSupabaseEnv() ? (
          <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800">
            Supabase env belum diisi. Set `NEXT_PUBLIC_SUPABASE_URL` dan
            `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk mengaktifkan OAuth.
          </p>
        ) : null}
        <div className="mt-5">
          <Button href="/guides" variant="secondary" className="w-full">
            Continue reading guides
          </Button>
        </div>
      </div>
    </main>
  );
}
