import { useRef, useEffect, useState } from 'react';
import './PhoneViewer.css';

export default function PhoneViewer({ scrollY = 0, className = '' }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragRotation, setDragRotation] = useState({ x: -15, y: 25 });
  const phoneRef = useRef(null);

  // Auto-rotation based on scroll + drag
  useEffect(() => {
    if (isDragging) return;
    const targetX = -15 + scrollY * 0.05;
    const targetY = 25 + scrollY * 0.15;
    setRotation({ x: targetX, y: targetY });
  }, [scrollY, isDragging]);

  // Drag handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = (e.clientX - dragStart.x) * 0.4;
    const dy = (e.clientY - dragStart.y) * 0.3;
    setDragRotation((prev) => ({
      x: prev.x - dy,
      y: prev.y + dx,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const finalX = isDragging ? dragRotation.x : rotation.x;
  const finalY = isDragging ? dragRotation.y : rotation.y;

  // Perspective foreshortening
  const tiltX = finalX;
  const tiltY = finalY;

  return (
    <div className={`phone-viewer ${className}`}>
      <div className="phone-stage" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
        <div
          ref={phoneRef}
          className="phone-body"
          style={{
            transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {/* Back face (visible when rotated) */}
          <div className="phone-face phone-face-back">
            <div className="phone-frame">
              {/* Camera Module */}
              <div className="camera-module">
                <div className="camera-lens camera-lens-1">
                  <div className="lens-ring" />
                  <div className="lens-glass" />
                </div>
                <div className="camera-lens camera-lens-2">
                  <div className="lens-ring" />
                  <div className="lens-glass" />
                </div>
                <div className="camera-lens camera-lens-3">
                  <div className="lens-ring" />
                  <div className="lens-glass" />
                </div>
                {/* LiDAR */}
                <div className="lidar-window" />
                {/* Flash */}
                <div className="flash-unit" />
              </div>

              {/* Logo */}
              <div className="phone-logo" />

              {/* Wordmark */}
              <div className="phone-wordmark">NOVA</div>
            </div>
          </div>

          {/* Front face */}
          <div className="phone-face phone-face-front">
            <div className="phone-frame-front">
              {/* Display */}
              <div className="phone-display">
                <div className="display-content" />
                {/* Dynamic island / camera punch hole */}
                <div className="camera-punch-hole" />
              </div>
              {/* Side frame border visible */}
              <div className="front-bezel front-bezel-top" />
              <div className="front-bezel front-bezel-bottom" />
              <div className="front-bezel front-bezel-left" />
              <div className="front-bezel front-bezel-right" />
            </div>
          </div>

          {/* Side frames (left and right visible at angles) */}
          <div className="phone-side phone-side-right">
            <div className="side-frame">
              <div className="side-button side-button-power" />
              <div className="side-button side-button-volume-1" />
              <div className="side-button side-button-volume-2" />
              <div className="side-button side-button-action" />
              <div className="side-sim-tray" />
            </div>
          </div>
          <div className="phone-side phone-side-left">
            <div className="side-frame">
              <div className="side-antenna" />
              <div className="side-antenna" />
            </div>
          </div>

          {/* Top and bottom */}
          <div className="phone-edge phone-edge-top">
            <div className="edge-frame">
              <div className="edge-mic" />
              <div className="edge-antenna" />
            </div>
          </div>
          <div className="phone-edge phone-edge-bottom">
            <div className="edge-frame">
              <div className="edge-usbc" />
              <div className="edge-speaker">
                <div className="speaker-hole" /><div className="speaker-hole" /><div className="speaker-hole" />
                <div className="speaker-hole" /><div className="speaker-hole" /><div className="speaker-hole" />
              </div>
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div
          className="phone-reflection"
          style={{
            transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          }}
        />

        {/* Ambient glow */}
        <div className="phone-glow" />
      </div>

      {/* Drag hint */}
      {!isDragging && (
        <div className="drag-hint">
          <span>Drag to rotate</span>
        </div>
      )}
    </div>
  );
}
