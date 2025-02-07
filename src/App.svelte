<script lang="ts">
  import "./app.css";
  import Main from "./lib/Main.svelte";
  import Drawer from "./lib/Drawer.svelte";
  import {Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Button} from "flowbite-svelte";
  import { ChartPieSolid, ArrowRightToBracketOutline } from "flowbite-svelte-icons";

  let drawerDisabled: boolean = true;
  let drawerAlways: boolean = false;

  $: if(drawerAlways) {
    drawerDisabled = false;
  }

  function switchDrawer(state: boolean) {
    if(!drawerAlways) {
      drawerDisabled = state;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'q') { //!TODO Make configurable and global
      if (drawerAlways) {
        drawerAlways = false;
        drawerDisabled = true;
      } else {
        drawerAlways = true;
        drawerDisabled = false;
      }
    }
  }

  window.addEventListener('keydown', handleKeydown);

  import { onDestroy } from 'svelte';
  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

</script>


<div class="w-1/32 h-full fixed left-0 top-0" on:mouseenter={() => switchDrawer(false)} role="button"></div>

<div class="w-screen h-screen flex flex-row items-center justify-center">
  <!-- <div class="w-1/4 h-full ease-in-out" on:mouseleave={() => switchDrawer(true)} role="button" hidden={drawerDisabled}> -->
   <Drawer hidden={drawerDisabled} on:onmouseleave()={() => switchDrawer(true)}>
    <div class="text-xl text-accent">Issues (me fr)</div>
    <Sidebar>
      <SidebarWrapper>
        <SidebarGroup>
          <SidebarItem label="Project 1"></SidebarItem>
          <SidebarItem label="Project 2"></SidebarItem>
          <SidebarItem label="Project 3"></SidebarItem>
          <SidebarItem label="Project 4"></SidebarItem>
          <SidebarItem label="Project 5"></SidebarItem>
          <SidebarItem label="Project 6"></SidebarItem>
          <SidebarItem label="Project 7"></SidebarItem>
          <SidebarItem label="Project 8"></SidebarItem>
          <SidebarItem label="Project 9"></SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
   </Drawer>
  <Main/>
</div>
