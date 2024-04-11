<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import ActusCard from "$lib/components/individuels/ActusCard.svelte";

	let scrolling:HTMLDivElement
</script>

<div class="main">

	<h1 class="uppercase text-3xl font-bold"><a class="text-[var(--text)]" href={"/articles"}>ARTICLES<i class="ph align-text-bottom ph-caret-right"></i></a></h1>

	<button class="left" on:click={()=>scrolling.scrollBy(-200,0)}><i class="ph-fill ph-caret-circle-left"></i></button>
	<div class="content" bind:this={scrolling}>

		<div>
			<ActusCard href="/articles?categorie=actus" text="Les actus"></ActusCard>
			<ActusCard href="/articles?categorie=guides" text="Les guides"></ActusCard>
			<ActusCard href="/articles?categorie=clubs" text="Les clubs"></ActusCard>
			<ActusCard href="/articles?categorie=sports" text="Les sports"></ActusCard>
		</div>
	</div>
	
	<button class="right" on:click={()=>scrolling.scrollBy(200,0)}><i class="ph-fill ph-caret-circle-right"></i></button>

	

</div>

<style>

	/* h1>a {
		--size:36px;
		font-size: var(--size) ;
	} */

	.right,.left{
		position: absolute;
		top:120px;
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
		text-decoration: unset;
		color:var(--text);
		display: flex;
		gap:8px;
		transition: 0.5s;
		align-items: center;
		
	}

	.action:hover{
		gap: 24px;
	}


	@media (max-width : 900px) {
		.right,.left{
			display: none;
		}
	
	}

</style>