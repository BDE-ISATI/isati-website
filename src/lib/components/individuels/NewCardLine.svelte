<script lang="ts">
    import { ArrowSquareIn } from "phosphor-svelte";

	export let icone:string|undefined = undefined
	export let icone_text:string|undefined = undefined
	export let primary:string=""
	export let secondary:string=""
	export let tertiary:string=""
	export let href:string|undefined=undefined
</script>

<a href={href} target="_blank" class="flex w-full eading-none gap-4">
    <div>
        <img src={icone} class="inline-block h-10 w-10 rounded-xl" alt={"image" + primary}> 
    </div>
    <div class="flex-1 flex flex-col justify-evenly">
        <div class="leading-none font-bold text-lg">{primary}</div>
        <div class="leading-none mt-1 font-normal text-sm">{secondary}</div>
    </div>
    <div class="text-right flex-1 flex flex-col justify-evenly">
        <div class="flex justify-end"><ArrowSquareIn weight="fill" class="block size-4 fill-container-100"/></div>
        <div class="leading-none mt-1 font-normal text-sm">{tertiary}</div>    
    </div>
</a>