# Periodic Table 3D

Interactive 3D Periodic Table desktop application built with:

- **React 18** + **TypeScript**
- **Vite**
- **Electron**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**

## Features

- Full interactive periodic table grid
- 3D atomic model preview for every element (Bohr-style visualization)
- Element combination lab – combine elements to discover common compounds
- Data stored in clean JSON (`src/data/elements.json`)
- Application settings via `settings.ini`
- Dark modern UI with category color coding

## Getting Started

```bash
npm install
npm run dev          # Vite only (browser)
npm run electron:dev # Electron + Vite
```

## Project Structure

```
periodic-table-3d/
├── electron/          # Electron main & preload
├── public/
├── src/
│   ├── components/    # UI & 3D components
│   ├── data/          # elements.json
│   ├── styles/
│   ├── types/
│   └── ...
├── settings.ini       # Runtime settings
├── package.json
└── README.md
```

## Roadmap

- Expand to all 118 elements
- More realistic electron cloud visualizations
- Reaction animations in the combination tool
- Export / save combinations
- Themes via settings.ini

## License

MIT
