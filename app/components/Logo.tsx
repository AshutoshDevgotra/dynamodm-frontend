import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 no-underline ${className}`} aria-label="OrangeFlow.in home">
      <span className="flex h-8 w-8 max-h-8 max-w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FFE0D2] shadow-sm ring-1 ring-[#FFB08F]/30 transition-transform group-hover:scale-105">
        <Image src="/favicon.ico" alt="" width={32} height={32} className="h-full w-full max-h-full max-w-full object-cover" />
      </span>
      <span
        className={`font-logo text-[19px] font-bold tracking-[-0.035em] transition-colors ${
          light ? 'text-white' : 'text-[#111111]'
        }`}
      >
        OrangeFlow<span className="text-[#FF5A1F]">.</span>
      </span>
    </Link>
  );
}
