<script lang="ts">
    import { Button, P} from "flowbite-svelte";
    import icon from "../assets/icon.png";
    import { GithubSolid } from "flowbite-svelte-icons";
    import { downloadLink } from "../stores";
    import ToggleTheme from "./ToggleTheme.svelte";
    const openLink = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
</script>

<div class="w-auto h-10 flex justify-start items-center fixed top-0 left-0 m-4 md:ml-8 ml-2">
    <img src={icon} alt="Icon" class="w-auto h-full m-2 drop-shadow-main-small dark:drop-shadow-dark-main-small" />
    <P class="md:text-2xl text-xl text-text dark:text-dark-text drop-shadow-main-small dark:drop-shadow-dark-main-small">Issuence</P>
</div>

<div class="w-auto h-10 fixed top-0 right-0 flex justify-start items-center m-4 md:mr-8 mr-2">
    <!-- <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink("https://www.github.com/Kuttesch/Issuence")}>Demo</div>
    <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink("https://www.github.com/Kuttesch/Issuence")}>Docs</div> -->
    <Button      class="hidden md:block text-text dark:text-dark-text text-lg p-4 pt-2 pb-2 hover:scale-110 cursor-pointer focus:ring-0" on:click={() => openLink($downloadLink)}>Download</Button>
    <GithubSolid class="text-text dark:text-dark-text h-full w-auto p-4 pt-2 pb-2 hover:scale-110 cursor-pointer" onclick={() => openLink("https://www.github.com/Kuttesch/Issuence")} />
    <!-- <DarkMode    class="text-text dark:text-dark-text h-full w-auto p-4 pt-2 pb-2 hover:scale-110 cursor-pointer bg-transparent hover:bg-transparent hover:dark:bg-transparent" /> -->
    <ToggleTheme/>

</div>
