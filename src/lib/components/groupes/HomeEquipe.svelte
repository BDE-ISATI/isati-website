<script lang="ts">
	import Card from "$lib/components/individuels/Card.svelte";

	import { members } from "$lib/store";

</script>


<div class="main">

	<h1 class="uppercase text-3xl font-bold mb-2"><a class="text-[var(--text)]" href={"/equipe"}>L'équipe<i class="ph align-text-bottom ph-caret-right"></i></a></h1>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">

		{#each $members.slice(0,4) as user}
			<Card main={user.nom} sub={user.rôle} href={user.contact} icone={`https://website-members-pictures.s3.eu-west-3.amazonaws.com/${user.ID}.webp`}></Card>
		{/each}
	</div>

</div>