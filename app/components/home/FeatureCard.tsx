import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-[28px] border border-black/6 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-subtle)] text-[var(--brand-from)]">
        <Icon size={22} />
      </div>
      <h3 className="mb-3 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
