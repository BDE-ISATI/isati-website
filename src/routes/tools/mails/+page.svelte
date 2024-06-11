<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    import Input from "$lib/components/individuels/Input.svelte";

    let rôle = "Responsable"
    let personnes = "Prénom Nom"
    let mail = "pole@isati.org"

    let canvas : HTMLCanvasElement|undefined = undefined

    let f:number = 5;
    let temp2:Template
    let config:configuration

    $: mailSize = 80/f
    $: subtitleSize = 150/f
    $: titleSize = 225/f;

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
            backgroundURL:"./mails/signature_template.png",
            height:1204/f,
            width:4815/f,
            canvas:canvas!
        }
        temp2 = new Template(config)
    })

    beforeUpdate(async () =>{
        if (!temp2) return
        await loaded

        temp2.clear()
        await temp2.drawBackground()

        let personnesSplitted = personnes.split("\n")

        let y = (config.height - (subtitleSize + (personnesSplitted.length-1)*titleSize))/2

        for (let personne of personnesSplitted){
            temp2.drawTexte(personne,4000/f,y,'NanamiBlack',titleSize,"1","#262626",0,"right")
            y+=titleSize
        }

        temp2.drawTexte(mail,4750/f,1170/f,'Nanami',mailSize,"1","#ffffff",0,"right")
        temp2.drawTexte(rôle,3900/f,y,'Nanami',subtitleSize,"1","#D82B2B",0,"right")
    })

</script>

<div class="grid gap-4 grid-cols-1" spellcheck="false">

    <canvas class="w-full h-auto" bind:this={canvas}></canvas>
    <Input placeholder="Rôle" bind:value={rôle}/>
    <Input placeholder="Personnes" type="textarea" bind:value={personnes}/>
    <Input placeholder="Mail" type="textarea" bind:value={mail}/>

    <Input placeholder="Résolution de l'image" type="select" bind:value={f}>
        {#each [1,2,3,4,5,6,7,8,9,10] as v}
            <option value={v}>1/{v}</option>
        {/each}
    </Input>

    <Button on:click={() => temp2.download()}>Télécharger</Button>
</div>
