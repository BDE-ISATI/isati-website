<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "canvas-editor";
    import type { configuration } from "canvas-editor";

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
            height:2944,
            width:1394,
            canvas:canvas!
        }
        
        template = new Template(config)
    })

    let cx = 1.12
    let cy = 1.515

    beforeUpdate(async () =>{
        if (!template) return
        await loaded
        template.clear()

        if (files1) {
            // load une image 
            let image = await template.loadImageFile(files1[0])
            template.rotatedAction( 7, () => template.drawResizeCropImage(image, 270,715,1095,1170) )
        }

        if (files2) {
            // load une image 
            let image = await template.loadImageFile(files2[0])
            template.rotatedAction( -11, () => template.drawResizeCropImage(image, 420,2080,500,590) )
        }

        await template.filteredAction( `hue-rotate(${huerotate}deg)`, async () => {await template.drawBackground()})
        
        template.rotatedAction( 7, () => template.drawTexte(nom,780,2005,'Nanami',115,"1","#000000",0,"center") )
        await template.filteredAction( `hue-rotate(${huerotate}deg)`, () => template.rotatedAction( -11, () => template.drawTexte(rôle,670,2730,'Nanami',45,"1","#dc2323",0,"center") ) )
    })

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">

    <canvas class="w-auto max-h-96 place-self-center" bind:this={canvas}></canvas>

    <Input placeholder="Nom" bind:value={nom}/>
    <Input placeholder="Rôle" bind:value={rôle}/>

    <Input placeholder="Image 1" type="file" bind:files={files1}/>
    <Input placeholder="Image 2" type="file" bind:files={files2}/>

    <Input placeholder="Hue Rotate" type="range" min={0} max={360} bind:value={huerotate}/>

    <Button on:click={() => template.download()}>Télécharger</Button>
</div>
