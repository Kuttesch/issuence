<script lang="ts">
    import { frontendVariables } from "../store";
    import TodoItem from "./TodoItem.svelte";
    // let todos: TodoItem[] = [];
    let todos: any[] = [];

    $: todos = $frontendVariables.currentIssue.todoItems;

</script>

<div class="w-full h-auto max-h-[50vh] rounded-2xl bg-background flex flex-col items-start justify-start overflow-y-scroll scrollbar-hide pt-4 pb-4 p-2 mt-2 mb-2">
    {#each todos as todo}
        <TodoItem todo={todo} />
    {/each}
</div>