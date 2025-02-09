import { contextBridge, ipcRenderer } from "electron";
import  DB from "./database";
import { Issue } from "./data";

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld("electron", {
    quitApp: (): Promise<void> => ipcRenderer.invoke('quitApp'),
    maximizeWindow: (): Promise<boolean> => ipcRenderer.invoke('maximizeWindow'),
    minimizeWindow: (): Promise<void> => ipcRenderer.invoke('minimizeWindow'),
    createIssueInstance: (db: DB) => new Issue(db),
    createDBInstance: (file: string | undefined) => new DB(file),
});
