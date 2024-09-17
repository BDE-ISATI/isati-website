<script lang="ts">
    import Agenda from "./components/Agenda.svelte";
    import Garde from "./components/Garde.svelte";
    import Events from "./components/Events.svelte";
    import PhotoSemaine from "./components/PhotoSemaine.svelte";
    import Fin from "./components/Fin.svelte";
    import ButtonIcon from "$lib/components/individuels/ButtonIcon.svelte";
    import { PlusCircle,CaretCircleLeft,CaretCircleRight } from "phosphor-svelte";
    import Input from "$lib/components/individuels/Input.svelte";
    import Supplementaire from "./components/Supplementaire.svelte";
  import Button from "../../../lib/components/individuels/Button.svelte";
  import Texte from "./components/Texte.svelte";

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

    let bindSelected = Garde
    let components = [Garde]

	let scrolling:HTMLDivElement

    function deleteComponent(i:number){
        components.splice(i,1)
        components = components
    }

</script>

<div class="flex relative gap-4 flex-col">
    <div class="overflow-y-hidden overflow-x-scroll scroll-smooth" style="scrollbar-width: none" bind:this={scrolling}>
        <div class="flex gap-4 w-fit py-4 px-1">
        {#if loaded}

            {#each components as comp,i}
                <div class="w-80">
                    <svelte:component this={comp} isatiIndex={(Math.round(i*6/(components.length-1))+1).toString()}></svelte:component>
                    <Button on:click={() => {deleteComponent(i)}}>Supprimer ce poste</Button>
                </div>
            {/each}

            <div class="w-40 flex flex-col gap-8">
                <Input type="select" placeholder="Type de page" bind:value={bindSelected}>
                    <option value={Agenda}>Page agenda</option>
                    <option value={Events}>Page events</option>
                    <option value={Supplementaire}>Page poste verticale</option>
                    <option value={PhotoSemaine}>Page photo de la semaine</option>
                    <option value={Fin}>Page de fin</option>
                    <option value={Texte}>Texte</option>
                </Input>
                
                <ButtonIcon on:click={() => {components.push(bindSelected);components=components;scrolling.scrollBy(1000,0);}}>
                    <PlusCircle></PlusCircle>
                </ButtonIcon>
            </div>
                
        {/if}
        </div>
    </div>
</div>