import { contextBridge, ipcRenderer } from "electron";

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld("electron", {
    quitApp: (): Promise<void> => ipcRenderer.invoke('quitApp'),
    maximizeWindow: (): Promise<boolean> => ipcRenderer.invoke('maximizeWindow'),
    minimizeWindow: (): Promise<void> => ipcRenderer.invoke('minimizeWindow'),
});
