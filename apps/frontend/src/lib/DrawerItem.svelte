<script lang="ts">
  import { frontendVariables, resetFrontendVariables } from "./store";

    export let name: string = '';

    async function handleClick() {
        await resetFrontendVariables();
        $frontendVariables.currentIssueId = await window.electron.database.getIdOfIssue(name);
        $frontendVariables.currentIssue = await window.electron.database.getIssue($frontendVariables.currentIssueId);
        console.log($frontendVariables.currentIssue);
    }

</script>

<div class="w-9/10 h-10 rounded-l flex flex-row items-center justify-start hover:bg-background ease-in-out transition-all duration-100" on:click={handleClick}>
    <div class="text-x text-text">
        {name}
    </div>
</div>