<script lang="ts">
    import { Button, Input } from "flowbite-svelte";
    import { frontendVariables } from "../store";
    import TodoItemComponent from "./TodoItemComponent.svelte";
    import { CheckOutline, PlusOutline } from "flowbite-svelte-icons";
    import { TodoItem } from "../../../data";
    // let todos: TodoItem[] = [];
    let todos: any[] = [];
    let newTodo: string = "";

    $: todos = $frontendVariables.currentIssue.todoItems;
    function keydownHandler(event: KeyboardEvent) {
        if (event.key === "Enter") {
            addTodo();
        }
    }

    function addTodo() {
        if (newTodo !== "") {
            let newId = todos.length + 1;
            let todo = new TodoItem(newId, newTodo);
            todos.push(todo);
            $frontendVariables.currentIssue.todoItems = todos;
            window.electron.database.saveIssue($frontendVariables.currentIssue);
            newTodo = "";
        }
    }

    async function handleDeleteTodo() {
        todos = $frontendVariables.currentIssue.todoItems;
    }

</script>

<div class="w-full h-auto max-h-[50vh] min-h-30 rounded-2xl bg-background flex flex-col items-start justify-center overflow-y-scroll scrollbar-hide pt-4 pb-4 p-2 mt-2 mb-2">
    {#each todos.sort((a, b) => Number(a.done) - Number(b.done)) as todo}
        <TodoItemComponent todo={todo} on:deleteTodo={handleDeleteTodo}/>
    {/each}
    <div class="w-1/2 h-7 flex flex-col items-start justify-start m-2">
        <div class="w-full h-7 flex items-center justify-start">
            <Button class="w-10 !p-2 !m-2 focus: ring-transparent" on:click={addTodo}>
                <div class="h-4 w-4 rounded-[100%] outline-2 outline-text flex items-center justify-center">
                    <PlusOutline class="w-full h-full "/>
                </div>
            </Button>
            <Input color="" class="w-full h-25 rounded-2xl text-text text-lg font-bold p-0 m-0 hover: outline-0" placeholder="Add a todo" bind:value={newTodo} on:keydown={keydownHandler}/>
            <Button class="w-10 !p-2 !m-2">
            </Button>
        </div>
    </div>
</div>