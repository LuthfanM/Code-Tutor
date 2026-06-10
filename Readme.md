# Learn Platform — learn.luthfanm.com

Project ini adalah platform learning/guides yang terpisah dari portfolio.

Ini **bukan portfolio website**. Fokus utama project ini adalah membuat website untuk mengajarkan programming lewat tulisan, guides, learning paths, dan code examples.

Portfolio utama akan dibuat terpisah di:

```txt
luthfanm.com
```

Learning platform ini akan menggunakan:

```txt
codetutor.net
```

also buat styling prompting dari tasteskill.dev
---

## 1. Product Direction

Tujuan utama website ini adalah menjadi platform belajar programming berbasis tulisan.

Fokus awal:

- Guides
- Learning paths
- Programming notes
- Code examples
- Step-by-step tutorials
- Blog/notes ringan

Fokus masa depan:

- Login-based training
- Course
- Saved progress
- Bookmarks
- Quiz
- Certificate
- Private content
- Community/comment

---

## 2. Important Decisions

### Ini bukan portfolio

Project portfolio dipisah:

```txt
luthfanm.com
```

Project learning platform:

```txt
learn.luthfanm.com
```

Jadi jangan gabungkan portfolio, CV, dan personal showcase ke project ini.

### Guides bisa diakses tanpa login

Untuk MVP:

```txt
Guides = public
Learning paths = public
Blog/notes = public
```

Login tetap disediakan, tapi bukan syarat untuk membaca guides.

### Login untuk future development

Login dipakai untuk fitur berikut di masa depan:

- My learning dashboard
- Save progress
- Bookmark guides
- Training enrollment
- Private training content
- Quiz
- Certificate
- Comment/discussion
- Premium course

Rule awal:

```txt
Read guides = public
Login = optional
Future training features = login required
```

---

## 3. Inspiration

### Layout inspiration

Pola layout mengikuti website tutorial seperti W3Schools.

Yang diambil dari W3Schools:

- Top navigation
- Left sidebar navigation
- Main content area
- Tutorial structure
- Category-based learning
- Previous / Next lesson navigation
- Easy-to-scan beginner-friendly pages

Jangan copy visual W3Schools secara mentah.

### Visual style inspiration

Visual style mengikuti arah Taste Skill.

Yang diambil dari Taste Skill:

- Minimal
- Clean
- Modern
- Cool
- Attractive
- Strong typography
- Good spacing
- Soft borders
- Subtle gradients
- Card-based sections
- Not generic
- Not boring

Target final:

```txt
W3Schools-like learning structure
+ Taste Skill-inspired modern UI
```

---

## 4. Access Rules

### Public pages

Halaman yang bisa diakses tanpa login:

```txt
/
/guides
/guides/[category]
/guides/[category]/[slug]
/paths
/paths/[slug]
/blog
/blog/[slug]
/login
```

### Auth pages

Halaman yang butuh login:

```txt
/me
/me/progress
/me/bookmarks
/me/settings
/training/private/*
```

### Login behavior

```txt
User bisa membaca guide tanpa login.
User bisa klik Login untuk masuk pakai Google OAuth.
Setelah login, user mendapat akses ke fitur personal/future.
```

Jika user membuka halaman protected tanpa login:

```txt
Redirect ke /login?next=<current-path>
```

Setelah login berhasil:

```txt
Redirect balik ke halaman sebelumnya.
```

---

## 5. Authentication

### Recommended auth

Gunakan:

```txt
Google OAuth
```

Recommended implementation:

```txt
Supabase Auth + Google Provider
```

Alasan:

- Simple
- Cepat untuk MVP
- Sudah siap database user
- Mudah dikembangkan untuk progress/bookmark/training
- Cocok dengan future learning platform

Alternatif:

```txt
Auth.js / NextAuth + Google Provider
```

Tapi rekomendasi utama:

```txt
Supabase Auth
```

---

## 6. Tech Stack

### Recommended stack

```txt
Next.js
TypeScript
Tailwind CSS
MDX
Supabase Auth
Vercel
Cloudflare DNS
```

