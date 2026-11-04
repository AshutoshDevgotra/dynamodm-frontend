import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  keywords: string[];
  related: string[];
  author: string;
}

export interface BlogPost extends BlogFrontmatter {
  content: string;
}

function readPost(filename: string): BlogPost {
  const source = fs.readFileSync(path.join(postsDirectory, filename), 'utf8');
  const parsed = matter(source);
  const data = parsed.data as Partial<BlogFrontmatter>;

  return {
    title: String(data.title || ''),
    slug: String(data.slug || filename.replace(/\.mdx$/, '')),
    description: String(data.description || ''),
    date: String(data.date || ''),
    category: String(data.category || 'Guides'),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    related: Array.isArray(data.related) ? data.related.map(String) : [],
    author: String(data.author || 'Orange Flow Team'),
    content: parsed.content.trim(),
  };
}

export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith('.mdx'))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  const filename = `${slug}.mdx`;
  const filePath = path.join(postsDirectory, filename);

  if (!fs.existsSync(filePath)) return undefined;
  return readPost(filename);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  const postsBySlug = new Map(getAllPosts().map((item) => [item.slug, item]));
  return post.related
    .map((slug) => postsBySlug.get(slug))
    .filter((item): item is BlogPost => Boolean(item));
}

export function stripLeadingH1(content: string): string {
  return content.replace(/^#\s+.+?(?:\r?\n){1,2}/, '').trim();
}

/** Remove the hand-written related-links block so the styled related section is the single presentation. */
export function stripKeepReadingBlock(content: string): string {
  return content.replace(/\n+\*\*Keep reading:\*\*[\s\S]*$/i, '').trim();
}

export function getReadingTime(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

function plainText(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .trim();
}

export function getHeadings(content: string): string[] {
  return [...content.matchAll(/^##\s+(.+)$/gm)]
    .map((match) => plainText(match[1]))
    .filter((heading) => heading.toLowerCase() !== 'frequently asked questions');
}

export function getFaqItems(content: string): Array<{ question: string; answer: string }> {
  const faqMatch = content.match(/^##\s+Frequently asked questions\s*$([\s\S]*?)(?=^##\s+|\s*$)/im);
  if (!faqMatch) return [];

  return [...faqMatch[1].matchAll(/^###\s+(.+)$([\s\S]*?)(?=^###\s+|\s*$)/gm)]
    .map((match) => ({
      question: plainText(match[1]),
      answer: plainText(match[2].replace(/\s+/g, ' ')),
    }))
    .filter((item) => item.question && item.answer);
}
