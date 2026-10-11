import { Element } from '../types/element';
import './PeriodicTable.css';

interface PeriodicTableProps {
  elements: Element[];
  selected: Element | null;
  onSelect: (el: Element) => void;
}

// Standard periodic table layout positions (period, group)
const positions: Record<number, { row: number; col: number }> = {
  // Period 1
  1: { row: 1, col: 1 },
  2: { row: 1, col: 18 },
  // Period 2
  3: { row: 2, col: 1 },
  4: { row: 2, col: 2 },
  5: { row: 2, col: 13 },
  6: { row: 2, col: 14 },
  7: { row: 2, col: 15 },
  8: { row: 2, col: 16 },
  9: { row: 2, col: 17 },
  10: { row: 2, col: 18 },
  // Period 3
  11: { row: 3, col: 1 },
  12: { row: 3, col: 2 },
  13: { row: 3, col: 13 },
  14: { row: 3, col: 14 },
  15: { row: 3, col: 15 },
  16: { row: 3, col: 16 },
  17: { row: 3, col: 17 },
  18: { row: 3, col: 18 },
  // Period 4 s-block
  19: { row: 4, col: 1 },
  20: { row: 4, col: 2 },
};

export function PeriodicTable({ elements, selected, onSelect }: PeriodicTableProps) {
  return (
    <div className="periodic-table-wrapper">
      <div className="periodic-table">
        {elements.map(el => {
          const pos = positions[el.atomicNumber] || { row: el.period, col: el.group || 1 };
          return (
            <button
              key={el.atomicNumber}
              className={`element-cell ${el.category} ${selected?.atomicNumber === el.atomicNumber ? 'selected' : ''}`}
              style={{
                gridRow: pos.row,
                gridColumn: pos.col,
                '--el-color': el.color,
              } as React.CSSProperties}
              onClick={() => onSelect(el)}
              title={`${el.name} (${el.symbol})`}
            >
              <span className="cell-number">{el.atomicNumber}</span>
              <span className="cell-symbol">{el.symbol}</span>
              <span className="cell-name">{el.name}</span>
              <span className="cell-mass">{el.atomicMass.toFixed(2)}</span>
            </button>
          );
        })}
      </div>
      <div className="legend">
        <span className="legend-item alkali-metal">Alkali</span>
        <span className="legend-item alkaline-earth">Alkaline Earth</span>
        <span className="legend-item nonmetal">Nonmetal</span>
        <span className="legend-item metalloid">Metalloid</span>
        <span className="legend-item halogen">Halogen</span>
        <span className="legend-item noble-gas">Noble Gas</span>
        <span className="legend-item post-transition">Post-transition</span>
      </div>
    </div>
  );
}
