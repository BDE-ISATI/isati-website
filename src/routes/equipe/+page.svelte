<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import Card from "$lib/components/individuels/Card.svelte";

	import { members } from "$lib/store";

</script>

<div>

	<h1 class="uppercase text-3xl font-bold">L'équipe</h1>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">

		{#each $members as user}
			<Card main={user.nom} sub={user.rôle} href={user.contact} icone={`https://website-members-pictures.s3.eu-west-3.amazonaws.com/${user.ID}.webp`}></Card>
		{/each}
	</div>

</div>