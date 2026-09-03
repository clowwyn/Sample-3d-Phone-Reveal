import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ============================================
   NOVA Elite — Procedural 3D Phone
   Dimensions from product-spec.md
   Units: 1 unit = 1cm (scaled by S)
   ============================================ */

const S = 0.0065; // scale factor - smaller for better composition

// Phone dimensions in cm → units
const PH = 165.1 * S; // height  1.651
const PW = 77.6 * S;  // width   0.776
const PD = 8.26 * S;  // depth   0.0826

// Frame
const FRAME = 1.5 * S;
const CR = 9.0 * S;   // corner radius

// Camera module (back face) - Moved RIGHT with space on left, positioned further down
const CM_W = 50 * S;  // Width
const CM_H = 42 * S;  // Shorter height (more rectangular)
const CM_D = 1.8 * S;  // More depth/protrusion
const CM_X = -PW / 2 + FRAME + 30 * S;    // MORE from left edge = moved RIGHT
const CM_Y = PH / 2 - FRAME - 28 * S;     // Moved further down from top edge

// Lens diameters - ALL SAME SIZE, BIGGER
const LENS_SIZE = 12.5 * S;  // Larger uniform lens size

// Materials
function useMaterials() {
  return useMemo(() => ({
    titanium: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8E8D8A'),
      metalness: 0.92,
      roughness: 0.28,
    }),
    obsidian: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0D0D0D'),
      metalness: 0.05,
      roughness: 0.12,
      transmission: 0.03,
      thickness: 0.5,
      ior: 1.52,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      reflectivity: 0.5,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#080c10'),
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.55,
      thickness: 0.3,
      ior: 1.77,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
    }),
    lensRing: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1a1a'),
      metalness: 0.85,
      roughness: 0.55,
    }),
    display: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#010204'),
      metalness: 0.0,
      roughness: 0.02,
      emissive: new THREE.Color('#050a12'),
      emissiveIntensity: 0.5,
    }),
    logo: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#5a5a5a'),
      metalness: 0.7,
      roughness: 0.4,
    }),
    flash: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f8f0e0'),
      emissive: new THREE.Color('#f8f0e0'),
      emissiveIntensity: 1.2,
      roughness: 0.3,
    }),
    speaker: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#151515'),
      metalness: 0.2,
      roughness: 0.9,
    }),
    antenna: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#555555'),
      metalness: 0.4,
      roughness: 0.6,
    }),
  }), []);
}

// Rounded rectangle shape
function roundedRect(shape, hw, hh, r) {
  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
  shape.lineTo(hw, hh - r);
  shape.quadraticCurveTo(hw, hh, hw - r, hh);
  shape.lineTo(-hw + r, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
}

// ---- PHONE BODY ----
function PhoneBody({ materials }) {
  const inner = useMemo(() => {
    const hw = PW / 2 - FRAME;
    const hh = PH / 2 - FRAME;
    const r = Math.max(0, CR - FRAME);
    const s = new THREE.Shape();
    roundedRect(s, hw, hh, r);
    return s;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(inner, {
      depth: PD - FRAME * 2,
      bevelEnabled: true,
      bevelThickness: FRAME,
      bevelSize: FRAME,
      bevelSegments: 3,
    });
    g.center();
    // No rotation - extrude creates geometry along Z-axis, which is correct for depth
    return g;
  }, [inner]);

  return <mesh geometry={geo} material={materials.titanium} castShadow receiveShadow />;
}

// ---- BACK GLASS ----
function BackGlass({ materials }) {
  const geo = useMemo(() => {
    const hw = PW / 2 - FRAME - 0.5 * S;
    const hh = PH / 2 - FRAME - 0.5 * S;
    const r = Math.max(0, CR - FRAME - 0.5 * S);
    const s = new THREE.Shape();
    roundedRect(s, hw, hh, r);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.8 * S,
      bevelEnabled: true,
      bevelThickness: 0.2 * S,
      bevelSize: 0.2 * S,
      bevelSegments: 1,
    });
    g.center();
    // No rotation needed
    return g;
  }, []);

  return (
    <mesh
      geometry={geo}
      material={materials.titanium}
      position={[0, 0, PD / 2]}
      castShadow
    />
  );
}

