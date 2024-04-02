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
	let loaded = 0

	import { afterNavigate } from '$app/navigation';


	afterNavigate(() => {
		((path) => {
			document.getElementById('content')?.scrollTo(0, 0);
		})(data.pathname)
	})

	onMount(async() =>{
		$events = (await (await fetch(apiUri + "events")).json())["data"]
		loaded += 1
		$members = (await (await fetch(apiUri + "members")).json())["data"]
		loaded += 1
		$salles = (await (await fetch(apiUri + "salles/events")).json())["data"]
		loaded += 1
		$articles = (await (await fetch(apiUri + "articles")).json())["data"]
		loaded += 1

		let temp = window.location.pathname.split("/")
		temp.splice(-1)
		retour = window.location.origin +  "/" + temp.join("/")
	})


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

{#if loaded < 4}
	<div id="loader" out:fade={{ duration: 1000}}>
		<div class="logoloading">
			<img width="90" height="90" src="/isati.svg" style="position:absolute"/>
			<svg class="spinner" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
				<path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" />
			</svg>
		</div>
		<span>{loaded/4*100} %</span>
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
		<Navbar menuItems={items}></Navbar>
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
		height: calc(100% - 64px);
	}
</style>