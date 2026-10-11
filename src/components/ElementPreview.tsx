import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Element } from '../types/element';
import { AtomModel } from './AtomModel';
import './ElementPreview.css';

interface ElementPreviewProps {
  element: Element;
}

export function ElementPreview({ element }: ElementPreviewProps) {
  return (
    <div className="preview-container">
      <div className="preview-canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <color attach="background" args={['#0a0a1a']} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4fc3f7" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <AtomModel element={element} />
          <OrbitControls enablePan={false} minDistance={4} maxDistance={15} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      <div className="preview-info">
        <h2>
          <span style={{ color: element.color }}>{element.symbol}</span> — {element.name}
        </h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Atomic Number</label>
            <value>{element.atomicNumber}</value>
          </div>
          <div className="info-item">
            <label>Atomic Mass</label>
            <value>{element.atomicMass}</value>
          </div>
          <div className="info-item">
            <label>Electron Configuration</label>
            <value className="mono">{element.electronConfiguration}</value>
          </div>
          <div className="info-item">
            <label>Category</label>
            <value className="capitalize">{element.category.replace('-', ' ')}</value>
          </div>
          <div className="info-item">
            <label>State at STP</label>
            <value className="capitalize">{element.state}</value>
          </div>
          <div className="info-item">
            <label>Discovery</label>
            <value>{element.discoveryYear ?? 'Ancient'}</value>
          </div>
        </div>
        <p className="desc">{element.description}</p>
      </div>
    </div>
  );
}
