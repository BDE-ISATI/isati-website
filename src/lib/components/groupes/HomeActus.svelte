<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import ActusCard from "$lib/components/individuels/ActusCard.svelte";

	let scrolling:HTMLDivElement
</script>

<div class="main">

	<h2>Les articles</h2>

	<button class="left" on:click={()=>scrolling.scrollBy(-100,0)}><i class="ph ph-caret-circle-left"></i></button>
	<div class="content" bind:this={scrolling}>

		<div>
			<ActusCard href="/articles?categorie=actus" text="Les dernières actus"></ActusCard>
			<ActusCard href="/articles?categorie=guides" text="Les guides"></ActusCard>
			<ActusCard href="/articles?categorie=clubs" text="Les clubs"></ActusCard>
			<ActusCard href="/articles?categorie=sports" text="Les équipes sportives"></ActusCard>
		</div>
	</div>
	
	<button class="right" on:click={()=>scrolling.scrollBy(100,0)}><i class="ph ph-caret-circle-right"></i></button>
	<div class="action">
		<Button href="/articles">Voir plus</Button>
	</div>

	

</div>

<style>

	.right,.left{
		position: absolute;
		top:105px;
		font-size: 30px;
		border: none;
		background-color: transparent;
		color:var(--text);
	}

	.right {
		right:-60px;
	}
	.left {
		left:-60px;
	}
	
	.main {
		display: flex;
		flex-direction: column;
		gap:15px;
		position: relative;
	}
	
	.content {
		scroll-behavior: smooth;
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

	@media (max-width : 900px) {
		.right,.left{
			display: none;
		}
	
	}

</style>