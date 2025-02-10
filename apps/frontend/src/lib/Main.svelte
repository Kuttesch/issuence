<script lang="ts">
    import {Badge, Hr, P} from 'flowbite-svelte';
    import MD from './main/MD.svelte';
    import { frontendVariables } from './store';
    import Comments from './main/Comments.svelte';
    import Titlebar from './main/Titlebar.svelte';
    import TodoList from './main/TodoList.svelte';

</script>

<div class="w-3/4 min-w-170 h-full flex flex-row items-start justify-start overflow-y-scroll scrollbar-hide">
    <div class="w-full min-h-full h-auto bg-background-secondary rounded-t-2xl shadow-2xl flex flex-col items-start justify-start p-12">
        <Titlebar/>
        <MD/>
        <TodoList/>
    </div>
    <!-- <Comments/> -->
</div>