import { useState, useEffect } from 'react';
import { PeriodicTable } from './components/PeriodicTable';
import { ElementPreview } from './components/ElementPreview';
import { CombinationTool } from './components/CombinationTool';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Element } from './types/element';
import elementsData from './data/elements.json';
import './styles/App.css';

type Tab = 'table' | 'preview' | 'combine';

function App() {
  const [elements] = useState<Element[]>(elementsData as Element[]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('table');
  const [combineSelection, setCombineSelection] = useState<Element[]>([]);

  useEffect(() => {
    if (elements.length > 0 && !selectedElement) {
      setSelectedElement(elements[0]);
    }
  }, [elements, selectedElement]);

  const handleSelectElement = (el: Element) => {
    setSelectedElement(el);
    if (activeTab === 'table') {
      setActiveTab('preview');
    }
  };

  const handleAddToCombine = (el: Element) => {
    if (combineSelection.length < 4 && !combineSelection.find(e => e.atomicNumber === el.atomicNumber)) {
      setCombineSelection(prev => [...prev, el]);
      setActiveTab('combine');
    }
  };

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="main-content">
        <Sidebar
          selectedElement={selectedElement}
          onSelect={handleSelectElement}
          elements={elements}
          onAddToCombine={handleAddToCombine}
        />
        <div className="content-area">
          {activeTab === 'table' && (
            <PeriodicTable
              elements={elements}
              selected={selectedElement}
              onSelect={handleSelectElement}
            />
          )}
          {activeTab === 'preview' && selectedElement && (
            <ElementPreview element={selectedElement} />
          )}
          {activeTab === 'combine' && (
            <CombinationTool
              selection={combineSelection}
              onClear={() => setCombineSelection([])}
              onRemove={(n) => setCombineSelection(prev => prev.filter(e => e.atomicNumber !== n))}
              allElements={elements}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
