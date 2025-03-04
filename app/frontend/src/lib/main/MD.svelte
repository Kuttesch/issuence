<script lang="ts">
    import { Carta, MarkdownEditor } from 'carta-md';
    import { slash } from '@cartamd/plugin-slash';
    import { code } from '@cartamd/plugin-code';
    import { frontendVariables, theme } from '../store';
    // import '@cartamd/plugin-code/default.css';
    import '../styles/issuence.css';
    import { loadHighlighter } from 'carta-md';
    import { createEventDispatcher, onDestroy } from 'svelte';

    export let edit: boolean = false;

    let dispatcher = createEventDispatcher();

    const customThemeSettings = [
        {
            scope: "markup.bold",
            settings: { fontStyle: "bold", foreground: "#FACC15" }
        },
        {
            scope: "markup.italic",
            settings: { fontStyle: "italic", foreground: "#A78BFA" }
        },
        {
            scope: "markup.inline",
            settings: { foreground: "#F97316" }
        },
        {
            scope: "markup.code",
            settings: { background: "#FFFFFF", foreground: "#D1D5DB" }
        },
        {
            scope: "markup.heading",
            settings: { foreground: "#F59E0B" }
        },
        {
            scope: "markup.list",
            settings: { foreground: "#F59E0B" }
        },
        {
            scope: "markup.quote",
            settings: { foreground: "#F59E0B" }
        }
    ];

    const carta = new Carta({
        sanitizer(html) {
            return html;
        },
        extensions: [
            slash(),
            code()
        ]
    });

    async function updateHighlighter(theme: "light" | "dark" = "light") {
        // Load the base theme using the loadHighlighter method
        let highlighterTheme = 'material-theme-lighter';
        if (theme === 'dark') {
            highlighterTheme = 'material-theme-darker';
        }
        const highlighter = await loadHighlighter({
            theme: highlighterTheme,
            grammarRules: [],
            highlightingRules: []
        });

        // Merge custom settings with the base theme
        const baseTheme = highlighter.getTheme(highlighterTheme);
        const mergedTheme = {
            ...baseTheme,
            settings: [
                ...baseTheme.settings,
                ...customThemeSettings
            ]
        };
        highlighter.setTheme(mergedTheme);
        console.log("Theme applied:", mergedTheme);
        carta.highlighter = async () => highlighter;
    }


    onDestroy(() => {
        dispatcher('saveCurrentIssue');
    });

    $: {
        theme.subscribe(value => {
            updateHighlighter(value);
        });
    }

</script>

<div class="w-full min-h-[15vh] max-h-[40vh] h-auto text-lg text-text dark:text-dark-text flex flex-col items-start justify-start pt-4">
    {#if edit}
        {#if $theme === 'dark'}
            <MarkdownEditor bind:value={$frontendVariables.currentIssue.description} mode="tabs" theme="issuence-dark" carta={carta} />
        {:else}
            <MarkdownEditor bind:value={$frontendVariables.currentIssue.description} mode="tabs" theme="issuence-light" carta={carta} />
        {/if}
    {:else}
        <MarkdownEditor bind:value={$frontendVariables.currentIssue.description} mode="tabs" theme="issuence-{$theme}" selectedTab="preview" disableToolbar={true} carta={carta} />
    {/if}
</div>