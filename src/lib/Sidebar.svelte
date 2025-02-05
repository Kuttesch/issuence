<script lang="ts">
    import {Button} from "flowbite-svelte"
    export let disabled: boolean = false;
    export let gap: number = 4;
</script>
{#if !disabled}
<div class="w-1/3 h-full bg-white flex flex-col items-center justify-start">
    <div class="w-full h-20 bg-amber-950">
        <slot name="header"></slot>
    </div>
    <div class="w-full h-full flex flex-col items-center justify-start gap-{gap} mt-{gap} overflow-scroll">
        <slot></slot>    
    </div>
</div>
{/if}
