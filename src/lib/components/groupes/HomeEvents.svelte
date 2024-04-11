<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import Card from "$lib/components/individuels/Card.svelte";

	import { events } from "$lib/store";
    import DoubleCardEvent from "../individuels/DoubleCardEvent.svelte";

</script>

<div class="main">

	<h1 class="uppercase text-3xl font-bold mb-2"><a class="text-[var(--text)]" href={"/events"}>EVENTS<i class="ph align-text-bottom ph-caret-right"></i></a></h1>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1">
		{#if $events.length == 0}
			<span>Aucun event à venir 😞</span>
		{:else}
			<DoubleCardEvent icone="" sub={$events[0].emplacement} main={$events[0].nom} date={new Date($events[0].date)}></DoubleCardEvent>
		{/if}
	</div>

</div>
