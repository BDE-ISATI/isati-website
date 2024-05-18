<script lang="ts">
	import { CaretRight } from "phosphor-svelte"
	import ActusCard from "$lib/components/individuels/ActusCard.svelte";

	import { CaretCircleLeft,CaretCircleRight } from "phosphor-svelte"


	let scrolling:HTMLDivElement
</script>

<div class="flex relative gap-4 flex-col">

	<h1 class="uppercase text-3xl font-bold"><a class="text-container-100 flex" href={"/articles"}>ARTICLES<CaretRight/></a></h1>

	<button class="hidden md:block absolute top-24 text-4xl left-[-60px] text-container-600" on:click={()=>scrolling.scrollBy(-300,0)}>
		<CaretCircleLeft/>
	</button>

	<div class="overflow-y-hidden overflow-x-scroll scroll-smooth" style="scrollbar-width: none" bind:this={scrolling}>
		<div class="flex gap-4 w-fit py-4 px-1">
			<ActusCard href="/articles?categorie=actus" text="Les actus"></ActusCard>
			<ActusCard href="/articles?categorie=guides" text="Les guides"></ActusCard>
			<ActusCard href="/articles?categorie=clubs" text="Les clubs"></ActusCard>
			<ActusCard href="/articles?categorie=sports" text="Les sports"></ActusCard>
		</div>
	</div>
	
	<button class="hidden md:block absolute top-24 text-4xl right-[-60px] text-container-600" on:click={()=>scrolling.scrollBy(300,0)}>
		<CaretCircleRight/>
	</button>

</div>
