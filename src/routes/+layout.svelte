<script lang="ts">
	import Header from "$lib/components/layout/Header.svelte"
	import { fade  } from 'svelte/transition';
	import "../app.css";
	
	export let data


	import { apiUri } from "$lib/config";
	import {salles,articles, members_private, members_public, events_public, events_private} from "$lib/store"
    
    import Navbar from "$lib/components/layout/Navbar.svelte";
    import Footer from "$lib/components/layout/Footer.svelte";

	import { House, Calendar, Newspaper, GraduationCap, UserList } from "phosphor-svelte"

	
	let retour = ""
	let loaded = false

	import { afterNavigate } from '$app/navigation';
    import Animation from "$lib/components/individuels/Animation.svelte";


	afterNavigate(() => {
		((path) => {
			document.getElementById('content')?.scrollTo(0, 0);
		})(data.pathname)
	})

	let f1 = fetch(apiUri + "events").then((r) => {return r.json()}).then((r) => {
		let data = r["data"].sort((a,b) => {return a.DTSTART - b.DTSTART})
		$events_public = data.filter((el)=>{return el.photo!=null})
		$events_private = data
	})
	let f2 = fetch(apiUri + "members").then((r) => {return r.json()}).then((r) => {

		$members_public = {}
		$members_private = r["data"]

		for (let mb of $members_private){
			let grp = mb.groupe
			if (!(mb.groupe in $members_public)) {$members_public[grp] = []}
			$members_public[grp].push(mb)
		}

	})
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
		icon: House,
	},
	// {
	// 	title: 'Events',
	// 	route: '/events',
	// 	icon: Calendar,
	// },
	{
		title: 'Salles',
		route: '/salles',
		icon: GraduationCap,
	},
	{
		title: 'Équipe',
		route: '/equipe',
		icon: UserList,
	},
]

</script>

{#if !loaded}
	<div class="w-full h-dvh text-white bg-primary grid place-items-center z-20 absolute overflow-hidden" out:fade={{ duration: 1000}}>
		<Animation></Animation>
	</div>
{:else}
	<div in:fade={{ duration: 1000}}>
		<div class="overflow-x-hidden overflow-y-auto">
			<Header></Header>
			{#key data.pathname}
				<div class="relative max-w-screen-xl mt-0 mx-auto px-4 py-4 sm:pt-32 min-h-dvh">
					<slot></slot>
				</div>
			{/key}
			<Footer></Footer>
		</div>
		<Navbar actual={data.pathname} menuItems={items}></Navbar>
	</div>
{/if}