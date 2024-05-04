<script lang="ts">
    import Agenda from "./components/Agenda.svelte";
    import Garde from "./components/Garde.svelte";
    import Events from "./components/Events.svelte";
    import PhotoSemaine from "./components/PhotoSemaine.svelte";
    import Fin from "./components/Fin.svelte";

</script>
<div class="flex gap-6 flex-col">
    <Garde></Garde>
    <Agenda></Agenda>
    <Events></Events>
    <PhotoSemaine></PhotoSemaine>
    <Fin></Fin>    
</div>