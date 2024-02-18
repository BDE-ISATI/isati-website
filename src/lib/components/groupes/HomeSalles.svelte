<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import HalfCard from "$lib/components/individuels/HalfCard.svelte";

	export let salles:{nom_salle:string,num_batiment:number,jusque:Date,state:string}[]
</script>

<div class="main">

	<h2>Les salles</h2>

	<div class="content">

		{#each salles as salle}
			<!-- {JSON.stringify(salle)} -->
			<HalfCard main={salle.nom_salle} sub={salle.state} icone_text={salle.num_batiment.toString()}></HalfCard>
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
		display: grid;
		grid-template-columns: repeat(2,1fr);
		gap:10px;
		place-items: center;
	}

	.action {
		display: grid;
		place-items: center;
	}

</style>