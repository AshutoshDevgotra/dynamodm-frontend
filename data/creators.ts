export type CreatorCategory = 'Beauty' | 'Skincare' | 'Lifestyle' | 'Wellness' | 'Fashion' | 'Fitness';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  image: string;
  reel?: string;
  category: CreatorCategory;
  languages: ('English' | 'Punjabi' | 'Hindi')[];
  city: string;
  followers: string;
  engagementRate: string;
  brandCollabs: string[];
  bio: string;
  featured?: boolean;
}

export const CREATORS_DATA: Creator[] = [
  { id: 'agrima-datta', name: 'Agrima Datta', handle: '@agrimadatta', image: '/og-default.png', reel: '/Creator reels/agrima-datta.mp4', category: 'Lifestyle', languages: ['English', 'Hindi'], city: 'India', followers: '—', engagementRate: 'Reel', brandCollabs: [], bio: 'Stories, style, and everyday creator energy.', featured: true },
  { id: 'honestly-davinder', name: 'Honestly Davinder', handle: '@honestlydavinder', image: '/og-default.png', reel: '/Creator reels/honestly-davinder.mp4', category: 'Lifestyle', languages: ['English', 'Hindi', 'Punjabi'], city: 'India', followers: '—', engagementRate: 'Reel', brandCollabs: [], bio: 'Honest ideas and conversations that connect.', featured: true },
  { id: 'ishita-bhavesh', name: 'Ishita Bhavesh', handle: '@ishitabhavesh', image: '/og-default.png', reel: '/Creator reels/ishita-bhavesh.mp4', category: 'Wellness', languages: ['English', 'Hindi'], city: 'India', followers: '—', engagementRate: 'Reel', brandCollabs: [], bio: 'Wellness-led content with a clear point of view.', featured: true },
  { id: 'miss-preet', name: 'Miss Preet', handle: '@misspreet', image: '/og-default.png', reel: '/Creator reels/miss-preet.mp4', category: 'Beauty', languages: ['English', 'Hindi', 'Punjabi'], city: 'India', followers: '—', engagementRate: 'Reel', brandCollabs: [], bio: 'Beauty, personality, and scroll-stopping moments.', featured: true },
  { id: 'pratiksha', name: 'Pratiksha', handle: '@pratiksha', image: '/og-default.png', reel: '/Creator reels/pratiksha.mp4', category: 'Fashion', languages: ['English', 'Hindi'], city: 'India', followers: '—', engagementRate: 'Reel', brandCollabs: [], bio: 'Fashion-forward ideas made for real life.', featured: true },
  { id: 'style-with-anita', name: 'Style with Anita', handle: '@stylewithanita', image: '/og-default.png', reel: '/Creator reels/style-with-anita.mp4', category: 'Fashion', languages: ['English', 'Hindi'], city: 'India', followers: '—', engagementRate: 'Reel', brandCollabs: [], bio: 'Personal style, thoughtful finds, and confidence.', featured: true },
  { id: 'bhoomika-rawat', name: 'Bhoomika Rawat', handle: '@bhoomikarawat', image: '/og-default.png', reel: '/Creator reels/Bhumika-Rawat.mp4', category: 'Lifestyle', languages: ['English', 'Hindi'], city: 'India', followers: '—', engagementRate: 'Reel', brandCollabs: [], bio: 'Lifestyle content with a distinct creator point of view.', featured: true },
];
