<script lang="ts">
	export let main:string
	export let description:string|undefined
	export let categorie:string

	export let id:string
</script>

<a href={`/article?id=${id}`} class="relative flex flex-col justify-between w-[20rem] gap-4 rounded-3xl bg-container-800 text-[var(--text)] text-[0.8125rem] leading-5 text-slate-900 shadow-md shadow-black/5 ring-1 ring-slate-700/10  p-4">
	<i class="text-[var(--text)] size-4 ph-fill ph-arrow-square-in absolute top-3 right-3"></i>
	
	<span class="text-[var(--text)] inline-block font-bold">{main}</span>
	<span class="text-[var(--text)] inline-block">{categorie}</span>
</a>