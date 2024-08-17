<script lang="ts">
	import HomeEvents from "$lib/components/groupes/HomeEvents.svelte";
	import HomeEquipe from "$lib/components/groupes/HomeEquipe.svelte";
	import HomeSalles from "$lib/components/groupes/HomeSalles.svelte";
</script>

<div class="cont grid gap-8 grid-cols-1 w-full">
	<HomeEvents></HomeEvents>
	<HomeSalles></HomeSalles>
	<HomeEquipe></HomeEquipe>
</div>

<style>

</style>