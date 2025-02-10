<script lang="ts">
    import {Badge, Hr, P} from 'flowbite-svelte';
    import MD from './MD.svelte';
    import { frontendVariables } from './store';

    function formatDate(date_string: Date) {
        let date = new Date(date_string);
        if (date.toLocaleDateString == new Date().toLocaleDateString) {
            return date.toLocaleTimeString();
        } else {
            return date.toDateString();
        }
    }

</script>

<div class="w-5/6 h-full flex flex-row items-center justify-center">
    <div class="w-full h-full bg-background-secondary rounded-2xl shadow-2xl flex flex-col items-center justify-start p-12">
        <!-- <div class="w-full h-2/5 bg-blue-500 rounded-t-2xl flex items-start justify-center"> -->
            <div class="w-full h-1/5 rounded-t-2xl flex flex-row items-start justify-start">
                <div class="w-3/5 h-full text-2xl font-bold flex flex-col items-start justify-start">
                    <div class="w-3/5 h-1/2 text-2xl font-bold flex flex-row items-center justify-start">{$frontendVariables.currentIssue.title}</div>
                    <div class="w-3/5 h-1/2 font-bold flex flex-row items-start justify-start">
                        <div class="w-1/3 h-full flex flex-row items-center justify-start">
                            {#if $frontendVariables.currentIssue.status === 'open'}
                                <Badge color="green" class="text-xs w-2/3 h-2/3" rounded >open</Badge>
                            {:else if $frontendVariables.currentIssue.status === 'current'}
                                <Badge color="blue" class="text-xs w-2/3 h-2/3" rounded>current</Badge>
                            {:else if $frontendVariables.currentIssue.status === 'done'}
                                <Badge color="red" class="text-xs w-2/3 h-2/3" rounded>done</Badge>
                            {/if}
                        </div>
                        <div class="w-2/3 h-full  flex flex-row items-center justify-start">
                            <div class="text-text text-lg font-normal">Issue created: {formatDate($frontendVariables.currentIssue.created)}</div> <!--!TODO Styling-->
                        </div>
                    </div>
                </div>
                <div class="w-2/5 h-full flex flex-row-reverse items-center justify-start">
                        <div class="text-xl bg-background rounded pl-3 pr-3 pb-1 pt-1"> Edit </div>
                </div>
                
            </div>
        <MD text={$frontendVariables.currentIssue.description} />
    </div>
</div>