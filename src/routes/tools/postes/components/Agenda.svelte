<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import Input from "$lib/components/individuels/Input.svelte";
    import type { Template, configuration } from "$lib/scripts/canvas";
    import Global from "./Global.svelte";
    let titre = "LES $ÉVENEMENTS$ DE LA SEMAINE"

    interface eventsInterface {"jour":string,"horaires":string,"nom":string,"lieu":string}

    let events:eventsInterface[] = []
    export let isatiIndex:string
    let eventImage : HTMLImageElement

    async function afterUpdateCallback(template:Template,config:configuration){
        eventImage = await template.loadImageUrl("./postes/Page 2 - Agenda/event.png")
    }

    async function beforeUpdateCallback(template:Template,config:configuration,formatting){

        await template.drawBackground()

        template.drawFormattedTexte(titre,65,1080-65,150,formatting.f1)

        let y = 0
        for (let i in events){
            let j = parseInt(i) - Math.floor(events.length/2)
            y = 540 + 116 * ( j * 1.25 + +(events.length%2 == 0) * events.length * 0.25 )

            template.drawImage(eventImage,1080-907, y ,907,116)
            
            template.drawFormattedTexte(events[i].jour    ,225,1080,y+51,formatting.f2)
            template.drawFormattedTexte(events[i].nom     ,475,1080,y+51,formatting.f2)
            
            template.drawFormattedTexte(events[i].horaires,225,1080,y+95,formatting.f3)
            template.drawFormattedTexte(events[i].lieu    ,475,1080,y+95,formatting.f3)
        }
    }

    function addEvent() {
        events.push( {"jour":"MER 17", "horaires"  : "18H - 21H", "nom":"AFTERWORK","lieu":"Cave à flo"} )
        events = events
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 2 - Agenda/fond.png`} beforeUpdateCallback={beforeUpdateCallback} afterUpdateCallback={afterUpdateCallback}>
    <Input placeholder="Titre" type="text" bind:value={titre}/>

    {#each events as event,i }

        <fieldset class="border p-2 grid gap-4 grid-cols-1">
            <legend>Agenda {i}</legend>

            <Input placeholder="Jour" type="text" bind:value={event["jour"]}/>
            <Input placeholder="horaires" type="text" bind:value={event["horaires"]}/>
            <Input placeholder="nom" type="text" bind:value={event["nom"]}/>
            <Input placeholder="lieu" type="text" bind:value={event["lieu"]}/>
            
            <Button on:click={ () => {events.splice(i,1); events = events} }>Remove</Button>
        </fieldset>
    {/each}

    <Button on:click={ addEvent }>Add</Button>
</Global>