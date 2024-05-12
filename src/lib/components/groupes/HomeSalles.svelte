<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import Card from "$lib/components/individuels/Card.svelte";
	import { CaretRight } from "phosphor-svelte"

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

<div class="flex relative gap-4 flex-col">

	<h1 class="uppercase text-3xl font-bold"><a class="text-[var(--text)] flex" href={"/salles"}>SALLES<CaretRight/></a></h1>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1">

		{#if $salles.vacant.length == 0}
			<span>Aucune salle de libre 😞</span>
		{:else}
			{#each $salles.vacant.slice(0,2) as salle}
				<Card main={salleFormat(salle.type,salle.salleID)} sub={"Libre jusqu'au " + stringify_date(salle.until)} icone_text={salle.batimentID}></Card>
			{/each}
		{/if}

	</div>
</div>
