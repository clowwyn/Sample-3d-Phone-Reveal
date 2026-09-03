import { useState, useEffect, useRef } from 'react';
import './RevealSection.css';

export default function RevealSection({ section, scrollY, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`reveal-section reveal-${section.layout} ${isVisible ? 'visible' : ''}`}
      data-index={index}
    >
      <div className="reveal-bg" style={{ opacity: 1 - Math.max(0, Math.min(1, (scrollY - (ref.current?.offsetTop || 0) - 200) / 400)) }} />

      <div className="reveal-grid">
        {/* Visual side */}
        <div className="reveal-visual">
          <div className="visual-content">
            {section.visual}
          </div>
        </div>

        {/* Text side */}
        <div className="reveal-text">
          <div className="reveal-numeral">
            <span className="numeral-prefix">Shot</span>
            <span className="numeral-number">{String(index + 1).padStart(2, '0')}</span>
          </div>

          <div className="reveal-title-row">
            <span className="reveal-tag">{section.tag}</span>
            <h2 className="reveal-title">{section.title}</h2>
          </div>

          <p className="reveal-description">{section.description}</p>

          {/* Specs removed from text side - they appear in center via App.jsx */}
        </div>
      </div>
    </section>
  );
}
