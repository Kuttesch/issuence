<script lang="ts">
  import { loadIssue, currentIssue, currentPage } from "./store";

  export let issue: { id: number; title: string };

  async function handleClick() {
    $currentPage = 1;
    await loadIssue(issue.id);
  }
</script>

<div
  class="w-9/10 h-10 rounded-l flex flex-row items-center justify-start 
         hover:bg-background hover:dark:bg-dark-background 
         ease-in-out transition-all duration-100
         { $currentIssue?.id === issue.id ? 'bg-background dark:bg-dark-background' : '' }"
  on:click={handleClick}
>
  <div class="text-x text-text dark:text-dark-text">
    {issue.title}
  </div>
</div>
