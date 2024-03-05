<script>
	import Header from "$lib/components/layout/Header.svelte"
	import { fade  } from 'svelte/transition';
	
	export let data

    import { onMount } from "svelte";
	import { apiUri } from "$lib/config";
	import {events,members,salles,articles} from "$lib/store"
    import Button from "$lib/components/individuels/Button.svelte";
    import Navbar from "$lib/components/layout/Navbar.svelte";
	
	let retour = ""

	onMount(async() =>{
		$events = await (await fetch(apiUri + "events")).json()
		$members = await (await fetch(apiUri + "members")).json()
		$salles = await (await fetch(apiUri + "salles/events")).json()
		$articles = await (await fetch(apiUri + "articles")).json()

		let temp = window.location.pathname.split("/")
		temp.splice(-1)
		retour = window.location.origin +  "/" + temp.join("/")
	})


	const items = [
	{
		title: 'Accueil',
		route: '/',
		class: 'ph ph-house',
	},
	{
		title: 'Events',
		route: '/events',
		class: 'ph ph-calendar',
	},
	{
		title: 'Salles',
		route: '/salles',
		class: 'ph ph-graduation-cap',
	},
	{
		title: 'Articles',
		route: '/articles',
		class: 'ph ph-newspaper-cap',
	},
]


</script>

<svelte:head>
	<title>ISATI BDE</title>
	<meta name="description" content="">
</svelte:head>



<div class="app">

	
	<div id="content">
		<Header></Header>
		{#key data.pathname}
		<div id="router" in:fade={{ duration: 1000}}>
			<slot></slot>
		</div>
		
		<!-- {#if data.pathname != "/"}
			<a class="bouton-flottant" href={retour}>
				<i class="ph ph-arrow-circle-left"></i>
			</a>
			{/if} -->
		{/key}
	</div>
	<Navbar menuItems={items}></Navbar>
	<!-- <Footer></Footer> -->
	
</div>

<style>

	.bouton-flottant{
		position: fixed;
		bottom: 24px;
		right: 24px;
		color:var(--text);
		font-size: 48px;
		text-decoration: none;
		line-height: 0;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	div.app {
		flex-direction: column-reverse;
		height: 100dvh;
		display: flex;
	}

	@media (max-width : 720px) {
		div.app{
			flex-direction: column;
		}
		#router {
			/* min-height: calc( 100% - 100px ); */
		}
	}

	#content {
		overflow:auto;
		display: block;
		position: relative;
		margin:0;
		width:calc( 100% );
		overflow: overlay;
	}
	#router {
		position: relative;
		padding: 40px 20px;
		margin: auto;
		width: clamp(100px, calc(100% - 40px), 700px);
		min-height: calc( 100% - 100px - 16px * 4 );
		overflow: auto;
	}

	:global(#menu) {
		min-width: 200px;
		float: left;

	}	

	#topbar {
		width: unset;
		height: 40px;
		padding: 20px;
	}

	

	:global(#menu) {
		border-right:unset;
		width: unset;
		height: 80px;
	}

	#content {
		height: calc(100% - 80px);
	}
</style>