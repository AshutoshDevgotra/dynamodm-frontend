import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 no-underline ${className}`} aria-label="OrangeFlow.in home">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#fff7ed] shadow-sm ring-1 ring-[#FF5A1F]/20 transition-transform group-hover:scale-105">
        <Image src="/icon.svg" alt="" width={30} height={30} className="h-7 w-7 object-contain" />
      </span>
      <span
        className={`font-syne text-[19px] font-bold tracking-[-0.035em] transition-colors ${light ? 'text-white' : 'text-zinc-950'
          }`}
      >
        OrangeFlow<span className="text-[#FF5A1F]">.</span>
      </span>
    </Link>
  );
}
