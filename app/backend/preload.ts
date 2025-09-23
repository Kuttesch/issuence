import { contextBridge, ipcRenderer } from "electron";
import type { Issue } from "./db/types";

contextBridge.exposeInMainWorld("electron", {
  windowControls: {
    quitApp: (): Promise<void> => ipcRenderer.invoke("quitApp"),
    maximizeWindow: (): Promise<boolean> =>
      ipcRenderer.invoke("maximizeWindow"),
    minimizeWindow: (): Promise<void> => ipcRenderer.invoke("minimizeWindow"),
  },
  database: {
    getIssues: (): Promise<Array<{ id: number; title: string }>> =>
      ipcRenderer.invoke("getIssues"),
    getIssue: (id: number): Promise<Issue | null> =>
      ipcRenderer.invoke("getIssue", id),
    saveIssue: (issue: Issue): Promise<Issue> =>
      ipcRenderer.invoke("saveIssue", issue),
    deleteIssue: (id: number): Promise<void> =>
      ipcRenderer.invoke("deleteIssue", id),
  },
});
