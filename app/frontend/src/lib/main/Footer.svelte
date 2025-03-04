<script lang="ts">
    import { Button, Input, Hr } from "flowbite-svelte";
    import {Comment} from "../../../data";
    import { frontendVariables } from "../store";
    import { createEventDispatcher } from "svelte";

    let newText: string = "";

    const dispatch = createEventDispatcher();
    async function addComment() {
        if (newText === "") {
            return;
        }
        let newID = $frontendVariables.currentIssue.comments.length + 1;
        let comment = new Comment(newID, newText);
        $frontendVariables.currentIssue.comments.push(comment);
        newText = "";
        dispatch("saveCurrentIssue");
        dispatch('scrollToBottom');
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            addComment();
        }
    }
</script>

<Hr />
<div class="w-full h-auto flex flex-col items-start justify-start">
    <div class="w-full h-auto flex items-center justify-start bg-background rounded-2xl p-2">
        <Input type="text" color="" class="w-full min-h-20 rounded-2xl text-text dark:text-dark-text text-lg font-normal p-2 hover: outline-0" placeholder="Add a comment..." bind:value={newText} on:keydown={handleKeyPress} />
        <Button class="w-20 h-12 bg-primary text-dark-text text-lg font-bold rounded-xl hover:scale-110 focus: ring-transparent" on:click={addComment} >Add</Button>
    </div>
</div>