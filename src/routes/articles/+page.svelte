<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import LargeCard from "$lib/components/individuels/LargeCard.svelte";
	import { articles } from "$lib/store";
</script>



<div class="main">


	<h1>Les articles</h1>

	<div class="content">
		{#each $articles as article}
			<LargeCard href={"article#"+article.ID} icone="" sub={article.categorie} main={article.nom} date={(new Date(article["release-date"])).toDateString()}></LargeCard>
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