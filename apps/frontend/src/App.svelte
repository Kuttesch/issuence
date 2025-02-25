<script lang="ts">
  import "./app.css";
  import Main from "./lib/Main.svelte";
  import Drawer from "./lib/Drawer.svelte";
  import Titlebar from "./lib/Titlebar.svelte";
  import { onDestroy, onMount } from "svelte";
  import DrawerItem from "./lib/DrawerItem.svelte";
  import { SalePercentOutline } from "flowbite-svelte-icons";

  let hoverDiv: HTMLDivElement | null = null;
  let drawerDisabled: boolean = true;
  let drawerAlways: boolean = false;
  let issueNames: string[] = [];
  let loadNewIssue: (issueName?: string) => Promise<void> = async () => {
    console.log("New Issue");
  };

  async function handleSwitchIssue(event: CustomEvent<string>) {
    if (loadNewIssue) {
      await loadNewIssue(event.detail); // Await the async function
    }
  }

  async function loadIssues() {
    issueNames = await window.electron.database.getListOfAllIssueNames();
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
    {#each issueNames as name, index}
      <DrawerItem name={name} on:switchIssue={handleSwitchIssue} />
    {/each}
  </Drawer>
  <div class="w-full h-full flex items-center justify-center pt-10">
    <Main bind:loadNewIssue={loadNewIssue} />
  </div>
</div>
