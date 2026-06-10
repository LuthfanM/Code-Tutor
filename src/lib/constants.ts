export const siteConfig = {
  name: "Code Tutor",
  domain: "learn.luthfanm.com",
  description:
    "Belajar programming lewat guides yang praktis, terstruktur, dan mudah diikuti.",
  nav: [
    { label: "Guides", href: "/guides" },
    { label: "Paths", href: "/paths" },
    { label: "Blog", href: "/blog" },
    { label: "Training", href: "/training" }
  ]
};

export const guideCategories = [
  {
    slug: "javascript",
    title: "JavaScript",
    description: "Dasar bahasa web, DOM, async, dan pola coding harian."
  },
  {
    slug: "react",
    title: "React",
    description: "Komponen, state, effects, dan cara membangun UI modern."
  },
  {
    slug: "golang",
    title: "Golang",
    description: "Backend praktis dengan syntax sederhana dan performa baik."
  },
  {
    slug: "database",
    title: "Database",
    description: "SQL, PostgreSQL, indexing, transaksi, dan pagination."
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    description: "Deploy, Docker, Vercel, dan dasar operasi aplikasi."
  }
];

export function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
