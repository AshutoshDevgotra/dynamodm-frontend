import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="growth-feature-card rounded-[20px] p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:p-7">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0DED2] text-[#B9826E]">
        <Icon size={20} />
      </div>
      <h3 className="mb-2.5 text-[1.1rem] text-[#171717]">{title}</h3>
      <p className="text-[15px] leading-[1.7] text-[#4E4E4E]">{description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B9826E]">Explore this tool <span aria-hidden="true">→</span></span>
    </div>
  );
}
