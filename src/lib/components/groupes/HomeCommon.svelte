<script lang="ts">
    export let title:string
</script>

<div class="inline-block text-left">
	<div class="flex relative gap-4 flex-col items-center">

		<h1 class="uppercase text-3xl font-bold flex justify-center">{title}</h1>

        <slot></slot>
    </div>
</div>