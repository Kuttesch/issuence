<script lang="ts">
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import {
    TimelineConnector,
    TimelineItem,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
    TimelineSeparator
  } from "svelte-vertical-timeline";
  import { Button } from "flowbite-svelte";
  import type { Comment } from "../types";
  import { currentIssue, saveIssue } from "../store";

  export let comment: Comment;
  let commentHover = false;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
      return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString();
  }

  async function deleteComment() {
    if (!$currentIssue) return;
    $currentIssue.comments = $currentIssue.comments.filter(c => c !== comment);
    await saveIssue($currentIssue);
  }
</script>

<TimelineItem>
  <TimelineOppositeContent>
    <div class="w-[10vw] text-text dark:text-dark-text text-lg font-normal">
      {formatDate(comment.created)}
    </div>
  </TimelineOppositeContent>

  <TimelineSeparator>
    <TimelineDot style="background-color: var(--color-accent);border-color: var(--color-accent);" />
    <TimelineConnector />
  </TimelineSeparator>

  <TimelineContent>
    <div
      class="min-h-10 w-[30vw] text-text dark:text-dark-text text-lg font-bold flex flex-row items-center justify-start"
      on:mouseenter={() => (commentHover = true)}
      on:mouseleave={() => (commentHover = false)}
      role="button"
      tabindex="0"
    >
      <div class="text-text dark:text-dark-text text-lg">{comment.text}</div>
      {#if commentHover}
        <Button class="p-0 m-0 focus:ring-transparent" on:click={deleteComment}>
          <TrashBinOutline class="w-6 h-6 ml-4 text-text dark:text-dark-text text-lg hover:scale-110" />
        </Button>
      {/if}
    </div>
  </TimelineContent>
</TimelineItem>
