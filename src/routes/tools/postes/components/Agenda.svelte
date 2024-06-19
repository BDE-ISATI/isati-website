<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import Input from "$lib/components/individuels/Input.svelte";
    import { CE_FormattedText, CE_Picture, CE_Text, CE_Vec2, type Template } from "canvas-editor";
    import Global from "./Global.svelte";
    import { afterUpdate } from "svelte";
    import { formatting } from "./format";

    let titre = new CE_FormattedText(formatting.f1,999)
    titre.position = new CE_Vec2(65,150)
    titre.data = "LES $ÉVENEMENTS$ DE LA SEMAINE"

    interface eventsInterface {"jour":string,"horaires":string,"nom":string,"lieu":string}

    let events:eventsInterface[] = []
    export let isatiIndex:string

    let eventImage = new CE_Picture()
    eventImage.resize(new CE_Vec2(907,116))
    eventImage.position.x = 1080-907

    afterUpdate(async() => {
        await eventImage.loadFromUrl("./postes/Page 2 - Agenda/event.png")
    })



    let text1 = new CE_FormattedText(formatting.f2,1080)
    let text2 = new CE_FormattedText(formatting.f3,1080)

    async function addAfterBackground(template:Template){
        template.add(titre)
    }

    async function drawAfterBackground(template:Template){


        let y = 0
        for (let i in events){

            let j = parseInt(i) - Math.floor(events.length/2)
            y = 540 + 116 * ( j * 1.25 + +(events.length%2 == 0) * events.length * 0.25 )

            eventImage.position.y =  y
            eventImage.draw(template.ctx)

            text1.position.x = 225
            text1.position.y = y+51
            text1.data = events[i].jour
            text1.draw(template.ctx)

            text1.position.x = 475
            text1.data = events[i].nom
            text1.draw(template.ctx)
            
            text2.position.x = 225
            text2.position.y = y+95
            text2.data = events[i].horaires
            text2.draw(template.ctx)

            text2.position.x = 475
            text2.data = events[i].lieu
            text2.draw(template.ctx)
        }
    }

    function addEvent() {
        events.push( {"jour":"MER 17", "horaires"  : "18H - 21H", "nom":"AFTERWORK","lieu":"Cave à flo"} )
        events = events
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 2 - Agenda/fond.png`} addAfterBackground={addAfterBackground} drawAfterBackground={drawAfterBackground}>
    <Input placeholder="Titre" type="text" bind:value={titre.data}/>

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