<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import LargeCard from "$lib/components/individuels/LargeCard.svelte";

	import { events } from "$lib/store";

	var date = new Date();

	var firstDay = new Date();

	firstDay.setHours(-24 * (firstDay.getDay() - 1));
	
	var lastDay = new Date(firstDay);

	lastDay.setHours(24 * (7*3));
	lastDay.setHours(24 * (7 - lastDay.getDay()));

	let days:Date[] = []

	do {
		days.push(new Date(firstDay))
		firstDay.setHours(24)
	} while(firstDay<=lastDay)

</script>



<div class="main">

	<h1>Les events</h1>


	<div class="gridCal">
		{#each ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"] as day}
			<div class="case">
				<span>{day}</span>
			</div>
		{/each}
		{#each days as day}
			<div class="case">
				<span>{day.getDate()} / {day.getMonth()+1}</span>
			
				<div class="content">
					{#each $events as event}
						{#if day.getDate() == new Date(event.date).getDate() && day.getMonth() == new Date(event.date).getMonth()}
							<a class="eventLink">{event.nom}</a>	
						{/if}
					{/each}
				</div>
			</div>
		{/each}

	</div>

	
</div>

<style>

	.gridCal{
		display: grid;
		grid-template-columns: repeat(7,1fr);
		grid-template-rows: auto 100px 100px 100px 100px;
		border-collapse: collapse;
		border:0.5px solid var(--black);
	}
	
	.case{
		/* text-align: center; */
		/* text-align: center; */
		border-collapse: collapse;
		border:0.5px solid var(--black);
		padding:4px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: calc(100% - 8px );
	}

	.eventLink{
		background: var(--secondary);
		padding:4px;
		border-radius: 16px;
		width: calc(100% - 8px );
		overflow: hidden;
		display: block;
	}

	.main {
		display: flex;
		flex-direction: column;
		gap:15px;
	}

    .content {
		display: block;
		width: 100%;
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