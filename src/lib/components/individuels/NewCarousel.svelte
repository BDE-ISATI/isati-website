
<script lang="ts">
    import * as Hammer from "hammerjs";
    import { onMount } from "svelte";


    let carousel

    let i = 0
    let way = 0

    onMount(() =>{
        var mc = new Hammer.Manager(carousel)

        var Pan = new Hammer.Pan();
        mc.add(Pan);

        // listen to events...
        mc.on("panleft", function(ev) {
            way = 1
        });

        mc.on("panright", function(ev) {
            way = -1
        });

        mc.on("panend", function(ev) {
            i = Math.max(Math.min(3,i+way),0)
            way = 0
        })

    })

    function getSide(globalIndex:number,index:number) {
        if (globalIndex>index) return "-left-20 -rotate-3 scale-75 opacity-60"
        if (globalIndex==index) return "left-0"
        if (globalIndex<index) return "-right-20 rotate-3 scale-75 opacity-60"
    }

</script>

<div bind:this={carousel}>
    <div class="relative w-80 h-96">
        <div class="transition duration-300 absolute w-80 h-96 bg-red-600 { getSide(i,0) }"></div>
        <div class="transition duration-300 absolute w-80 h-96 bg-red-600 { getSide(i,1) }"></div>
        <div class="transition duration-300 absolute w-80 h-96 bg-red-600 { getSide(i,2) }"></div>
    </div>
</div>