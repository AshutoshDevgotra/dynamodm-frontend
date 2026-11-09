import Link from 'next/link';
import type { BlogPost } from '../../lib/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card group flex h-full flex-col rounded-[28px] border border-[#EADBD1] bg-[#FAF8F4] p-7 shadow-[0_10px_30px_rgba(83,47,31,0.045)] transition hover:-translate-y-1.5 hover:border-[#F3B09B] hover:shadow-[0_18px_40px_rgba(83,47,31,0.09)] sm:p-8">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
        <span className="text-[#A94D2D]">{post.category}</span>
        <time dateTime={post.date} className="font-medium tracking-normal text-[#9A8D82]">
          {new Date(`${post.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </time>
      </div>
      <h2 className="blog-card-title mt-6 text-[2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#211B18] transition group-hover:text-[#B9573D]">{post.title}</h2>
      <p className="mt-5 flex-1 text-[15px] leading-7 text-[#81766E]">{post.description}</p>
      <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#A94D2D]">
        Read article <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
