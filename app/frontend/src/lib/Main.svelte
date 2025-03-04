<script lang="ts">
    import { Badge, Hr, P } from 'flowbite-svelte';
    import MD from './main/MD.svelte';
    import { frontendVariables } from './store';
    import Comments from './main/Comments.svelte';
    import Header from './main/Header.svelte';
    import TodoList from './main/TodoList.svelte';
    import { tick } from 'svelte';
    
    let editBool: boolean = false;
    export const loadNewIssue: (issueName?: string) => Promise<void> = async (issueName) => {
        let id;
        console.log('loading new issue');
        if (issueName) {
            if ($frontendVariables.currentIssue) {
                saveCurrentIssue();
            }
            id = await window.electron.database.getIdOfIssue(issueName);
            $frontendVariables.currentIssue = await window.electron.database.getIssue(id);
        } else {
            throw new Error('Issue name not provided');
        }
    };


    async function scrollToBottom() { //!TODO fix jankiness
        await tick();
        const div = document.getElementById('scroll');
        if (div) {
            div.scrollTop = div.scrollHeight;
            console.log('scrolling to bottom');
        } else {
            console.log('scrolling failed');
        }
    }

    function edit() {
        editBool = true;
    }

    function noEdit() {
        editBool = false;
    }

    // ## Issue saving ## //

    function saveCurrentIssue() {
        console.log('saving issue');
        window.electron.database.saveIssue($frontendVariables.currentIssue);
    }

</script>
<div id="scroll" class="w-3/4 min-w-170 h-full flex flex-col items-start justify-start overflow-y-scroll scrollbar-hide drop-shadow-main dark:drop-shadow-dark-main-small">
    <div class="w-full h-auto bg-background-secondary dark:bg-dark-background-secondary rounded-2xl flex flex-col items-start justify-start p-12 gap-4">
        <Header on:edit={edit} on:noEdit={noEdit} on:saveCurrentIssue={saveCurrentIssue}/>
        <MD edit={editBool} on:saveCurrentIssue={saveCurrentIssue}/>
        <TodoList on:saveCurrentIssue={saveCurrentIssue}/>
        <Hr/>
        <Comments on:saveCurrentIssue={saveCurrentIssue}/>
        <!-- <Footer on:scrollToBottom={() => { scrollToBottom() }} on:saveCurrentIssue={saveCurrentIssue}/> -->
    </div>
</div>
