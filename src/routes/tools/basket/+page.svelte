<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate, onMount } from "svelte";
    import { Template,CE_Picture,CE_Text,CE_Vec2 } from "canvas-editor";


    import Input from "$lib/components/individuels/Input.svelte";

    let huerotate1:number = 0

    let template:Template = new Template(new CE_Vec2(2485,5247))
    
    let background1 = new CE_Picture()
    template.add(background1)

    let background2 = new CE_Picture()
    template.add(background2)

    let background3 = new CE_Picture()
    template.add(background3)

    // let date = new CE_Text('Mustardo',300,"1","#F39B29",0,"center")
    // date.position = new CE_Vec2(1242.5,830)
    // date.data = "jeudi 14"
    // date.strokes = [{width:30,color:"black"},{width:15,color:"white"}]
    // template.add(date)

    onMount(async () => {
        document.fonts.add(await (new FontFace('Impact', 'url(/fonts/impact.ttf)')).load());

        await background1.loadFromUrl("./basket/Calque_fond.png")
        await background2.loadFromUrl("./basket/Calque_rouge.png")
        await background3.loadFromUrl("./basket/Calque_jaune.png")

        loop()
    })

    afterUpdate(async () =>{
        background1.filter = `hue-rotate(${huerotate1}deg)`
        background2.filter = `hue-rotate(${huerotate1}deg)`
        background3.filter = `hue-rotate(${huerotate1}deg)`
    })

    function loop() {
        if (template.destroyed) {return}
        template.draw()

        requestAnimationFrame(loop);
    }

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">
    <canvas class="w-auto max-h-96 place-self-center" bind:this={template.canvas}></canvas>

    <!-- <Input placeholder="Date" bind:value={date.data}/>
    <Input placeholder="Heure" bind:value={heure.data}/>
    <Input placeholder="Equipe 1" bind:value={equipe1.data}/>
    <Input placeholder="Equipe 2" bind:value={equipe2.data}/>
    <Input placeholder="vs" bind:value={vs.data}/>
    <Input placeholder="Salle" bind:value={salle.data}/> -->

    <Input placeholder="Hue Rotate 1" type="range" min={0} max={360} bind:value={huerotate1}/>
    
    <Button on:click={() => template.download("Anniversaire")}>Télécharger</Button>
</div>