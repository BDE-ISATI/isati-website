<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
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

	<h1><a class="action" href={"/salles"}>SALLES<i class="ph ph-caret-right"></i></a></h1>

	<div class="content">

		{#if $salles.vacant.length == 0}
			<span>Aucune salle de libre 😞</span>
		{:else}
			{#each $salles.vacant.slice(0,2) as salle}
				<LargeCard main={salleFormat(salle.type,salle.salleID)} sub={"Libre jusqu'au " + stringify_date(salle.until)} icone_text={salle.batimentID}></LargeCard>
			{/each}
		{/if}

		
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
		grid-template-columns: repeat(1,1fr);
		gap:10px;
		place-items: center;
	}

	.action {
		text-decoration: unset;
		color:var(--text);
		display: flex;
		gap:8px;
		transition: 0.5s;
		align-items: center;

	}

	.action:hover{
		gap: 24px;
	}

</style>