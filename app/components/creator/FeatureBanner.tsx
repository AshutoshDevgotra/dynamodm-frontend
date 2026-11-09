import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

type FeatureBannerProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  ctaLabel: string;
  href: string;
  visualSrc: string;
  theme: 'teal' | 'blue' | 'purple' | 'red' | 'gold';
};

export default function FeatureBanner({ eyebrow, title, accent, description, ctaLabel, href, visualSrc, theme }: FeatureBannerProps) {
  return (
    <section className={`feature-banner feature-banner--${theme}`} aria-label={`${title} ${accent}`}>
      <img className="feature-banner__art" src={visualSrc} alt="" aria-hidden="true" />
      <div className="feature-banner__wash" aria-hidden="true" />
      <div className="feature-banner__content">
        <div className="feature-banner__logo" aria-label="OrangeFlow">OrangeFlow<span>.</span></div>
        <div className="feature-banner__eyebrow"><Sparkles size={13} /> {eyebrow}</div>
        <h2>{title} <span>{accent}</span></h2>
        <p>{description}</p>
        <Link href={href} className="feature-banner__cta">{ctaLabel} <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
