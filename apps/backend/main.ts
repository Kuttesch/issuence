import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import DB from "./database";
import { Issue } from "./data";
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
  db = new DB();
  await db.initDB();
  // await db.createExampleData();
  console.log("Database initialized");
  console.log(db.getListOfAllIssueNames());
  createWindow();
});

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
ipcMain.handle("getIssue", async (event, id) => {
  if (db !== null) {
    return await db.getIssue(id);
  }
  console.error("Database not initialized");
});

ipcMain.handle("getNumberOfIssues", async () => {
  if (db !== null) {
    return await db.getNumberOfIssues();
  }
  console.error("Database not initialized");
});

ipcMain.handle("getListOfAllIssueNames", async () => {
  if (db !== null) {
    return await db.getListOfAllIssueNames();
  }
  console.error("Database not initialized");
});

ipcMain.handle("getNameOfIssue", async (event, id) => {
  if (db !== null) {
    return await db.getNameOfIssue(id);
  }
  console.error("Database not initialized");
});

ipcMain.handle("getIdOfIssue", async (event, name) => {
  if (db !== null) {
    return await db.getIdOfIssue(name);
  }
  console.error("Database not initialized");
});

ipcMain.handle("addIssue", async (event, issue) => {
  if (db !== null) {
    return await db.addIssue(issue);
  }
  console.error("Database not initialized");
});

ipcMain.handle("saveIssue", async (event, issue) => {
  if (db !== null) {
    return await db.saveIssue(issue);
  }
  console.error("Database not initialized");
});

ipcMain.handle("removeIssue", async (event, id) => {
  if (db !== null) {
    db.removeIssue(id);
  }
  console.error("Database not initialized");
});
