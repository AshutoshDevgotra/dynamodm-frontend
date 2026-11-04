This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Orange Flow blog (Next.js, MDX, slug format)

Drop `content/blog/*.mdx` into your Next.js project. Each filename = URL slug (`/blog/<slug>`).
Each file has frontmatter: title, slug, description (meta description), date, category, keywords, related.
Note: the body starts with an H1. If your page template already renders `title` as H1, delete the first line of each body or render only H2+.

## lib/blog.ts (App Router example)
```ts
import fs from "fs"; import path from "path"; import matter from "gray-matter";
const dir = path.join(process.cwd(), "content/blog");
export const getSlugs = () => fs.readdirSync(dir).map(f => f.replace(/\.mdx$/, ""));
export const getPost = (slug: string) => {
  const { data, content } = matter(fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8"));
  return { meta: data as any, content };
};
```

## app/blog/[slug]/page.tsx (SEO bits)
```ts
export function generateStaticParams() { return getSlugs().map(slug => ({ slug })); }
export async function generateMetadata({ params }: any) {
  const { meta } = getPost(params.slug);
  return { title: `${meta.title} | Orange Flow`, description: meta.description,
    keywords: meta.keywords, alternates: { canonical: `https://orangeflow.in/blog/${meta.slug}` },
    openGraph: { title: meta.title, description: meta.description, type: "article", url: `https://orangeflow.in/blog/${meta.slug}` } };
}
```
Also add: app/sitemap.ts listing all /blog/slugs, Article + FAQPage JSON-LD (each post has a "Frequently asked questions" H2 with H3 questions), and a /blog index page.
Render markdown with `next-mdx-remote` or `@next/mdx`; tables need `remark-gfm`.
