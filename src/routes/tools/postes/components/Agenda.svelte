<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    let titre = "LES $ÉVENEMENTS$ DE LA SEMAINE"
    let date = "$15/04$"
    let events = [
        {"jour":"MER 17", "horaires"  : "18H - 21H", "nom":"AFTERWORK","lieu":"Cave à flo"},
        {"jour":"MER 17", "horaires"  : "18H - 21H", "nom":"AFTERWORK","lieu":"Cave à flo"},
        {"jour":"MER 17", "horaires"  : "18H - 21H", "nom":"AFTERWORK","lieu":"Cave à flo"}
    ]
    let variante:string
    let isatiIndex:string

    let canvas : HTMLCanvasElement|undefined = undefined

    let template:Template
    let config:configuration

    let eventImage : Promise<HTMLImageElement>
    let isatiImage : Promise<HTMLImageElement>

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
    

    afterUpdate(() =>{
        config = {
            backgroundURL:`./postes/Page 2 - Agenda/fond.png`,
            height:1080,
            width:1080,
            canvas:canvas!
        }
        template = new Template(config)
        eventImage = template.loadImage("./postes/Page 2 - Agenda/event.png")
        isatiImage = template.loadImage(`./postes/Isatis/${isatiIndex}.png`)

    })

    beforeUpdate(async () =>{
        if (!template) return
        template.clear()
        await template.drawBackground()

        template.drawFormattedTexte(titre,65,1080-65,150,formatting)

        let y = 0
        for (let i in events){
            let j = i - parseInt(events.length/2)
            y = 540 + 116 * ( j * 1.25 + (events.length%2 == 0) * events.length * 0.25 )

            template.drawImage(await eventImage,1080-907, y ,907,116)
            
            template.drawFormattedTexte(events[i].jour    ,225,1080,y+51,formatting2)
            template.drawFormattedTexte(events[i].nom     ,475,1080,y+51,formatting2)
            
            template.drawFormattedTexte(events[i].horaires,225,1080,y+95,formatting3)
            template.drawFormattedTexte(events[i].lieu    ,475,1080,y+95,formatting3)

            template.drawImage(await isatiImage,0, 1080-237 ,1080,237)
        }

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
        
        <label for="date">Isati qui court</label>
        <select class="shadow-black/5 ring-1 ring-slate-700/10 rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" name="template" bind:value={isatiIndex}>
            <option value="1" selected={true}>Isati 1</option>
            <option value="2">Isati 2</option>
            <option value="3">Isati 3</option>
            <option value="4">Isati 4</option>
            <option value="5">Isati 5</option>
            <option value="6">Isati 6</option>
            <option value="7">Isati 7</option>
        </select>

    </form>

    <Button on:click={() => template.download()}>Télécharger</Button>

</div>