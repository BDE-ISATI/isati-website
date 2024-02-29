<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import HalfCard from "$lib/components/individuels/HalfCard.svelte";

	export let users:{ID:string,nom:string,contact:string,photo:string,rôle:string}[]

</script>

<div class="main">

	<h2>L'équipe</h2>

	<div class="content">

		{#each users as user}
			<HalfCard main={user.nom} sub={user.rôle} icone={`https://website-members-pictures.s3.eu-west-3.amazonaws.com/${user.ID}.webp`}></HalfCard>
		{/each}
	</div>
	
	<div class="action">
		<Button>Voir plus</Button>
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