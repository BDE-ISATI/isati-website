<script lang="ts">
    import Agenda from "./components/Agenda.svelte";
    import Garde from "./components/Garde.svelte";
    import Events from "./components/Events.svelte";
    import PhotoSemaine from "./components/PhotoSemaine.svelte";
    import Fin from "./components/Fin.svelte";

    let f1 = (new FontFace('AzoSansBold', 'url(/fonts/AzoSans/AzoSans-Bold.woff2)')).load()
    let f2 = (new FontFace('AzoSansBlack', 'url(/fonts/AzoSans/AzoSans-Black.woff2)')).load()
    let f3 = (new FontFace('AzoSansUber', 'url(/fonts/AzoSans/AzoSans-Uber.woff2)')).load()

    Promise.all([f1, f2, f3]).then((r) => { 
        for (let f of r){
            document.fonts.add(f);
        }
        loaded = true 
    })

    let loaded = false

</script>
{#if loaded}

    <div class="flex gap-8 flex-col">
        <Garde></Garde>
        <Agenda></Agenda>
        <Events></Events>
        <PhotoSemaine></PhotoSemaine>
        <Fin></Fin>
    </div>

{/if}