// ---- CAMERA MODULE ----
function CameraModule({ materials }) {
  const geo = useMemo(() => {
    const hw = CM_W / 2;
    const hh = CM_H / 2;
    const r = 12 * S;  // Rounded corners
    const s = new THREE.Shape();
    roundedRect(s, hw, hh, r);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: CM_D,
      bevelEnabled: true,
      bevelThickness: 0.4 * S,  // Thicker bevel for more depth
      bevelSize: 0.4 * S,
      bevelSegments: 3,  // More segments for smoother bevel
    });
    g.center();
    return g;
  }, []);

  // Darker titanium module with proper depth
  const moduleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#6B6A68'),  // Slightly darker than frame
    metalness: 0.88,
    roughness: 0.32,
  }), []);

  return (
    <mesh
      geometry={geo}
      material={moduleMaterial}
      position={[CM_X, CM_Y, PD / 2 + CM_D / 2]}
      castShadow
    />
  );
}

// ---- SINGLE LENS ----
function Lens({ d, position, materials }) {
  return (
    <group position={position}>
      {/* Housing ring — rotate cylinder from Y-axis to Z-axis (pointing out from phone back) */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[d / 2 + 1 * S, d / 2 + 1 * S, 1.5 * S, 32]} />
        <meshStandardMaterial {...materials.lensRing} />
      </mesh>
      {/* Glass element */}
      <mesh position={[0, 0, 0.9 * S]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[d / 2 * 0.72, d / 2 * 0.72, 0.3 * S, 32]} />
        <primitive object={materials.glass} />
      </mesh>
      {/* AR coating reflection */}
      <mesh position={[0, 0, 1.1 * S]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[d / 2 * 0.5, d / 2 * 0.5, 0.1 * S, 32]} />
        <meshStandardMaterial
          color="#1a2535"
          transparent
          opacity={0.35}
          emissive="#204060"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

// ---- LENS STACK ----
function LensStack({ materials }) {
  // iPhone Pro-style layout: 2 on left, 1 on right - minimal padding, more spacing
  const leftPadding = 4 * S;  // Minimal margin from left edge
  const spacing = 15 * S;  // More spacing between lenses
  
  // Calculate positions - left column with minimal padding
  const leftColX = -CM_W / 2 + leftPadding + LENS_SIZE / 2;  // Left column X
  const rightColX = leftColX + spacing;  // Right column X
  
  const lenses = [
    { d: LENS_SIZE, x: leftColX, y: spacing / 2 },     // Top-left
    { d: LENS_SIZE, x: leftColX, y: -spacing / 2 },    // Bottom-left
    { d: LENS_SIZE, x: rightColX, y: 0 },              // Right-middle
  ];

  return (
    <>
      {lenses.map((l, i) => (
        <Lens 
          key={i} 
          d={l.d} 
          position={[CM_X + l.x, CM_Y + l.y, PD / 2 + CM_D + 0.5 * S]} 
          materials={materials} 
        />
      ))}
    </>
  );
}

// ---- FLASH + LIDAR ----
function FlashLiDAR({ materials }) {
  // Moved further right, outside the lens column
  const rightOffset = 18 * S;  // Further to the right
  
  return (
    <>
      {/* Flash — far right, top position */}
      <mesh position={[CM_X + rightOffset, CM_Y + 5 * S, PD / 2 + CM_D + 0.3 * S]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.2 * S, 2.2 * S, 0.8 * S, 16]} />
        <primitive object={materials.flash} />
      </mesh>
      {/* LiDAR — far right, bottom position */}
      <mesh position={[CM_X + rightOffset, CM_Y - 5 * S, PD / 2 + CM_D + 0.2 * S]}>
        <boxGeometry args={[4 * S, 4 * S, 0.5 * S]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.1} roughness={0.3} />
      </mesh>
    </>
  );
}

// ---- LOGO ----
function Logo({ materials }) {
  // Create "NOVA" text logo using simple geometric shapes
  return (
    <group position={[0, -PH / 4, PD / 2 + 0.05 * S]}>
      {/* N - two vertical bars and diagonal */}
      <mesh position={[-12 * S, 0, 0]}>
        <boxGeometry args={[1.5 * S, 8 * S, 0.3 * S]} />
        <primitive object={materials.logo} />
      </mesh>
      <mesh position={[-12 * S, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.2 * S, 9 * S, 0.3 * S]} />
        <primitive object={materials.logo} />
      </mesh>
      <mesh position={[-7.5 * S, 0, 0]}>
        <boxGeometry args={[1.5 * S, 8 * S, 0.3 * S]} />
        <primitive object={materials.logo} />
      </mesh>
      
      {/* O - ring */}
      <mesh position={[-2 * S, 0, 0]}>
        <torusGeometry args={[3 * S, 0.7 * S, 16, 32]} />
        <primitive object={materials.logo} />
      </mesh>
      
      {/* V - two angled bars */}
      <mesh position={[5 * S, 1 * S, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[1.2 * S, 8 * S, 0.3 * S]} />
        <primitive object={materials.logo} />
      </mesh>
      <mesh position={[8.5 * S, 1 * S, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.2 * S, 8 * S, 0.3 * S]} />
        <primitive object={materials.logo} />
      </mesh>
      
      {/* A - two angled bars and horizontal */}
      <mesh position={[13 * S, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.2 * S, 9 * S, 0.3 * S]} />
        <primitive object={materials.logo} />
      </mesh>
      <mesh position={[17 * S, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[1.2 * S, 9 * S, 0.3 * S]} />
        <primitive object={materials.logo} />
      </mesh>
      <mesh position={[15 * S, -1 * S, 0]}>
        <boxGeometry args={[4 * S, 0.8 * S, 0.3 * S]} />
        <primitive object={materials.logo} />
      </mesh>
    </group>
  );
}

// ---- DISPLAY (front face) ----
function Display({ materials }) {
  const geo = useMemo(() => {
    // FULL edge-to-edge - extends beyond frame to phone body outer dimensions
    const hw = PW / 2 - 0.3 * S;  // Almost to absolute outer edge
    const hh = PH / 2 - 0.3 * S;  // Almost to absolute outer edge  
    const r = CR - 0.3 * S;  // Match outer corner curvature
    const s = new THREE.Shape();
    roundedRect(s, hw, hh, r);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.4 * S,  // Slightly thicker to overlap frame
      bevelEnabled: true,
      bevelThickness: 0.15 * S,
      bevelSize: 0.15 * S,
      bevelSegments: 1,
    });
    g.center();
    return g;
  }, []);

  return (
    <mesh
      geometry={geo}
      material={materials.obsidian}
      position={[0, 0, -PD / 2 - 0.2 * S]}  // Slightly closer to outer edge
      castShadow
    />
  );
}

// ---- FRONT CAMERA PUNCH HOLE ----
function PunchHole() {
  return (
    <mesh position={[0, PH / 2 - FRAME - 8 * S, -PD / 2 - 0.2 * S]}>
      <cylinderGeometry args={[2.5 * S, 2.5 * S, 0.5 * S, 16]} />
      <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.9} />
    </mesh>
  );
}

