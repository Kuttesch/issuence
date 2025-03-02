<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { SunSolid, MoonSolid } from "flowbite-svelte-icons";
    import { theme } from "../store";
    import { get } from "svelte/store";

    const toggle = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("color-theme", isDark ? "dark" : "light");
        theme.set(isDark ? "dark" : "light"); // Correct way to update the store
    };

    onMount(() => {
        const storedTheme = localStorage.getItem("color-theme");
        if (storedTheme) {
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
            theme.set(storedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.classList.toggle("dark", prefersDark);
            theme.set(prefersDark ? "dark" : "light");
        }
    });
</script>

<Button on:click={toggle} class="h-10 w-10 no-drag hover:scale-110 focus:ring-transparent">
    {#if $theme === "dark"}
        <SunSolid class="h-6 w-6 text-text dark:text-dark-text" />
    {:else}
        <MoonSolid class="h-6 w-6 text-text dark:text-dark-text" />
    {/if}
</Button>
