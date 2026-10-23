import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline" aria-label="OrangeFlow.in home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff7ed] shadow-sm ring-1 ring-orange-200">
        <Image src="/icon.svg" alt="" width={30} height={30} className="h-7 w-7 object-contain" />
      </span>
      <span className={`text-[18px] font-semibold tracking-tight ${light ? 'text-white' : 'text-[var(--text-primary)]'}`}>
        OrangeFlow<span className="text-[var(--brand-from)]">.in</span>
      </span>
    </Link>
  );
}
