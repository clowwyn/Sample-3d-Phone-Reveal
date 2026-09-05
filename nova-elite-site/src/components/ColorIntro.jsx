import { useEffect, useRef, useState } from 'react';
import './ColorIntro.css';

export default function ColorIntro() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="colors-intro"
      className={`color-intro ${visible ? 'visible' : ''}`}
    >
      <div className="color-intro-inner">
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
    </section>
  );
}
