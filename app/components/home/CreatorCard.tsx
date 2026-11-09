import type { Creator } from '../../../data/creators';

export default function CreatorCard({ creator, className = '' }: { creator: Creator; className?: string }) {
  return (
    <article className={`creator-reel-card ${className}`}>
      <div className="creator-reel-card__media">
        {creator.reel ? <video src={creator.reel} poster={creator.image} autoPlay muted loop playsInline preload="metadata" aria-label={`${creator.name} creator reel`} /> : <img src={creator.image} alt={creator.name} />}
        <span className="creator-reel-card__play">REEL</span>
      </div>
      <div className="creator-reel-card__body">
        <h3>{creator.name}</h3>
        <div className="creator-reel-card__details"><span>{creator.handle}</span></div>
      </div>
    </article>
  );
}
