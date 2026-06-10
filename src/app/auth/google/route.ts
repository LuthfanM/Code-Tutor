import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next") ?? "/me";
  const origin = request.nextUrl.origin;

  if (!hasSupabaseEnv()) {
    return NextResponse.redirect(new URL("/login?missingEnv=1", origin));
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase!.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`
    }
  });

  if (error || !data.url) {
    return NextResponse.redirect(new URL("/login?error=oauth", origin));
  }

  return NextResponse.redirect(data.url);
}
