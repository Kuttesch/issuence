<script lang="ts">
    import { Button, Input, Hr } from "flowbite-svelte";
    import {Comment, Status} from "../../../data";
    import { frontendVariables } from "../store";
    import { createEventDispatcher } from "svelte";
    
    let comments: Comment[] = [];
    $: comments = $frontendVariables.currentIssue.comments;

    let newText: string = "";
    $: console.log(newText);
    
    
    const dispatch = createEventDispatcher();
    async function addComment() {
        if (newText === "") {
            return;
        }
        let newID = comments.length + 1;
        let comment = new Comment(newID, newText);
        comments.push(comment);
        $frontendVariables.currentIssue.comments = comments;
        await window.electron.database.saveIssue($frontendVariables.currentIssue);
        newText = "";
        dispatch('scrollToBottom', comments);
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            addComment();
        }
    }

    // async function closeIssue() {
    //     console.log("Closing issue");
    //     $frontendVariables.currentIssue.status = Status.DONE;
    //     await window.electron.database.saveIssue($frontendVariables.currentIssue);
    // }
</script>

<Hr />
<div class="w-full h-auto flex flex-col items-start justify-start">
    <div class="w-full h-auto flex items-center justify-start bg-background rounded-2xl p-2">
        <Input type="text" color="" class="w-full min-h-20 rounded-2xl text-text text-lg font-normal p-2 hover: outline-0" placeholder="Add a comment" bind:value={newText} on:keydown={handleKeyPress} />
        <Button class="w-20 h-12 bg-primary text-text text-lg font-bold rounded-xl hover:scale-110 focus: ring-transparent" on:click={addComment} >Add</Button>
    </div>
    <!-- <div class="w-full h-12 flex items-center justify-end p-2 mt-4">
    <Button class="w-20 h-12 bg-primary text-text text-lg font-bold rounded-xl hover:scale-110 focus: ring-transparent" on:click={closeIssue}>Close</Button>
    </div> -->
</div>