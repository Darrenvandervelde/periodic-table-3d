import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

let mainWindow: BrowserWindow | null = null;

function loadSettings() {
  try {
    const settingsPath = path.join(app.getAppPath(), 'settings.ini');
    if (fs.existsSync(settingsPath)) {
      const content = fs.readFileSync(settingsPath, 'utf-8');
      return ini.parse(content);
    }
  } catch (e) {
    console.warn('Could not load settings.ini', e);
  }
  return {
    window: { width: 1400, height: 900, minWidth: 1024, minHeight: 700 },
  };
}

function createWindow() {
  const settings = loadSettings();
  const winCfg = settings.window || {};

  mainWindow = new BrowserWindow({
    width: Number(winCfg.width) || 1400,
    height: Number(winCfg.height) || 900,
    minWidth: Number(winCfg.minWidth) || 1024,
    minHeight: Number(winCfg.minHeight) || 700,
    backgroundColor: '#0a0a1a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Periodic Table 3D',
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
