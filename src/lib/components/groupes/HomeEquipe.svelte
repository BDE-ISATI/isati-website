<script lang="ts">
    import NewCardLine from "../individuels/NewCardLine.svelte";
	import { members_public } from "$lib/store";
    import NewCard from "../individuels/NewCard.svelte";
    import HomeCommon from "./HomeCommon.svelte";
	import Button from "$lib/components/individuels/Button.svelte";

	let key = "Bureau Restreint"

</script>

<HomeCommon title="L'Équipe">
	<NewCard title={key}>
		{#if Object.keys($members_public).length > 0}
			{#each $members_public[key] as user}
				<NewCardLine primary={user.nom} secondary={user.rôle} href={user.contact} image={user.photo}></NewCardLine>
				<hr class="m-2 w-2/3 self-center border-container-500 last:hidden">	
			{/each}
		{/if}
		<Button href={"/equipe"}>Voir Plus</Button>
	</NewCard>
</HomeCommon>