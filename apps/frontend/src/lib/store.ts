import { writable } from "svelte/store";
import { Issue } from "../../data";

export interface FrontendVariables {
  currentIssueId: number;
  currentIssue: Issue;
}

const defaultFrontendVariables: FrontendVariables = {
  currentIssueId: 0,
  currentIssue: new Issue(),
};

export const frontendVariables = writable(defaultFrontendVariables);

export function resetFrontendVariables() {
  frontendVariables.set(defaultFrontendVariables);
}
