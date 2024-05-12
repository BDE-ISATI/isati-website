<script lang="ts">
    import { ArrowSquareIn } from "phosphor-svelte";

	export let icone:string|undefined = undefined
	export let icone_text:string|undefined = undefined
	export let main:string
	export let sub:string
	export let href:string|undefined=undefined
</script>

<a href={href} target="_blank" class="relative w-[20rem] rounded-3xl bg-container-800 text-[var(--text)] leading-none text-[0.8125rem] shadow-md shadow-black/5 ring-1 ring-slate-700/10  p-4">
	{#if href}
		<ArrowSquareIn weight="fill" class="size-4 absolute top-3 right-3 fill-[var(--text)]"/>
	{/if}

	{#if icone !== undefined}
		<img src={icone} class="inline-block h-10 w-10 flex-none rounded-full" alt={"image" + main}>

		<div class="inline-block align-middle ml-4 flex-auto">
			<div class="leading-none font-medium text-lg">{main}</div>
			<div class="leading-none mt-1 font-thin text-xs">{sub}</div>
		</div>
	{:else if icone_text !== undefined}
		<span class="inline-block leading-none text-3xl font-bold">{icone_text}</span>

		<div class="inline-block align-sub ml-4 flex-auto">
			<div class="leading-none font-medium text-lg">{main}</div>
			<div class="leading-none mt-1 font-thin text-xs">{sub}</div>
		</div>
	{/if}
</a>