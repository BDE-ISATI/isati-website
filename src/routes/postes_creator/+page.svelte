<script lang="ts">
    import { onMount } from "svelte";


let title = $state("GRAND TITRE")
let texte = $state("#Titre\nsalut ceci est une démonstration")
let variante = $state("")

let canvas : HTMLCanvasElement
let ctx : CanvasRenderingContext2D;

onMount(()=>{

    ctx = canvas.getContext('2d')!;


    canvas.height = 1440
    canvas.width = 1440
    
})

$effect(() => {

    let t = title
    let p = texte.split("\n")
    var img = new Image();
    img.width = 1440
    img.height = 1440
    img.onload = function() {
        ctx.drawImage(img, 0, 0);

        ctx.font = "bold 130px LeagueSpartan";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff"
        ctx.fillText(t,720,260)


        ctx.textAlign = "left";

        let offset = 500
        let lineheight : number

        for (let l of p){
            if (l.startsWith("#")){
                ctx.font = "bold 90px LeagueSpartan";
                ctx.fillStyle = "#ff0000"
                lineheight = 90*1.25

                ctx.fillText(l.slice(1), 200, offset);
            }
            else {
                ctx.font = "bold 65px LeagueSpartan";
                ctx.fillStyle = "#000000"
                lineheight = 65*1.25

                ctx.fillText(l, 200, offset);
            }

            offset += lineheight
        }
    }
    img.src = './template.png';
})


</script>
<div class="main">

    <div>
        <canvas bind:this={canvas}></canvas>
    </div>
    <form>

        <label>Titre</label>
        <input bind:value={title}>
        <label>Contenu</label>
        <textarea bind:value={texte} cols="30" rows="10"></textarea>
        <label>Template</label>
        <select bind:value={variante}>
            
            <option>top left     </option>
            <option>top middle   </option>
            <option>top right    </option>
            
            <option>middle left  </option>
            <option>middle middle</option>
            <option>middle right </option>
            
            <option>right left   </option>
            <option>right middle </option>
            <option>right right  </option>

        </select>
    </form>

</div>
<style>
    canvas {
        aspect-ratio: 1/1;
        width: 100%;
    }

    .main {
        width : clamp(0px,100%,1000px);
        display: grid;
        margin:auto;
        grid-template-columns: repeat(2,1fr);
        gap:10px;
    }
    
    
    form {
        gap:10px;
        display: flex;
        flex-direction: column;
    }

    label,input,select,textarea {
        font-size: 20px;
        color : var(--text);
    }
    input,select,textarea{
        padding:10px;
        outline: unset;
        border: unset;
        background-color: var(--container);
        box-shadow: var(--shadow);
        border-radius: 10px;
    }


    textarea{
        resize: vertical;
    }


</style>