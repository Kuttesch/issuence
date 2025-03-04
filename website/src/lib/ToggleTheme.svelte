<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { SunSolid, MoonSolid } from "flowbite-svelte-icons";
    import { theme } from "../stores";

    const toggle = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        const newTheme = isDark ? "dark" : "light";
        localStorage.setItem("color-theme", newTheme);
        theme.set(newTheme as "light" | "dark"); // Fix: Explicitly assert type
    };

    onMount(() => {
        const storedTheme = localStorage.getItem("color-theme");
        if (storedTheme === "dark" || storedTheme === "light") {
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
            theme.set(storedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const defaultTheme = prefersDark ? "dark" : "light";
            document.documentElement.classList.toggle("dark", prefersDark);
            theme.set(defaultTheme);
            localStorage.setItem("color-theme", defaultTheme);
        }
    });
</script>

<Button on:click={toggle} class="h-10 w-10 no-drag hover:scale-110 focus:ring-transparent">
    {#if $theme === "dark"}
        <SunSolid class="h-6 w-6 text-gray-900 dark:text-gray-100" />
    {:else}
        <MoonSolid class="h-6 w-6 text-gray-900 dark:text-gray-100" />
    {/if}
</Button>
