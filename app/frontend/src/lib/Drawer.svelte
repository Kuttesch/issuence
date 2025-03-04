<script lang="ts">
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { createEventDispatcher } from 'svelte';
    
    export let hidden: boolean = false;
    export let width: number = 250;
    const dispatch = createEventDispatcher();

    function handleMouseleave() {
        dispatch('onmouseleave');
    }

    // let sidebarWidth = tweened(width, { duration:    let sidebarWidth = tweened(width, { duration: 400, easing: cubicOut });
    let sidebarWidth = tweened(width, { duration: 400, easing: cubicOut });
    let x = tweened(0, { duration: 400, easing: cubicOut });

    $: x.set(hidden ? (width * -1) : 0);
    $: sidebarWidth.set(hidden ? 0 : width);
</script>

<div class="ease-in-out h-full" style="width: {$sidebarWidth}px;" on:mouseleave={handleMouseleave} role="button" tabindex="0">
    <div class="ease-in-out h-full" style="width: {width}px; transform: translateX({$x}px);" on:mouseleave={handleMouseleave} role="button" tabindex="0">
    <div class="ease-in-out overflow-y-scroll h-full scrollbar-hide bg-background-secondary dark:bg-dark-background-secondary rounded-r-2xl">
        <div class="h-12"></div>
            <div class="h-fullshadow-lg flex flex-col items-center justify-start">
                <slot></slot>
            </div>
        <div class="h-10"></div>
    </div>
</div>
</div>