<script lang="ts">
    import icon from '../assets/icon.png';
    import pkg from '../../package.json';
</script>
<div class="flex flex-col gap-4 justify-center items-center">
    <div class="flex flex-row gap-4 justify-center items-center">
        <img src={icon} alt="Icon" class="w-20 h-20" />
        <div class="text-6xl text-text dark:text-dark-text">Welcome to Issuence</div>
    </div>
    <div class="text-xl text-text dark:text-dark-text">To enhance your workflow, hover over the left side of the screen to open the Sidebar...</div>
    <div class="fixed bottom-0 flex flex-col justify-center items-center">
        <div class="text-text dark:text-dark-text">v{pkg.version}</div>
        {#if pkg.version.startsWith("0")}
        <div class="text-text dark:text-dark-text">This is a beta release. Features may change and issues could occur.</div>
        {/if}
    </div>
</div>