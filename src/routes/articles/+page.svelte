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



<div class="flex relative gap-4 flex-col">

	<h1 class="uppercase text-3xl font-bold">Les articles {categorie ? `- ${categorie}` : ""}</h1>

	<div class="grid gap-8 place-items-center">
		{#each filtered_article as article}
			<DoubleCardArticle id={article.ID} description={article.description} categorie={article.categorie} main={article.nom}></DoubleCardArticle>
		{/each}
		
	</div>
	
</div>

<style>

    .content {
		grid-template-columns: repeat(2,1fr);
	}

	@media (max-width : 767px) {
		.content {
			grid-template-columns: repeat(1,1fr);
		}
	}

</style>