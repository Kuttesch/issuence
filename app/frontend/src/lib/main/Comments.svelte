<script lang="ts">
    import { Timeline } from "svelte-vertical-timeline";
    import { frontendVariables } from "../store";
    import CommentComponent from "./CommentComponent.svelte";
    import { createEventDispatcher } from "svelte";
    import { Button, Hr, Input } from "flowbite-svelte";
    import { Comment } from "../../../data";
    
    let newText: string = "";
    let dispatcher = createEventDispatcher();
    function handleDeleteComment(event: CustomEvent<number>) {
        $frontendVariables.currentIssue.comments = $frontendVariables.currentIssue.comments.filter(comment => comment.id !== event.detail);
        dispatcher("saveIssue");
    }

    async function addComment() {
        if (newText === "") {
            return;
        }
        let newID = $frontendVariables.currentIssue.comments.length + 1;
        let comment = new Comment(newID, newText);
        $frontendVariables.currentIssue.comments.push(comment);
        $frontendVariables.currentIssue.comments = $frontendVariables.currentIssue.comments;
        newText = "";
        console.log($frontendVariables.currentIssue.comments)
        dispatcher("saveCurrentIssue");
        dispatcher('scrollToBottom');
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            addComment();
        }
    }
    console.log($frontendVariables.currentIssue.comments)
</script>

<div class="w-full h-auto rounded-2xl flex flex-col items-start justify-start pt-4 pb-4 p-2 mt-2 mb-2">
    <div class="text-2xl text-text dark:text-dark-text font-bold">Comments</div>
        <Timeline>
            {#if $frontendVariables.currentIssue.comments.length === 0}
                <div class="text-text dark:text-dark-text">No comments yet ...</div>
            {:else}
                {#each $frontendVariables.currentIssue.comments as comment}
                    <CommentComponent id={comment.id} on:deleteComment={handleDeleteComment} />
                {/each}
            {/if}
        </Timeline>
</div>
<Hr />
<div class="w-full h-auto flex flex-col items-start justify-start">
    <div class="w-full h-auto flex items-center justify-start bg-background dark:bg-dark-background rounded-2xl p-2">
        <Input type="text" color="" class="w-full min-h-20 rounded-2xl text-text dark:text-dark-text text-lg font-normal p-2 hover: outline-0" placeholder="Add a comment..." bind:value={newText} on:keydown={handleKeyPress} />
        <Button class="w-20 h-12 bg-primary text-dark-text text-lg font-bold rounded-xl hover:scale-110 focus: ring-transparent" on:click={addComment} >Add</Button>
    </div>
</div>