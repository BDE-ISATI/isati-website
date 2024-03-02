<script lang="ts">
	import LargeCard from "$lib/components/individuels/LargeCard.svelte";

	import { salles } from "$lib/store";

    function stringify_date(time:number){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return date.toLocaleString('fr')
    }


	function salleFormat(type:string,salle:string) {
		return `${type.charAt(0).toUpperCase() + type.slice(1)} ${salle}`
	}

</script>

<div class="main">

	<h1>Les salles</h1>
	
	<h2>Les salles libres</h2>

	<div class="content">
		{#each $salles.vacant as salle}
			<LargeCard main={salleFormat(salle.type,salle.salleID)} sub={"Libre jusqu'au " + stringify_date(salle.until)} icone_text={salle.batimentID}></LargeCard>
		{/each}
	</div>
	
	<h2>Les salles occupées</h2>

	<div class="content">
		{#each $salles.occupied as salle}
			<LargeCard main={salleFormat(salle.type,salle.salleID)} sub={"Occupé jusqu'au " + stringify_date(salle.until)} icone_text={salle.batimentID}></LargeCard>
		{/each}
	</div>

	<h2>Les salles sans status</h2>

	<div class="content">
		{#each $salles.none as salle}
			<LargeCard main={salleFormat(salle.type,salle.salleID)} sub={""} icone_text={salle.batimentID}></LargeCard>
		{/each}
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

	@media (max-width : 720px) {
		.content {
			display: grid;
			grid-template-columns: repeat(1,1fr);
			gap:10px;
			place-items: center;
		}
	}

</style>