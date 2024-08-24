<script lang="ts">
	import { events_public } from "$lib/store";
    import NewCarousel from "../individuels/NewCarousel.svelte";
</script>

<div class="inline-block">
    <div class="flex relative gap-4 flex-col items-center">
        <h1 class="uppercase text-3xl font-bold flex justify-center">Events</h1>
        <NewCarousel events={$events_public}></NewCarousel>
    </div>
</div>