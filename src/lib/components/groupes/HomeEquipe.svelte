<script lang="ts">
	import Card from "$lib/components/individuels/Card.svelte";
	import { CaretRight } from "phosphor-svelte"

	import { members } from "$lib/store";

</script>


<div class="flex relative gap-4 flex-col">
	<h1 class="uppercase text-3xl font-bold mb-2"><a class="text-[var(--text)] flex" href={"/equipe"}>L'équipe<CaretRight/></a></h1>
	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">

		{#each $members.slice(0,4) as user}
			<Card main={user.nom} sub={user.rôle} href={user.contact} icone={`https://website-members-pictures.s3.eu-west-3.amazonaws.com/${user.ID}.webp`}></Card>
		{/each}
	</div>

</div>