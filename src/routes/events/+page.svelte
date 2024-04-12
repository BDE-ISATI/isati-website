<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import DoubleCardEvent from "$lib/components/individuels/DoubleCardEvent.svelte";

	import { events } from "$lib/store";
    import Calendar from "./calendar.svelte";



</script>



<div class="flex relative gap-4 flex-col">
	<h1 class="uppercase text-3xl font-bold">Les events</h1>
	
	<Calendar></Calendar>

	<div class="content">
		{#each $events as event}
			<DoubleCardEvent sub={event.emplacement} main={event.nom} date={new Date(event.date)} article={event.article}></DoubleCardEvent>
		{/each}
	</div>
</div>

