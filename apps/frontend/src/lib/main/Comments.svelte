<script lang="ts">
    import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineSeparator } from "svelte-vertical-timeline";
    import { frontendVariables } from "../store";
    import CommentComponent from "./CommentComponent.svelte";
    import {Comment} from "../../../data";
    import { TimelineItem } from "flowbite-svelte";

    let comments: Comment[] = [];
    $: comments = $frontendVariables.currentIssue.comments;

    function handleDeleteComment() {
        comments = $frontendVariables.currentIssue.comments;
    }

</script>

<div class="w-full h-auto rounded-2xl flex flex-col items-start justify-start pt-4 pb-4 p-2 mt-2 mb-2">
    <div class="text-2xl text-text font-bold">Comments</div>
        <Timeline>
            {#if comments.length === 0}
                <div class="text-text">No comments yet ...</div>
            {:else}
                {#each comments as comment}
                    <CommentComponent id={comment.id} on:deleteComment={handleDeleteComment} />
                {/each}
            {/if}
        </Timeline>
</div>