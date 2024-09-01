<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import Input from "$lib/components/individuels/Input.svelte";
    import NewCard from "$lib/components/individuels/NewCard.svelte";
    import NewCardLine from "$lib/components/individuels/NewCardLine.svelte";
    import { apiUri } from "$lib/config";
	import IconeSalle from "$lib/components/logo/IconeSalle.svelte"
	import IconeAmphi from "$lib/components/logo/IconeAmphi.svelte"
	import { salles } from "$lib/store";
    import Mansory from "$lib/components/individuels/Mansory.svelte";
    import Drawer from "$lib/components/individuels/Drawer.svelte";
    import { draw } from "svelte/transition";
    import ButtonIcon from "$lib/components/individuels/ButtonIcon.svelte";
    import { Gear } from "phosphor-svelte";

    function stringify_date(time:number){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return date.toLocaleString('fr',{day: '2-digit',"month":'2-digit',hour:"2-digit",minute:"2-digit"})
    }

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
	

	function change_format(data:salles){
		let retour:{[key:string]:any} = {}

		data.vacant.forEach((el)=>{
			!(el.batimentID in retour) ? retour[el.batimentID] = [] : {}
			retour[el.batimentID].push({...el,state:"Libre"})
		})

		data.occupied.forEach((el)=>{
			!(el.batimentID in retour) ? retour[el.batimentID] = [] : {}
			retour[el.batimentID].push({...el,state:"Occupé"})
		})

		data.none.forEach((el)=>{
			!(el.batimentID in retour) ? retour[el.batimentID] = [] : {}
			retour[el.batimentID].push({...el,state:"none"})
		})

		return retour
	}

	let salles_m = change_format($salles);

	async function actualize() {
		let selected_date = new Date(sDate + ' ' + sTime);
		const request = `?date=${selected_date.getTime()}`;
		salles_m = change_format((await (await fetch(apiUri + "salles/events" + request)).json())["data"])
	}

	let show_drawer_val = false

	function show_drawer() {
		show_drawer_val=true
	}

	function hide_drawer() {
		show_drawer_val=false
	}

	let hidden = true
	
</script>


<h1 class="text-3xl font-bold text-center">LES SALLES</h1>

<Drawer title="Options" hidden={hidden} hide={()=>{hidden=true}}> 
	<Input placeholder="Date" bind:value={sDate} type="date" />
	<Input placeholder="Heure" bind:value={sTime} type="time" />
	<Button on:click={actualize}>Change</Button>
</Drawer>

<Mansory>
	{#each Object.keys(salles_m) as key}
		<NewCard title={`Bâtiment ${key}`}>
			{#each salles_m[key] as salle}
				<NewCardLine icone={salle.type=="salle" ? IconeSalle : IconeAmphi} iconeBgClass={salle.state=="Libre" ? "bg-[#2BD02B] rounded-xl" : "bg-primary rounded-xl"} primary={salle.salleID} secondary={salle.state} tertiary={`Jusqu'au ${stringify_date(salle.until)}`}></NewCardLine>
				<hr class="m-2 w-2/3 self-center border-container-500 last:hidden">	
			{/each}
		</NewCard>
	{/each}
</Mansory>

<div class="fixed bottom-20 right-8 sm:bottom-8">
	<ButtonIcon bgColor="bg-primary" on:click={() => {hidden=false}}><Gear></Gear></ButtonIcon>
</div>