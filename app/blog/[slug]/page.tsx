import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MDXContent from '../MDXContent';
import {
  getAllPosts,
  getFaqItems,
  getHeadings,
  getPost,
  getReadingTime,
  getRelatedPosts,
  stripKeepReadingBlock,
  stripLeadingH1,
  slugifyHeading,
} from '../../../lib/blog';
import { notFound } from 'next/navigation';

const siteUrl = 'https://orangeflow.in';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const canonical = `${siteUrl}/blog/${post.slug}`;
  return {
    title: { absolute: `${post.title} | Orange Flow` },
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
      images: [{ url: `${siteUrl}/blog/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteUrl}/blog/${post.slug}/opengraph-image`],
    },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const content = stripKeepReadingBlock(stripLeadingH1(post.content));
  const headings = getHeadings(content);
  const relatedPosts = getRelatedPosts(post);
  const faqItems = getFaqItems(post.content);
  const canonical = `${siteUrl}/blog/${post.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Orange Flow', url: siteUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    keywords: post.keywords.join(', '),
  };
  const faqJsonLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;

  return (
    <>
      <Navbar />
      <main className="pt-[68px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

        <header className="bg-[linear-gradient(180deg,#FFF6F0_0%,#FFFFFF_100%)] px-4 pb-14 pt-16 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#A94D2D] hover:text-[#8D563A]"><ArrowLeft size={15} /> All articles</Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#A94D2D]">
              <span>{post.category}</span><span className="text-[#D8C8BC]">•</span><time dateTime={post.date}>{formatDate(post.date)}</time><span className="text-[#D8C8BC]">•</span><span className="inline-flex items-center gap-1.5 text-[#8D7C70]"><Clock size={13} /> {getReadingTime(post.content)} min read</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-[#111111]">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[#6B7280]">{post.description}</p>
            <p className="mt-5 text-sm font-medium text-[#8D7C70]">By {post.author}</p>
          </div>
        </header>

        <div className="container grid max-w-6xl gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:py-16">
          <article className="mx-auto w-full max-w-3xl min-w-0">
            <MDXContent source={content} />

            <section className="mt-14 rounded-[28px] bg-[var(--gradient-brand)] p-7 text-white shadow-[var(--shadow-brand)] sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">Put it into practice</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Turn your next comment into a conversation.</h2>
              <p className="mt-3 max-w-xl leading-7 text-white/80">Set up your first Instagram automation with Orange Flow and start free today.</p>
              <Link href="/signup" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#A94D2D] transition hover:bg-[#FFF6F0]">Start for free <ArrowRight size={16} /></Link>
            </section>
          </article>

          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-[#E9E1D7] bg-[#F8F4EE] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A94D2D]">In this article</p>
                <nav className="mt-4 space-y-3" aria-label="Table of contents">
                  {headings.map((heading) => <a key={heading} href={`#${slugifyHeading(heading)}`} className="block text-sm leading-5 text-[#6F6258] hover:text-[#A94D2D]">{heading}</a>)}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {relatedPosts.length > 0 && (
          <section className="border-t border-[#E9E1D7] bg-[#FBF8F4] px-4 py-14 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A94D2D]">Keep reading</p><h2 className="mt-2 text-3xl font-semibold text-[#111111]">More from Orange Flow</h2></div><Link href="/blog" className="hidden items-center gap-2 text-sm font-semibold text-[#A94D2D] sm:inline-flex">All posts <ArrowRight size={15} /></Link></div>
              <div className="grid gap-5 md:grid-cols-3">{relatedPosts.map((related) => <article key={related.slug} className="rounded-[22px] border border-[#E9E1D7] bg-white p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A94D2D]">{related.category}</p><h3 className="mt-3 text-xl font-semibold leading-tight text-[#111111]"><Link href={`/blog/${related.slug}`} className="hover:text-[#A94D2D]">{related.title}</Link></h3><p className="mt-2 text-sm leading-6 text-[#6F6258]">{related.description}</p></article>)}</div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
