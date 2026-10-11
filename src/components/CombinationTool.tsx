import { useState } from 'react';
import { Element, CombinationResult } from '../types/element';
import './CombinationTool.css';

interface CombinationToolProps {
  selection: Element[];
  onClear: () => void;
  onRemove: (atomicNumber: number) => void;
  allElements: Element[];
}

const KNOWN_COMPOUNDS: Record<string, { name: string; description: string }> = {
  'H,O': { name: 'Water (H₂O)', description: 'The most essential compound for life on Earth.' },
  'H,H,O': { name: 'Water (H₂O)', description: 'The most essential compound for life on Earth.' },
  'C,O': { name: 'Carbon Monoxide (CO)', description: 'A colorless, odorless toxic gas.' },
  'C,O,O': { name: 'Carbon Dioxide (CO₂)', description: 'A greenhouse gas produced by respiration and combustion.' },
  'N,H,H,H': { name: 'Ammonia (NH₃)', description: 'A key compound in fertilizers and cleaning products.' },
  'H,Cl': { name: 'Hydrogen Chloride (HCl)', description: 'Forms hydrochloric acid in water.' },
  'Na,Cl': { name: 'Sodium Chloride (NaCl)', description: 'Common table salt.' },
  'C,H': { name: 'Methane (CH₄) precursor', description: 'Simplest hydrocarbon building block.' },
  'O,O': { name: 'Oxygen Gas (O₂)', description: 'Diatomic oxygen essential for respiration.' },
  'N,N': { name: 'Nitrogen Gas (N₂)', description: 'Makes up most of Earth\'s atmosphere.' },
  'H,H': { name: 'Hydrogen Gas (H₂)', description: 'The lightest molecule.' },
  'F,H': { name: 'Hydrogen Fluoride (HF)', description: 'A highly reactive and corrosive compound.' },
};

function getKey(symbols: string[]): string {
  return [...symbols].sort().join(',');
}

export function CombinationTool({ selection, onClear, onRemove }: CombinationToolProps) {
  const [result, setResult] = useState<CombinationResult | null>(null);

  const canCombine = selection.length >= 2;

  const attemptCombine = () => {
    if (!canCombine) return;
    const symbols = selection.map(e => e.symbol);
    const key = getKey(symbols);
    const known = KNOWN_COMPOUNDS[key];

    if (known) {
      setResult({
        formula: known.name.split('(')[1]?.replace(')', '') || symbols.join(''),
        name: known.name,
        elements: symbols,
        description: known.description,
        isValid: true,
      });
    } else {
      setResult({
        formula: symbols.join(''),
        name: 'Unknown Combination',
        elements: symbols,
        description: 'This combination is not in the current knowledge base. Try common pairs like H+O, C+O, Na+Cl.',
        isValid: false,
      });
    }
  };

  return (
    <div className="combine-container">
      <div className="combine-panel">
        <h2>Element Combination Lab</h2>
        <p className="hint">Select 2–4 elements from the sidebar or table, then combine them to discover compounds.</p>

        <div className="selection-area">
          {selection.length === 0 ? (
            <div className="empty-state">No elements selected yet. Use "Add to Combine" on any element.</div>
          ) : (
            <div className="selected-elements">
              {selection.map(el => (
                <div key={el.atomicNumber} className="selected-chip" style={{ borderColor: el.color }}>
                  <span className="chip-symbol" style={{ color: el.color }}>{el.symbol}</span>
                  <span className="chip-name">{el.name}</span>
                  <button className="chip-remove" onClick={() => onRemove(el.atomicNumber)}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="combine-actions">
          <button className="btn-combine" disabled={!canCombine} onClick={attemptCombine}>
            Combine Elements
          </button>
          <button className="btn-clear" onClick={() => { onClear(); setResult(null); }} disabled={selection.length === 0}>
            Clear
          </button>
        </div>

        {result && (
          <div className={`result-card ${result.isValid ? 'valid' : 'unknown'}`}>
            <h3>{result.name}</h3>
            <p className="formula">{result.formula}</p>
            <p>{result.description}</p>
          </div>
        )}
      </div>

      <div className="combine-tips">
        <h3>Try these combinations</h3>
        <ul>
          <li>H + O → Water</li>
          <li>C + O → Carbon oxides</li>
          <li>N + H → Ammonia</li>
          <li>H + Cl → Hydrogen chloride</li>
          <li>O + O → Oxygen gas</li>
        </ul>
        <p className="note">More compounds and reaction animations will be added as the project grows.</p>
      </div>
    </div>
  );
}
