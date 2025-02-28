<script lang="ts">
    import { P } from "flowbite-svelte";
    import icon from "../assets/icon.png";
    import { GithubSolid } from "flowbite-svelte-icons";
    import { onMount } from "svelte";

    let lastRelease: string = "";
    const githubRepo = "https://api.github.com/repos/Kuttesch/Issuence/releases/latest";

    onMount(async () => {
        try {
            const response = await fetch(githubRepo);
            if (response.ok) {
                const data = await response.json();
                lastRelease = data.assets && data.assets[0]?.browser_download_url || "https://github.com/Kuttesch/Issuence/releases/latest";
            } else {
                console.error("Failed to fetch the latest release");
                lastRelease = "https://github.com/Kuttesch/Issuence/releases/latest";
            }
        } catch (error) {
            console.error("Error fetching the latest release:", error);
            lastRelease = "https://github.com/Kuttesch/Issuence/releases/latest";
        }
    });

    const openLink = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
</script>

<div class="w-auto h-10 flex justify-start items-center fixed top-0 left-0 m-4 ml-8 drop-shadow-secondary">
    <img src={icon} alt="Icon" class="w-auto h-full m-2" />
    <P class="text-3xl">Issuence</P>
</div>

<div class="w-full h-10 flex justify-end items-center m-4 mr-16 gap-8 drop-shadow-header">
    <!-- <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink("https://www.github.com/Kuttesch/Issuence")}>Demo</div>
    <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink("https://www.github.com/Kuttesch/Issuence")}>Docs</div> -->
    <div class="text-lg hover:scale-110 cursor-pointer" on:click={() => openLink(lastRelease)}>Download</div>
    <GithubSolid class="h-full w-auto pt-2 pb-2 hover:scale-110 cursor-pointer" onclick={() => openLink("https://www.github.com/Kuttesch/Issuence")} />
</div>
