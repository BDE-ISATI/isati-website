<script lang="ts">
	export let icone:string|undefined
	export let icone_text:string|undefined
	export let main:string
	export let sub:string|undefined
	export let date:string

	export let href:string|undefined=undefined
</script>

<a href={href} class="container">
	<div class="content">
		{#if icone !== undefined}
			<img src={icone} class="icon" alt={"image" + main}>
		{:else if icone_text !== undefined}
			<span class="icon text">{icone_text}</span>
		{/if}
		<div>
			<span class="main">{main}</span>
			<span class="sub">{sub}</span>
		</div>
	</div>
	{#if date}
		<span class="date">{date}</span>
	{/if}
</a>

<style>

	.container {
		user-select: none;
		width: calc(320px - 30px);
		height: calc(70px - 30px);
		border-radius: 26px;
		-moz-border-radius : 26px;
		box-shadow: var(--shadow);
		padding:15px;
		background-color: var(--container);
		position: relative;
	}

	.icon {
		height: 40px;
		width: 40px;
		border-radius: 35px;
		background-color: #7DCA89;
		display: grid;
	}
	
	.content {
		display: flex;
		align-items: center;
		gap:16px;
	}
	
	.icon.text {
		padding:5px 0 0 0;
		height: 35px;
		background-color: unset;
		font-size: 36px;
		font-weight: 600;
		place-items: center;
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

	.date {
		font-size: 12px;
		position: absolute;
		top:15px;
		right:15px;
		color:var(--text)
	}

</style>