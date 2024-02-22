<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import HalfCard from "$lib/components/individuels/HalfCard.svelte";

	export let salles:{
		vacant:{salleID:string,batimentID:string,until:number}[]
		occupied:{salleID:string,batimentID:string,until:number}[]
	}
</script>

<div class="main">

	<h2>Les salles</h2>

	<div class="content">

		{#each salles.vacant as salle}
			<!-- {JSON.stringify(salle)} -->
			<HalfCard main={salle.salleID} sub={"Libre jusqu'à" + salle.until} icone_text={salle.batimentID}></HalfCard>
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