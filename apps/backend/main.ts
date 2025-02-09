import { app, BrowserWindow } from "electron";


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
    
  });

  win.loadURL("http://localhost:5173/");
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
