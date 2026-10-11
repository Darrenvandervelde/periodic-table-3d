# Periodic Table 3D

Interactive 3D Periodic Table desktop application built with:

- **React 18** + **TypeScript**
- **Vite**
- **Electron**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**

## Features

- Interactive periodic table grid (Periods 1–4 – **36 elements**, H–Kr)
- 3D Bohr-model atom preview with correct shell filling
- Element combination lab with many known compounds
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
│   ├── data/          # elements.json (36 elements)
│   ├── styles/
│   ├── types/
│   └── ...
├── settings.ini       # Runtime settings
├── package.json
└── README.md
```

## Roadmap

- [x] Periods 1–4 (H–Kr)
- [ ] Periods 5–7 + lanthanides/actinides
- [ ] More realistic electron cloud visualizations
- [ ] Reaction animations in the combination tool
- [ ] Themes via settings.ini

## License

MIT
