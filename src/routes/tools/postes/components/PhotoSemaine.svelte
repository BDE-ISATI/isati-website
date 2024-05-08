<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    let titre = "LA $PHOTO$ DE LA SEMAINE"
    let subtitle = "LE LAVAGE (TERRIFIANT) DU FRIGO DU BDE"

    let canvas : HTMLCanvasElement|undefined = undefined

    let template:Template
    let config:configuration

    let isatiIndex:string
    let isatiImage : Promise<HTMLImageElement>
    
    let files

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


    afterUpdate(() =>{
        config = {
            backgroundURL:`./postes/Page 5 - Photo/fond.png`,
            height:1080,
            width:1080,
            canvas:canvas!
        }
        template = new Template(config)
        isatiImage = template.loadImage(`./postes/Isatis/${isatiIndex}.png`)

    })

    beforeUpdate(async () =>{
        if (!template) return
        template.clear()

        if (files) {
            // load une image 
            var fr = new FileReader();
            let image = new Image()
            fr.onload = function () {
                image.src = fr.result as string
            }
            fr.readAsDataURL(files[0]);
            // on la fit à une dimension précise

            let nheight
            let nwidth 

            let imageP = new Promise<HTMLImageElement>((resolve,reject) =>{
                image.onload = function (){
                    nheight = 1080
                    nwidth = image.width / image.height * nheight
                    resolve(image)
                }
            })

            
            await template.drawImage(await imageP,(config.width-nwidth)/2,0,nwidth,nheight)
        }

        

        await template.drawBackground()
        await template.drawFormattedTexte(titre,65,1080-65,150,formatting)
        await template.drawTexte(subtitle,1080-65,930,"AzoSansBlack",26,"500","#1d1d1d",-1,"right")

        template.drawImage(await isatiImage,0, 1080-237 ,1080,237)

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

        <label for="image">Image</label>
        <input class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" name="image" type="file" bind:files={files}>
    
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