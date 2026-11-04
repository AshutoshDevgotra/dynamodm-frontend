import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from './BlogCard';
import { getAllPosts } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical Instagram automation, auto DM, creator growth, and customer conversation guides from Orange Flow.',
  alternates: { canonical: 'https://orangeflow.in/blog' },
  openGraph: { type: 'website', url: 'https://orangeflow.in/blog' },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const posts = getAllPosts();
  const category = (await searchParams)?.category;
  const categories = [...new Set(posts.map((post) => post.category))].sort();
  const visiblePosts = category ? posts.filter((post) => post.category === category) : posts;

  return (
    <>
      <Navbar />
      <main className="pt-[68px] pb-16">
        <section className="container py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge badge-brand mb-5">Orange Flow journal</span>
            <h1 className="text-[#111111]">
              Ideas to help you
              <span className="block font-serif text-[0.88em]">grow through conversations</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6B7280]">
              Practical guides for Instagram creators, Indian businesses, and teams using comments and DMs to build better customer journeys.
            </p>
          </div>

          <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-2">
            <a href="/blog" className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!category ? 'bg-[#FF5A1F] text-white' : 'bg-[#F8F4EE] text-[#6F6258] hover:bg-[#FFF0E8]'}`}>
              All posts
            </a>
            {categories.map((item) => (
              <a key={item} href={`/blog?category=${encodeURIComponent(item)}`} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? 'bg-[#FF5A1F] text-white' : 'bg-[#F8F4EE] text-[#6F6258] hover:bg-[#FFF0E8]'}`}>
                {item}
              </a>
            ))}
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => <BlogCard key={post.slug} post={post} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