### Content format

Gunakan:

```txt
MDX
```

Alasan:

- Cocok untuk guides
- Cocok untuk code block
- Bisa pakai React component di dalam artikel
- Mudah ditulis
- Mudah direview lewat GitHub
- Mudah dibantu Codex
- Static-friendly

---

## 7. Framework Direction

Ada dua opsi:

### Option A: Nextra

Cocok kalau ingin cepat membuat documentation-style site.

Pros:

- Docs layout sudah siap
- Sidebar sudah siap
- MDX support bagus
- Code block bagus
- Search bisa ditambahkan
- Cepat untuk MVP

Cons:

- Lebih terbatas jika ingin custom learning platform
- Login dan user dashboard butuh extra customization
- Future training/course bisa terasa kurang fleksibel

### Option B: Custom Next.js + MDX

Cocok kalau ingin learning platform yang bisa berkembang.

Pros:

- Bebas design
- Bisa meniru Taste Skill lebih fleksibel
- Bisa bikin layout W3Schools modern sendiri
- Auth lebih fleksibel
- Future training/course lebih mudah
- Progress/bookmark/dashboard lebih mudah dikembangkan

Cons:

- Perlu bikin sidebar sendiri
- Perlu bikin MDX renderer sendiri
- Perlu bikin table of contents sendiri
- Lebih lama daripada Nextra

### Final recommendation

Untuk project ini gunakan:

```txt
Custom Next.js + MDX + Supabase Auth
```

Nextra boleh dijadikan referensi, tapi jangan terlalu bergantung jika target akhirnya adalah learning platform.

---

## 8. Main Information Architecture

### Pages

```txt
/
  Landing page learning platform

/guides
  List semua guides dan kategori

/guides/[category]
  Category page, contoh: JavaScript, React, Golang

/guides/[category]/[slug]
  Detail guide/tutorial

/paths
  List learning paths

/paths/[slug]
  Detail learning path

/blog
  List blog/notes

/blog/[slug]
  Blog detail

/login
  Login with Google

/me
  User dashboard after login

/me/progress
  Learning progress

/me/bookmarks
  Saved guides/bookmarks

/me/settings
  User settings
```

---

## 9. Layout System

### Public site shell

Untuk homepage, guides list, blog list, dan paths:

```txt
Top navbar
Main content
Footer
```

Top navbar:

```txt
Logo / site name
Guides
Paths
Blog
Training
Login button / Avatar
Theme toggle
Search
```

### Guide reading layout

Untuk halaman guide detail:

```txt
Top navbar
Left sidebar
Main article content
Right table of contents
```

Struktur desktop:

```txt
Top Navbar
Left Sidebar | Main Article Content | On This Page
```

### Mobile layout

Pada mobile:

```txt
Top navbar tetap
Left sidebar jadi drawer
Right table of contents bisa disembunyikan atau jadi dropdown
Main content full width
```

---

## 10. Visual Style Guide

### General style

- Minimal
- Modern
- Clean
- Attractive
- Beginner-friendly
- Developer-focused

### UI feel

- Soft background
- Subtle gradient
- Rounded cards
- Thin borders
- Comfortable spacing
- Clear active states
- Smooth hover states
- Readable typography

### Avoid

- Terlalu ramai
- Terlalu banyak warna
- Copy paste W3Schools style lama
- Dashboard enterprise yang kaku
- UI AI-generated generic

### Color direction

Use neutral base:

```txt
Background: off-white / very light gray
Text: near-black / slate
Border: soft gray
Accent: blue / indigo / green, choose one main accent
```

Optional dark mode:

```txt
Dark background
Soft border
Muted text
Accent highlight
```

---

## 11. Navigation

### Top navigation

```txt
Guides
Paths
Blog
Training
Login
```

If logged in:

```txt
Guides
Paths
Blog
Training
My Learning
Avatar dropdown
```

Avatar dropdown:

```txt
My Learning
Bookmarks
Settings
Logout
```

### Guide categories

Initial categories:

