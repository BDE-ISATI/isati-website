<script lang="ts">
	export let icone = ""
	export let eventName:string
	export let date:string
</script>

<div class="container">
	<div class="content">
		<span class="icon">{icone}</span>
		<p>{eventName}</p>
	</div>
	<span class="date">{date}</span>
</div>

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
		display: block;
	}

	.content {
		display: flex;
		align-items: center;
		gap:16px;
	}

	p {
		margin: 0;
		font-weight: 600;
		font-size: 16px;
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