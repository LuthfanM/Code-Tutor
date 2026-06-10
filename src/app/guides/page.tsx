import { notFound, redirect } from "next/navigation";
import { getFirstGuide } from "@/lib/guides";

export default function GuidesPage() {
  const firstGuide = getFirstGuide();
  if (!firstGuide?.meta.category) notFound();

  redirect(`/guides/${firstGuide.meta.category}/${firstGuide.meta.slug}`);
}
