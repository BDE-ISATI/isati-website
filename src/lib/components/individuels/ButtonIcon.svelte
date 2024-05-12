<script lang="ts">

	export let href : string | undefined = undefined
	export let target: string | undefined = undefined
	export let color: string | undefined = undefined

</script>


<a href={href} target={target} on:click class="text-[${color}] size-12 rounded-full bg-container-700 p-3 shadow-sm ring-1 ring-black ring-opacity-5">
	<slot></slot>
</a>

<style>

	a :global(svg) {
        fill: currentColor;
    }

</style>