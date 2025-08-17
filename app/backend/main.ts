import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { format } from "url";

// --- import our SQLite functions ---
import {
  get_all_issues,
  get_issue,
  save_issue,
  delete_issue,
} from "./db/database";
import type { Issue } from "./db/types";

function createWindow() {
  const win = new BrowserWindow({
    width: 950,
    height: 500,
    minWidth: 950,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
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
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => {
  console.log("App ready. Make sure to run `pnpm db:create` once to initialize DB.");
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// --- window control IPC ---
ipcMain.handle("quitApp", () => {
  app.quit();
});

ipcMain.handle("maximizeWindow", () => {
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
});

ipcMain.handle("minimizeWindow", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.minimize();
  }
});

// --- database IPC ---
ipcMain.handle("getIssues", () => {
  return get_all_issues();
});

ipcMain.handle("getIssue", (_event, id: number) => {
  return get_issue(id);
});

ipcMain.handle("saveIssue", (_event, issue: Issue) => {
  return save_issue(issue);
});

ipcMain.handle("deleteIssue", (_event, id: number) => {
  return delete_issue(id);
});
