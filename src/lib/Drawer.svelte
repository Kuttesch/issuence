<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { createEventDispatcher } from 'svelte';
    
    export let hidden: boolean = false;
    export let disabled: boolean = false;
    export let width: number = 300; // Sidebar width
    const dispatch = createEventDispatcher();

    function handleMouseleave() {
        dispatch('onmouseleave');
    }



    let sidebarWidth = tweened(width, { duration: 400, easing: cubicOut });
    let x = tweened(0, { duration: 400, easing: cubicOut });

    $: x.set(hidden ? (width * -1) : 0);
    $: sidebarWidth.set(hidden ? 0 : width);
</script>

<div class="ease-in-out overflow-hidden h-full" style="width: {$sidebarWidth}px;" on:mouseleave={handleMouseleave}>
    {#if !disabled}
        <div class="h-fullshadow-lg" style="transform: translateX({$x}px);">
            <slot></slot>    
        </div>
    {/if}
</div>
