<script lang="ts">
    import { marked } from 'marked'; 

    export let text: string = '';
    let html: string;

    $: async () => {
        html = await marked(text);
    }

</script>

<div class="w-full h-2/5 text-lg text-text flex flex-col items-start justify-start pt-4">
            <div>
                {@html html}
            </div>
        </div>