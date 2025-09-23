<script lang="ts">
  import { Button, Input } from "flowbite-svelte";
  import TodoItemComponent from "./TodoItemComponent.svelte";
  import { PlusOutline } from "flowbite-svelte-icons";

  import { currentIssue, saveIssue } from "../store";
  import type { Todo } from "../types";

  let newTodo: string = "";

  function keydownHandler(event: KeyboardEvent) {
    if (event.key === "Enter") addTodo();
  }

  async function addTodo() {
    if (!newTodo.trim() || !$currentIssue) return;

    const todo: Todo = {
      text: newTodo,
      done: false
    };

    $currentIssue.todos = [...$currentIssue.todos, todo];
    newTodo = "";

    await saveIssue($currentIssue);
  }
</script>

<div class="w-full h-auto max-h-[50vh] min-h-30 rounded-2xl 
            bg-background dark:bg-dark-background 
            flex flex-col items-start justify-center 
            overflow-y-scroll scrollbar-hide pt-4 pb-4 p-2">

  {#if $currentIssue}
    {#each $currentIssue.todos as todo, index}
      <TodoItemComponent {todo} index={index} />
    {/each}
  {/if}

  <div class="w-full h-7 flex flex-col items-start justify-start m-2 pr-4">
    <div class="w-full h-7 flex items-center justify-start">
      <Button class="w-10 !p-2 !m-2 focus:ring-transparent" on:click={addTodo}>
        <div class="h-4 w-4 rounded-full outline-2 outline-text dark:outline-dark-text flex items-center justify-center">
          <PlusOutline class="w-full h-full text-text dark:text-dark-text"/>
        </div>
      </Button>
      <Input
        class="w-full h-25 rounded-2xl text-text dark:text-dark-text text-lg font-bold p-0 m-0 hover:outline-0"
        placeholder="Add a todo..."
        bind:value={newTodo}
        on:keydown={keydownHandler}
      />
    </div>
  </div>
</div>
