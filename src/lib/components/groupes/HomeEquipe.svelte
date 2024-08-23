<script lang="ts">
	import { CaretRight } from "phosphor-svelte"
    import NewCardLine from "../individuels/NewCardLine.svelte";

	import { members_public } from "$lib/store";
    import NewCard from "../individuels/NewCard.svelte";

	let key = "Bureau Restreint"

</script>
<div class="inline-block">
	<div class="flex relative gap-4 flex-col items-center">

		<h1 class="uppercase text-3xl font-bold flex justify-center"><a class="text-container-100 flex" href={"/equipe"}>L'Équipe<CaretRight/></a></h1>

		<NewCard title={key}>
			{#each $members_public[key] as user}
				<NewCardLine primary={user.nom} secondary={user.rôle} href={user.contact} image={user.photo}></NewCardLine>
				<hr class="m-2 w-2/3 self-center border-container-500 last:hidden">	
			{/each}
		</NewCard>

	</div>
</div>