<script lang="ts">
    import { Button, P } from "flowbite-svelte";
    import { GithubSolid } from "flowbite-svelte-icons";
    import { downloadLink } from "../stores";


    const openLink = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
</script>

<div class="w-full h-10 flex justify-end items-center m-4 mr-16 gap-8 drop-shadow-header">
    <!-- <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink("https://www.github.com/Kuttesch/Issuence")}>Demo</div>
    <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink("https://www.github.com/Kuttesch/Issuence")}>Docs</div> -->
    <Button      class="text-text dark:text-dark-text text-lg p-0 pb-2 pt-2 hover:scale-110 cursor-pointer focus:ring-0" on:click={() => openLink($downloadLink)}>Download</Button>
    <GithubSolid class="text-text dark:text-dark-text h-full w-auto p-0 pt-2 pb-2 hover:scale-110 cursor-pointer" onclick={() => openLink("https://www.github.com/Kuttesch/Issuence")} />
</div>
