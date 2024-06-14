<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    import Input from "$lib/components/individuels/Input.svelte";

    let rôle = "Respo WEI"
    let nom = "Hippolyte"
    let files1: File[]
    let files2: File[]
    let huerotate:number = 0

    let canvas : HTMLCanvasElement|undefined = undefined

    let template:Template
    let config:configuration

    let f1 = (new FontFace('Nanami', 'url(/fonts/Nanami/Nanami-Light.otf)')).load()
    let f2 = (new FontFace('NanamiBlack', 'url(/fonts/Nanami/Nanami-Heavy.otf)')).load()
    
    let loaded = new Promise( (resolve, reject) => Promise.all([f1,f2]).then((r) => { 
        for (let f of r){
            document.fonts.add(f);
        }
        resolve(undefined)
    }))

    afterUpdate(() =>{
        config = {
            backgroundURL:"./anniversaire/fond.png",
            height:1920,
            width:1080,
            canvas:canvas!
        }
        template = new Template(config)
    })

    beforeUpdate(async () =>{
        if (!template) return
        await loaded
        template.clear()

        if (files1) {
            // load une image 
            let image = await template.loadImageFile(files1[0])
            template.rotatedAction( 7, () => template.drawResizeCropImage(image, 190,470,770,770) )
        }

        if (files2) {
            // load une image 
            let image = await template.loadImageFile(files2[0])
            template.rotatedAction( -11, () => template.drawResizeCropImage(image, 370,1380,390,390) )
        }

        await template.filteredAction( `hue-rotate(${huerotate}deg)`, async () => {await template.drawBackground()})
        
        template.rotatedAction( 7, () => template.drawTexte(nom,550,1320,'Nanami',80,"1","#000000",0,"center") )
        template.rotatedAction( -10, () => template.drawTexte(rôle,600,1800,'Nanami',40,"1","#dc2323",0,"center") )
    })

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">

    <canvas class="w-full h-auto" bind:this={canvas}></canvas>

    <Input placeholder="Nom" bind:value={nom}/>
    <Input placeholder="Rôle" bind:value={rôle}/>

    <Input placeholder="Image 1" type="file" bind:files={files1}/>
    <Input placeholder="Image 2" type="file" bind:files={files2}/>

    <Input placeholder="Hue Rotate (-180 à 180)" type="number" bind:value={huerotate}/>

    <Button on:click={() => template.download()}>Télécharger</Button>
</div>
