<script lang="ts">
  import "./app.css";
  import Main from "./lib/Main.svelte";
  import Drawer from "./lib/Drawer.svelte";
  import Titlebar from "./lib/Titlebar.svelte";
  import { onDestroy, onMount } from "svelte";
  import DrawerItem from "./lib/DrawerItem.svelte";
  import { currentPage } from "./lib/store";
  import Start from "./lib/Start.svelte";

  let hoverDiv: HTMLDivElement | null = null;
  let drawerDisabled: boolean = true;
  let drawerAlways: boolean = false;
  let issues: { id: number; title: string }[] = [];

  async function loadIssues() {
    issues = await window.electron.database.getIssues();
  }

  $: if (!drawerDisabled) {
    loadIssues();
  }

  $: if (drawerAlways) {
    drawerDisabled = false;
  }

  function switchDrawer(state: boolean) {
    if (!drawerAlways) {
      drawerDisabled = state;
    }
  }

  function handleMouseEnter() {
    console.log("Mouse Enter");
    setTimeout(() => {
      if (hoverDiv?.matches(":hover")) {
        switchDrawer(false);
      }
    }, 100);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "q") {
      drawerAlways = !drawerAlways;
      drawerDisabled = !drawerAlways;
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
</script>

<Titlebar />
<div
  class="w-1/32 h-11/12 fixed left-0 top-1/24 rounded-r-xl"
  bind:this={hoverDiv}
  on:mouseenter={handleMouseEnter}
  role="button"
  tabindex={0}
></div>
<div class="w-screen h-screen flex flex-row items-center justify-center">
  <Drawer hidden={drawerDisabled} on:onmouseleave={() => switchDrawer(true)}>
    {#each issues as issue}
      <DrawerItem issue={issue}/>
    {/each}
  </Drawer>
  <div class="w-full h-full flex items-center justify-center pt-10">

    {#if $currentPage === 0}
    <Start />
    {:else if $currentPage === 1}
    <Main/>
    {/if}

  </div>
</div>
