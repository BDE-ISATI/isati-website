<script lang="ts">
	import Card from "$lib/components/individuels/Card.svelte";

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

<div>

	<h1 class="text-3xl font-bold">LES SALLES</h1>
	
	<h2 class="text-2xl font-bold">Les salles libres</h2>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">
		{#each $salles.vacant as salle}
			<Card main={salleFormat(salle.type,salle.salleID)} sub={"Libre jusqu'au " + stringify_date(salle.until)} icone_text={salle.batimentID}></Card>
		{/each}
	</div>
	
	<h2 class="text-2xl font-bold">Les salles occupées</h2>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">
		{#each $salles.occupied as salle}
			<Card main={salleFormat(salle.type,salle.salleID)} sub={"Occupé jusqu'au " + stringify_date(salle.until)} icone_text={salle.batimentID}></Card>
		{/each}
	</div>

	<h2 class="text-2xl font-bold">Les salles sans status</h2>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">
		{#each $salles.none as salle}
			<Card main={salleFormat(salle.type,salle.salleID)} sub={""} icone_text={salle.batimentID}></Card>
		{/each}
	</div>
</div>

