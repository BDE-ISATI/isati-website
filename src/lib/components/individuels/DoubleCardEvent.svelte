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

<a href={article} class="relative flex flex-col justify-between w-[20rem] gap-4 rounded-3xl bg-[var(--container)] text-[var(--text)] text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10  p-4">
	{#if article}
		<i class="ph-fill ph-arrow-square-in"></i>
	{/if}

	<div class="content">
		<span class="main">{main}</span>
		<span class="sub">{sub}</span>
	</div>
	<div class="content2">
		<div class="date">
			<span class="jour"></span>
			<span class="journ">{jours[date.getDay()-1].slice(0,3)} {date.getDate()}</span>
			<span class="mois">{months[date.getMonth()]}</span>
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

		<Dropdown></Dropdown>

	</div>
</a>

<style>

	.container {
		user-select: none;
		width: calc(320px - 40px);
		height: calc(150px - 40px);
		border-radius: 26px;
		-moz-border-radius : 26px;
		box-shadow: var(--shadow);
		padding:20px;
		background-color: var(--container);
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly ;
		text-decoration: unset;
	}

	.container > * {
		display: flex;
		align-items: center;
	}

	.ph-arrow-square-in{
		position: absolute;
		top:20px;
		right:20px;
		color:var(--text);
	}
	
	.content, .content2 {
		display: flex;
		align-items: center;
		gap:16px;
	}

	.content2{
		justify-content: space-between;
	}
	
	/* .icon.text {
		padding:5px 0 0 0;
		height: 35px;
		background-color: unset;
		font-size: 36px;
		font-weight: 600;
		place-items: center;
	} */

	span {
		color:var(--text);
		display: block;
		
	}

	span.main {
		margin: 0;
		font-weight: 600;
		font-size: 16px;
		line-height: 15px;
	}

	span.sub {
		margin: 0;
		font-weight: 300;
		font-size: 12px;
		line-height: 15px;
	}

	.date {
		font-size: 16px;
		display: flex;
		flex-direction: column;
		color:var(--text);
		justify-content: center;
		/* gap: 8px; */
		min-width: 90px;
	}
	/* .container-ext{	
		width:80px;
	}
	 */
	.date .journ{
		font-size: 36px;
	}

	/* .addto {
		font-size: 16px;
		display: flex;
		flex-direction: column;
		color:var(--text);
		justify-content: center;
		gap: 4px;
		text-decoration: unset;
		text-align: center;
		background-color: var(--primary);
		padding: 16px;
		border-radius: 16px;
		width: 100%;
	}

	.addto i {
		font-size: 32px;
	} */

</style>