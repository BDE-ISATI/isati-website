<script lang="ts">
    import { ArrowSquareIn, CalendarPlus } from 'phosphor-svelte';
    import Dropdown from './Dropdown.svelte';

	export let main:string
	export let sub:string|undefined
	export let date:Date

	export let article:string|undefined=undefined

	if (article) article = `/article?id=${article}`


	let jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
	let months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]


	function googleAgenda() {

		let j = date.getDate().toString()
		j = j.length == 1 ? "0"+j : j
		let m = ( date.getMonth() + 1 ).toString()
		m = m.length == 1 ? "0"+m : m
		let y = date.getFullYear().toString()
		
		window.open(
			`https://calendar.google.com/calendar/u/0/r/eventedit?dates=${y}${m}${j}T000000/${y}${m}${j}T235900&ctz=Europe/Paris&text=${main}&location=${sub}`,
			"_blank"
			)
		}
		
		function microsoftAgenda() {
			
			let j = date.getDate().toString()
			j = j.length == 1 ? "0"+j : j
			let m = ( date.getMonth() + 1 ).toString()
			m = m.length == 1 ? "0"+m : m
			let y = date.getFullYear().toString()
			
			window.open(
				`https://outlook.live.com/calendar/deeplink/compose/?rru=addevent&startdt=${y}-${m}-${j}T00:00:00Z&allday=trueZ&subject=${main}&location=${sub}`,
				"_blank"
				)
			}

		</script>

<a href={article} class="relative flex flex-col justify-between w-[20rem] gap-4 rounded-3xl bg-container-800 text-[0.8125rem] leading-5 shadow-md shadow-black/5 ring-1 ring-slate-700/10  p-4">
	{#if article}
		<ArrowSquareIn weight="fill" class="size-4 absolute top-3 right-3 fill-container-100"/>
	{/if}

	<div class="flex gap-4">
		<span class="inline-block font-bold">{main}</span>
		<span class="inline-block">{sub}</span>
	</div>
	<div class="flex gap-4">
		<div class="date">
			<!-- <span class="text-4xl">{jours[date.getDay()-1].slice(0,3)} {date.getDate()}</span>
			<span class="text-base">{months[date.getMonth()]}</span> -->
		</div>

		<Dropdown title={"Ajouter"} icon={CalendarPlus} options={[{"libelle":"Google Calendar",action:googleAgenda},{"libelle":"Microsoft Calendar",action:microsoftAgenda}]}></Dropdown>
	</div>
</a>