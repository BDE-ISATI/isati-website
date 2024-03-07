<script lang="ts">
	import LargeCard from "$lib/components/individuels/LargeCard.svelte";
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


	<h1>Les articles {categorie ? `- ${categorie}` : ""}</h1>

	<div class="content">
		{#each filtered_article as article}
			<LargeCard href={`article?id=${article.ID}`} icone="" sub={article.categorie} main={article.nom} date={(new Date(article["release-date"])).toDateString()}></LargeCard>
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