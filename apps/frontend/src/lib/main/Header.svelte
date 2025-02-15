<script lang="ts">
    import { Badge, Button } from "flowbite-svelte";
    import { frontendVariables } from "../store";
    import { CalendarEditOutline, CalendarWeekOutline, ClockOutline, EditOutline, EditSolid, TruckClockOutline, UserEditOutline } from "flowbite-svelte-icons";
    import { Status } from "../../../data";
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

    async function clickBadge(status: Status) {
        console.log(status);
        $frontendVariables.currentIssue.status = status;
        await window.electron.database.saveIssue($frontendVariables.currentIssue);
    }

</script>


<div class="w-full h-40 rounded-t-2xl flex flex-row items-start justify-start               ">
    <div class="w-6/7 h-full text-2xl font-bold flex flex-col items-start justify-start     ">
<!-- Title -->
        <div class="w-5/5 h-1/2 text-3xl font-bold flex flex-row items-center justify-start ">
            {$frontendVariables.currentIssue.title}
        </div>
<!-- Status -->
        <div class="w-2/5 h-1/2 font-bold flex flex-row items-start justify-start           ">
            <div class="min-w-25 w-1/4 h-full flex flex-row items-center justify-start              ">
                {#if $frontendVariables.currentIssue.status === Status.OPEN}
                    <Button class="focus: ring-transparent p-0 m-0" on:click={() => clickBadge(Status.LATER)}>
                        <Badge color="green" class="text-xs w-20 aspect-[2/1]" rounded>open</Badge>
                    </Button>
                {:else if $frontendVariables.currentIssue.status === Status.LATER}
                    <Button class="focus: ring-transparent p-0 m-0" on:click={() => clickBadge(Status.CURRENT)}>
                        <Badge color="blue" class="text-xs w-20 aspect-[2/1]" rounded>later</Badge>
                    </Button>
                {:else if $frontendVariables.currentIssue.status === Status.CURRENT}
                    <Button class="focus: ring-transparent p-0 m-0" on:click={() => clickBadge(Status.DONE)}>
                        <Badge color="indigo" class="text-xs w-20 aspect-[2/1]" rounded>current</Badge>
                    </Button>
                {:else if $frontendVariables.currentIssue.status === Status.DONE}
                    <Button class="focus: ring-transparent p-0 m-0" on:click={() => clickBadge(Status.OPEN)}>
                        <Badge color="red" class="text-xs w-20 aspect-[2/1]" rounded>done</Badge>
                    </Button>
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
            <Button class="w-20 h-12 bg-primary text-text text-lg font-bold rounded-xl hover:scale-110 focus: ring-transparent"> Edit </Button>
    </div>
</div>