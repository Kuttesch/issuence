import { contextBridge, ipcRenderer } from "electron";
import type { Issue } from "./data";

contextBridge.exposeInMainWorld("electron", {
  windowControls: {
    quitApp: (): Promise<void> => ipcRenderer.invoke("quitApp"),
    maximizeWindow: (): Promise<boolean> =>
      ipcRenderer.invoke("maximizeWindow"),
    minimizeWindow: (): Promise<void> => ipcRenderer.invoke("minimizeWindow"),
  },
  database: {
    getAllIssues: (): Promise<[{ id: number; name: string }]> => ipcRenderer.invoke("getAllIssues"),
    getIssue: (id: number): Promise<Issue> => ipcRenderer.invoke("getIssue", id),
    saveIssue: (issue: Issue): Promise<void> => ipcRenderer.invoke("saveIssue", issue),
  },
});
