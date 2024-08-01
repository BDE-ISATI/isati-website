<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate, onMount } from "svelte";
    import { Template,CE_Picture,CE_Text,CE_Vec2 } from "canvas-editor";


    import Input from "$lib/components/individuels/Input.svelte";

    let huerotate1:number = 0
    let huerotate2:number = 0

    let template:Template = new Template(new CE_Vec2(2485,5247))
    
    let background1 = new CE_Picture()
    template.add(background1)

    let background2 = new CE_Picture()
    template.add(background2)

    let date = new CE_Text('Mustardo',300,"1","#F39B29",0,"center")
    date.position = new CE_Vec2(1242.5,830)
    date.data = "jeudi 14"
    template.add(date)



    let equipe1 = new CE_Text('Impact',470,"1","#F39B29",0,"right")
    equipe1.position = new CE_Vec2(1090,3850)
    equipe1.data = "ESIR"
    template.add(equipe1)

    let equipe2 = new CE_Text('Impact',470,"1","#F39B29",0,"left")
    equipe2.position = new CE_Vec2(1395,3850)
    equipe2.data = "INSA"
    template.add(equipe2)

    let heure = new CE_Text('Athletic',250,"1","black",0,"center") // #f4f9e4
    heure.position = new CE_Vec2(1242.5,3550)
    heure.data = "20:30"
    template.add(heure)

    let vs = new CE_Text('Funkydori',350,"800","#951D33",0,"center")
    vs.position = new CE_Vec2(700,4100)
    vs.angle = -8
    vs.data = "VS"
    template.add(vs)

    let salle = new CE_Text('Cinema',350,"400","black",0,"center") // #f4f9e4
    salle.position = new CE_Vec2(1242.5,4500)
    salle.data = "salle courtemanche"
    template.add(salle)


    onMount(async () => {
        document.fonts.add(await (new FontFace('Impact', 'url(/fonts/impact.ttf)')).load());
        document.fonts.add(await (new FontFace('Athletic', 'url(/fonts/athletic.ttf)')).load());
        document.fonts.add(await (new FontFace('Mustardo', 'url(/fonts/mustardo.ttf)')).load());
        document.fonts.add(await (new FontFace('Cinema', 'url(/fonts/cinema-script.woff2)')).load());
        document.fonts.add(await (new FontFace('Funkydori', 'url(/fonts/funkydori.woff2)')).load());

        await background1.loadFromUrl("./volley/Dessous_volley.png")
        await background2.loadFromUrl("./volley/flamme_volley.png")

        loop()
    })

    afterUpdate(async () =>{
        background1.filter = `hue-rotate(${huerotate1}deg)`
        background2.filter = `hue-rotate(${huerotate2}deg)`
    })

    function loop() {
        if (template.destroyed) {return}
        template.draw()

        requestAnimationFrame(loop);
    }

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">

    <canvas class="w-auto max-h-96 place-self-center" bind:this={template.canvas}></canvas>

    <Input placeholder="Date" bind:value={date.data}/>
    <Input placeholder="Heure" bind:value={heure.data}/>
    <Input placeholder="Equipe 1" bind:value={equipe1.data}/>
    <Input placeholder="Equipe 2" bind:value={equipe2.data}/>
    <Input placeholder="vs" bind:value={vs.data}/>
    <Input placeholder="Salle" bind:value={salle.data}/>

    <Input placeholder="Hue Rotate 1" type="range" min={0} max={360} bind:value={huerotate1}/>
    <Input placeholder="Hue Rotate 2" type="range" min={0} max={360} bind:value={huerotate2}/>

    <Button on:click={() => template.download("Anniversaire")}>Télécharger</Button>
</div>
