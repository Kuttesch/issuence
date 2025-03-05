import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import DB from "./database";
import { format } from "url";

let db: DB | null = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 950,
    height: 500,
    minWidth: 950,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Set preload script path
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Isolate renderer process from node.js
    },
    frame: false,
    icon: path.join(__dirname, "/src/icon.png"),
  });

  const isDev = !app.isPackaged;
  const startURL = isDev
    ? "http://localhost:5173"
    : format({
        pathname: path.join(__dirname, "../public/index.html"),
        protocol: "file:",
        slashes: true,
      });

  win.loadURL(startURL);

  if (isDev) {
    win.webContents.openDevTools({
      mode: "detach",
    });
  }
}
app.whenReady().then(async () => {
  console.log("Initializing database");
  db = new DB();
  await db.initDB();
  console.log("Database initialized");
  console.log(await db.getAllIssues());
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Example function to be called from the Svelte app
function quitApp() {
  if (db) {
    // db.saveDatabase();
  } else {
    console.error("Database not initialized");
  }
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
ipcMain.handle("quitApp", () => {
  quitApp();
});

ipcMain.handle("maximizeWindow", () => {
  return maximizeWindow();
});

ipcMain.handle("minimizeWindow", () => {
  minimizeWindow();
});

// Database functions

ipcMain.handle("getAllIssues", async () => {
  if (db !== null) {
    return await db.getAllIssues();
  }
  console.error("Database not initialized");
});

ipcMain.handle("getIssue", async (event, id) => {
  if (db !== null) {
    return await db.getIssue(id);
  }
  console.error("Database not initialized");
});

ipcMain.handle("saveIssue", async (event, issue) => {
  if (db !== null) {
    return await db.saveIssue(issue);
  }
  console.error("Database not initialized");
});
