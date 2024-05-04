<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    let titre = "PLUS D'INFOS DANS TES $MAILS$ !"
    let subtitle = "- MAIS J'AI RIEN REÇU ?\n- VÉRIFIE TES SPAMS ET ENVOIE TON MAIL EN MP !"
    let variante:string

    let canvas : HTMLCanvasElement|undefined = undefined

    let template:Template
    let config:configuration

    let formatting = (input:string) => {
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

    afterUpdate(() =>{
        config = {
            backgroundURL:`./postes/Page 6 - Fin/fond.png`,
            height:1080,
            width:1080,
            canvas:canvas!
        }
        template = new Template(config)
    })

    beforeUpdate(async () =>{
        if (!template) return
        template.clear()        

        await template.drawBackground()
        await template.drawFormattedTexte(titre,65,1080-65,150,formatting)
        await template.drawFormattedTexte(subtitle,110,1080-65,415,formatting2)

    })

</script>

<div class="grid gap-4 grid-cols-2">

    <div>
        <canvas class="w-full h-auto" bind:this={canvas}></canvas>
    </div>
    <form spellcheck="false">

        <label for="titre">Titre</label>
        <textarea class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" id="titre" bind:value={titre}></textarea>
        
        <label for="subtitle">Subtitle</label>
        <textarea class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" id="subtitle" bind:value={subtitle}></textarea>
    </form>

    <Button on:click={() => template.download()}>Télécharger</Button>

</div>