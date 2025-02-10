<script lang="ts">
    import { Badge } from "flowbite-svelte";
    import { frontendVariables } from "../store";
    import { CalendarEditOutline, CalendarWeekOutline, ClockOutline, EditOutline, EditSolid, TruckClockOutline, UserEditOutline } from "flowbite-svelte-icons";
    let timeDate :boolean	= false;
    let edited: boolean = false;
    let shownDate: Date | null = null;

    function formatDate(date_string: Date | null): string {
        if (date_string === null) {
            return '';
        } else {
            console.log(date_string);
            let date = new Date(date_string);
            console.log(date);
            if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
                console.log(date.toLocaleDateString());
                console.log(new Date().toLocaleDateString());
                timeDate = true;
                return date.toLocaleTimeString();
            } else {
                timeDate = false;
                return date.toLocaleDateString();
            }
        }
    }

    $: if ($frontendVariables.currentIssue.updated !== null) {
        console.log($frontendVariables.currentIssue.updated);
        edited = true;
        shownDate = $frontendVariables.currentIssue.updated;
    } else {
        edited = false;
        shownDate = $frontendVariables.currentIssue.created;
    }

</script>


<div class="w-full h-30 rounded-t-2xl flex flex-row items-start justify-start               ">
    <div class="w-6/7 h-full text-2xl font-bold flex flex-col items-start justify-start     ">
<!-- Title -->
        <div class="w-5/5 h-1/2 text-3xl font-bold flex flex-row items-center justify-start ">
            {$frontendVariables.currentIssue.title}
        </div>
<!-- Status -->
        <div class="w-2/5 h-1/2 font-bold flex flex-row items-start justify-start           ">
            <div class="min-w-25 w-1/4 h-full flex flex-row items-center justify-start              ">
                {#if $frontendVariables.currentIssue.status === 'open'}
                    <Badge color="green" class="text-xs w-20 aspect-[2/1]" rounded >open</Badge>
                {:else if $frontendVariables.currentIssue.status === 'current'}
                    <Badge color="blue" class="text-xs w-20 aspect-[2/1]" rounded>current</Badge>
                {:else if $frontendVariables.currentIssue.status === 'done'}
                    <Badge color="red" class="text-xs w-20 aspect-[2/1]" rounded>done</Badge>
                {:else if $frontendVariables.currentIssue.status === 'later'}
                    <Badge color="blue" class="text-xs w-20 aspect-[2/1]" rounded>later</Badge>
                {/if}
            </div>
<!-- Date -->
            <div class="w-3/4 h-full flex flex-row items-center justify-start">
                {#if edited}
                    {#if timeDate}
                    <UserEditOutline class="w-7 h-full mr-2"/>
                    {:else}
                    <CalendarEditOutline class="w-7 h-full mr-2"/>
                    {/if}
                {:else}
                    {#if timeDate}
                        <ClockOutline class="w-7 h-full mr-2"/>
                        {:else}
                        <CalendarWeekOutline class="w-7 h-full mr-2"/>
                    {/if}
                {/if}
                <div class="text-text text-lg font-normal">{formatDate(shownDate)}</div> <!--!TODO Styling-->
            </div>
        </div>
    </div>
<!-- Edit -->
    <div class="w-1/7 h-full flex flex-row-reverse items-center justify-start">
            <div class="text-xl bg-background rounded-xl pl-5 pr-5 pb-3 pt-3"> Edit </div>
    </div>
</div>