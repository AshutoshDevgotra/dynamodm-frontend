import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { slugifyHeading } from '../../lib/blog';

type HeadingProps = ComponentPropsWithoutRef<'h2'> & { children?: ReactNode };

function getHeadingText(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getHeadingText).join('');
  return '';
}

const mdxComponents = {
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 id={slugifyHeading(getHeadingText(children))} {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 id={slugifyHeading(getHeadingText(children))} {...props}>{children}</h3>
  ),
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    if (href?.startsWith('/')) {
      return <Link href={href} {...props}>{children}</Link>;
    }
    return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
  },
  table: ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-[#E9E1D7]">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm" {...props}>{children}</table>
    </div>
  ),
  thead: ({ children, ...props }: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-[#F8F4EE] text-[#332B25]" {...props}>{children}</thead>
  ),
  th: ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th className="border-b border-[#E9E1D7] px-4 py-3 font-semibold" {...props}>{children}</th>
  ),
  td: ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className="border-b border-[#F0EAE3] px-4 py-3 align-top text-[#6F6258]" {...props}>{children}</td>
  ),
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="my-7 border-l-4 border-[#FF8A5C] bg-[#FFF6F0] px-5 py-4 text-[#6F6258]" {...props}>{children}</blockquote>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="my-5 list-disc space-y-2 pl-6" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="my-5 list-decimal space-y-2 pl-6" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li className="pl-1" {...props}>{children}</li>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className="my-5 leading-8 text-[#4F4944]" {...props}>{children}</p>
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr className="my-10 border-[#E9E1D7]" {...props} />,
};

export default function MDXContent({ source }: { source: string }) {
  return (
    <div className="blog-prose">
      <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
    </div>
  );
}
