import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Element } from '../types/element';

interface AtomModelProps {
  element: Element;
}

// Bohr-model shell capacities: 2, 8, 18, 32...
function getShellElectrons(atomicNumber: number): number[] {
  const capacities = [2, 8, 18, 32, 32, 18, 8];
  const shells: number[] = [];
  let remaining = atomicNumber;
  for (const cap of capacities) {
    if (remaining <= 0) break;
    const take = Math.min(cap, remaining);
    shells.push(take);
    remaining -= take;
  }
  return shells.length ? shells : [1];
}

export function AtomModel({ element }: AtomModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shells = useMemo(() => getShellElectrons(element.atomicNumber), [element.atomicNumber]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const nucleusColor = element.color || '#ffffff';

  return (
    <group ref={groupRef}>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={nucleusColor}
          emissive={nucleusColor}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Electron shells */}
      {shells.map((count, shellIdx) => {
        const radius = 1.4 + shellIdx * 1.1;
        const electrons = [];
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          electrons.push(
            <mesh
              key={`${shellIdx}-${i}`}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 0.3) * 0.3,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color="#4fc3f7"
                emissive="#4fc3f7"
                emissiveIntensity={0.8}
              />
            </mesh>
          );
        }

        return (
          <group key={shellIdx}>
            {/* Orbit ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.015, 8, 64]} />
              <meshBasicMaterial color="#4fc3f7" transparent opacity={0.3} />
            </mesh>
            {electrons}
          </group>
        );
      })}

      {/* Soft glow */}
      <mesh>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color={nucleusColor} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
