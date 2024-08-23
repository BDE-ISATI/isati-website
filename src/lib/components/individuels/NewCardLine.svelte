<script lang="ts">
    import { ArrowSquareIn } from "phosphor-svelte";
    import type { SvelteComponent } from "svelte";

	export let icone:SvelteComponent|undefined = undefined
	export let image:string|undefined = undefined
	export let primary:string=""
	export let secondary:string=""
	export let iconeBgClass:string=""
	export let tertiary:string=""
	export let href:string|undefined=undefined
</script>

<a href={href} target="_blank" class="flex w-full eading-none gap-4">
    <div class={iconeBgClass}>
        {#if image}
            <img src={image} class="inline-block h-10 w-10 rounded-xl" alt={"image" + primary}> 
        {:else if icone}
            <svelte:component this={icone}></svelte:component>
        {/if}
    </div>
    <div class="text-left flex-auto flex flex-col justify-evenly">
        <div class="leading-none font-bold text-lg">{primary}</div>
        <div class="leading-none mt-1 font-normal text-sm">{secondary}</div>
    </div>
    <div class="text-right flex-auto flex flex-col justify-evenly">
        <div class="flex justify-end"><ArrowSquareIn weight="fill" class="block size-4 fill-container-100"/></div>
        <div class="leading-none mt-1 font-normal text-sm">{tertiary}</div>    
    </div>
</a>