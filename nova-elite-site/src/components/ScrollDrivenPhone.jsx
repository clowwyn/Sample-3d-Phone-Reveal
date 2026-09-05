import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import Phone3D from './Phone3D';
import './ScrollDrivenPhone.css';

function AnimatedPhone({ progress, visibleRef }) {
  const phoneRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });

  // Map scroll progress to animation keyframes
  useEffect(() => {
    const t = Math.max(0, Math.min(1, progress));

    if (t < 0.25) {
      // Phase 1: Rotate into view
      const phase = t / 0.25;
      targetRotation.current = {
        x: -Math.PI * 0.1 * (1 - phase),
        y: Math.PI * 2 * phase,
        z: 0,
      };
      targetPosition.current = { x: 0, y: 0, z: 0 };
    } else if (t < 0.5) {
      // Phase 2: Focus on camera
      const phase = (t - 0.25) / 0.25;
      targetRotation.current = {
        x: -Math.PI * 0.15 * phase,
        y: Math.PI * 2,
        z: Math.PI * 0.05 * phase,
      };
      targetPosition.current = {
        x: 0.3 * phase,
        y: 0.5 * phase,
        z: 0,
      };
    } else if (t < 0.75) {
      // Phase 3: Flip to back
      const phase = (t - 0.5) / 0.25;
      targetRotation.current = {
        x: -Math.PI * 0.15 * (1 - phase),
        y: Math.PI * 2 + Math.PI * phase,
        z: Math.PI * 0.05 * (1 - phase),
      };
      targetPosition.current = {
        x: 0.3 * (1 - phase),
        y: 0.5 * (1 - phase),
        z: 0,
      };
    } else {
      // Phase 4: Front view close
      const phase = (t - 0.75) / 0.25;
      targetRotation.current = {
        x: 0,
        y: Math.PI * 3,
        z: 0,
      };
      targetPosition.current = {
        x: 0,
        y: 0,
        z: 1.5 * phase,
      };
    }
  }, [progress]);

  // Smooth animation with exponential decay
  useFrame((state, delta) => {
    // Skip all rendering work when the section is not in view.
    if (!visibleRef.current || !phoneRef.current) return;

    const smoothFactor = 1 - Math.exp(-delta * 8);

    // Smooth rotation
    currentRotation.current.x +=
      (targetRotation.current.x - currentRotation.current.x) * smoothFactor;
    currentRotation.current.y +=
      (targetRotation.current.y - currentRotation.current.y) * smoothFactor;
    currentRotation.current.z +=
      (targetRotation.current.z - currentRotation.current.z) * smoothFactor;

    phoneRef.current.rotation.x = currentRotation.current.x;
    phoneRef.current.rotation.y = currentRotation.current.y;
    phoneRef.current.rotation.z = currentRotation.current.z;

    // Smooth position
    currentPosition.current.x +=
      (targetPosition.current.x - currentPosition.current.x) * smoothFactor;
    currentPosition.current.y +=
      (targetPosition.current.y - currentPosition.current.y) * smoothFactor;
    currentPosition.current.z +=
      (targetPosition.current.z - currentPosition.current.z) * smoothFactor;

    phoneRef.current.position.x = currentPosition.current.x;
    phoneRef.current.position.y = currentPosition.current.y;
    phoneRef.current.position.z = currentPosition.current.z;
  });

  return (
    <group ref={phoneRef}>
      <Phone3D />
    </group>
  );
}

export default function ScrollDrivenPhone() {
  const containerRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(null);
  // Track whether the section is visible so useFrame can skip work.
  const visibleRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      // Cancel previous RAF if still pending
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementHeight = rect.height;

        // Calculate progress: 0 when section enters viewport, 1 when it leaves
        const scrollStart = -rect.top;
        const scrollRange = elementHeight + viewportHeight;
        const progress = Math.max(0, Math.min(1, scrollStart / scrollRange));

        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Track visibility so the Three.js rAF loop can skip work when off-screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="scroll-driven-phone">
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        className="scroll-driven-canvas"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <Environment preset="studio" />

        <Suspense fallback={null}>
          <AnimatedPhone progress={scrollProgress} visibleRef={visibleRef} />
        </Suspense>
      </Canvas>

      {/* Minimal text overlays */}
      <div className="scroll-driven-text">
        {scrollProgress < 0.25 && (
          <div className="text-overlay fade-in">
            <h2>Precision in motion</h2>
          </div>
        )}
        {scrollProgress >= 0.25 && scrollProgress < 0.5 && (
          <div className="text-overlay fade-in">
            <h2>Triple-lens mastery</h2>
          </div>
        )}
        {scrollProgress >= 0.5 && scrollProgress < 0.75 && (
          <div className="text-overlay fade-in">
            <h2>Obsidian perfection</h2>
          </div>
        )}
        {scrollProgress >= 0.75 && (
          <div className="text-overlay fade-in">
            <h2>Elite. Refined.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
