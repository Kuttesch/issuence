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

        <TodoList/>
    </div>
</div>