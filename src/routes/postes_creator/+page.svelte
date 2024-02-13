<script lang="ts">
    import { onMount } from "svelte";


let title = $state("")
let texte = $state("")
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
    let p = texte
    var img = new Image();
    img.width = 1440
    img.height = 1440
    img.onload = function() {
        ctx.drawImage(img, 0, 0);

        ctx.font = "bold 130px LeagueSpartan";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff"
        ctx.fillText(t,720,260)

        ctx.font = "bold 65px LeagueSpartan";
        ctx.textAlign = "left";
        ctx.fillStyle = "#000000"
        ctx.fillText(p,200,500)
    }
    img.src = './template.png';
})


</script>

<div>

    
    <input bind:value={title}>
    <textarea bind:value={texte} cols="30" rows="10"></textarea>
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

    <canvas bind:this={canvas}></canvas>

</div>

<style>
    canvas {
        aspect-ratio: 1/1;
        width: 100%;
    }

    div {
        width : clamp(0px,100%,700px);
    }
</style>