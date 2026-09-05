import { useRef, useEffect, useState, useCallback } from 'react';
import './ColorShowcase.css';

const COLORS = [
  {
    id: 'gray',
    name: 'Space Gray',
    hex: '#6B6B6B',
    description: 'Classic gray',
    gradient: 'linear-gradient(135deg, #5B5B5B 0%, #7B7B7B 100%)',
    image: '/Gray.png',
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    hex: '#FF8C42',
    description: 'Vibrant orange',
    gradient: 'linear-gradient(135deg, #FF7700 0%, #FFA042 100%)',
    image: '/Orange.png',
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    hex: '#1B3A4B',
    description: 'Deep blue',
    gradient: 'linear-gradient(135deg, #0F2533 0%, #2A5266 100%)',
    image: '/Blue.png',
  },
  {
    id: 'purple',
    name: 'Deep Purple',
    hex: '#4A1B4B',
    description: 'Royal purple',
    gradient: 'linear-gradient(135deg, #331033 0%, #5A2A66 100%)',
    image: '/Deep_Purple.png',
  },
  {
    id: 'green',
    name: 'Forest Green',
    hex: '#1B4B2A',
    description: 'Deep green',
    gradient: 'linear-gradient(135deg, #0F3320 0%, #2A6640 100%)',
    image: '/Deep_Green.png',
  },
];

export default function ColorShowcase() {
  const sectionRef = useRef();
  const containerRef = useRef();
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasCompletedHorizontal, setHasCompletedHorizontal] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const rafRef = useRef(null);
  const lastScrollTime = useRef(0);
  const scrollAccumulator = useRef(0);
  // Mirror state into refs so the wheel handler reads current values
  // without needing activeIndex/hasCompletedHorizontal in the effect deps.
  // This prevents the listener from being torn down and re-created on every snap.
  const isLockedRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const activeIndexRef = useRef(0);

  // Smooth transition to next/prev color
  const transitionToIndex = (targetIndex) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = 600 + 64; // card width + gap
    const targetScroll = targetIndex * cardWidth;

    // Override CSS scroll-behavior: smooth so the snap is instant.
    // Without this, the browser smooth-scrolls over ~300ms, racing the
    // 0.6s card transitions and causing the janky double-animation.
    container.scrollTo({ left: targetScroll, behavior: 'instant' });

    activeIndexRef.current = targetIndex;
    setActiveIndex(targetIndex);
  };

  // Update card visibility with fade effects
  const updateCardVisibility = useCallback((currentIndex) => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const distance = Math.abs(index - currentIndex);
      
      if (distance === 0) {
        // Active card: full scale and opacity
        card.style.cssText = `
          transform: scale(1) translateX(0);
          opacity: 1;
          pointer-events: auto;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
      } else if (distance === 1) {
        // Adjacent cards: slightly visible
        const direction = index < currentIndex ? -20 : 20;
        card.style.cssText = `
          transform: scale(0.9) translateX(${direction}px);
          opacity: 0.3;
          pointer-events: none;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
      } else {
        // Far cards: hidden
        card.style.cssText = `
          transform: scale(0.8) translateX(0);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
      }
    });
  }, []);

  // Handle horizontal scroll detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollLeft = container.scrollLeft;
        const cardWidth = 600 + 64;
        const newIndex = Math.round(scrollLeft / cardWidth);

        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);
          updateCardVisibility(newIndex);
        }

        // Check completion
        const maxScroll = container.scrollWidth - container.clientWidth;
        const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

        if (progress > 0.95 && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          hasCompleted.current = true;
          setHasCompletedHorizontal(true);
          setIsLocked(false);
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateCardVisibility]); // stable — no more activeIndex/hasCompleted deps

  // Initialize card visibility
  useEffect(() => {
    updateCardVisibility(0);
  }, [updateCardVisibility]);

  // Lock scroll when section comes into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setIsLocked(true);
          }
        });
      },
      { threshold: [0.5] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Wheel hijacking with smooth transitions
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const handleWheel = (e) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (isInView && isLocked && !hasCompletedHorizontal) {
        e.preventDefault();

        // Accumulate scroll delta
        scrollAccumulator.current += e.deltaY;

        // Trigger transition when accumulated scroll crosses threshold.
        // Lower threshold = more responsive; 50 was too high, made the wheel
        // feel like nothing was happening before the snap.
        const threshold = 15; // Sensitivity
        
        if (scrollAccumulator.current > threshold) {
          // Scroll right
          const nextIndex = Math.min(activeIndex + 1, COLORS.length - 1);
          if (nextIndex !== activeIndex) {
            transitionToIndex(nextIndex);
            scrollAccumulator.current = 0;
          }
        } else if (scrollAccumulator.current < -threshold) {
          // Scroll left
          const prevIndex = Math.max(activeIndex - 1, 0);
          if (prevIndex !== activeIndex) {
            transitionToIndex(prevIndex);
            scrollAccumulator.current = 0;
          }
        }
      } else if (!isLocked || hasCompletedHorizontal) {
        // Reset accumulator when not locked
        scrollAccumulator.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isLocked, hasCompletedHorizontal, activeIndex]);

  return (
    <section ref={sectionRef} className="color-showcase">
      {/* Section header with fade-in */}
      <div className="color-header">
        <div className="color-tag">Colors</div>
        <h2 className="color-title">
          Five finishes.
          <br />
          One obsession.
        </h2>
        <p className="color-description">
          Each color is precision-milled, hand-polished, and coated with
          aerospace-grade finishes.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div ref={containerRef} className="color-scroll-container">
        <div className="color-scroller">
          {COLORS.map((color, index) => (
            <div
              key={color.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`color-card ${index === activeIndex ? 'active' : ''}`}
            >
              {/* Phone image */}
              <div className="color-phone-image">
                <img
                  src={color.image}
                  alt={`${color.name} phone`}
                  loading="lazy"
                  className="phone-img"
                />
                {/* Shadow */}
                <div className="phone-shadow" />
              </div>

              {/* Color info */}
              <div className="color-info">
                <div className="color-swatch">
                  <div
                    className="swatch-circle"
                    style={{ background: color.hex }}
                  />
                </div>
                <h3 className="color-name">{color.name}</h3>
                <p className="color-desc">{color.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="color-scroll-indicator">
        <div className="scroll-hint">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M9 18l6-6-6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Scroll to explore colors</span>
        </div>

        {/* Progress dots */}
        <div className="color-dots">
          {COLORS.map((color, index) => (
            <div
              key={color.id}
              className={`color-dot ${index === activeIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
