<script lang="ts">

	export let href : string | undefined = undefined
	export let icone : string | undefined = undefined

</script>


<a on:click href={href} class="flex justify-center gap-4 align-middle font-medium text-xl shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-none focus:outline hover:bg-container-700/50 transition" on:click>
	<slot></slot>
	{#if icone}
		<i class="ph-fill {icone}"></i>
	{/if}
</a>