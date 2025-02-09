<script lang="ts">
    import {P} from 'flowbite-svelte';
    import {issueStore} from './store.js';

</script>

<div class="w-5/6 h-full flex flex-row items-center justify-center p-2">
    <div class="w-full h-full bg-background-secondary rounded-2xl shadow-2xl flex flex-col items-center justify-start">
        <div class="w-full h-2/5 bg-red-500 rounded-t-2xl flex items-start justify-center">
            <div class="w-full h-2/5 bg-blue-500 rounded-t-2xl flex flex-row items-start justify-start p-2">
                <div class="w-3/5 h-1/2 bg-accent text-2xl font-bold flex flex-row items-center justify-start">{$issueStore.title}</div>
                <div class="w-2/5 h-full flex flex-row-reverse items-center justify-start p-2">
                        <div class="text-xl bg-background rounded pl-3 pr-3 pb-1 pt-1 hover: outline-2"> Edit </div>
                </div>
            </div>
        </div>


    </div>
</div>