<script lang="ts">
	import { CaretRight } from "phosphor-svelte"
	import { events } from "$lib/store";
    import DoubleCardEvent from "../individuels/DoubleCardEvent.svelte";
    import NewCard from "../individuels/NewCard.svelte";
    import NewCardLine from "../individuels/NewCardLine.svelte";
    import NewCarousel from "../individuels/NewCarousel.svelte";

</script>

<div class="flex relative gap-4 flex-col items-center">
	<h1 class="uppercase text-3xl font-bold flex justify-center"><a class="text-container-100 flex" href={"/salles"}>EVENTS<CaretRight/></a></h1>

	<NewCarousel events={$events}>

	</NewCarousel>
</div>