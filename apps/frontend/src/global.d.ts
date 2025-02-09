// global.d.ts
export {};

declare global {
  interface Window {
    electron: {
        quitApp: () => Promise<void>;
        maximizeWindow: () => Promise<boolean>;
        minimizeWindow: () => Promise<void>;
    };
  }
}
