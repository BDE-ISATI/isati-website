<script lang="ts">
	import HomeEvents from "$lib/components/groupes/HomeEvents.svelte";
	import HomeEquipe from "$lib/components/groupes/HomeEquipe.svelte";
	import HomeSalles from "$lib/components/groupes/HomeSalles.svelte";
    import HomeClubs from "$lib/components/groupes/HomeClubs.svelte";
    import Mansory from "$lib/components/individuels/Mansory.svelte";
    import Drawer from "$lib/components/individuels/Drawer.svelte";
</script>

<Mansory>
	<HomeEvents></HomeEvents>
	<HomeSalles></HomeSalles>
	<HomeEquipe></HomeEquipe>
	<HomeClubs></HomeClubs>
</Mansory>
