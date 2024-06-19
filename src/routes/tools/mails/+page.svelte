<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { onMount } from "svelte";
    import { Template,CE_Picture,CE_Text,CE_Vec2 } from "canvas-editor";

    import Input from "$lib/components/individuels/Input.svelte";

    let template = new Template(new CE_Vec2(963,241))

    let rôle = new CE_Text('Nanami',30,"1","#D82B2B",0,"right")
    rôle.data = "Responsable"
    rôle.position.x = 780

    let personnes = "Prénom Nom"

    let mail = new CE_Text('Nanami',16,"1","#ffffff",0,"right")
    mail.position = new CE_Vec2(950,234)
    mail.data = "pole@isati.org"
    
    let background = new CE_Picture()
    background.resize(new CE_Vec2(963,241))
    template.add(background)

    onMount(async ()=>{
        await background.loadFromUrl("./mails/signature_template.png")

        document.fonts.add(await (new FontFace('Nanami', 'url(/fonts/Nanami/Nanami-Light.otf)')).load())
        document.fonts.add(await (new FontFace('NanamiBlack', 'url(/fonts/Nanami/Nanami-Heavy.otf)')).load())

        loop()
    })


    function loop(){
        if (template.destroyed) {return}

        try {
            template.draw()
            let personnesSplitted = personnes.split("\n")

            let t = new CE_Text('NanamiBlack',45,"1","#262626",0,"right")

            let y = (template.size.y - (mail.fontSize + (personnesSplitted.length-1)*t.fontSize))/2
            
            for (let personne of personnesSplitted){
                t.position = new CE_Vec2(800,y)
                t.data = personne
                t.draw(template.ctx)
                y+=t.fontSize
            }

            mail.draw(template.ctx)
            rôle.position.y = y
            rôle.draw(template.ctx)
        } catch (error) {
            //console.log(error)
        }

        requestAnimationFrame(loop);
    }

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">

    <canvas class="w-full h-auto" bind:this={template.canvas}></canvas>
    <Input placeholder="Rôle" bind:value={rôle.data}/>
    <Input placeholder="Personnes" type="textarea" bind:value={personnes}/>
    <Input placeholder="Mail" type="text" bind:value={mail.data}/>

    <Button on:click={() => template.download("mail")}>Télécharger</Button>
</div>
