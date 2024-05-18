<script lang="ts">
    import { onMount } from "svelte";
	import { articleBucket } from '$lib/config.js';
	import edjsHTML from "@editorjs/html";

	let params = new URLSearchParams(document.location.search);
	let id = params.get("id")

	async function loadArticle() {
		const edjsParser = edjsHTML();
		let req = await fetch( articleBucket + id + ".json")
		let data = await req.json()
		return edjsParser.parse(data).join("")
	}
	
</script>

<div class="article flex relative gap-4 flex-col ">
	{#await loadArticle()}
		Chargement de l'article
	{:then html}
		{@html html}
	{:catch e}
		Chargement de l'article impossible
		{e}
	{/await }
</div>

<style>

    :global(.article iframe) {
		max-width: 100%;
		margin:auto;
	}

	:global(.article h1) {
		font-size: 3rem; /* 48px */
		line-height: 1;
	}
	:global(.article h2) {
		font-size: 2.25rem; /* 36px */
		line-height: 2.5rem; /* 40px */
	}
	:global(.article h3) {
		font-size: 1.875rem; /* 30px */
		line-height: 2.25rem; /* 36px */
	}
	:global(.article h4) {
		font-size: 1.5rem; /* 24px */
		line-height: 2rem; /* 32px */
	}
	:global(.article h5) {
		font-size: 1.25rem; /* 20px */
		line-height: 1.75rem; /* 28px */
	}
	:global(.article h6) {
		font-size: 1.125rem; /* 18px */
		line-height: 1.75rem; /* 28px */
	}

	:global(.article a[href]) {
		color:rgb( var(--color-primary) );
	}

</style>