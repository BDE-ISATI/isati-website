<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { onMount } from "svelte";
    import { Template2 } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";

    let rôle = "Responsable Audiovisuel"
    let personnes = "DAMIEN VAILLAND"

    let canvas : HTMLCanvasElement|undefined = undefined

    let config:configuration
    let temp2:Template2

    onMount(()=>{
        config ={
            backgroundURL:"./templates/signature_template.png",
            height:1204,
            width:4815,
            canvas:canvas!
        }
        temp2 = new Template2(config)
    })

    let subtitleSize = 150
    let titleSize = 225;


    $:( async (personnes,rôle) => {
        temp2.clear()
        await temp2.drawBackground()

        let personnesSplitted = personnes.split("\n")

        let y = (config.height - (subtitleSize + (personnesSplitted.length-1)*titleSize))/2

        for (let personne of personnesSplitted){
            temp2.drawTexte(personne,4000,y,'NanamiBlack',titleSize,"1","#262626","right")
            y+=titleSize
        }

        temp2.drawTexte(rôle,3900,y,'Nanami',subtitleSize,"1","#D82B2B","right")

    })(personnes,rôle)

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

    </form>
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