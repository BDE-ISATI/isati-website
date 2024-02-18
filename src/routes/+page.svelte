<script lang="ts">
	import HomeEvents from "$lib/components/groupes/HomeEvents.svelte";
	import HomeEquipe from "$lib/components/groupes/HomeEquipe.svelte";
	import HomeSalles from "$lib/components/groupes/HomeSalles.svelte";
	import HomeActus from "$lib/components/groupes/HomeActus.svelte";

	export let data : {
		salles:{nom_salle:string,num_batiment:number,jusque:Date,state:string}[],
		users :{nom:string,contact:string,photo:string,rôle:string}[],
		events:{nom:string,date:Date,type:string,emplacement:string}[],
	}
</script>


<div class="container">
	<HomeEvents events={data.events}></HomeEvents>
	<HomeSalles salles={data.salles}></HomeSalles>
	<HomeActus></HomeActus>
	<HomeEquipe users={data.users}></HomeEquipe>
</div>

<style>
	.container {
		display:grid;
		width:clamp(0px,100%,700px);
		margin: auto;
		grid-template-columns: repeat(2, 1fr);
		gap:40px;
	}

	.container > :global(:nth-child(1)) { grid-area: 1 / 1 / 2 / 2; }
	.container > :global(:nth-child(2)) { grid-area: 1 / 2 / 2 / 3; }
	.container > :global(:nth-child(3)) { grid-area: 2 / 1 / 3 / 3; }
	.container > :global(:nth-child(4)) { grid-area: 3 / 1 / 4 / 3; }

	@media (max-width : 720px) {
		.container > :global(:nth-child(1)) { grid-area: 1 / 1 / 2 / 3; }
		.container > :global(:nth-child(2)) { grid-area: 2 / 1 / 3 / 3; }
		.container > :global(:nth-child(3)) { grid-area: 3 / 1 / 4 / 3; }
		.container > :global(:nth-child(4)) { grid-area: 4 / 1 / 5 / 3; }
	}
</style>