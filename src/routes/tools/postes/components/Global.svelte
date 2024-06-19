<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { Template, CE_Picture,CE_Vec2 } from "canvas-editor";
    import { afterUpdate, beforeUpdate, onMount } from "svelte";

    let template = new Template(new CE_Vec2(1080,1080))
    let isatiImage = new CE_Picture()
    isatiImage.position = new CE_Vec2(0 ,1080-237)
    let background = new CE_Picture()
    
    type interfaceFormat = {
        [key : string] : Function
    }

    export let isatiIndex:string
    export let addBeforeBackground = (template:Template)=>{}
    export let drawAfterBackground = (template:Template)=>{}
    export let addAfterBackground = (template:Template)=>{}
    export let backgroundURL : string

    afterUpdate(async () =>{
        await background.loadFromUrl(backgroundURL)
        await isatiImage.loadFromUrl(`./postes/Isatis/${isatiIndex=="NaN" ? "1" : isatiIndex}.png`)  
    })

    onMount(async() => {
        addBeforeBackground(template)
        template.add(background)    
        addAfterBackground(template)
        template.add(isatiImage)    

        loop()
    })

    function loop() {
        if (template.destroyed) {return}
        template.draw()
        drawAfterBackground(template)
        requestAnimationFrame(loop);
    }


</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">
    <canvas class="w-full h-auto" bind:this={template.canvas}></canvas>

    <Button on:click={() => template.download("Poste Instagram")}>Télécharger</Button>
    
    <slot></slot>
</div>