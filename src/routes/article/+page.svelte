<script lang="ts">
    import { onMount } from "svelte";
	import { articleBucket } from '$lib/config.js';
	import edjsHTML from "editorjs-html";

	let params = new URLSearchParams(document.location.search);
	let id = params.get("id")

	async function loadArticle() {
		const edjsParser = edjsHTML();
		let req = await fetch( articleBucket + id + ".json")
		let data = await req.json()
		return edjsParser.parse(data).join("")
	}
	
</script>

<div class="main">
	{#await loadArticle()}
		Chargement de l'article
	{:then html}
		{@html html}
	{:catch}
		Chargement de l'article impossible
	{/await }
</div>

<style>

	.main {
		display: flex;
		flex-direction: column;
		gap:15px;
	}

    .content {
		display: grid;
		grid-template-columns: repeat(2,1fr);
		gap:10px;
		place-items: center;
	}

	@media (max-width : 720px) {
		.content {
			display: grid;
			grid-template-columns: repeat(1,1fr);
			gap:10px;
			place-items: center;
		}
	}

</style>