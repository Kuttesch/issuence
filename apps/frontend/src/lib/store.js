import { writable } from 'svelte/store';

export const frontendVariables = writable({
    currentIssueId: 1,
});

export const commentStore = writable({
    title: "",
    description: "",
    created: "",
    updated: ""
});

export const issueStore = writable({
    id: 1,
    title: "Issue Title",
    description: "Issue Description",
    priority: "",
    status: "",
    tags: [],
    created: "",
    updated: "",
    closed: false,
    comments: []
});

// Method to add a new comment to the issue
export function addComment(newComment) {
    // Directly push the new comment object to the comments array
    issueStore.update(currentIssue => {
        currentIssue.comments.push(newComment);
        return currentIssue;
    });
}
