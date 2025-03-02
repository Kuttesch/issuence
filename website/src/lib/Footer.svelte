<script lang="ts">
    import { Button, P } from "flowbite-svelte";
    import icon from "../assets/icon.png";
    import { GithubSolid } from "flowbite-svelte-icons";
    import { downloadLink } from "../stores";


    const openLink = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
</script>

<div class="w-auto h-10 flex justify-start items-center fixed top-0 left-0 m-4 ml-8 drop-shadow-secondary">
    <img src={icon} alt="Icon" class="w-auto h-full m-2" />
    <P class="text-3xl">Issuence</P>
</div>

<div class="w-full h-10 flex justify-end items-center m-4 mr-16 gap-8 drop-shadow-header">
    <!-- <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink("https://www.github.com/Kuttesch/Issuence")}>Demo</div>
    <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink("https://www.github.com/Kuttesch/Issuence")}>Docs</div> -->
    <Button class="text-lg hover:scale-110 cursor-pointer focus:ring-0" on:click={() => openLink($downloadLink)}>Download</Button>
    <GithubSolid class="h-full w-auto pt-2 pb-2 hover:scale-110 cursor-pointer" onclick={() => openLink("https://www.github.com/Kuttesch/Issuence")} />
</div>
