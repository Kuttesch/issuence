// src/lib/store.ts
import { writable } from "svelte/store";
import type { Issue } from "./types";

export const issues = writable<{ id: number; title: string }[]>([]);
export const currentIssue = writable<Issue | null>(null);
export const theme = writable<"light" | "dark">("light");
export const currentPage = writable<0 | 1>(0);
export const edit = writable<boolean>(false);

// Load all issues
export async function loadIssues() {
  const list = await window.electron.database.getIssues();
  issues.set(list);
}

// Load one issue
export async function loadIssue(id: number) {
  const issue = await window.electron.database.getIssue(id);
  currentIssue.set(issue);
}

// Save (new or existing) issue
export async function saveIssue(issue: Issue) {
  const saved = await window.electron.database.saveIssue(issue);
  await loadIssues();
  currentIssue.set(saved);
}

// Delete issue
export async function deleteIssue(id: number) {
  await window.electron.database.deleteIssue(id);
  await loadIssues();
  currentIssue.set(null);
}
