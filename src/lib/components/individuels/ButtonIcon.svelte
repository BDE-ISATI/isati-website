<script lang="ts">

	export let href : string | undefined = undefined
	export let target: string | undefined = undefined
	export let color: string | undefined = "undefined"
	export let bgColor: string = "bg-container-700"

</script>

<a href={href} target={target} on:click class="grid place-items-center text-[${color}] size-10 rounded-full {bgColor} p-3 shadow-sm ring-1 ring-black ring-opacity-5 *:fill-current">
	<slot></slot>
</a>