<script lang="ts">
    import { Badge, Hr, P } from 'flowbite-svelte';
    import MD from './main/MD.svelte';
    import { frontendVariables } from './store';
    import Comments from './main/Comments.svelte';
    import Header from './main/Header.svelte';
    import TodoList from './main/TodoList.svelte';
    import Footer from './main/Footer.svelte';
    import { tick } from 'svelte';

    let currentIssue;
    $: currentIssue = $frontendVariables.currentIssue;
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
</script>

<div id="scroll" class="w-3/4 min-w-170 h-full flex flex-col items-start justify-start overflow-y-scroll scrollbar-hide">
    <div class="w-full h-auto bg-background-secondary rounded-2xl flex flex-col items-start justify-start p-12">
        <Header/>
        <MD/>
        <TodoList/>
        <Hr/>
        {#if currentIssue?.comments?.length > 0}
            <Comments/>
        {:else}
            <P class="text-text">No comments yet</P>
        {/if}
        <Footer on:scrollToBottom={() => { scrollToBottom() }}/>
    </div>
</div>
