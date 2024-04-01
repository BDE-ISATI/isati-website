<script lang="ts">
	import 'add-to-calendar-button';

	export let main:string
	export let description:string|undefined
	export let categorie:string

	export let id:string


	let jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
	let months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
</script>

<a href={`/article?id=${id}`} class="container">

	<i class="ph ph-arrow-square-in"></i>

	<div class="content">
		<span class="main">{main}</span>
		<span class="sub">{categorie}</span>
	</div>
	<div class="content2">
		<p>
			{#if description}
				{description}
			{/if}
		</p>
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
	
	.content {
		display: flex;
		align-items: center;
		gap:16px;
	}

	.content2{
		/* justify-content: space-between; */
		height: 53px;
		width: 100%;		
	}

	.content2 > p {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;  
		overflow: hidden;
		color: var(--text);
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