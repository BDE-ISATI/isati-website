<script>
    import Logo from "./Logo.svelte";

</script>
<div class="header">
	
	<div class="content">
		<Logo></Logo>
	</div>
</div>

<style>

	.header {
		display:block;
		position: sticky;
		top:0;
		left:0;
		z-index: 50;
		/* overflow: hidden; */
		/* background-image: url('data:image/svg+xml;utf8,<svg class="bg" viewBox="0 3 1728 165"  xmlns="http://www.w3.org/2000/svg"><path class="bandeauSecond" d="M1728 -80.5503V2.5C1640 43.5 1478 78.5 1308.6 97.5228C1260 102.98 1202 102.5 1193.4 105.617C1195.5 116.5 1204 131 1213.2 138.893C1161.19 141.385 1083.47 144.379 989.1 145.189C778.635 146.988 650.691 136.465 536.4 132.598C408.789 128.272 226.26 130.176 0 158.11V134.001V-80.5503H1728Z"/><path class="bandeauFirst" d="M1728 0.5V-81H0V133.551C0.297 133.524 0.603 133.488 0.9 133.461C203.922 113.486 368.703 110.878 483.3 112.362C619.092 114.116 730.908 122.804 938.7 120.457C1034.08 119.377 1112.13 116.445 1162.8 114.161C1158.07 108.459 1152.99 101.291 1148.4 92.5764C1146.26 88.5113 1144.48 84.5811 1143 80.8847C1318.02 89.1479 1469.62 54.0958 1728 0.5Z"/></svg>'); */
		background-color: var(--primary);
		border-bottom: 8px solid var(--alternatif);
	}

	/* .header::before{
		content: '';
		position: absolute;
		background-color: var(--primary);
		transform-origin: bottom;
		bottom: -8px;
		left : 50%;
		border-radius: 20%;
		aspect-ratio: 1/1;
		width: 300px;

		transform: translateX(-50%);
		z-index: -1;
		border: 8px solid var(--alternatif);
	} */

	.content {
		--padding:20px;
		height: calc( 90px - 2 * var(--padding) );
		width: calc( 100% - 2 * var(--padding) );
		display: grid;
		padding: var(--padding);
		place-items: left center;
		color: var(--white);
		/* position: absolute; */
		z-index: 1;
		top:0;
		left:0;
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