<script lang="ts">

    export let orientation: "left" | "right" = "left";



</script>

{#if orientation === "left"}
<div class="w-full min-h-[25vh] h-auto flex flex-row bg-red-500">
    <div class="w-1/2 min-h-full h-auto bg-green-400">
        <slot name="picture"></slot>
    </div>
    <div class="w-1/2 min-h-full h-auto bg-blue-400">
        <slot name="text" class="w-1/2 h-full bg-yellow-400"></slot>
    </div>
</div>
{:else}
<div class="w-full min-h-[25vh] h-auto flex flex-row bg-red-500">
    <div class="w-1/2 min-h-full h-auto bg-blue-400">
        <slot name="text" class="w-1/2 h-full bg-yellow-400"></slot>
    </div>
    <div class="w-1/2 min-h-full h-auto bg-green-400">
        <slot name="picture"></slot>
    </div>
</div>
{/if}