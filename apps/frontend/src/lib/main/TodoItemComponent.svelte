<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { CheckOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import { frontendVariables } from "../store";
    import { createEventDispatcher } from "svelte";
    
    export let id: number;

    let dispatcher = createEventDispatcher();

    let todoHovered: boolean = false;
    let todoIndex:number = id - 1;

    function handlePress() {
        $frontendVariables.currentIssue.todoItems[todoIndex].done = !$frontendVariables.currentIssue.todoItems[todoIndex].done;
        dispatcher('saveIssue');
    }

    async function deleteTodo() {
        dispatcher('deleteTodo', id);
    }

</script>
<div class="w-full h-7 flex flex-col items-start justify-start m-2" on:mouseenter={() => todoHovered = true} on:mouseleave={() => todoHovered = false} role="button" tabindex="0">
    <div class="w-full h-7 flex items-center justify-start pr-6">
        <Button class="w-10 !p-2 !m-2 focus: ring-transparent" on:click={handlePress}>
            <div class="h-4 w-4 rounded-[100%] outline-2 outline-text flex items-center justify-center">
                {#if $frontendVariables.currentIssue.todoItems[todoIndex].done}
                <CheckOutline class="w-full h-full "/>
                {/if}
            </div>
        </Button>
        {#if $frontendVariables.currentIssue.todoItems[todoIndex].done}
            <div class="w-full h-full text-lg flex justify-start items-center font-bold line-through">{$frontendVariables.currentIssue.todoItems[todoIndex].text}</div>
        {:else}
            <div class="w-full h-full text-lg flex justify-start items-center font-bold">{$frontendVariables.currentIssue.todoItems[todoIndex].text}</div>
        {/if}
        <Button class="p-0 m-0 focus: ring-transparent" on:click={deleteTodo}>
            <TrashBinOutline class="w-6 h-6 ml-4 text-text text-lg hover: scale-110" />
        </Button>
    </div>
</div>