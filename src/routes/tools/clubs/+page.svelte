<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate, onMount } from "svelte";
    import { Template,CE_Picture,CE_Text,CE_Vec2 } from "canvas-editor";
    import Input from "$lib/components/individuels/Input.svelte";

    let huerotate:number = 0
    let huerotate2:number = 0
    let heure = "14"

    let template:Template = new Template(new CE_Vec2(1394,2944))

    let background = new CE_Picture()
    template.add(background)

    let texteimage = new CE_Picture()
    template.add(texteimage)

    let titre = new CE_Text('EdsMarket',140,"1","#e1b400",0,"left")
    titre.position = new CE_Vec2(200,450)
    titre.data = "CLUB JEU"

    let salle = new CE_Text('EdsMarket',160,"1","#1c1c1c",0,"center")
    salle.position = new CE_Vec2(657,1950)
    salle.data = "SALLE 104"

    onMount(async () => {
        document.fonts.add(await (new FontFace('ArialRoundedMTBold', 'url(/fonts/ArialRoundedMTBold.ttf)')).load());
        document.fonts.add(await (new FontFace('EdsMarket', 'url(/fonts/EdsMarket.woff2)')).load());

        await background.loadFromUrl("./clubs/fond.png")
        await texteimage.loadFromUrl("./clubs/texte.png")

        loop()
    })

    afterUpdate(async () =>{
        background.filter = `hue-rotate(${huerotate}deg)`
        texteimage.filter = `hue-rotate(${huerotate2}deg)`
        titre.filter = `hue-rotate(${huerotate2}deg)`
    })

    function loop() {
        if (template.destroyed) {return}
        template.draw()

        template.ctx!.globalCompositeOperation = "hard-light"

        titre.draw(template.ctx)
        salle.draw(template.ctx)

        template.ctx!.globalCompositeOperation = "source-over"


        let txt1 = new CE_Text('ArialRoundedMTBold',200,"1","#1c1c1c",0,"center")
        txt1.position = new CE_Vec2(150,1630)
        txt1.angle = -6.5
        txt1.data = heure[0]||""
        txt1.draw(template.ctx)

        let txt2 = new CE_Text('ArialRoundedMTBold',200,"1","#1c1c1c",0,"center")
        txt2.position = new CE_Vec2(650,1580)
        txt2.data = heure[1]||""
        txt2.draw(template.ctx)

        requestAnimationFrame(loop);
    }

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">

    <canvas class="w-auto max-h-96 place-self-center" bind:this={template.canvas}></canvas>

    <Input placeholder="Nom du Club" bind:value={titre.data}/>
    <Input placeholder="Salle" bind:value={salle.data}/>
    <Input placeholder="Heure" bind:value={heure}/>

    <Input placeholder="Hue Rotate" type="range" min={0} max={360} bind:value={huerotate}/>
    <Input placeholder="Hue Rotate 2" type="range" min={0} max={360} bind:value={huerotate2}/>

    <Button on:click={() => template.download("Anniversaire")}>Télécharger</Button>
</div>