- JavaScript
- TypeScript
- React
- Next.js
- Golang
- Python
- Database
- Infrastructure
- System Design
- Career Tips

### Sidebar example

```txt
JavaScript
  Introduction
  Variables
  Functions
  Arrays
  Objects
  Async Await
  DOM

React
  Introduction
  Components
  Props
  State
  useEffect
  Custom Hooks
  Fetching Data

Golang
  Introduction
  Basic Syntax
  Struct
  Interface
  REST API with Gin
  Middleware

Database
  SQL Basic
  PostgreSQL
  Indexing
  Transactions
  Pagination
```

---

## 12. Blog vs Guides

### Guides

Guides adalah materi belajar terstruktur.

Contoh:

```txt
/guides/javascript/variables
/guides/react/use-effect
/guides/golang/gin-rest-api
/guides/database/pagination
```

Isi guides:

- Tutorial
- Step-by-step
- Code examples
- Latihan
- Best practice
- Explanation for beginner

### Blog

Blog adalah tulisan bebas satu halaman.

Contoh:

```txt
/blog/kenapa-belajar-javascript
/blog/catatan-belajar-golang
/blog/pengalaman-deploy-cloud-run
```

Isi blog:

- Pengalaman pribadi
- Opini
- Catatan engineering
- Project story
- Career reflection
- Announcement

Blog harus public.

Guides juga public.

Login optional untuk sekarang.

---

## 13. Content Folder Structure

Suggested structure:

```txt
src/
  content/
    guides/
      javascript/
        introduction.mdx
        variables.mdx
        functions.mdx
        arrays.mdx

      react/
        introduction.mdx
        components.mdx
        props.mdx
        state.mdx
        use-effect.mdx

      golang/
        introduction.mdx
        basic-syntax.mdx
        gin-rest-api.mdx

      database/
        sql-basic.mdx
        postgresql.mdx
        pagination.mdx

    blog/
      kenapa-belajar-javascript.mdx
      catatan-belajar-golang.mdx

    paths/
      frontend-beginner.mdx
      backend-beginner.mdx
      fullstack-nextjs.mdx
```

---

## 14. App Folder Structure

Suggested Next.js structure:

```txt
src/
  app/
    page.tsx

    guides/
      page.tsx
      [category]/
        page.tsx
        [slug]/
          page.tsx

    paths/
      page.tsx
      [slug]/
        page.tsx

    blog/
      page.tsx
      [slug]/
        page.tsx

    login/
      page.tsx

    me/
      page.tsx
      progress/
        page.tsx
      bookmarks/
        page.tsx
      settings/
        page.tsx

  components/
    layout/
      SiteHeader.tsx
      SiteFooter.tsx
      GuideLayout.tsx
      GuideSidebar.tsx
      RightToc.tsx
      MobileGuideDrawer.tsx

    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      Input.tsx
      Avatar.tsx
      ThemeToggle.tsx

    content/
      MDXContent.tsx
      CodeBlock.tsx
      GuideCard.tsx
      BlogCard.tsx
      PathCard.tsx
      LessonNavigation.tsx

  lib/
    auth.ts
    mdx.ts
    guides.ts
    blog.ts
    paths.ts
    constants.ts

  middleware.ts
```

---

## 15. Homepage Content

Homepage should explain the platform clearly.

Sections:

- Hero
- Featured learning paths
- Popular guides
- Categories
- Latest blog posts
- Why learn here
- CTA to start learning

Hero copy example:

```txt
Belajar programming lewat guides yang praktis, terstruktur, dan mudah diikuti.
```

Subcopy:

```txt
Mulai dari JavaScript, React, Golang, Database, sampai Infrastructure dengan penjelasan sederhana dan contoh kode nyata.
```

CTA:

```txt
Start Learning
Explore Guides
```

---

## 16. Guide Page Requirements

Guide detail page must include:

- Title
- Description
- Category
- Estimated reading time
- Last updated date
- Main article content
- Code blocks
- Previous lesson link
- Next lesson link
- Related guides
- Right table of contents
- Left sidebar active state

