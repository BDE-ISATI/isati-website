<script lang="ts">
    import NewCardLine from "$lib/components/individuels/NewCardLine.svelte";
	import { articles } from "$lib/store";
    import NewCard from "$lib/components/individuels/NewCard.svelte";
    import HomeCommon from "./HomeCommon.svelte";
	import Button from "$lib/components/individuels/Button.svelte";
</script>

<HomeCommon title="Les clubs">
	<NewCard title="">
		{#each $articles as article}
			<NewCardLine primary={article.nom} href={`/article?id=${article.ID}`}></NewCardLine>
			<hr class="m-2 w-2/3 self-center border-container-500 last:hidden">	
		{/each}
	</NewCard>
</HomeCommon>