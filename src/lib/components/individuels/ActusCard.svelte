<script lang="ts">
	export let text : string
	export let href : string|undefined
</script>

<a href={href} class="select-none relative grid place-items-center w-48 h-24 rounded-3xl bg-container-800 text-[var(--text)] leading-none shadow-md shadow-black/5 ring-1 ring-slate-700/10  p-4">
	<span class="text-2xl font-medium leading-none">{text}</span>
</a>