<script lang="ts">
    import { Button, Input } from "flowbite-svelte";
    import { frontendVariables } from "../store";
    import TodoItemComponent from "./TodoItemComponent.svelte";
    import { CheckOutline, PlusOutline } from "flowbite-svelte-icons";
    import { TodoItem } from "../../../data";
    import { createEventDispatcher } from "svelte";
    // let todos: TodoItem[] = [];
    let newTodo: string = "";
    $: console.log(newTodo)
    let dispatcher = createEventDispatcher();

    function keydownHandler(event: KeyboardEvent) {
        if (event.key === "Enter") {
            addTodo();
        }
    }

    function addTodo() {
        if (newTodo !== "") {
            console.log("saving todo")
            console.log($frontendVariables.currentIssue.todoItems)
            let newId = $frontendVariables.currentIssue.todoItems.length + 1;
            let todo = new TodoItem(newId, newTodo);
            $frontendVariables.currentIssue.todoItems.push(todo);
            $frontendVariables.currentIssue.todoItems = $frontendVariables.currentIssue.todoItems;
            newTodo = "";
            dispatcher('saveCurrentIssue');
        }
    }

    async function handleDeleteTodo(event: CustomEvent<number>) {
        $frontendVariables.currentIssue.todoItems = $frontendVariables.currentIssue.todoItems.filter(todo => todo.id !== event.detail);
        dispatcher('saveCurrentIssue');
    }

</script>

<div class="w-full h-auto max-h-[50vh] min-h-30 rounded-2xl bg-background flex flex-col items-start justify-center overflow-y-scroll scrollbar-hide pt-4 pb-4 p-2">
    {#each $frontendVariables.currentIssue.todoItems.sort((a, b) => Number(a.done) - Number(b.done)) as todo}
        <TodoItemComponent id={todo.id} on:deleteTodo={handleDeleteTodo}/>
    {/each}
    <div class="w-full h-7 flex flex-col items-start justify-start m-2 pr-4">
        <div class="w-full h-7 flex items-center justify-start">
            <Button class="w-10 !p-2 !m-2 focus: ring-transparent" on:click={addTodo}>
                <div class="h-4 w-4 rounded-[100%] outline-2 outline-text flex items-center justify-center">
                    <PlusOutline class="w-full h-full "/>
                </div>
            </Button>
            <Input color="" class="w-full h-25 rounded-2xl text-text text-lg font-bold p-0 m-0 hover: outline-0" placeholder="Add a todo..." bind:value={newTodo} on:keydown={keydownHandler}/>
            <Button class="w-10 !p-2 !m-2">
            </Button>
        </div>
    </div>
</div>