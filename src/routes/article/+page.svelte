<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import LargeCard from "$lib/components/individuels/LargeCard.svelte";

    import { onMount } from "svelte";
	import { articleBucket } from '$lib/config.js';
	import edjsHTML from "editorjs-html";

	let query:string
	let html:string


	onMount(async() => {
		query = window.location.hash.slice(1)
		console.log(query)
		if (query) {
			const edjsParser = edjsHTML();
			let req = await fetch( articleBucket + query + ".json")
			let data = await req.json()
			html = edjsParser.parse(data).join("")
		}
	})

</script>

<div class="main">
	{@html html}
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