Example frontmatter:

```md
---
title: "JavaScript Variables"
description: "Belajar variable di JavaScript dengan const dan let."
category: "javascript"
slug: "variables"
order: 2
readingTime: "5 min"
updatedAt: "2026-06-09"
---
```

---

## 17. MDX Example

````mdx
---
title: "JavaScript Variables"
description: "Belajar variable di JavaScript dengan const dan let."
category: "javascript"
slug: "variables"
order: 2
readingTime: "5 min"
updatedAt: "2026-06-09"
---

# JavaScript Variables

Variable dipakai untuk menyimpan data.

## const

Gunakan `const` kalau value tidak akan di-reassign.

```js
const name = "Luthfan"
console.log(name)
```

## let

Gunakan `let` kalau value bisa berubah.

```js
let count = 0
count = count + 1
console.log(count)
```

## Simple Rule

Untuk awal:

- Pakai `const` secara default.
- Pakai `let` hanya kalau nilainya memang perlu berubah.
````

---

## 18. Authentication Details

Use Google OAuth.

Recommended:

```txt
Supabase Auth
```

Initial auth features:

- Login with Google
- Logout
- Show avatar when logged in
- Show login button when logged out
- Protect `/me/*`
- Keep guides public

Future auth features:

- Save progress
- Bookmark guide
- Continue learning
- Training enrollment
- Private content access

---

## 19. Future Database Tables

Future Supabase tables:

```txt
profiles
  id
  email
  name
  avatar_url
  created_at

bookmarks
  id
  user_id
  content_type
  content_slug
  created_at

progress
  id
  user_id
  guide_slug
  completed
  completed_at
  updated_at

training_enrollments
  id
  user_id
  training_slug
  status
  created_at
```

For MVP, database can be minimal.

---

## 20. MVP Scope

Build first:

- Homepage
- Guides list
- Guide category page
- Guide detail page with MDX
- Sidebar navigation
- Right table of contents
- Blog list
- Blog detail
- Paths list
- Login with Google
- Avatar/login button state
- `/me` placeholder page
- Protected `/me/*`
- Responsive layout
- Vercel deploy-ready

Do not build yet:

- Payment
- Certificate
- Quiz
- Video course
- Comment system
- Full CMS
- Complex dashboard

---

## 21. Initial Content Ideas

Initial guides:

- JavaScript Variables
- JavaScript Functions
- React Components
- React useEffect
- Golang REST API with Gin
- SQL Basic
- Database Pagination
- Deploy to Vercel
- Docker Basic

Initial paths:

- Frontend Beginner Path
- Backend Beginner Path
- Fullstack Next.js Path
- Golang Backend Path
- Database Basic Path

---

## 22. CMS Plan

For MVP:

```txt
Manual MDX files
```

Reason:

- Simple
- Free
- Good for developer writing
- Easy for Codex
- Content stays versioned in GitHub

Future CMS options:

- TinaCMS
- Decap CMS
- Sanity
- Custom CMS with Supabase

Do not add CMS in MVP unless needed.

---

## 23. Codex First Tasks

1. Create Next.js + TypeScript + Tailwind project.
2. Add Supabase Auth setup for Google OAuth.
3. Create public homepage.
4. Create guides structure with MDX.
5. Create guide reading layout:
   - top navbar
   - left sidebar
   - main article
   - right table of contents
6. Create blog structure with MDX.
7. Create paths pages.
8. Add login page.
9. Add `/me` page as protected placeholder.
10. Add middleware to protect `/me/*`.
11. Keep `/guides/*` public.
12. Make UI modern, minimal, and attractive inspired by Taste Skill.
13. Deploy-ready for Vercel.

---

## 24. Final Summary

This project is a public learning platform for programming guides.

It is not a portfolio.

Core rule:

```txt
Guides are public.
Login is optional.
Login is prepared for future training, bookmark, progress, and private content.
```

Main domain:

```txt
learn.luthfanm.com
```

Stack:

```txt
Next.js + TypeScript + Tailwind + MDX + Supabase Auth
```
