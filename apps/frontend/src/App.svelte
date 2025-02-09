<script lang="ts">
  import "./app.css";
  import Main from "./lib/Main.svelte";
  import Drawer from "./lib/Drawer.svelte";
  import Header from "./lib/Header.svelte";
  import { onDestroy, onMount } from 'svelte';
  import DrawerItem from "./lib/DrawerItem.svelte";

  let drawerDisabled: boolean = true;
  let drawerAlways: boolean = false;
  let issueNames: string[] = [];

  console.log(window.electron);

  async function loadIssues() {
    issueNames = await window.electron.getListOfAllIssueNames();     
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

  function handleKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'q') {
      drawerAlways = !drawerAlways;
      drawerDisabled = !drawerAlways;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

</script>
<!-- {#if apiFlag} -->
  <!-- Currently not needed -->
  <Header />

  <div class="w-1/32 h-11/12 fixed left-0 top-1/24rounded-r-xl" on:mouseenter={() => switchDrawer(false)} role="button" tabindex={0}></div>

  <div class="w-screen h-screen flex flex-row items-center justify-center">
    <Drawer hidden={drawerDisabled} on:onmouseleave={() => switchDrawer(true)}>
      {#each issueNames as name, index}
        <DrawerItem name={name}/>
      {/each}
    </Drawer>

     <div class="w-full h-full flex items-center justify-center pt-10">
       <Main />
     </div>
  </div>
<!-- {:else} -->
  <!-- <div class="w-screen h-screen flex items-center justify-center">
    <Spinner />
  </div>
{/if} -->
