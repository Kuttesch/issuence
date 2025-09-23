<script lang="ts">
  import { Button, Input } from "flowbite-svelte";
  import { CalendarEditOutline, CalendarWeekOutline, ClockOutline, UserEditOutline } from "flowbite-svelte-icons";

  import { currentIssue, saveIssue, edit } from "../store";

  let timeDate = false;

  function formatDate(dateString: string | null): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
      timeDate = true;
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
      timeDate = false;
      return date.toLocaleDateString();
    }
  }

  async function switchEdit() {
    if ($edit) {
      if ($currentIssue) await saveIssue($currentIssue);
    }
    $edit = !$edit;
  }

  async function clickBadge(status: "open" | "now" | "later" | "done") {
    if (!$currentIssue) return;
    $currentIssue.status = status;
    await saveIssue($currentIssue);
  }
</script>

<div class="w-full h-40 rounded-t-2xl flex flex-row items-start justify-start">
  {#if $currentIssue}
    <div class="w-6/7 h-full text-2xl font-bold flex flex-col items-start justify-start">
      <!-- Title -->
      {#if $edit}
        <Input
          class="w-5/5 h-1/2 text-text dark:text-dark-text text-3xl font-bold flex items-center justify-start p-0 outline-0 dark:bg-dark-background bg-background rounded-2xl pl-4"
          placeholder="Title"
          bind:value={$currentIssue.title}
        />
      {:else}
        <div class="w-5/5 h-1/2 text-text dark:text-dark-text text-3xl font-bold flex items-center justify-start">
          {$currentIssue.title}
        </div>
      {/if}

      <!-- Status + Date -->
      <div class="w-2/5 h-1/2 font-bold flex flex-row items-start justify-start">
        <div class="min-w-25 w-1/4 h-full flex flex-row items-center justify-start">
          {#if $currentIssue.status === "open"}
            <Button class="focus:ring-transparent p-0 m-0" on:click={() => clickBadge("now")}>
              <span class="bg-success text-xs dark:text-dark-text w-20 aspect-[2/1] rounded flex items-center justify-center">open</span>
            </Button>
          {:else if $currentIssue.status === "now"}
            <Button class="focus:ring-transparent p-0 m-0" on:click={() => clickBadge("done")}>
              <span class="bg-primary text-xs dark:text-dark-text w-20 aspect-[2/1] rounded flex items-center justify-center">current</span>
            </Button>
          {:else if $currentIssue.status === "done"}
            <Button class="focus:ring-transparent p-0 m-0" on:click={() => clickBadge("open")}>
              <span class="bg-danger text-xs text-dark-text w-20 aspect-[2/1] rounded flex items-center justify-center">done</span>
            </Button>
          {/if}
        </div>

        <!-- Date -->
        <div class="w-3/4 h-full flex flex-row items-center justify-start">
          {#if $currentIssue.updated}
            {#if timeDate}
              <UserEditOutline class="w-7 h-full mr-2 text-text dark:text-dark-text"/>
            {:else}
              <CalendarEditOutline class="w-7 h-full mr-2 text-text dark:text-dark-text"/>
            {/if}
          {:else}
            {#if timeDate}
              <ClockOutline class="w-7 h-full mr-2 text-text dark:text-dark-text"/>
            {:else}
              <CalendarWeekOutline class="w-7 h-full mr-2 text-text dark:text-dark-text"/>
            {/if}
          {/if}
          <div class="text-text dark:text-dark-text text-lg font-normal">
            {formatDate($currentIssue.updated ?? $currentIssue.created)}
          </div>
        </div>
      </div>
    </div>

    <!-- Edit button -->
    <div class="w-1/7 h-full flex flex-row-reverse items-center justify-start">
      <Button
        class="w-20 h-12 bg-primary text-dark-text text-lg font-bold rounded-xl hover:scale-110 focus:ring-transparent"
        on:click={switchEdit}
      >
        Edit
      </Button>
    </div>
  {/if}
</div>
