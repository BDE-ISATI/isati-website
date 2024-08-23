<script lang="ts">
	import HomeEvents from "$lib/components/groupes/HomeEvents.svelte";
	import HomeEquipe from "$lib/components/groupes/HomeEquipe.svelte";
	import HomeSalles from "$lib/components/groupes/HomeSalles.svelte";
    import HomeClubs from "$lib/components/groupes/HomeClubs.svelte";
</script>

<div class="columns-xs *:my-4 text-center">
	<HomeEvents></HomeEvents>
	<HomeSalles></HomeSalles>
	<HomeEquipe></HomeEquipe>
	<HomeClubs></HomeClubs>
</div>

<style>

</style>