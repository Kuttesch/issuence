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

  type Comment = {
    id: number;
    text: string;
    created: Date;
    updated?: Date;
  };

  type Issue = {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    tags: Tags[];
    comments: Comment[];
    created: Date;
    updated: Date | null;
    closed: Date | null;
  };

  type Priority = 'low' | 'medium' | 'high';

  type Status = 'open' | 'done' | 'current' | 'later';

  type Tags = 'bug' | 'feature' | 'improvement';
}
