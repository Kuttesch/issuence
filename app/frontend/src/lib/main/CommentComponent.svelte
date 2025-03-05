<script lang="ts">
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import { TimelineConnector, TimelineItem, TimelineContent, TimelineDot, TimelineOppositeContent, TimelineSeparator } from "svelte-vertical-timeline";
    import { currentIssue } from "../store";
    import { Button } from "flowbite-svelte";
    import { createEventDispatcher } from "svelte";
    import { options } from "marked";

    let dispatcher = createEventDispatcher();

    export let id: number;
    let commentIndex:number = id -1;
    let commentHover: boolean = false;

    function formatDate(date_string: Date | null): string {
        console.log(date_string);
        if (date_string === null) {
            return '';
        } else {
            let date = new Date(date_string);
            if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
                console.log(date.toLocaleDateString());
                console.log(new Date().toLocaleDateString());
                return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
            } else {
                return date.toLocaleDateString();
            }
        }
    }

    function deleteComment() {
        dispatcher('deleteComment', id);
    }

</script>

{#if $currentIssue.comments[commentIndex]}
    <TimelineItem>
        <TimelineOppositeContent>
            <div class="w-[10vw] text-text dark:text-dark-text text-lg font-normal">{formatDate($currentIssue.comments[commentIndex].created)}</div>
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineDot style="background-color: var(--color-accent);border-color: var(--color-accent);"/>
            <TimelineConnector/>
        </TimelineSeparator>
        <TimelineContent>
            <div class="min-h-10h-auto w-[30vw] text-text dark:text-dark-text text-lg font-bold flex flex-row items-center justify-start" on:mouseenter={() => commentHover = true} on:mouseleave={() => commentHover = false} role="button" tabindex="0">
            <div class="text-text dark:text-dark-text text-lg">{$currentIssue.comments[commentIndex].text}</div>
                {#if commentHover}
                    <Button class="p-0 m-0 focus: ring-transparent" on:click={deleteComment}>
                        <TrashBinOutline class="w-6 h-6 ml-4 text-text dark:text-dark-text text-lg" />
                    </Button>
                {/if}
            </div>
        </TimelineContent>
    </TimelineItem>
{/if}