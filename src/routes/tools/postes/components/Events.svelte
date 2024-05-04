<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    let variante:string

    let canvas : HTMLCanvasElement|undefined = undefined

    let template:Template
    let config:configuration

    let files


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
            backgroundURL:`./postes/Page 3 - Event/${variante}.png`,
            height:1080,
            width:1080,
            canvas:canvas!
        }
        template = new Template(config)
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
            image.onload = function (){
                let nheight = 1080
                let nwidth = image.width / image.height * nheight
                template.drawImage(image,(config.width-nwidth)/2,0,nwidth,nheight)
                template.drawBackground()
            }
        }
        
    })

</script>

<div class="grid gap-4 grid-cols-2">

    <div>
        <canvas class="w-full h-auto" bind:this={canvas}></canvas>
    </div>
    <form spellcheck="false">

        <label for="image">Image</label>
        <input class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" name="image" type="file" bind:files={files}>
        
        
        <label for="variante">Variante</label>
        <select class="shadow-black/5 ring-1 ring-slate-700/10 rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" name="template" bind:value={variante}>
            <option value="1" selected={true}>Fond 1</option>
            <option value="2">Fond 2</option>
        </select>

    </form>

    <Button on:click={() => template.download()}>Télécharger</Button>

</div>