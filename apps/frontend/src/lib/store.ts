import { writable } from "svelte/store";

export interface FrontendVariables {
  currentIssueId: number;
  currentIssue: Issue;
}

export const frontendVariables = writable<FrontendVariables>({
  currentIssueId: 0,
  currentIssue: {
    id: 0,
    title: "",
    description: "",
    priority: "low",
    status: "open",
    tags: [],
    comments: [],
    created: new Date(),
    updated: null,
    closed: null,
  },
});
