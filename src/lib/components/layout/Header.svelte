<script>
    import Logo from "./Logo.svelte";

</script>
<div class="header">
	<a href="/"><Logo></Logo></a>
	<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1255 303" fill="currentColor">
		<path d="M0 0H1255V230.5C1255 230.5 1093 302.5 627.5 302.5C162 302.5 0 230.5 0 230.5V0Z" fill="currentColor"/>
	</svg>
		
</div>

<style>

	.header {
		height: 50px;
		display:none;
		padding: 16px;
		
		justify-content: center;
		z-index: 50;
		/* background-color: var(--primary); */
	}

	.header>a{
		z-index: 1;
	}

	svg {
		height: 100px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 0;
		display: block;
	}

	svg > path{
		fill:var(--primary);
	}

	a{
		color : var(--white);
	}

	@media (prefers-color-scheme: dark) {
		svg > path{
			fill:#171717;
		}

		a{
			color : var(--primary);
		}
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