// ---- SIDE BUTTONS ----
function Buttons({ materials }) {
  const buttonDepth = 1.5 * S;
  const buttonWidth = 2.5 * S;
  const buttonMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1a1a'),
    metalness: 0.6,
    roughness: 0.4,
  });
  
  return (
    <group>
      {/* Power — right side */}
      <mesh position={[PW / 2 + buttonDepth / 2, PH / 2 - FRAME - 88 * S, 0]} castShadow>
        <boxGeometry args={[buttonDepth, 52 * S, buttonWidth]} />
        <primitive object={buttonMaterial} />
      </mesh>
      {/* Volume up — left side */}
      <mesh position={[-PW / 2 - buttonDepth / 2, PH / 2 - FRAME - 72 * S, 0]} castShadow>
        <boxGeometry args={[buttonDepth, 32 * S, buttonWidth]} />
        <primitive object={buttonMaterial} />
      </mesh>
      {/* Volume down — left side */}
      <mesh position={[-PW / 2 - buttonDepth / 2, PH / 2 - FRAME - 108 * S, 0]} castShadow>
        <boxGeometry args={[buttonDepth, 32 * S, buttonWidth]} />
        <primitive object={buttonMaterial} />
      </mesh>
      {/* Action — left side */}
      <mesh position={[-PW / 2 - buttonDepth / 2, PH / 2 - FRAME - 150 * S, 0]} castShadow>
        <boxGeometry args={[buttonDepth, 14 * S, buttonWidth]} />
        <primitive object={buttonMaterial} />
      </mesh>
    </group>
  );
}

