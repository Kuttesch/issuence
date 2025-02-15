// global.d.ts
export {};

declare global {
  interface Window {
    electron: {
      windowControls: {
        quitApp: () => Promise<void>;
        maximizeWindow: () => Promise<boolean>;
        minimizeWindow: () => Promise<void>;
      };
      database: {
        getIssue: (id: number) => Promise<Issue>;
        getNumberOfIssues: () => Promise<number>;
        getListOfAllIssueNames: () => Promise<string[]>;
        getNameOfIssue: (id: number) => Promise<string>;
        getIdOfIssue: (name: string) => Promise<number>;
        addIssue: (issue: Issue) => Promise<void>;
        saveIssue: (issue: Issue) => Promise<void>;
        removeIssue: (id: number) => Promise<void>;
      };
    };
  }
}