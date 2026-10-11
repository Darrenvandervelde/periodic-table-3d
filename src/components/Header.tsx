import './Header.css';

type Tab = 'table' | 'preview' | 'combine';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">⚛</span>
        <h1>Periodic Table 3D</h1>
      </div>
      <nav className="tabs">
        <button
          className={activeTab === 'table' ? 'active' : ''}
          onClick={() => onTabChange('table')}
        >
          Periodic Table
        </button>
        <button
          className={activeTab === 'preview' ? 'active' : ''}
          onClick={() => onTabChange('preview')}
        >
          3D Preview
        </button>
        <button
          className={activeTab === 'combine' ? 'active' : ''}
          onClick={() => onTabChange('combine')}
        >
          Combine Elements
        </button>
      </nav>
    </header>
  );
}
