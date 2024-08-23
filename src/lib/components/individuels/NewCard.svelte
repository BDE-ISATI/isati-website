<script lang="ts">
	export let title=""
</script>

<div class="inline-block relative w-80 rounded-3xl bg-container-800 leading-none shadow-md shadow-black/5 ring-1 ring-slate-700/10 p-4">
    <h3 class="font-bold text-xl">{title}</h3>
    <br>
    <div class="flex flex-col w-full gap-2">
        <slot></slot>
    </div>
</div>