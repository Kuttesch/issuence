<script lang="ts">
  import { Button } from "flowbite-svelte";

    export let name: string = '';
</script>

<div class="w-9/10 h-10 rounded-l flex flex-row items-center justify-start pl-10 hover:bg-background ease-in-out transition-all duration-100" on:click={() => console.log(name)}>
    <div class="text-lg text-text">
        {name}
    </div>
</div>