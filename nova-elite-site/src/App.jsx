import { useState, useEffect, useRef, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import RevealSection from './components/RevealSection';
import CameraDetail from './components/CameraDetail';
import Phone3DCanvas from './components/Phone3DCanvas';
import './styles/variables.css';
import './App.css';

const SECTIONS = [
  {
    id: 'camera',
    tag: 'Camera System',
    title: 'Three lenses.\nOne vision.',
    description:
      'A 1-inch main sensor captures light most flagship cameras cannot. The 5× periscope brings distant subjects close without losing clarity. The ultra-wide completes the picture.',
    layout: 'visual-right',
    specs: [
      { label: 'Main Sensor', value: '1" type · 24mm' },
      { label: 'Periscope', value: '120mm · 5× optical' },
      { label: 'Ultra-wide', value: '13mm · 120° FOV' },
      { label: 'Video', value: '8K 24fps · 4K 120fps' },
    ],
  },
  {
    id: 'design',
    tag: 'Titanium Frame',
    title: 'Grade 5.\nAerospace-grade.',
    description:
      'The frame is milled from Grade 5 Titanium alloy — the same material used in jet turbines and surgical implants. Brushed vertically for a grip that improves with touch.',
    layout: 'visual-left',
    specs: [
      { label: 'Material', value: 'Ti-6Al-4V · Grade 5' },
      { label: 'Finish', value: '120-grit brushed · vertical' },
      { label: 'Edge', value: '0.2mm micro-bevel' },
      { label: 'Weight', value: '218g total' },
    ],
  },
  {
    id: 'display',
    tag: 'LTPO OLED',
    title: '6.9 inches.\nZero compromise.',
    description:
      'The 6.9-inch LTPO OLED panel adapts from 1Hz to 120Hz based on content. Peak 2,500 nits makes it readable in direct sunlight. Micro-curved edges feel like holding a window.',
    layout: 'visual-right',
    specs: [
      { label: 'Size', value: '6.9" · 19.5:9' },
      { label: 'Resolution', value: '2868 × 1320 · 460ppi' },
      { label: 'Peak Brightness', value: '2,500 nits' },
      { label: 'Refresh Rate', value: '1–120Hz adaptive' },
    ],
  },
  {
    id: 'materials',
    tag: 'Midnight Obsidian',
    title: 'Optically polished.\nDeeply matte.',
    description:
      'The back glass is Corning Gorilla Glass Victus 2, optically polished to near-black. A micro-prismatic texture diffuses light at extreme angles, reducing fingerprints by 85%.',
    layout: 'visual-left',
    specs: [
      { label: 'Glass', value: 'Gorilla Victus 2' },
      { label: 'Color', value: 'Midnight Obsidian #0D0D0D' },
      { label: 'Light Transmission', value: '5% · charcoal tint' },
      { label: 'Coatings', value: 'Oleophobic + AR' },
    ],
  },
  {
    id: 'specs',
    tag: 'Specifications',
    title: 'Every detail.\nSpecified.',
    description:
      'NOVA Elite is engineered without compromise. Every material, every dimension, every feature is chosen for a reason.',
    layout: 'centered',
    specs: [
      { label: 'Dimensions', value: '165.1 × 77.6 × 8.26mm' },
      { label: 'Chip', value: 'NOVA X1 · 3nm' },
      { label: 'Battery', value: '5,500mAh · 80W wired' },
      { label: 'Storage', value: '256GB / 512GB / 1TB' },
      { label: 'RAM', value: '12GB / 16GB LPDDR5X' },
      { label: 'IP Rating', value: 'IP68 · 6m 30min' },
    ],
  },
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.3] }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="app">
      <Navigation activeSection={activeSection} />

      {/* Hero — 3D scroll-driven reveal */}
      <Hero scrollY={scrollY} />

      {/* Feature sections */}
      {SECTIONS.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          ref={setSectionRef(section.id)}
          className={`app-section section-${section.layout}`}
        >
          {/* For non-specs sections: normal layout */}
          {section.id !== 'specs' && (
            <>
              <RevealSection
                section={section}
                scrollY={scrollY}
                index={index}
              />

              {/* Section-specific visual */}
              <div className="section-visual-wrapper">
                {section.id === 'camera' && <CameraDetail />}
                {section.id === 'design' && (
                  <Suspense fallback={<div className="visual-loading" />}>
                    <Phone3DCanvas scrollY={scrollY} className="phone-small" />
                  </Suspense>
                )}
                {section.id === 'display' && (
                  <div className="display-visual">
                    <div className="display-screen">
                      <div className="display-gradient" />
                    </div>
                  </div>
                )}
                {section.id === 'materials' && (
                  <div className="material-visual">
                    <div className="glass-swatch">
                      <div className="swatch-surface" />
                      <div className="swatch-edge" />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Specs section: centered text + grid */}
          {section.id === 'specs' && (
            <div className="specs-section-centered">
              <div className="specs-header">
                <div className="reveal-numeral">
                  <span className="numeral-prefix">Shot</span>
                  <span className="numeral-number">05</span>
                </div>
                <div className="reveal-tag">Specifications</div>
                <h2 className="reveal-title">Every detail.<br />Specified.</h2>
                <p className="reveal-description">{section.description}</p>
              </div>
              
              <div className="specs-grid">
                {section.specs.map((spec, i) => (
                  <div key={i} className="spec-card">
                    <div className="spec-card-label">{spec.label}</div>
                    <div className="spec-card-value">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">NOVA</div>
          <div className="footer-model">Elite</div>
          <div className="footer-copy">
            Precision · Crafted · Elevated
          </div>
        </div>
      </footer>
    </div>
  );
}
