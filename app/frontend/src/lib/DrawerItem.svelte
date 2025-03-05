<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name: string = '';
    export let id: number = 0;

    const dispatcher = createEventDispatcher();
    async function handleClick() {
        dispatcher('switchIssue', id);
    }

</script>

<div class="w-9/10 h-10 rounded-l flex flex-row items-center justify-start hover:bg-background hover:dark:bg-dark-background ease-in-out transition-all duration-100" on:click={handleClick}>
    <div class="text-x text-text dark:text-dark-text">
        {name}
    </div>
</div>