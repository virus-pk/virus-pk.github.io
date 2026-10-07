import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  AdaptiveDpr,
  Float,
  Icosahedron,
  MeshDistortMaterial,
  PerformanceMonitor,
  RoundedBox,
  Sparkles,
} from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const AMBER = '#ffc107';
const ORANGE = '#ff9800';
// Camera stop per page section (home, about, projects, skills, contact).
const SECTION_Z = [0, -14, -28, -42, -56];

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return progress;
}

function CameraRig({ progress, mobile }: { progress: React.RefObject<number>; mobile: boolean }) {
  const { camera, pointer } = useThree();
  useFrame((_, dt) => {
    const t = (progress.current ?? 0) * (SECTION_Z.length - 1);
    const i = Math.min(Math.floor(t), SECTION_Z.length - 2);
    const f = THREE.MathUtils.smootherstep(t - i, 0, 1);
    const z = THREE.MathUtils.lerp(SECTION_Z[i], SECTION_Z[i + 1], f) + 8;
    const k = 1 - Math.exp(-4 * dt);
    camera.position.z += (z - camera.position.z) * k;
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * k;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * k;
    camera.lookAt(mobile ? 0 : camera.position.x * 0.5, 0, camera.position.z - 8);
  });
  return null;
}

function Starfield({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = (Math.random() - 0.5) * 24;
      p[i * 3 + 2] = 12 - Math.random() * 84;
    }
    return p;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.01;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={AMBER} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function HeroOrb({ x }: { x: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group position={[x, 0, SECTION_Z[0]]}>
        <Icosahedron args={[1.25, 24]}>
          <MeshDistortMaterial color={ORANGE} emissive={AMBER} emissiveIntensity={0.12} roughness={0.2} metalness={0.85} distort={0.35} speed={2} />
        </Icosahedron>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.1, 0.015, 16, 128]} />
          <meshBasicMaterial color={AMBER} toneMapped={false} />
        </mesh>
        <Sparkles count={60} scale={6} size={3} speed={0.4} color={AMBER} />
      </group>
    </Float>
  );
}

function AboutKnot({ x }: { x: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.15;
      ref.current.rotation.y += dt * 0.25;
    }
  });
  return (
    <group ref={ref} position={[x, 0, SECTION_Z[1]]}>
      <mesh>
        <torusKnotGeometry args={[1.3, 0.38, 220, 24, 2, 3]} />
        <meshStandardMaterial color="#1a1206" emissive={ORANGE} emissiveIntensity={0.25} metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh scale={1.04}>
        <torusKnotGeometry args={[1.3, 0.38, 110, 12, 2, 3]} />
        <meshBasicMaterial color={AMBER} wireframe transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ProjectPanels() {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame((_, dt) => {
    if (!ref.current) return;
    const k = 1 - Math.exp(-3 * dt);
    ref.current.rotation.y += (pointer.x * 0.25 - ref.current.rotation.y) * k;
    ref.current.rotation.x += (-pointer.y * 0.15 - ref.current.rotation.x) * k;
  });
  return (
    <group ref={ref} position={[0, 0.4, SECTION_Z[2] - 7]}>
      {[-1, 0, 1].map((i) => (
        <Float key={i} speed={2} floatIntensity={0.6} rotationIntensity={0.2}>
          <group position={[i * 4.2, 0, -Math.abs(i) * 1.5]} rotation={[0, -i * 0.35, 0]}>
            <RoundedBox args={[3.4, 4.6, 0.12]} radius={0.12}>
              <meshPhysicalMaterial color="#14100a" metalness={0.2} roughness={0.1} transmission={0.6} thickness={0.5} transparent opacity={0.6} />
            </RoundedBox>
            <mesh position={[0, 0, 0.07]}>
              <planeGeometry args={[2.6, 0.04]} />
              <meshBasicMaterial color={AMBER} toneMapped={false} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

function SkillOrbit({ x }: { x: number }) {
  const ref = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const n = 7;
    return Array.from({ length: n }, (_, i) => {
      // Fibonacci sphere for even spacing.
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = i * Math.PI * (3 - Math.sqrt(5));
      return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r).multiplyScalar(2.2);
    });
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });
  return (
    <group position={[x, 0, SECTION_Z[3]]}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial color={AMBER} wireframe transparent opacity={0.15} />
        </mesh>
        {nodes.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.18, 24, 24]} />
            <meshBasicMaterial color={i % 2 ? AMBER : ORANGE} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={ORANGE} emissive={AMBER} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function Portal() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.2;
  });
  return (
    <group ref={ref} position={[0, 0, SECTION_Z[4] - 4]}>
      {[3.2, 3.8, 4.4].map((r, i) => (
        <mesh key={r} rotation={[0, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.03 + i * 0.01, 16, 160, Math.PI * (1.4 + i * 0.2)]} />
          <meshBasicMaterial color={i === 1 ? ORANGE : AMBER} toneMapped={false} transparent opacity={0.9 - i * 0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene() {
  const progress = useScrollProgress();
  const [enabled, setEnabled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [highQuality, setHighQuality] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!reduced && hasWebGL());
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  if (!enabled) return null;
  // On desktop objects sit right of the text; on mobile they sit behind it.
  const side = mobile ? 0 : 3.4;
  const lift = mobile ? 2.2 : 0;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, mobile ? 1.5 : 2]}
      gl={{ antialias: !mobile, powerPreference: 'high-performance' }}
      style={{ opacity: mobile ? 0.4 : 1 }}
    >
      <PerformanceMonitor onDecline={() => setHighQuality(false)} />
      <AdaptiveDpr pixelated />
      <color attach="background" args={['#07070c']} />
      <fog attach="fog" args={['#07070c', 9, 19]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 4, 6]} intensity={60} color={AMBER} />
      <directionalLight position={[-5, 3, -20]} intensity={1.5} color="#ffffff" />
      <CameraRig progress={progress} mobile={mobile} />
      <Starfield count={mobile ? 700 : 1800} />
      <group position={[0, lift, 0]}>
        <HeroOrb x={side} />
      </group>
      <AboutKnot x={side} />
      <ProjectPanels />
      <SkillOrbit x={side} />
      <Portal />
      {highQuality && !mobile && (
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.3} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}
