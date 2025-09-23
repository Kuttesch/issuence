export {};

import type { Issue } from "../lib/types";

declare global {
  interface Window {
    electron: {
      windowControls: {
        quitApp: () => Promise<void>;
        maximizeWindow: () => Promise<boolean>;
        minimizeWindow: () => Promise<void>;
      };
      database: {
        getIssues: () => Promise<Array<{ id: number; title: string }>>;
        getIssue: (id: number) => Promise<Issue | null>;
        saveIssue: (issue: Issue) => Promise<Issue>;
        deleteIssue: (id: number) => Promise<void>;
      };
    };
  }
}
