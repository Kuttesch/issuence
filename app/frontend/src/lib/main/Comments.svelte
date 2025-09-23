<script lang="ts">
  import { Timeline } from "svelte-vertical-timeline";
  import CommentComponent from "./CommentComponent.svelte";
  import { Button, Hr, Input } from "flowbite-svelte";
  import type { Comment } from "../types";

  import { currentIssue, saveIssue } from "../store";

  let newText: string = "";

  async function addComment() {
    if (newText.trim() === "" || !$currentIssue) return;

    const comment: Comment = {
      text: newText,
      created: new Date().toISOString()
    };

    $currentIssue.comments = [...$currentIssue.comments, comment];
    newText = "";

    // persist immediately
    await saveIssue($currentIssue);

    // auto-scroll to bottom
    setTimeout(() => {
      const div = document.getElementById("scroll");
      if (div) div.scrollTop = div.scrollHeight;
    }, 50);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") addComment();
  }
</script>

<div class="w-full h-auto rounded-2xl flex flex-col items-start justify-start pt-4 pb-4 p-2 mt-2 mb-2">
  <div class="text-2xl text-text dark:text-dark-text font-bold">Comments</div>
  <Timeline>
    {#if !$currentIssue || $currentIssue.comments.length === 0}
      <div class="text-text dark:text-dark-text">No comments yet ...</div>
    {:else}
      {#each $currentIssue.comments as comment}
        <CommentComponent {comment} />
      {/each}
    {/if}
  </Timeline>
</div>

<Hr />

<div class="w-full h-auto flex flex-col items-start justify-start">
  <div
    class="w-full h-auto flex items-center justify-start 
           bg-background dark:bg-dark-background 
           rounded-2xl p-2"
  >
    <Input
      type="text"
      class="w-full min-h-20 rounded-2xl text-text dark:text-dark-text text-lg font-normal p-2 hover:outline-0"
      placeholder="Add a comment..."
      bind:value={newText}
      on:keydown={handleKeyPress}
    />
    <Button
      class="w-20 h-12 bg-primary text-dark-text text-lg font-bold rounded-xl 
             hover:scale-110 focus:ring-transparent"
      on:click={addComment}
    >
      Add
    </Button>
  </div>
</div>
