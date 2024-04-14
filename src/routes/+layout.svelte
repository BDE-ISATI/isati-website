<script lang="ts">
	import Header from "$lib/components/layout/Header.svelte"
	import { fade  } from 'svelte/transition';
	import "../app.css";

	import "@phosphor-icons/web/fill"
	import "@phosphor-icons/web/regular"
	
	export let data

    import { onMount } from "svelte";
	import { apiUri, articleBucket, imgBucket } from "$lib/config";
	import {events,members,salles,articles} from "$lib/store"
    import Button from "$lib/components/individuels/Button.svelte";
    import Navbar from "$lib/components/layout/Navbar.svelte";
    import Footer from "$lib/components/layout/Footer.svelte";
	
	let retour = ""
	let loaded = false

	import { afterNavigate } from '$app/navigation';
    import Animation from "$lib/components/individuels/Animation.svelte";


	afterNavigate(() => {
		((path) => {
			document.getElementById('content')?.scrollTo(0, 0);
		})(data.pathname)
	})

	let f1 = fetch(apiUri + "events?f=true").then((r) => {return r.json()}).then((r) => {$events = r["data"]})
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

{#if !loaded}
	<div id="loader" class="w-full h-dvh text-[var(--white)] bg-primary grid place-items-center z-20 absolute overflow-hidden" out:fade={{ duration: 1000}}>
		<Animation></Animation>
	</div>
{:else}
	<div class="app">
		<div id="content" class="overflow-x-hidden overflow-y-auto">
			<Header></Header>
			{#key data.pathname}
				<div class="relative max-w-screen-md mt-0 mx-auto px-4 py-4 md:pt-32 min-h-dvh" in:fade={{ duration: 1000}}>
					<slot></slot>
				</div>
			{/key}
			<Footer></Footer>
		</div>
		<Navbar actual={data.pathname} menuItems={items}></Navbar>
	</div>
{/if}