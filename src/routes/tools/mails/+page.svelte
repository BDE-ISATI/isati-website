<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template2 } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    let rôle = "Responsable"
    let personnes = "Prénom Nom"
    let mail = "pole@isati.org"

    let canvas : HTMLCanvasElement|undefined = undefined

    let f:number = 5;
    let temp2:Template2
    let config:configuration

    $: mailSize = 80/f
    $: subtitleSize = 150/f
    $: titleSize = 225/f;

    afterUpdate(() =>{
        config = {
            backgroundURL:"./templates/signature_template.png",
            height:1204/f,
            width:4815/f,
            canvas:canvas!
        }
        temp2 = new Template2(config)
    })

    beforeUpdate(async () =>{
        if (!temp2) return
        temp2.clear()
        await temp2.drawBackground()

        let personnesSplitted = personnes.split("\n")

        let y = (config.height - (subtitleSize + (personnesSplitted.length-1)*titleSize))/2

        for (let personne of personnesSplitted){
            temp2.drawTexte(personne,4000/f,y,'NanamiBlack',titleSize,"1","#262626","right")
            y+=titleSize
        }

        temp2.drawTexte(mail,4750/f,1170/f,'Nanami',mailSize,"1","#ffffff","right")
        temp2.drawTexte(rôle,3900/f,y,'Nanami',subtitleSize,"1","#D82B2B","right")
    })

</script>

<div class="main">

    <div>
        <canvas bind:this={canvas}></canvas>
    </div>
    <form spellcheck="false">

        <label for="rôle">Rôle</label>
        <input id="rôle" bind:value={rôle}>
        
        <label for="personnes">Personnes</label>
        <textarea id="personnes" bind:value={personnes}></textarea>

        <label for="mail">Mail</label>
        <textarea id="mail" bind:value={mail}></textarea>
        
    </form>
    <label for="res">Résolution de l'image</label>
    <p>1/1 = image net ; 1/10 = image compressé</p>
    <select id="res" bind:value={f}>
        {#each [1,2,3,4,5,6,7,8,9,10] as v}
            <option value={v}>1/{v}</option>
        {/each}
    </select>
    <Button on:click={() => temp2.download()}>Télécharger</Button>

</div>

<style>
    canvas {
        /* aspect-ratio: 1/1; */
        width: 100%;
    }

    .main {
        width : clamp(0px,100%,1000px);
        display: grid;
        margin:auto;
        grid-template-columns: repeat(1,1fr);
        gap:10px;
    }
    
</style>