import Link from 'next/link';
import type { BlogPost } from '../../lib/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
        <span className="text-[#A94D2D]">{post.category}</span>
        <time dateTime={post.date} className="font-medium tracking-normal text-[#9A8D82]">
          {new Date(`${post.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </time>
      </div>
      <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-[#111111] transition group-hover:text-[#A94D2D]">{post.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-[#6B7280]">{post.description}</p>
      <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#A94D2D]">
        Read article <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
