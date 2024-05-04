<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    let titre = "LES $ACTUS$ DE LA SEMAINE"
    let date = "$15/04$"
    let variante:string

    let canvas : HTMLCanvasElement|undefined = undefined

    let template:Template
    let config:configuration



    let formatting = (input:string) => {

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

    afterUpdate(() =>{
        config = {
            backgroundURL:`./postes/Page 1/${variante}.png`,
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

        let y = template.drawFormattedTexte(titre,65,1080-65,192,formatting)
        template.drawFormattedTexte(date,65,1080-65, y+66,formatting)
    })

</script>

<div class="grid gap-4 grid-cols-2">

    <div>
        <canvas class="w-full h-auto" bind:this={canvas}></canvas>
    </div>
    <form spellcheck="false">

        <label for="titre">Titre</label>
        <textarea class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" id="titre" bind:value={titre}></textarea>
        
        <label for="date">Date</label>
        <textarea class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" id="date" bind:value={date}></textarea>
        
        <label for="variante">Variante</label>

        <select class="shadow-black/5 ring-1 ring-slate-700/10 rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" name="template" bind:value={variante}>
            <option value="1" selected={true}>Fond 1</option>
            <option value="2">Fond 2</option>
            <option value="3">Fond 3</option>
            <option value="4">Fond 4</option>
            <option value="5">Fond 5</option>
            <option value="6">Fond 6</option>
            <option value="7">Fond 7</option>
            <option value="8">Fond 8</option>
            <option value="9">Fond 9</option>
        </select>

    </form>

    <Button on:click={() => template.download()}>Télécharger</Button>

</div>