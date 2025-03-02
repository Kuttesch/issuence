<script lang="ts">
    import { Carta, MarkdownEditor } from 'carta-md';
    import { slash } from '@cartamd/plugin-slash';
    import { code } from '@cartamd/plugin-code';
    import { frontendVariables } from '../store';
    // import '@cartamd/plugin-code/default.css';
    import '../styles/theme.css';
    import { loadHighlighter } from 'carta-md';
    import { createEventDispatcher, onDestroy } from 'svelte';

    export let edit: boolean = false;

    let isDark = false;
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

    
    const customThemeSettingsDark = [
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
            code({
                theme: 'carta-dark',
            })
        ],
        shikiOptions: {
            themes: ['material-theme-darker']
        },
    });

    (async () => {
        // Load the base theme using the loadHighlighter method
        const highlighter = await loadHighlighter({
            theme: 'material-theme-darker',
            grammarRules: [],
            highlightingRules: []
        });

        // Merge custom settings with the base theme
        const baseTheme = highlighter.getTheme('material-theme-darker');
        const mergedTheme = {
            ...baseTheme,
            settings: [
                ...baseTheme.settings,
                ...customThemeSettings
            ]
        };
        highlighter.setTheme(mergedTheme);
        carta.highlighter = async () => highlighter;
    })();

    onDestroy(() => {
        dispatcher('saveCurrentIssue');
    });

    $: isDark = $frontendVariables.isDark;

</script>

<div class="w-full min-h-[15vh] max-h-[40vh] h-auto text-lg text-text dark:text-dark-text flex flex-col items-start justify-start pt-4">
    {#if edit}
        <MarkdownEditor bind:value={$frontendVariables.currentIssue.description} mode="tabs" theme="issuence" carta={carta} />
    {:else}
        <MarkdownEditor bind:value={$frontendVariables.currentIssue.description} mode="tabs" theme="issuence" selectedTab="preview" disableToolbar={true} carta={carta} />
    {/if}
</div>