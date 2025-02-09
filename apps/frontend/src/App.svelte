<script lang="ts">
  import "./app.css";
  import Main from "./lib/Main.svelte";
  import Drawer from "./lib/Drawer.svelte";
  import Header from "./lib/Header.svelte";
  import { onDestroy, onMount } from 'svelte';
  import { Spinner } from "flowbite-svelte";
  import DrawerItem from "./lib/DrawerItem.svelte";

  let drawerDisabled: boolean = true;
  let drawerAlways: boolean = false;
  let apiFlag: boolean = false;
  let itemFlag: boolean = false;
  let issuesLoaded: boolean = false;
  let issueNames: string[] = [];

  async function getNumberOfIssues() {
    if (window.pywebview && window.pywebview.api) {
      try {
        const response = await window.pywebview.api.init_program();
        issueNames = response;
        issuesLoaded = true;
      } catch (error) {
        console.error('Error fetching number of issues:', error);
      }
    } else {
      console.error('pywebview API is not available');
    }
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

  window.addEventListener('pywebviewready', function() {
    apiFlag = true;
    getNumberOfIssues();
    itemFlag = true;
  });

</script>
<!-- {#if apiFlag} -->
  <!-- Currently not needed -->
  <Header />

  <div class="w-1/32 h-full fixed left-0 top-0" on:mouseenter={() => switchDrawer(false)} role="button" tabindex={0}></div>

  <div class="w-screen h-screen flex flex-row items-center justify-center">
    <Drawer hidden={drawerDisabled} on:onmouseleave={() => switchDrawer(true)}>
            {#if issuesLoaded}
              {#each issueNames as name, index}
                <DrawerItem name={name}/>
              {/each}
            {/if}

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
