<script lang="ts">
    import { Carta, MarkdownEditor, loadHighlighter } from 'carta-md';
    import type { ThemeRegistration } from 'shiki';
    import { slash } from '@cartamd/plugin-slash';
    import { code } from '@cartamd/plugin-code';
    import { currentIssue, theme, saveIssue, edit } from '../store';
    import '../styles/issuence.css';
	// import './issuence.scss';
    import { onDestroy } from 'svelte';


	const carta = new Carta({
		sanitizer: false,
		extensions: [
			// attachment({
			// 	async upload() {
			// 		return 'some-url-from-server.xyz';
			// 	}
			// }),
			// emoji(),
			// slash(),
			code()
		]
	});

</script>

<div class="w-full min-h-[15vh] max-h-[40vh] h-auto text-lg text-text dark:text-dark-text flex flex-col items-start justify-start pt-4">
    {#if $currentIssue}
        {#if $edit}
            {#if $theme === 'dark'}
                <MarkdownEditor bind:value={$currentIssue.description} mode="tabs" theme="issuence_dark" carta={carta} />
            {:else}
                <MarkdownEditor bind:value={$currentIssue.description} mode="tabs" theme="issuence_light" carta={carta} />
            {/if}
        {:else}
            <MarkdownEditor bind:value={$currentIssue.description} mode="tabs" theme="issuence_{$theme}" selectedTab="preview" disableToolbar={true} carta={carta} />
        {/if}
    {/if}
</div>
