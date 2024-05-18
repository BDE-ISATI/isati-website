<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";
    import Input from "$lib/components/individuels/Input.svelte";

    let titre = "LES $ACTUS$ DE LA SEMAINE"
    let date = "$15/04$"
    let variante:string

    let canvas : HTMLCanvasElement|undefined = undefined

    let template:Template
    let config:configuration

    let files

    let isatiImage : Promise<HTMLImageElement>

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
        isatiImage = template.loadImage(`./postes/Isatis/1.png`)

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

            let nheight : number
            let nwidth  : number

            let imageP = new Promise<HTMLImageElement>((resolve,reject) =>{
                image.onload = function (){

                    if ( image.height < image.width ) {
                        nheight = 810
                        nwidth = image.width / image.height * nheight
                    } 
                    else {
                        nwidth = 810 
                        nheight =  image.height / image.width * nwidth
                    }

                    resolve(image)
                }
            })

            await template.drawImage(await imageP,1080 - nwidth,210,nwidth,nheight)

        }

        await template.drawBackground()

        let y = template.drawFormattedTexte(titre,65,1080-65,192,formatting)
        template.drawFormattedTexte(date,65,1080-65, y+66,formatting)

        await template.drawImage(await isatiImage,0, 1080-237 ,1080,237)

    })

</script>

<div class="grid gap-4 grid-cols-2">

    <div>
        <canvas class="w-full h-auto" bind:this={canvas}></canvas>
    </div>
    <form spellcheck="false">

        <label for="titre">Titre</label>
        <Input type="text"  id="titre" bind:value={titre}/>
        
        <label for="date">Date</label>
        <Input type="text"  id="date" bind:value={date}/>
        
        <label for="image">Image</label>
        <Input type="file" bind:files={files}/>

        <label for="variante">Variante</label>

        <Input type="select"  bind:value={variante}>
            <option value="1" selected={true}>Fond 1</option>
            <option value="2">Fond 2</option>
            <option value="3">Fond 3</option>
            <option value="4">Fond 4</option>
            <option value="5">Fond 5</option>
            <option value="6">Fond 6</option>
            <option value="7">Fond 7</option>
            <option value="8">Fond 8</option>
            <option value="9">Fond 9</option>
        </Input>

    </form>

    <Button on:click={() => template.download()}>Télécharger</Button>

</div>