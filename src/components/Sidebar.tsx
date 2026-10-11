import { Element } from '../types/element';
import './Sidebar.css';

interface SidebarProps {
  selectedElement: Element | null;
  onSelect: (el: Element) => void;
  elements: Element[];
  onAddToCombine: (el: Element) => void;
}

export function Sidebar({ selectedElement, onSelect, elements, onAddToCombine }: SidebarProps) {
  if (!selectedElement) return null;

  return (
    <aside className="sidebar">
      <div className="element-card" style={{ borderColor: selectedElement.color }}>
        <div className="atomic-number">{selectedElement.atomicNumber}</div>
        <div className="symbol" style={{ color: selectedElement.color }}>
          {selectedElement.symbol}
        </div>
        <div className="name">{selectedElement.name}</div>
        <div className="mass">{selectedElement.atomicMass}</div>
      </div>

      <div className="details">
        <h3>Properties</h3>
        <dl>
          <dt>Category</dt>
          <dd className={`category ${selectedElement.category}`}>
            {selectedElement.category.replace('-', ' ')}
          </dd>
          <dt>Group / Period</dt>
          <dd>{selectedElement.group ?? '—'} / {selectedElement.period}</dd>
          <dt>Block</dt>
          <dd>{selectedElement.block.toUpperCase()}</dd>
          <dt>Electron Config</dt>
          <dd className="mono">{selectedElement.electronConfiguration}</dd>
          <dt>Electronegativity</dt>
          <dd>{selectedElement.electronegativity ?? '—'}</dd>
          <dt>Atomic Radius</dt>
          <dd>{selectedElement.atomicRadius ? `${selectedElement.atomicRadius} pm` : '—'}</dd>
          <dt>State</dt>
          <dd>{selectedElement.state}</dd>
        </dl>
      </div>

      <p className="description">{selectedElement.description}</p>

      <div className="actions">
        <button className="btn-primary" onClick={() => onAddToCombine(selectedElement)}>
          Add to Combine
        </button>
      </div>

      <div className="quick-list">
        <h4>Quick Select</h4>
        <div className="quick-grid">
          {elements.slice(0, 20).map(el => (
            <button
              key={el.atomicNumber}
              className={selectedElement.atomicNumber === el.atomicNumber ? 'active' : ''}
              style={{ borderColor: el.color }}
              onClick={() => onSelect(el)}
              title={el.name}
            >
              {el.symbol}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
