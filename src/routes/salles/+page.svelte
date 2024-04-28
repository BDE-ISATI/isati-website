<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
import Card from "$lib/components/individuels/Card.svelte";
    import { apiUri } from "$lib/config";

	import { salles } from "$lib/store";

    function stringify_date(time:number){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return date.toLocaleString('fr')
    }


	function salleFormat(type:string,salle:string) {
		return `${type.charAt(0).toUpperCase() + type.slice(1)} ${salle}`
	}

	let salles_m = $salles

	function format(num: number) {
		let str = `${num}`;
		if (str.length === 1) {
			return '0' + str;
		}
		return str;
	}

	let now = new Date();
	let year = now.getFullYear();
	let month = format(now.getMonth() + 1);
	let day = format(now.getDate());
	let hour = format(now.getHours());
	let minute = format(now.getMinutes());

	let sDate = year + '-' + month + '-' + day
	let sTime = hour + ':' + minute

	async function actualize() {
		let selected_date = new Date(sDate + ' ' + sTime);
		const request = `?date=${selected_date.getTime()}`;
		salles_m = (await (await fetch(apiUri + "salles/events" + request)).json())["data"];
	}
	
</script>

<div class="flex relative gap-4 flex-col">

	<h1 class="text-3xl font-bold">LES SALLES</h1>
	
	<div class="flex gap-2">
		<input class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" bind:value={sDate} type="date" />
		<input class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" bind:value={sTime} type="time" />
		<Button on:click={actualize}>Change</Button>
	</div>

	<h2 class="text-2xl font-bold">Les salles libres</h2>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">
		{#each salles_m.vacant as salle}
			<Card main={salleFormat(salle.type,salle.salleID)} sub={"Libre jusqu'au " + stringify_date(salle.until)} icone_text={salle.batimentID}></Card>
		{/each}
	</div>
	
	<h2 class="text-2xl font-bold">Les salles occupées</h2>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">
		{#each salles_m.occupied as salle}
			<Card main={salleFormat(salle.type,salle.salleID)} sub={"Occupé jusqu'au " + stringify_date(salle.until)} icone_text={salle.batimentID}></Card>
		{/each}
	</div>

	<h2 class="text-2xl font-bold">Les salles sans status</h2>

	<div class="grid grid-flow-row-dense w-full gap-2 place-items-center grid-cols-1 md:grid-cols-2">
		{#each salles_m.none as salle}
			<Card main={salleFormat(salle.type,salle.salleID)} sub={""} icone_text={salle.batimentID}></Card>
		{/each}
	</div>
</div>

