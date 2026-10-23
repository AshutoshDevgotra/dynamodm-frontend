import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="premium-card p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(17,24,39,0.11)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-subtle)] text-[var(--brand-from)]">
        <Icon size={22} />
      </div>
      <h3 className="mb-3 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}
