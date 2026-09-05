import { useEffect, useRef, useState, Suspense } from 'react';
import Phone3DCanvas from './Phone3DCanvas';
import './Hero.css';

export default function Hero({ scrollYRef }) {
  const [revealed, setRevealed] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Staggered reveal
    const t1 = setTimeout(() => setRevealed(true), 300);
    const t2 = setTimeout(() => setShowPhone(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Update hero opacity directly via DOM inside RAF — bypasses React entirely,
  // so scrolling the hero does not cause re-renders in React.
  useEffect(() => {
    let rafId;
    const update = () => {
      if (heroRef.current) {
        const scrollY = scrollYRef.current;
        const heroHeight = window.innerHeight;
        heroRef.current.style.opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.5)));
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [scrollYRef]);

  return (
    <section className="hero" ref={heroRef}>
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
              <Phone3DCanvas scrollYRef={scrollYRef} />
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
