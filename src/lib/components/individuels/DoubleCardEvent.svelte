<script lang="ts">
	import 'add-to-calendar-button';
    import Dropdown from './Dropdown.svelte';

	export let main:string
	export let sub:string|undefined
	export let date:Date

	export let article:string|undefined=undefined

	if (article) article = `/article?id=${article}`


	let jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
	let months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
</script>

<a href={article} class="relative flex flex-col justify-between w-[20rem] gap-4 rounded-3xl bg-container-800 text-[var(--text)] text-[0.8125rem] leading-5 text-slate-900 shadow-md shadow-black/5 ring-1 ring-slate-700/10  p-4">
	{#if article}
		<i class="size-4 ph-fill ph-arrow-square-in absolute top-3 right-3"></i>
	{/if}

	<div class="flex gap-4">
		<span class="text-[var(--text)] inline-block font-bold">{main}</span>
		<span class="text-[var(--text)] inline-block">{sub}</span>
	</div>
	<div class="flex gap-4">
		<div class="date">
			<span class="text-[var(--text)] text-4xl">{jours[date.getDay()-1].slice(0,3)} {date.getDate()}</span>
			<span class="text-[var(--text)] text-base">{months[date.getMonth()]}</span>
		</div>
		
		<!-- <add-to-calendar-button on:click={(e) => {e.preventDefault()}}
			name={main}
			options="'Apple','Google','Outlook.com'"
			location={sub}
			startDate={date.toLocaleDateString().split("/").reverse().join("-")}
			endDate={date.toLocaleDateString().split("/").reverse().join("-")}
			startTime="00:00"
			endTime="23:59"
			timeZone="Europe/Paris"
			hideCheckmark
			lightMode="system"
			language="fr"
			>
		</add-to-calendar-button> -->

		<Dropdown title={"Ajouter"} icon={"ph-calendar-plus"} options={[{"libelle":"Google Calendar",action:()=>{}},{"libelle":"Microsoft Calendar",action:()=>{}}]}></Dropdown>

	</div>
</a>