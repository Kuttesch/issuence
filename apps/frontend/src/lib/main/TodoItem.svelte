<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { CheckOutline } from "flowbite-svelte-icons";
    import { frontendVariables } from "../store";
    
    export let todo: any;

    let todoIndex:number = todo.id -1;
    $: todo = $frontendVariables.currentIssue.todoItems[todoIndex];
    
    function handlePress() {
        todo.done = !todo.done;
        $frontendVariables.currentIssue.todoItems[todoIndex] = todo;
    }

</script>
<div class="w-full h-7 flex flex-col items-center justify-start m-2">
    <div class="w-full h-7 flex items-center justify-start">
        <Button class="w-10 !p-2 !m-2 focus: ring-transparent" on:click={handlePress}>
            <div class="h-4 w-4 rounded-[100%] outline-2 outline-text flex items-center justify-center">
                {#if todo.done}
                <CheckOutline class="w-full h-full "/>
                {/if}
            </div>
        </Button>
        {#if todo.done}
            <div class="w-full h-full text-lg flex justify-start items-center font-bold line-through">{todo.text}</div>
        {:else}
            <div class="w-full h-full text-lg flex justify-start items-center font-bold">{todo.text}</div>
        {/if}
    </div>
</div>