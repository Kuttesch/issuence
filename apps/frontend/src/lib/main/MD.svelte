<script lang="ts">
    import { marked } from 'marked';
    import { frontendVariables } from '../store';
    import { Button } from 'flowbite-svelte';
    import { StoreOutline } from 'flowbite-svelte-icons';

    let mdSource: string = '';
    async function getIssueDescription() {
        mdSource = $frontendVariables.currentIssue.description;
        console.log(mdSource);
    }

    $: if ($frontendVariables.currentIssueId !== -1) {
        getIssueDescription();
    }

</script>


<div class="w-full min-h-[15vh] max-h-[40vh] h-auto text-lg text-text flex flex-col items-start justify-start pt-4">
        {@html marked(mdSource)}
        {@html marked(mdSource)}


</div>
