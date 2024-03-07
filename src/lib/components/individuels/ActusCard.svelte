<script lang="ts">
	export let text : string
	export let href : string|undefined
</script>

<a href={href} class="container">
	<div class="content">
		<span>{text}</span>
	</div>
	<!-- <img src={url} alt={text}> -->
</a>

<style>

	.container {
		position: relative;
		display: block;
		width : 200px;
		height: 100px;
		border-radius: 26px;
		overflow: hidden;
		box-shadow: var(--shadow);
		background-color: var(--container);
		user-select: none;
	}

	.content {
		position: absolute;
		top:0;
		left:0;
		background-color: rgba(0, 0, 0, 0.35);
		width: 100%;
		height: 100%;
		z-index: 1;
		display: grid;
		place-items: center;
		
	}

	.content > span {
		color:var(--white);
		font-size: 28px;
		text-align: center;
	}

	img {
		height: 100%;
		width : 100%;
		top: 0;
		left:0;
		position: absolute;
		object-fit: cover;
	}


</style>