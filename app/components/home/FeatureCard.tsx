import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="growth-feature-card group rounded-[22px] p-6 sm:p-7 transition-all duration-200">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-[#FFA066] border border-orange-500/25 transition-transform duration-200 group-hover:scale-105">
        <Icon size={22} />
      </div>
      <h3 className="mb-2.5 text-[1.2rem] font-semibold text-white">{title}</h3>
      <p className="text-[15px] leading-[1.7] text-neutral-300">{description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFA066] transition-colors group-hover:text-[#FF782D]">
        Explore this tool <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </div>
  );
}
