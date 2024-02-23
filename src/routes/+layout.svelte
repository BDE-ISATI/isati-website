<script>


</script>

<svelte:head>
	<title>ISATI BDE</title>
	<meta name="description" content="">
</svelte:head>


<div class="app">

	
	{#key data.pathname}
		<div id="content" in:fade={{ duration: 1000}}>
			<slot></slot>
		</div>
	{/key}

	
</div>

<style>

</style>