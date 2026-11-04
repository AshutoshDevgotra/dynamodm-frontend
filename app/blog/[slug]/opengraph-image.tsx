import { ImageResponse } from 'next/og';
import { getPost } from '../../../lib/blog';

export const runtime = 'nodejs';
export const alt = 'Orange Flow blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title || 'Orange Flow';
  const category = post?.category || 'Guides';

  return new ImageResponse(
    <div style={{ background: '#FFF6F0', color: '#332B25', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '72px 80px', width: '100%' }}>
      <div style={{ color: '#FF5A1F', display: 'flex', fontSize: 28, fontWeight: 700 }}>ORANGE FLOW</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1020 }}>
        <div style={{ color: '#A94D2D', display: 'flex', fontSize: 24, fontWeight: 600, textTransform: 'uppercase' }}>{category}</div>
        <div style={{ display: 'flex', fontSize: 58, fontWeight: 700, lineHeight: 1.08 }}>{title}</div>
      </div>
      <div style={{ color: '#6F6258', display: 'flex', fontSize: 24 }}>Practical ideas for better Instagram conversations</div>
    </div>,
    { ...size },
  );
}
