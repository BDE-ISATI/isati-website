<script>
    import Logo from "./Logo.svelte";

</script>
<div class="header">
	<a href="/"><Logo></Logo></a>
</div>

<style>

	.header {
		height: 50px;
		display:none;
		padding: 16px;
		/* position: sticky; */
		justify-content: center;
		z-index: 50;
		/* background-color: var(--primary); */
	}

	.content {
		--padding:20px;
		height: 100%;
		width: calc( 100% - 2 * var(--padding) );
		display: grid;
		padding: var(--padding);
		place-items: left center;
		color: var(--white);
		
		z-index: 1;
		top:0;
		left:0;
	}

	@media screen and (max-width: 720px) {
		.header {
			display: flex;
		}
	}

	.bg {
		z-index: 0;
		height:160px;
		width:auto;
		overflow: hidden;
	}

	.bandeauFirst {
		fill:var(--primary);
	}

	.bandeauSecond {
		fill:var(--alternatif);
	}
	
</style>