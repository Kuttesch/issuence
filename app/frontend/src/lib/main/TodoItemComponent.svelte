<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { CheckOutline, TrashBinOutline } from "flowbite-svelte-icons";

  import { currentIssue, saveIssue } from "../store";
  import type { Todo } from "../types";

  export let todo: Todo;
  export let index: number;

  let hovered = false;

  async function toggleDone() {
    if (!$currentIssue) return;
    $currentIssue.todos[index].done = !$currentIssue.todos[index].done;
    await saveIssue($currentIssue);
  }

  async function deleteTodo() {
    if (!$currentIssue) return;
    $currentIssue.todos = $currentIssue.todos.filter((_, i) => i !== index);
    await saveIssue($currentIssue);
  }
</script>

<div
  class="w-full h-7 flex flex-col items-start justify-start m-2"
  on:mouseenter={() => hovered = true}
  on:mouseleave={() => hovered = false}
  role="button"
  tabindex="0"
>
  <div class="w-full h-7 flex items-center justify-start pr-6">
    <Button class="w-10 !p-2 !m-2 focus:ring-transparent" on:click={toggleDone}>
      <div class="h-4 w-4 rounded-full outline-2 outline-text dark:outline-dark-text flex items-center justify-center">
        {#if todo.done}
          <CheckOutline class="w-full h-full text-text dark:text-dark-text"/>
        {/if}
      </div>
    </Button>

    {#if todo.done}
      <div class="w-full h-full text-text dark:text-dark-text text-lg flex justify-start items-center font-bold line-through">
        {todo.text}
      </div>
    {:else}
      <div class="w-full h-full text-text dark:text-dark-text text-lg flex justify-start items-center font-bold">
        {todo.text}
      </div>
    {/if}

    {#if hovered}
      <Button class="p-0 m-0 focus:ring-transparent" on:click={deleteTodo}>
        <TrashBinOutline class="w-6 h-6 ml-4 text-text dark:text-dark-text text-lg hover:scale-110" />
      </Button>
    {/if}
  </div>
</div>