// ---- BOTTOM EDGE ----
function BottomEdge({ materials }) {
  return (
    <group position={[0, -PH / 2, 0]}>
      {/* USB-C port — recessed into bottom edge */}
      <mesh position={[0, 0, -0.4 * S]}>
        <boxGeometry args={[10 * S, 6 * S, 1.5 * S]} />
        <meshStandardMaterial color="#111111" metalness={0.2} roughness={0.9} />
      </mesh>
      {/* Speaker grille holes — cylinders along Y-axis (into the phone edge) */}
      {[-15 * S, -8 * S, 8 * S, 15 * S].map((x, i) => (
        <mesh key={i} position={[x, 0, -0.4 * S]}>
          <cylinderGeometry args={[0.7 * S, 0.7 * S, 3 * S, 8]} />
          <primitive object={materials.speaker} />
        </mesh>
      ))}
    </group>
  );
}

// ---- TOP EDGE ----
function TopEdge({ materials }) {
  return (
    <group position={[0, PH / 2, 0]}>
      {/* Microphone hole — cylinder along Y-axis */}
      <mesh position={[0, 0, 0.4 * S]}>
        <cylinderGeometry args={[1.2 * S, 1.2 * S, 1.5 * S, 8]} />
        <primitive object={materials.speaker} />
      </mesh>
    </group>
  );
}

// ---- ANTENNA LINES ----
function AntennaLines({ materials }) {
  // Subtle horizontal lines embedded in the frame sides
  const lines = [
    { x: PW / 2, y: PH / 2 - FRAME - 45 * S },
    { x: PW / 2, y: PH / 2 - FRAME - 125 * S },
    { x: -PW / 2, y: PH / 2 - FRAME - 55 * S },
    { x: -PW / 2, y: PH / 2 - FRAME - 130 * S },
  ];
  return (
    <group>
      {lines.map((l, i) => (
        <mesh key={i} position={[l.x, l.y, 0]}>
          {/* Thin line embedded in the side frame */}
          <boxGeometry args={[0.3 * S, 1.2 * S, PD * 0.6]} />
          <primitive object={materials.antenna} />
        </mesh>
      ))}
    </group>
  );
}

// ---- MAIN PHONE ----
export default function Phone3D({ scrollY = 0, isDragging = false, dragRotation = { x: -15, y: 25 } }) {
  const groupRef = useRef();
  const materials = useMaterials();

  useFrame((state) => {
    if (!groupRef.current) return;

    const scrollX = -15 + scrollY * 0.008;
    const scrollY2 = 25 + scrollY * 0.02;
    const targetX = isDragging ? dragRotation.x : scrollX;
    const targetY = isDragging ? dragRotation.y : scrollY2;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      THREE.MathUtils.degToRad(targetX),
      0.06
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      THREE.MathUtils.degToRad(targetY),
      0.06
    );

    // Idle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.003;
  });

  return (
    <group ref={groupRef}>
      <PhoneBody materials={materials} />
      <BackGlass materials={materials} />
      <CameraModule materials={materials} />
      <LensStack materials={materials} />
      <FlashLiDAR materials={materials} />
      <Logo materials={materials} />
      <Display materials={materials} />
      <PunchHole />
      <Buttons materials={materials} />
      <BottomEdge materials={materials} />
      <TopEdge materials={materials} />
      <AntennaLines materials={materials} />
    </group>
  );
}
