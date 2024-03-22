<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import LargeCard from "$lib/components/individuels/LargeCard.svelte";

	import { events } from "$lib/store";

</script>

<div class="main">

	<h1>Les events</h1>

	<div class="content">
		{#each $events.slice(0,2) as event}
			<LargeCard icone="" sub={event.emplacement} main={event.nom} date={(new Date(event.date)).toDateString()}></LargeCard>
		{/each}
		
	</div>
	
	<div class="action">
		<Button href={"/events"}>Voir plus</Button>
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