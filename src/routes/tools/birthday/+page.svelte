<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate, onMount } from "svelte";
    import { Template,CE_Picture,CE_Text,CE_Vec2 } from "canvas-editor";


    import Input from "$lib/components/individuels/Input.svelte";

    let files1: File[]
    let files2: File[]
    let huerotate:number = 0

    let template:Template = new Template(new CE_Vec2(1394,2944))

    let image1 = new CE_Picture()
    image1.angle = 7
    image1.position = new CE_Vec2(270,715)
    image1.resize(new CE_Vec2(1095,1170))
    template.add(image1)

    let image2 = new CE_Picture()
    image2.angle = -11
    image2.position = new CE_Vec2(420,2080)
    image2.resize(new CE_Vec2(500,590))
    template.add(image2)
    
    let background = new CE_Picture()
    template.add(background)

    let nom = new CE_Text('Nanami',115,"1","#000000",0,"center")
    nom.position = new CE_Vec2(780,2005)
    nom.angle = 7
    nom.data = "Hippolyte"
    template.add(nom)

    let rôle = new CE_Text('Nanami',45,"1","#dc2323",0,"center")
    rôle.position = new CE_Vec2(670,2730)
    rôle.angle = -11
    rôle.data = "Respo WEI"
    template.add(rôle)

    onMount(async () => {
        document.fonts.add(await (new FontFace('Nanami', 'url(/fonts/Nanami/Nanami-Light.otf)')).load());
        document.fonts.add(await (new FontFace('NanamiBlack', 'url(/fonts/Nanami/Nanami-Heavy.otf')).load());

        await background.loadFromUrl("./anniversaire/fond.png")

        loop()
    })

    afterUpdate(async () =>{
        if (files1){
            await image1.loadFromFile(files1[0])
        }

        if (files2){
            await image2.loadFromFile(files2[0])
        }
        background.filter = `hue-rotate(${huerotate}deg)`
        rôle.filter = `hue-rotate(${huerotate}deg)`

    })

    function loop() {
        if (template.destroyed) {return}
        template.draw()
        requestAnimationFrame(loop);
    }

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">

    <canvas class="w-auto max-h-96 place-self-center" bind:this={template.canvas}></canvas>

    <Input placeholder="Nom" bind:value={nom.data}/>
    <Input placeholder="Rôle" bind:value={rôle.data}/>

    <Input placeholder="Image 1" type="file" bind:files={files1}/>
    <Input placeholder="Image 2" type="file" bind:files={files2}/>

    <Input placeholder="Hue Rotate" type="range" min={0} max={360} bind:value={huerotate}/>

    <Button on:click={() => template.download("Anniversaire")}>Télécharger</Button>
</div>
