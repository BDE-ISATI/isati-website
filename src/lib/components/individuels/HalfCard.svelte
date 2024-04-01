<script lang="ts">
	export let icone:string|undefined = undefined
	export let icone_text:string|undefined = undefined
	export let main:string
	export let sub:string
	export let contact:string
</script>

<a class="container" href={contact} target="_blank">

	{#if contact}
		<i class="ph ph-arrow-square-in"></i>
	{/if}

	<div class="content">
		
		{#if icone !== undefined}
			<img src={icone} class="icon" alt={"image" + main}>
		{:else}
			<span class="icon text">{icone_text}</span>
		{/if}
		<div>
			<span class="main">{main}</span>
			<span class="sub">{sub}</span>
		</div>
	</div>
</a>

<style>

	.ph-arrow-square-in {
		position: absolute;
		top:8px;
		right:12px;
		color:var(--text);
	}

	.container {
		text-decoration: unset;
		user-select: none;

		width: calc(160px - 20px);
		height: calc(70px - 20px);
		border-radius: 26px;
		box-shadow: var(--shadow);
		padding:10px;
		background-color: var(--container);
		position: relative;
	}

	.icon {
		height: 50px;
		width: 50px;
		border-radius: 16px;
		background-color: #7DCA89;
		display: grid;
		place-items: center;
		color:var(--text);
	}

	.icon.text {
		height: 45px;
		font-size: 36px;
		font-weight: 600;
		padding-top:5px;
		background-color: unset;
	}

	.content {
		display: flex;
		align-items: center;
		gap:16px;
	}

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

</style>