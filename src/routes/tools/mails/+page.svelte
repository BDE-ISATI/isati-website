<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

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

    <div class="grid gap-4 grid-cols-1">

        <div>
            <canvas class="w-full h-auto" bind:this={canvas}></canvas>
        </div>
        <form spellcheck="false">

            <label for="rôle">Rôle</label>
            <input id="rôle" class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" bind:value={rôle}>
            
            <label for="personnes">Personnes</label>
            <textarea class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" id="personnes" bind:value={personnes}></textarea>

            <label for="mail">Mail</label>
            <textarea class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" id="mail" bind:value={mail}></textarea>
            
        </form>
        <label for="res">Résolution de l'image</label>
        <p>1/1 = image net ; 1/10 = image compressé</p>
        <select class="shadow-black/5 ring-1 ring-slate-700/10 rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" id="res" bind:value={f}>
            {#each [1,2,3,4,5,6,7,8,9,10] as v}
                <option value={v}>1/{v}</option>
            {/each}
        </select>
        <Button on:click={() => temp2.download()}>Télécharger</Button>

    </div>
