<script lang="ts">
	export let href : string | undefined = undefined
	export let icon : any = undefined

</script>


<a on:click href={href} class="grid place-items-center gap-4 font-medium text-xl shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-xl w-full p-2 bg-container-700 leading-none focus:outline hover:bg-container-700/50 transition">
	<slot></slot>
	{#if icon}
		<svelte:component this={icon} weight="fill"/>
	{/if}
</a>