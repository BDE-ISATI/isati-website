<script lang="ts">
    import { ArrowSquareIn } from "phosphor-svelte";

	export let main:string
	export let description:string|undefined
	export let categorie:string

	export let id:string
</script>

<a href={`/article?id=${id}`} class="relative flex flex-col justify-between w-[20rem] gap-4 rounded-3xl bg-container-800 text-slate-800 text-[0.8125rem] leading-5 shadow-md shadow-black/5 ring-1 ring-slate-700/10  p-4">
	<ArrowSquareIn weight="fill" class="size-4 absolute top-3 right-3 fill-container-100"/>

	<span class="text-container-100 inline-block font-bold">{main}</span>
	<span class="text-container-100 inline-block">{categorie}</span>
</a>