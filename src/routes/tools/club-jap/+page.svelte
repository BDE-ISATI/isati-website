<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate, onMount } from "svelte";
    import { Template,CE_Picture,CE_Text,CE_Vec2 } from "canvas-editor";
    import Input from "$lib/components/individuels/Input.svelte";

    let template:Template = new Template(new CE_Vec2(1280,2703))

    let background = new CE_Picture()
    template.add(background)

    let salle = new CE_Text('Mistral',200,"1","#000000",0,"left")
    salle.position = new CE_Vec2(530,1780)
    salle.data = "Salle 104"
    salle.globalCompositeOperation = "multiply"

    let heure = new CE_Text('Mistral',380,"1","#ff0000",0,"center")
    heure.position = new CE_Vec2(657,1560)
    heure.globalCompositeOperation = "multiply"
    heure.data = "à 14h"


    onMount(async () => {
        document.fonts.add(await (new FontFace('Mistral', 'url(/fonts/mistral.ttf)')).load());

        await background.loadFromUrl("./clubs/fond_jap.png")

        loop()
    })

    afterUpdate(async () =>{
    })

    function loop() {
        if (template.destroyed) {return}
        template.draw()

        template.ctx!.globalCompositeOperation = "multiply"

        heure.draw(template.ctx)
        salle.draw(template.ctx)

        template.ctx!.globalCompositeOperation = "source-over"

        requestAnimationFrame(loop);
    }

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">

    <canvas class="w-auto max-h-96 place-self-center" bind:this={template.canvas}></canvas>

    <Input placeholder="Salle" bind:value={salle.data}/>
    <Input placeholder="Heure" bind:value={heure.data}/>
    <Button on:click={() => template.download("Club Japonais")}>Télécharger</Button>
</div>
