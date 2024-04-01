<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import HalfCard from "$lib/components/individuels/HalfCard.svelte";

	import { members } from "$lib/store";

</script>

<div class="main">

	<h1>L'équipe</h1>

	<div class="content">

		{#each $members.slice(0,4) as user}
			<HalfCard main={user.nom} sub={user.rôle} contact={user.contact} icone={`https://website-members-pictures.s3.eu-west-3.amazonaws.com/${user.ID}.webp`}></HalfCard>
		{/each}
	</div>
	
	<div class="action">
		<Button href={"/equipe"}>Voir plus</Button>
	</div>

</div>

<style>

	.main {
		display: flex;
		flex-direction: column;
		gap:15px;
	}

	.content {
		display: flex;
		justify-content: space-between
	}

	.action {
		display: grid;
		place-items: center;
	}

	@media (max-width : 720px) {
		.content {
			display: grid;
			grid-template-columns: repeat(2,1fr);
			gap:10px;
			place-items: center;
		}
	}

</style>