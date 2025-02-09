<script lang="ts">
    import { CloseOutline, ArrowUpRightDownLeftOutline, DotsHorizontalOutline, BarsOutline } from 'flowbite-svelte-icons';
</script>

<!-- OUTER DIV: Only this is draggable -->
<div class="w-full h-10 fixed top-0 left-0 draggable">
    <div class="w-full h-10 fixed top-0 left-0">
        <div class="w-full h-10 bg-background-secondary flex flex-row items-center justify-start gap-4">
            <div class="w-10 h-10 flex items-center justify-center">
                <BarsOutline class="h-6 w-6 hover:scale-110" />
            </div>
            <div class="w-full h-10 flex items-center justify-start gap-4">
                <div class="text-lg text-text">Title</div>
            </div>
        </div>

    </div>
    <!-- <div class="h-10 fixed top-0 right-0 flex flex-row-reverse items-center justify-start mr-4 gap-4">
        <CloseOutline class="h-6 w-6 hover:scale-110" />
        <ArrowUpRightDownLeftOutline class="h-6 w-6 hover:scale-110" />
        <DotsHorizontalOutline class="h-6 w-6 mt-1 hover:scale-110" />
    </div> -->
</div>
