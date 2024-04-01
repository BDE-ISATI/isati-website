<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import LargeCard from "$lib/components/individuels/LargeCard.svelte";

	import { events } from "$lib/store";
    import DoubleCardEvent from "../individuels/DoubleCardEvent.svelte";

</script>

<div class="main">

	<h1><a class="action" href={"/events"}>Les events<i class="ph ph-caret-right"></i></a></h1>

	<div class="content">
		<!-- {#each $events.slice(0,2) as event}
			<LargeCard icone="" sub={event.emplacement} main={event.nom} date={(new Date(event.date)).toDateString()}></LargeCard>
		{/each} -->
		<DoubleCardEvent icone="" sub={$events[0].emplacement} main={$events[0].nom} date={new Date($events[0].date)}></DoubleCardEvent>
	</div>
	
	<!-- <div class="action">
		<Button href={"/events"}>Voir plus</Button>
	</div> -->

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