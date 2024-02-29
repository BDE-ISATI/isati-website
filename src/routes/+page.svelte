<script lang="ts">
	import HomeEvents from "$lib/components/groupes/HomeEvents.svelte";
	import HomeEquipe from "$lib/components/groupes/HomeEquipe.svelte";
	import HomeSalles from "$lib/components/groupes/HomeSalles.svelte";
	import HomeActus from "$lib/components/groupes/HomeActus.svelte";
    import { onMount } from "svelte";

	import { apiUri } from "$lib/config";

	let events:{nom:string,date:number,type:string,emplacement:string}[] = []
	let users:{ID:string,nom:string,contact:string,photo:string,rôle:string}[] = []
	let salles:{
		vacant:{salleID:string,batimentID:string,until:number}[]
		occupied:{salleID:string,batimentID:string,until:number}[]
	} = {vacant:[],occupied:[]}



	onMount(async() =>{
		events = await (await fetch(apiUri + "events")).json()
		users = await (await fetch(apiUri + "members")).json()
		salles = await (await fetch(apiUri + "salles/events")).json()
	})
</script>


<div class="container">
	<HomeEvents events={events}></HomeEvents>
	<HomeSalles salles={salles}></HomeSalles>
	<!-- <HomeActus></HomeActus> -->
	<HomeEquipe users={users}></HomeEquipe>
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