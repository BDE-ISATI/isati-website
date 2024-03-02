<script>
	import Header from "$lib/components/individuels/Header.svelte"
	import { fade  } from 'svelte/transition';
	
	export let data

    import { onMount } from "svelte";
	import { apiUri } from "$lib/config";
	import {events,members,salles} from "$lib/store"
    import Button from "$lib/components/individuels/Button.svelte";
	
	let retour = ""

	onMount(async() =>{
		$events = await (await fetch(apiUri + "events")).json()
		$members = await (await fetch(apiUri + "members")).json()
		$salles = await (await fetch(apiUri + "salles/events")).json()

		let temp = window.location.pathname.split("/")
		temp.splice(-1)
		retour = window.location.origin +  "/" + temp.join("/")
	})




</script>

<svelte:head>
	<title>ISATI BDE</title>
	<meta name="description" content="">
</svelte:head>


<div class="app">

	<Header></Header>

	
	{#key data.pathname}
		<div id="content" in:fade={{ duration: 1000}}>
			<div class="container">

				{#if data.pathname != "/"}
					<Button href={retour}>Accueil</Button>
				{:else}
					<br>
				{/if}
				

				<slot></slot>
			</div>
		</div>
	{/key}
	
	<!-- <Footer></Footer> -->
	
</div>

<style>
	div.app{
		display: flex;
		flex-direction: column;
		gap:1em;
	}

	#content {
		overflow:auto;
		display: block;
		position: relative;
		padding: 16px;
		margin:0;
		width:calc( 100% - 32px);
		overflow: overlay;
	}

	.container {

		width:clamp(0px,100%,700px);
		margin: auto;
		width:clamp(0px,100%,700px);
		display: flex;
		flex-direction: column;
		gap:16px;
	}


</style>