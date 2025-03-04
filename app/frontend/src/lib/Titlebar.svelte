<script lang="ts">
    import { Button, DarkMode } from 'flowbite-svelte';
    import { CloseOutline, ExpandOutline, MinimizeOutline, DotsHorizontalOutline, BarsOutline } from 'flowbite-svelte-icons';
    import icon from '../assets/icon.png';
    import { frontendVariables, theme } from './store';
    import ToggleTheme from './main/ToggleTheme.svelte';

    let maximized: boolean = false;
    console.log(window.electron);


    function closeApp() {
        console.log('Close App');
        window.electron.windowControls.quitApp();
    }

    async function maximizeApp() {
        console.log('Maximize App');
        maximized =  await window.electron.windowControls.maximizeWindow();
        console.log(maximized);
    }

    function minimizeApp() {
        console.log('Minimize App');
        window.electron.windowControls.minimizeWindow();
    }

    // function updateThemeStore() {
    //     console.log('Update Theme Store');
    //     if (document.documentElement.classList.contains('dark')) {
    //         $theme = 'light';
    //     } else {
    //         $theme = 'dark';
    //     }
    // }

</script>

<!-- OUTER DIV: Only this is draggable -->
<div class="w-full h-10 fixed top-0 left-0 z-10 drag">
    <div class="w-full h-10 fixed top-0 left-0">
        <div class="w-full h-10  flex flex-row items-center justify-start gap-4">
            <!-- <div class="w-10 h-10 flex items-center justify-center">
                <BarsOutline class="h-6 w-6 hover:scale-110" />
            </div> -->
            <div class="w-full h-10 flex items-center justify-start">
                <img src={icon} alt="Icon" class="w-6 h-6 m-4 no-drag" on:click={() => {$frontendVariables.currentPage = 0}}/>
                <div class="text-lg text-text dark:text-dark-text font-bold">Issuence</div>
            </div>
        </div>

    </div>
    <div class="h-10 fixed top-0 right-0 flex flex-row-reverse items-center justify-start">
        <Button on:click={closeApp} class="h-10 w-15 no-drag hover:scale-110 focus: ring-transparent">
            <CloseOutline class="h-6 w-6 text-text dark:text-dark-text" />
        </Button>
        <Button on:click={maximizeApp} class="h-10 w-15 no-drag hover:scale-110 focus: ring-transparent">
            {#if maximized}
                <MinimizeOutline class="h-6 w-6 text-text dark:text-dark-text" />
            {:else}
                <ExpandOutline class="h-6 w-6 text-text dark:text-dark-text" />
            {/if}
        </Button>
        <Button on:click={minimizeApp} class="h-10 w-15 no-drag hover:scale-110 focus: ring-transparent">
            <DotsHorizontalOutline class="h-6 w-6 text-text dark:text-dark-text" />
        </Button>
        <!-- <DarkMode class="h-10 ml-2 mr-2 no-drag hover:scale-110 focus: ring-transparent  bg-transparent hover:bg-transparent hover:dark:bg-transparent"/> -->
        <ToggleTheme class="h-10 w-15 no-drag hover:scale-110" />
    </div>
</div>
