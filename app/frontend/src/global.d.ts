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
        getAllIssues: () => Promise<[{ id: number; name: string }]>;
        getIssue: (id: number) => Promise<Issue>;
        saveIssue: (issue: Issue) => Promise<void>;
      };
    };
  }
}
