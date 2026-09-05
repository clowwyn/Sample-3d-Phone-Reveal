import { useEffect, useRef } from 'react';
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

const CARD_STRIDE = 520 + 48; // card width + gap — must match CSS
const SCROLL_THRESHOLD = 40;   // min px between active-index updates
const WHEEL_THRESHOLD = 60;    // accumulated deltaY before stepping
const WHEEL_COOLDOWN = 450;    // ms between transitions

export default function ColorShowcase() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  // Refs for values read inside event handlers. Storing them as refs lets the
  // wheel/scroll listeners be attached exactly once on mount — no listener
  // tear-down per transition.
  const activeIndexRef = useRef(0);
  const isLockedRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const isInViewRef = useRef(false);
  const scrollAccumulator = useRef(0);
  const lastTransitionAt = useRef(0);
  const rafScheduled = useRef(false);

  // Apply the active class directly to the cards and dots — no React
  // re-render needed for these.
  const applyActive = (idx) => {
    activeIndexRef.current = idx;
    for (let i = 0; i < COLORS.length; i++) {
      const card = cardRefs.current[i];
      if (card) card.classList.toggle('active', i === idx);
      const dot = dotRefs.current[i];
      if (dot) dot.classList.toggle('active', i === idx);
    }
  };

  const transitionToIndex = (idx) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollLeft = idx * CARD_STRIDE;
    applyActive(idx);
  };

  // Container scroll → recompute active card. Throttled to one rAF tick and
  // to px jumps that actually change the index.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastProcessed = 0;

    const onScroll = () => {
      if (rafScheduled.current) return;
      rafScheduled.current = true;
      requestAnimationFrame(() => {
        rafScheduled.current = false;
        const scrollLeft = container.scrollLeft;
        if (Math.abs(scrollLeft - lastProcessed) < SCROLL_THRESHOLD) return;
        lastProcessed = scrollLeft;

        const newIndex = Math.round(scrollLeft / CARD_STRIDE);
        if (
          newIndex !== activeIndexRef.current &&
          newIndex >= 0 &&
          newIndex < COLORS.length
        ) {
          applyActive(newIndex);
        }

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0 && scrollLeft / maxScroll > 0.95 && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          isLockedRef.current = false;
        }
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // In-view tracking. The wheel handler reads isInViewRef instead of calling
  // getBoundingClientRect() on every wheel event (which forces a layout).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInViewRef.current =
            entry.isIntersecting && entry.intersectionRatio > 0.5;
          if (isInViewRef.current) {
            isLockedRef.current = true;
          }
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Wheel handler — attached once, reads from refs.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onWheel = (e) => {
      if (!isInViewRef.current) return;

      // Unlocked but finished: scroll up re-engages at the last color.
      if (!isLockedRef.current && hasCompletedRef.current && e.deltaY < 0) {
        e.preventDefault();
        isLockedRef.current = true;
        hasCompletedRef.current = false;
        if (activeIndexRef.current !== COLORS.length - 1) {
          transitionToIndex(COLORS.length - 1);
        }
        scrollAccumulator.current = 0;
        return;
      }

      if (!isLockedRef.current) {
        scrollAccumulator.current = 0;
        return;
      }

      // Locked: always preventDefault so the page can't scroll through.
      e.preventDefault();

      const now = performance.now();
      if (now - lastTransitionAt.current < WHEEL_COOLDOWN) return;

      scrollAccumulator.current += e.deltaY;

      if (scrollAccumulator.current > WHEEL_THRESHOLD) {
        const next = Math.min(activeIndexRef.current + 1, COLORS.length - 1);
        if (next !== activeIndexRef.current) {
          transitionToIndex(next);
          lastTransitionAt.current = now;
        } else if (
          activeIndexRef.current === COLORS.length - 1 &&
          !hasCompletedRef.current
        ) {
          hasCompletedRef.current = true;
          isLockedRef.current = false;
        }
        scrollAccumulator.current = 0;
      } else if (scrollAccumulator.current < -WHEEL_THRESHOLD) {
        const prev = Math.max(activeIndexRef.current - 1, 0);
        if (prev !== activeIndexRef.current) {
          transitionToIndex(prev);
          lastTransitionAt.current = now;
          if (hasCompletedRef.current) {
            hasCompletedRef.current = false;
            isLockedRef.current = true;
          }
        } else {
          isLockedRef.current = false;
          lastTransitionAt.current = now;
          scrollAccumulator.current = 0;
          window.scrollBy({
            top: -window.innerHeight * 0.5,
            behavior: 'smooth',
          });
        }
        scrollAccumulator.current = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // Initial active class. After this the DOM owns the active state.
  useEffect(() => {
    applyActive(0);
  }, []);

  return (
    <section ref={sectionRef} className="color-showcase">
      <div ref={containerRef} className="color-scroll-container">
        <div className="color-scroller">
          {COLORS.map((color, index) => (
            <div
              key={color.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="color-card"
            >
              <div className="color-phone-image">
                <img
                  src={color.image}
                  alt={`${color.name} phone`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="phone-img"
                />
                <div className="phone-shadow" />
              </div>
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

        <div className="color-dots">
          {COLORS.map((color, index) => (
            <div
              key={color.id}
              ref={(el) => (dotRefs.current[index] = el)}
              className="color-dot"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
