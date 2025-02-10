<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { CloseOutline, ExpandOutline, MinimizeOutline, DotsHorizontalOutline, BarsOutline } from 'flowbite-svelte-icons';

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

</script>

<!-- OUTER DIV: Only this is draggable -->
<div class="w-full h-10 fixed top-0 left-0 drag">
    <div class="w-full h-10 fixed top-0 left-0">
        <div class="w-full h-10  flex flex-row items-center justify-start gap-4">
            <div class="w-10 h-10 flex items-center justify-center">
                <BarsOutline class="h-6 w-6 hover:scale-110" />
            </div>
            <div class="w-full h-10 flex items-center justify-start gap-4">
                <div class="text-lg text-text">Title</div>
            </div>
        </div>

    </div>
    <div class="h-10 fixed top-0 right-0 flex flex-row-reverse items-center justify-start mr-2 gap-2">
        <Button on:click={closeApp} class="h-6 w-6 no-drag hover:scale-110 focus: ring-transparent">
            <CloseOutline class="h-6 w-6" />
        </Button>
        <Button on:click={maximizeApp} class="h-6 w-6 no-drag hover:scale-110 focus: ring-transparent">
            {#if maximized}
                <MinimizeOutline class="h-6 w-6" />
            {:else}
                <ExpandOutline class="h-6 w-6" />
            {/if}
        </Button>
        <Button on:click={minimizeApp} class="h-6 w-6 no-drag hover:scale-110 focus: ring-transparent">
            <DotsHorizontalOutline class="h-6 w-6" />
        </Button>
    </div>
</div>
