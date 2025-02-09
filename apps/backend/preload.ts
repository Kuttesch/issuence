import { contextBridge, ipcRenderer } from 'electron';
import { Issue } from './data';

contextBridge.exposeInMainWorld('electron', {
        quitApp: (): Promise<void> => ipcRenderer.invoke('quitApp'),
        maximizeWindow: (): Promise<boolean> => ipcRenderer.invoke('maximizeWindow'),
        minimizeWindow: (): Promise<void> => ipcRenderer.invoke('minimizeWindow'),
        getIssue: (id: number): Promise<Issue> => ipcRenderer.invoke('getIssue', id),
        getNumberOfIssues: (): Promise<number> => ipcRenderer.invoke('getNumberOfIssues'),
        getListOfAllIssueNames: (): Promise<string[]> => ipcRenderer.invoke('getListOfAllIssueNames'),
        getNameOfIssue: (id: number): Promise<string> => ipcRenderer.invoke('getNameOfIssue', id),
        addIssue: (issue: Issue): Promise<void> => ipcRenderer.invoke('addIssue', issue),
        saveIssue: (issue: Issue): Promise<void> => ipcRenderer.invoke('saveIssue', issue),
        removeIssue: (id: number): Promise<void> => ipcRenderer.invoke('removeIssue', id),
});
