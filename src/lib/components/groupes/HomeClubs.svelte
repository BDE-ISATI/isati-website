<script lang="ts">
    import NewCardLine from "../individuels/NewCardLine.svelte";

	import { articles } from "$lib/store";
    import NewCard from "../individuels/NewCard.svelte";

</script>
<div class="inline-block">
	<div class="flex relative gap-4 flex-col items-center">

		<h1 class="uppercase text-3xl font-bold flex justify-center">Les Clubs</h1>

		<NewCard title="">
			{#each $articles as article}
				<NewCardLine primary={article.nom} href={`/article?id=${article.ID}`}></NewCardLine>
				<hr class="m-2 w-2/3 self-center border-container-500 last:hidden">	
			{/each}
		</NewCard>

	</div>
</div>