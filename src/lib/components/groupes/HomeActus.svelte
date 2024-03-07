<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import ActusCard from "$lib/components/individuels/ActusCard.svelte";
</script>

<div class="main">

	<h2>Les articles</h2>

	<div class="content">

		<div>
			<ActusCard href="/articles?categorie=actus" text="Les dernières actus"></ActusCard>
			<ActusCard href="/articles?categorie=guides" text="Les guides"></ActusCard>
			<ActusCard href="/articles?categorie=clubs" text="Les clubs"></ActusCard>
			<ActusCard href="/articles?categorie=sports" text="Les équipes sportives"></ActusCard>
		</div>
		
	</div>
	
	<div class="action">
		<Button href="/articles">Voir plus</Button>
	</div>

</div>

<style>

	.main {
		display: flex;
		flex-direction: column;
		gap:15px;
	}

	.content {
		width: calc( 100% + 12px);
		scrollbar-width: none;
		overflow-x: scroll;
		overflow-y:visible ;
		padding:10px;
		margin:-16px;
	}

	.content::-webkit-scrollbar {
		display: none;
	}


	.content > div {
		width: fit-content;
		display: flex;
		gap:10px;
	}

	.action {
		display: grid;
		place-items: center;
	}

</style>