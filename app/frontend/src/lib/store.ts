import { writable } from "svelte/store";
import { Issue } from "../../data";

export interface FrontendVariables {
  currentIssueId: number;
  currentPage: number;
  currentIssue: Issue;
}

const defaultFrontendVariables: FrontendVariables = {
  currentIssueId: 0,
  currentPage: 0,
  currentIssue: new Issue(),
};

export const theme = writable<"light" | "dark">("light");
export const frontendVariables = writable(defaultFrontendVariables);

export function resetFrontendVariables() {
  frontendVariables.set(defaultFrontendVariables);
}
