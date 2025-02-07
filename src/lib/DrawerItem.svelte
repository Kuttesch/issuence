<script lang="ts">
    export let name: string = '';
</script>

<div class="w-9/10 h-10 rounded-2xl flex flex-row items-center justify-center hover:bg-background ease-in-out transition-all duration-100" on:click={() => console.log(name)}>
    <div class="text-lg text-text">
        {name}
    </div>
</div>