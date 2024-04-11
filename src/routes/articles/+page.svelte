<script lang="ts">
	import DoubleCardArticle from "$lib/components/individuels/DoubleCardArticle.svelte";
	import { articles } from "$lib/store";
	import type { articlesType } from "$lib/store";

	let filtered_article:articlesType = []

	let params = new URLSearchParams(document.location.search);
	let categorie = params.get("categorie")

	articles.subscribe((value) => {
		filtered_article = categorie ? value.filter((a) => {return a.categorie == categorie}) : value
	})

</script>



<div class="main">

	<h1 class="uppercase text-3xl font-bold">Les articles {categorie ? `- ${categorie}` : ""}</h1>

	<div class="content">
		{#each filtered_article as article}
			<DoubleCardArticle id={article.ID} description={article.description} categorie={article.categorie} main={article.nom}></DoubleCardArticle>
		{/each}
		
	</div>
	
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
		gap:30px;
		place-items: center;
	}

	@media (max-width : 720px) {
		.content {
			grid-template-columns: repeat(1,1fr);
		}
	}

</style>