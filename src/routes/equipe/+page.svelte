<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import NewCard from "$lib/components/individuels/NewCard.svelte";
    import NewCardLine from "$lib/components/individuels/NewCardLine.svelte";
	import { members_public } from "$lib/store";

</script>

<div class="flex relative gap-4 flex-col">

	<h1 class="uppercase text-3xl font-bold">L'équipe</h1>

	<div class="columns-xs *:my-4 text-center w-full">
		{#each Object.keys($members_public) as grp}
			<NewCard title={grp}>
				{#each $members_public[grp] as user}
					<NewCardLine primary={user.nom} secondary={user.rôle} href={user.contact} image={user.photo}></NewCardLine>
					<hr class="m-2 w-2/3 self-center border-container-500 last:hidden">	
				{/each}
			</NewCard>
		{/each}
	</div>

</div>