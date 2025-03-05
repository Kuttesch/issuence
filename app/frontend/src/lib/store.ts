import { writable } from "svelte/store";
import { Issue } from "../../data";
import { onMount } from "svelte";

export interface FrontendVariables {
}

export interface CurrentIssue extends Issue{}

export interface AllIssues {
  issues: [
    {
      id: number;
      name: string;
    }
  ]
}

export const currentPage = writable<number>(0)
export const frontendVariables = writable<FrontendVariables>()
export const currentIssue = writable<CurrentIssue>()
export const allIssues = writable<AllIssues>({ issues: [] });
export const theme = writable<"light" | "dark">("light");

export const loadIssue = async (id: number) => {
  const issue = await window.electron.database.getIssue(id);
  currentIssue.set(issue);
}

currentIssue.subscribe(async (issue) => {
  console.log("Current issue changed:", issue);
  await window.electron.database.saveIssue(issue);
});

export async function initStore(){
  frontendVariables.set({ currentPage: 1 });
  const issues = await window.electron.database.getAllIssues();
  allIssues.set({ issues });
}