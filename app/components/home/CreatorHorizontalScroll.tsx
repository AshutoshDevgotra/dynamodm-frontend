'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CREATORS_DATA } from '../../../data/creators';
import CreatorCard from './CreatorCard';

export default function CreatorHorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] });
  const featured = CREATORS_DATA.filter((creator) => creator.featured);

  useEffect(() => {
    const measureTrack = () => {
      if (!trackRef.current) return;
      const lastCard = trackRef.current.lastElementChild as HTMLElement | null;
      if (!lastCard) return;
      const lastCardRight = lastCard.getBoundingClientRect().right;
      const nextTravel = Math.min(0, window.innerWidth - 24 - lastCardRight);
      setTravel(nextTravel);
    };
    measureTrack();
    window.addEventListener('resize', measureTrack);
    return () => window.removeEventListener('resize', measureTrack);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ['180px', `${travel}px`]);

  return (
    <>
      <section className="creator-reel-mobile of-section" aria-labelledby="creator-reels-title-mobile">
        <div className="container"><p className="of-label">FEATURED ON THE ORANGE LIST</p><h2 id="creator-reels-title-mobile">Talent that turns scrolls into sales.</h2></div>
        <div className="creator-reel-mobile__track">{featured.map((creator) => <CreatorCard key={creator.id} creator={creator} className="creator-reel-card--mobile" />)}</div>
        <div className="creator-reel-cta"><a href="https://houseoforange.in" target="_blank" rel="noopener noreferrer">Join Orange List <ArrowUpRight size={16} /></a></div>
      </section>
      <section ref={targetRef} className="creator-reel-scroll" aria-labelledby="creator-reels-title">
        <div className="creator-reel-scroll__sticky">
          <div className="container creator-reel-scroll__heading"><div><p className="of-label">FEATURED ON THE ORANGE LIST</p><h2 id="creator-reels-title">Talent that turns<br /><em>scrolls into sales.</em></h2></div><p>Discover the people, perspectives, and communities brands can build with.</p></div>
          <motion.div ref={trackRef} style={{ x }} className="creator-reel-scroll__track">{featured.map((creator) => <CreatorCard key={creator.id} creator={creator} />)}</motion.div>
          <div className="creator-reel-cta"><a href="https://houseoforange.in" target="_blank" rel="noopener noreferrer">Join Orange List <ArrowUpRight size={16} /></a></div>
        </div>
      </section>
    </>
  );
}
