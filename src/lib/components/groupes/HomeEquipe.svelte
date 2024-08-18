<script lang="ts">
	import Card from "$lib/components/individuels/Card.svelte";
	import { CaretRight } from "phosphor-svelte"
    import NewCardLine from "../individuels/NewCardLine.svelte";

	import { members } from "$lib/store";
    import NewCard from "../individuels/NewCard.svelte";
    import { bucket } from "$lib/config";

</script>
<div class="flex relative gap-4 flex-col items-center">

	<h1 class="uppercase text-3xl font-bold flex justify-center"><a class="text-container-100 flex" href={"/equipe"}>L'Équipe<CaretRight/></a></h1>

	<NewCard title="Bureau restreint">
		{#each $members.slice(0,4) as user}
			<NewCardLine primary={user.nom} secondary={user.rôle} href={user.contact} icone={`${bucket}/members/${user.ID}.webp`}></NewCardLine>
			<hr class="m-2 w-2/3 self-center border-container-500 ">	
		{/each}
	</NewCard>

</div>