<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";
    import { afterUpdate, beforeUpdate } from "svelte";

    let canvas : HTMLCanvasElement|undefined = undefined
    let template:Template
    let config:configuration
    let isatiImage : Promise<HTMLImageElement>
    
    type interfaceFormat = {
        [key : string] : Function
    }

    export let isatiIndex:string
    export let beforeUpdateCallback = (template:Template,config:configuration,formatting:interfaceFormat)=>{}
    export let afterUpdateCallback = (template:Template,config:configuration)=>{}
    export let backgroundURL : string

    afterUpdate(async () =>{
        config = {
            backgroundURL: backgroundURL,
            height:1080,
            width:1080,
            canvas:canvas!
        }
        template = new Template(config)
        isatiImage = template.loadImageUrl(`./postes/Isatis/${isatiIndex}.png`)

        await afterUpdateCallback(template,config)

    })

    beforeUpdate(async() => {
        if (!template) return
        await template.clear()

        await beforeUpdateCallback(template,config,formatting)

        await template.drawImage(await isatiImage,0, 1080-237 ,1080,237)
    })




    let formatting1 = (input:string) => {
        return {
            fontSize:105,
            fontWeight:500,
            color:"#1d1d1d",
            specialColor:"#dc2323",
            fontFamily:'AzoSansUber',
            textAlign:"left",
            output:input,
            letterSpacing:-6
        }
    }    

    let formatting2 = (input:string) => {
        return {
                fontSize:44,
                fontWeight:500,
                color:"#ffffff",
                specialColor:"#ffffff",
                fontFamily:'AzoSansBlack',
                textAlign:"left",
                output:input,
                letterSpacing:-3.5
            }
    }
    
    let formatting3 = (input:string) => {
        return {
                fontSize:33,
                fontWeight:500,
                color:"#ffffff",
                specialColor:"#ffffff",
                fontFamily:'AzoSansBold',
                textAlign:"left",
                output:input,
                letterSpacing:-2
            }
    }

    let formatting4 = (input:string) => {
        return {
                fontSize:50,
                fontWeight:500,
                color:"#1d1d1d",
                specialColor:"#dc2323",
                fontFamily:'AzoSansBold',
                textAlign:"left",
                output:input,
                letterSpacing:-2
            }
    }

    let formatting5 = (input:string) => {
        return {
                fontSize:160,
                fontWeight:500,
                color:"#1d1d1d",
                specialColor:"#dc2323",
                fontFamily:'AzoSansUber',
                textAlign:"left",
                output:input,
                letterSpacing:-6
            }
    }

    let formatting6 = (input:string) => {
        return {
                fontSize:44,
                fontWeight:500,
                color:"#1d1d1d",
                specialColor:"#dc2323",
                fontFamily:'AzoSansBold',
                textAlign:"left",
                output:input,
                letterSpacing:-2
            }
    }

    let formatting = {
        f1 : formatting1,
        f2 : formatting2,
        f3 : formatting3,
        f4 : formatting4,
        f5 : formatting5,
        f6 : formatting6,
    }

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">
    <canvas class="w-full h-auto" bind:this={canvas}></canvas>

    <Button on:click={() => template.download()}>Télécharger</Button>
    
    <slot></slot>
</div>