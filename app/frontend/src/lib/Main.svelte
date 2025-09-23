<script lang="ts">
  import { Hr } from "flowbite-svelte";
  import MD from "./main/MD.svelte";
  import Header from "./main/Header.svelte";
  import TodoList from "./main/TodoList.svelte";
  import Comments from "./main/Comments.svelte";

  import { currentIssue, saveIssue } from "./store";

  // load issue into store
  export async function loadNewIssue(issueId: number) {
    if ($currentIssue) {
      await saveIssue($currentIssue);
    }
    $currentIssue = await window.electron.database.getIssue(issueId);
  }
</script>

<div
  id="scroll"
  class="w-3/4 min-w-170 h-full flex flex-col items-start justify-start
         overflow-y-scroll scrollbar-hide 
         drop-shadow-main dark:drop-shadow-dark-main-small"
>
  <div
    class="w-full h-auto bg-background-secondary dark:bg-dark-background-secondary 
           rounded-2xl flex flex-col items-start justify-start p-12 gap-4"
  >
    <Header />
    <MD />
    <TodoList />
    <Hr />
    <Comments />
  </div>
</div>
