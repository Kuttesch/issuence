import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Set preload script path
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Isolate renderer process from node.js
    },
    frame: false,
  });

  win.loadURL("http://localhost:5173/"); // Change to where your Svelte app is served
  win.webContents.openDevTools({
    mode: "detach",
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Example function to be called from the Svelte app
function quitApp() {
  app.quit();
}

function maximizeWindow() {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
      return false;
    } else {
      win.maximize();
      return true;
    }
  }
  return false;
}

function minimizeWindow() {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.minimize();
  }
}

// Expose the function to the renderer process via IPC
ipcMain.handle('quitApp', () => {
  quitApp();
});

ipcMain.handle('maximizeWindow', () => {
  return maximizeWindow();
});

ipcMain.handle('minimizeWindow', () => {
  minimizeWindow();
});

