import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Phone3D from './Phone3D';
import './Phone3DCanvas.css';

export default function Phone3DCanvas({ scrollY = 0, className = '' }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Gyroscope support for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event) => {
      // beta: front-to-back tilt (-180 to 180)
      // gamma: left-to-right tilt (-90 to 90)
      const beta = event.beta || 0;   // -180 to 180
      const gamma = event.gamma || 0; // -90 to 90

      // Normalize to -1 to 1 range
      const normalizedX = Math.max(-1, Math.min(1, gamma / 45));  // ±45° range
      const normalizedY = Math.max(-1, Math.min(1, (beta - 90) / 45)); // centered at 90°

      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    // Request permission on iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS or older iOS
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile]);

  // Track mouse movement (desktop only)
  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0 to 1
    const y = (e.clientY - rect.top) / rect.height;  // 0 to 1
    
    // Convert to -1 to 1 range, centered
    const normalizedX = (x - 0.5) * 2;
    const normalizedY = (y - 0.5) * 2;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  // Hide hint after first interaction
  useEffect(() => {
    if (mousePosition.x !== 0 || mousePosition.y !== 0) {
      const t = setTimeout(() => setShowHint(false), 2000);
      return () => clearTimeout(t);
    }
  }, [mousePosition]);

  // Calculate rotation based on mouse/gyro position
  const rotation = {
    x: -15 - mousePosition.y * 30,  // Tilt up/down (-45° to 15°)
    y: 25 + mousePosition.x * 40,   // Rotate left/right (-15° to 65°)
  };

  return (
    <div className={`phone3d-canvas ${className}`} ref={containerRef}>
      <div
        className="canvas-container"
        onMouseMove={handleMouseMove}
        style={{ cursor: 'default' }}
      >
        <Canvas
          camera={{ position: [0, 0, 1.8], fov: 40 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: 1, // NoToneMapping (cleaner)
            toneMappingExposure: 1.0,
            alpha: true, // Enable transparency
          }}
          style={{ background: 'transparent' }}
        >
          {/* No background - use page background color */}

          {/* Dark cinematic studio lighting — dramatic shadows */}
          <ambientLight intensity={0.08} />

          {/* Key light — single dramatic light from top-right */}
          <directionalLight
            position={[0.8, 0.6, 0.4]}
            intensity={1.8}
            color="#e8e8f0"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={4}
            shadow-bias={-0.001}
          />

          {/* Subtle fill from left — barely there */}
          <directionalLight
            position={[-0.5, 0.2, 0.3]}
            intensity={0.3}
            color="#708090"
          />

          {/* Edge rim light — cold highlight */}
          <directionalLight
            position={[-0.3, 0.1, -0.8]}
            intensity={0.6}
            color="#6080a0"
          />

          {/* Studio floor bounce — very subtle */}
          <hemisphereLight
            skyColor="#1a1a1a"
            groundColor="#0a0a0a"
            intensity={0.15}
          />

          <Suspense fallback={null}>
            <Phone3D
              scrollY={scrollY}
              isDragging={true}
              dragRotation={rotation}
            />
          </Suspense>
        </Canvas>
      </div>

      {showHint && (
        <div className="drag-hint">
          <span>{isMobile ? 'Tilt device to explore' : 'Move mouse to explore · Scroll to spin'}</span>
        </div>
      )}
    </div>
  );
}
