<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { CheckOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import { frontendVariables } from "../store";
    import { createEventDispatcher } from "svelte";
    
    export let todo: any;

    let dispatcher = createEventDispatcher();

    let todoHovered: boolean = false;
    let todoIndex:number = todo.id -1;
    let done: boolean;
    $: todo = $frontendVariables.currentIssue.todoItems[todoIndex];
    $: {
        done = todo.done;
        if (done === undefined) {
            done = false;
        }
    }

    function handlePress() {
        todo.done = !todo.done;
        $frontendVariables.currentIssue.todoItems[todoIndex] = todo;
        window.electron.database.saveIssue($frontendVariables.currentIssue);
    }

    async function deleteTodo() {
        console.log("Deleting todo");
        $frontendVariables.currentIssue.todoItems.splice(todoIndex, 1);
        await window.electron.database.saveIssue($frontendVariables.currentIssue);
        dispatcher('deleteTodo');
    }

</script>
<div class="w-full h-7 flex flex-col items-start justify-start m-2" on:mouseenter={() => todoHovered = true} on:mouseleave={() => todoHovered = false} role="button" tabindex="0">
    <div class="w-1/2 h-7 flex items-center justify-start">
        <Button class="w-10 !p-2 !m-2 focus: ring-transparent" on:click={handlePress}>
            <div class="h-4 w-4 rounded-[100%] outline-2 outline-text flex items-center justify-center">
                {#if done}
                <CheckOutline class="w-full h-full "/>
                {/if}
            </div>
        </Button>
        {#if done}
            <div class="w-full h-full text-lg flex justify-start items-center font-bold line-through">{todo.text}</div>
        {:else}
            <div class="w-full h-full text-lg flex justify-start items-center font-bold">{todo.text}</div>
        {/if}
        <Button class="p-0 m-0 focus: ring-transparent" on:click={deleteTodo}>
            <TrashBinOutline class="w-6 h-6 ml-4 text-text text-lg hover: scale-110" />
        </Button>
    </div>
</div>