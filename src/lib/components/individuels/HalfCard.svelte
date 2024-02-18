<script lang="ts">
	export let icone:string|undefined = undefined
	export let icone_text:string|undefined = undefined
	export let main:string
	export let sub:string
</script>

<div class="container">
	<div class="content">
		
		{#if icone !== undefined}
			<img src={icone} class="icon" alt={"image" + main}>
		{:else}
			<span class="icon text">{icone_text}</span>
		{/if}
		<div>
			<p class="main">{main}</p>
			<p class="sub">{sub}</p>
		</div>
	</div>
</div>

<style>

	.container {
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
		font-size: 36px;
		font-weight: 600;
		color:var(--text);
	}

	.icon.text {
		height: 45px;
		padding-top:5px;
		background-color: unset;
	}

	.content {
		display: flex;
		align-items: center;
		gap:16px;
	}

	p.main {
		margin: 0;
		font-weight: 600;
		font-size: 16px;
		line-height: 15px;
	}

	p.sub {
		margin: 0;
		font-weight: 300;
		font-size: 12px;
		line-height: 15px;
	}

</style>