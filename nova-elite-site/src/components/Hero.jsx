import { useEffect, useRef, useState, Suspense } from 'react';
import Phone3DCanvas from './Phone3DCanvas';
import './Hero.css';

export default function Hero({ scrollY = 0 }) {
  const [revealed, setRevealed] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Staggered reveal
    const t1 = setTimeout(() => setRevealed(true), 300);
    const t2 = setTimeout(() => setShowPhone(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Opacity/fade based on scroll
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const fadeOut = Math.max(0, 1 - (scrollY / (heroHeight * 0.5)));

  return (
    <section className="hero" ref={heroRef} style={{ opacity: fadeOut }}>
      <div className="hero-content">
        {/* Left side - Text content */}
        <div className={`hero-left ${revealed ? 'visible' : ''}`}>
          <div className="hero-text">
            <div className="hero-brand">NOVA</div>
            <h1 className="hero-model">Elite</h1>
            <div className="hero-tagline">
              <span>Precision</span>
              <span className="hero-tagline-sep">·</span>
              <span>Crafted</span>
              <span className="hero-tagline-sep">·</span>
              <span>Elevated</span>
            </div>
            <p className="hero-description">
              Where aerospace engineering meets artisan craftsmanship. 
              The pinnacle of mobile technology, refined to perfection.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className={`hero-scroll ${revealed ? 'visible' : ''}`}>
            <div className="scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Right side - 3D Phone */}
        <div className="hero-right">
          <div className={`hero-phone ${showPhone ? 'visible' : ''}`}>
            <Suspense fallback={<div className="phone-loading">Loading 3D...</div>}>
              <Phone3DCanvas scrollY={scrollY} />
            </Suspense>
          </div>
          <div className="catchlight" />
        </div>
      </div>

      {/* Background haze */}
      <div className="hero-haze" />
    </section>
  );
}
