<script lang="ts">
	import Header from "$lib/components/layout/Header.svelte"
	import { fade  } from 'svelte/transition';

	export let data

    import { onMount } from "svelte";
	import { apiUri } from "$lib/config";
	import {events,members,salles,articles} from "$lib/store"
    import Button from "$lib/components/individuels/Button.svelte";
    import Navbar from "$lib/components/layout/Navbar.svelte";
    import Footer from "$lib/components/layout/Footer.svelte";
	
	let retour = ""
	let loaded = false

	import { afterNavigate } from '$app/navigation';


	afterNavigate(() => {
		((path) => {
			document.getElementById('content')?.scrollTo(0, 0);
		})(data.pathname)
	})

	let f1 = fetch(apiUri + "events").then((r) => {return r.json()}).then((r) => {$events = r["data"]})
	let f2 = fetch(apiUri + "members").then((r) => {return r.json()}).then((r) => {$members = r["data"]})
	let f3 = fetch(apiUri + "salles/events").then((r) => {return r.json()}).then((r) => {$salles = r["data"]})
	let f4 = fetch(apiUri + "articles").then((r) => {return r.json()}).then((r) => {$articles = r["data"]})

	Promise.all([f1, f2, f3, f4]).then((r) => { loaded = true })

	let temp = window.location.pathname.split("/")
	temp.splice(-1)
	retour = window.location.origin +  "/" + temp.join("/")


	const items = [
	{
		title: 'Accueil',
		route: '/',
		class: 'ph-fill ph-house',
	},
	{
		title: 'Events',
		route: '/events',
		class: 'ph-fill ph-calendar',
	},
	{
		title: 'Salles',
		route: '/salles',
		class: 'ph-fill ph-graduation-cap',
	},
	{
		title: 'Articles',
		route: '/articles',
		class: 'ph-fill ph-newspaper',
	},
]


</script>

<!-- {ipp("tom.cvl")} -->

<svelte:head>
	<title>Isati BDE</title>
	<meta name="description" content="Site internet de L'Isati, BDE de l'ESIR.">
</svelte:head>

{#if !loaded}
	<div id="loader" out:fade={{ duration: 1000}}>
		<div class="logoloading">
			<iframe width="600px" height="600px" frameborder=0 style="max-width: 100%; overflow:hidden;" src="/animation.html">
		</div>
	</div>
{:else}
	<div class="app">
		<div id="content">
			<Header></Header>
			{#key data.pathname}
				<div id="router" in:fade={{ duration: 1000}}>
					<slot></slot>
				</div>
			{/key}
			<Footer></Footer>
		</div>
		<Navbar actual={data.pathname} menuItems={items}></Navbar>
	</div>
{/if}
<style scoped>
	#loader {
		transition: opacity 1s;
		display:flex;
		justify-content:center;
		flex-direction: column;
		text-align: center;
		position: absolute;
		z-index: 50000;
		height: 100%;
		width:100%;
		background-color: var(--primary);
		color:var(--white)
	}

	.logoloading {
		display:grid;
		place-items: center;
	}

	#loader svg.spinner{
		animation-name: turn;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		height:150px;
		width: 150px;
	}

	@keyframes turn {
		from {transform: rotate(0deg);}
		to {transform: rotate(360deg);}
	}



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


	
	#content {
		overflow:auto;
		display: block;
		position: relative;
		margin:0;
		width:calc( 100% );
		overflow: overlay;
	}
	#router {
		min-height: calc( 100dvh - 60px );
		position: relative;
		padding: 40px 20px;
		margin: auto;
		margin-top: 60px;
		width: clamp(100px, calc(100% - 40px), 700px);
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

	@media (max-width : 720px) {
		#router {
			margin-top: 0px;
			min-height: calc( 100dvh );

		}
	}


</style>