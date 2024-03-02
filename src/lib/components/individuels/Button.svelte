<script lang="ts">

	export let href : string | undefined = undefined

</script>

{#if href}
	<a on:click href={href}><slot></slot></a>
{:else}
	<button on:click><slot></slot></button>
{/if}
<style>

button,a {
	background-color:var(--alternatif);
	border:unset;

	box-shadow: var(--shadow);
	border-radius: 26px;
	font-weight: 600;
	font-size: 16px;
	display: grid;
	place-items: center;
	user-select: none;

	width: 180px;
	height: 40px;
}

</style>