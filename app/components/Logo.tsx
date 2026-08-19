import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline" aria-label="DynamoDM home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-from)] text-white shadow-sm">
        <Zap size={16} fill="currentColor" />
      </span>
      <span className={`text-[18px] font-semibold tracking-tight ${light ? 'text-white' : 'text-[var(--text-primary)]'}`}>
        DynamoDM
      </span>
    </Link>
  );
}
