export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  group: number | null;
  period: number;
  block: 's' | 'p' | 'd' | 'f';
  electronConfiguration: string;
  electronegativity: number | null;
  atomicRadius: number | null;
  ionizationEnergy: number | null;
  density: number | null;
  meltingPoint: number | null;
  boilingPoint: number | null;
  discoveryYear: number | null;
  color: string;
  state: 'solid' | 'liquid' | 'gas' | 'unknown';
  description: string;
}

export interface CombinationResult {
  formula: string;
  name: string;
  elements: string[];
  description: string;
  isValid: boolean;
}

export interface AppSettings {
  app: {
    name: string;
    version: string;
    theme: string;
    language: string;
  };
  display: {
    showAtomicNumber: boolean;
    showAtomicMass: boolean;
    showElectronConfig: boolean;
    defaultZoom: number;
    animationSpeed: number;
  };
  '3d': {
    enableOrbitControls: boolean;
    autoRotate: boolean;
    backgroundColor: string;
    atomScale: number;
    showElectronClouds: boolean;
    showNucleus: boolean;
  };
  tools: {
    enableCombination: boolean;
    maxCombineElements: number;
    showReactionPreview: boolean;
  };
  window: {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
  };
}
