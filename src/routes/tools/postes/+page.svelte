<script lang="ts">
    import Agenda from "./components/Agenda.svelte";
    import Garde from "./components/Garde.svelte";
    import Events from "./components/Events.svelte";
    import PhotoSemaine from "./components/PhotoSemaine.svelte";
    import Fin from "./components/Fin.svelte";


    (new FontFace('AzoSans-Bold', 'url(/fonts/AzoSans/AzoSans-Bold.woff2)')).load().then((font) => {
        document.fonts.add(font);
    });
    (new FontFace('AzoSansBlack', 'url(/fonts/AzoSans/AzoSans-Black.woff2)')).load().then((font) => {
        document.fonts.add(font);
    });
    (new FontFace('AzoSansUber', 'url(/fonts/AzoSans/AzoSans-Uber.woff2)')).load().then((font) => {
        document.fonts.add(font);
    });

</script>
<div class="flex gap-6 flex-col">
    <Garde></Garde>
    <Agenda></Agenda>
    <Events></Events>
    <PhotoSemaine></PhotoSemaine>
    <Fin></Fin>
    <hr>
</div>