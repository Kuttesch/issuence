<script lang="ts">
    import { Button } from "flowbite-svelte";
    import icon from "../assets/icon.png";
    import {  DownloadSolid } from "flowbite-svelte-icons";
    import { downloadLink } from "../stores";

    const openLink = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
</script>

<div class="w-full min-h-[100vh] h-auto flex flex-col justify-center items-center gap-4 bg-background dark:bg-dark-background">
    <img src={icon} alt="Icon" class="w-auto h-30 drop-shadow-main dark:drop-shadow-dark-main" />
    <div class="md:text-4xl text-2xl text-center text-text dark:text-dark-text drop-shadow-main dark:drop-shadow-dark-main">Start organizing your Life today!</div>
    <Button class="md:w-1/4 w-3/4 h-20 rounded-2xl flex flex-row justify-start items-center gap-4 p-4 m-16 drop-shadow-secondary dark:drop-shadow-dark-secondary bg-background-secondary dark:bg-dark-background-secondary transition-all duration-50 ease-in-out hover:scale-101 cursor-pointer focus:ring-0" on:click={() => openLink($downloadLink)}>
        <DownloadSolid class="h-full w-auto pt-2 pb-2 text-text dark:text-dark-text"/>
        <div class="text-2xl text-text dark:text-dark-text">Download Issuence</div>
    </Button>

</div>