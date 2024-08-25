<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    import ButtonIcon from "./ButtonIcon.svelte";
    import { X } from "phosphor-svelte";
    import { fade } from "svelte/transition";


    export let hidden = false
    export let title:string
    export let hide
</script>

{#if !hidden}
    <div out:fade={{ duration: 100}} in:fade={{ duration: 100}} class="w-screen h-screen fixed right-0 bottom-0 z-30">
        <button on:click={hide} class="w-full h-full bg-container-900 bg-opacity-70"></button>
        <div class="fixed bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform bg-container-800">
            
            <div class="flex justify-between mb-4">
                <h5 class="inline-flex items-center text-xl font-semibold text-container-50">
                    {title}
                </h5>
                <ButtonIcon on:click={hide}><X></X></ButtonIcon>
            </div>

            <div class="flex gap-2">
                <slot></slot>
            </div>
        </div>
    </div>
{/if}