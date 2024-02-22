<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import LargeCard from "$lib/components/individuels/LargeCard.svelte";

	export let events:{nom:string,date:number,type:string,emplacement:string}[]

</script>

<div class="main">

	<h2>Les events</h2>

	<div class="content">
		{#each events as event}
			<LargeCard eventName={event.nom} date={(new Date(event.date)).toDateString()}></LargeCard>
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
		grid-template-columns: repeat(1,1fr);
		gap:10px;
		place-items: center;
	}

	.action {
		display: grid;
		place-items: center;
	}

</style>