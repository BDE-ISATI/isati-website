<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import { afterUpdate,beforeUpdate } from "svelte";
    import { Template } from "$lib/scripts/canvas";
    import type { configuration } from "$lib/scripts/canvas";
    import Input from "$lib/components/individuels/Input.svelte";

    
    let titre = "LES $ÉVENEMENTS$ DE LA SEMAINE"
    let date = "$15/04$"

    interface eventsInterface {"jour":string,"horaires":string,"nom":string,"lieu":string}

    let events:eventsInterface[] = []

    let variante:string
    
    let canvas : HTMLCanvasElement|undefined = undefined
    
    let template:Template
    let config:configuration
    
    let eventImage : Promise<HTMLImageElement>
        
    let isatiIndex:string
    let isatiImage : Promise<HTMLImageElement>

    let formatting = (input:string) => {
        return {
                fontSize:105,
                fontWeight:500,
                color:"#1d1d1d",
                specialColor:"#dc2323",
                fontFamily:'AzoSansUber',
                textAlign:"left",
                output:input,
                letterSpacing:-6
            }
    }

    let formatting2 = (input:string) => {
        return {
                fontSize:44,
                fontWeight:500,
                color:"#ffffff",
                specialColor:"#ffffff",
                fontFamily:'AzoSansBlack',
                textAlign:"left",
                output:input,
                letterSpacing:-3.5
            }
    }
    
    let formatting3 = (input:string) => {
        return {
                fontSize:33,
                fontWeight:500,
                color:"#ffffff",
                specialColor:"#ffffff",
                fontFamily:'AzoSansBold',
                textAlign:"left",
                output:input,
                letterSpacing:-2
            }
    }
    

    afterUpdate(() =>{
        config = {
            backgroundURL:`./postes/Page 2 - Agenda/fond.png`,
            height:1080,
            width:1080,
            canvas:canvas!
        }
        template = new Template(config)
        eventImage = template.loadImage("./postes/Page 2 - Agenda/event.png")
        isatiImage = template.loadImage(`./postes/Isatis/${isatiIndex}.png`)

    })

    beforeUpdate(async () =>{
        if (!template) return
        template.clear()
        await template.drawBackground()

        template.drawFormattedTexte(titre,65,1080-65,150,formatting)

        let y = 0
        for (let i in events){
            let j = i - parseInt(events.length/2)
            y = 540 + 116 * ( j * 1.25 + (events.length%2 == 0) * events.length * 0.25 )

            template.drawImage(await eventImage,1080-907, y ,907,116)
            
            template.drawFormattedTexte(events[i].jour    ,225,1080,y+51,formatting2)
            template.drawFormattedTexte(events[i].nom     ,475,1080,y+51,formatting2)
            
            template.drawFormattedTexte(events[i].horaires,225,1080,y+95,formatting3)
            template.drawFormattedTexte(events[i].lieu    ,475,1080,y+95,formatting3)

            template.drawImage(await isatiImage,0, 1080-237 ,1080,237)
        }

    })

    function addEvent() {
        events.push( {"jour":"MER 17", "horaires"  : "18H - 21H", "nom":"AFTERWORK","lieu":"Cave à flo"} )
        events = events
    }

</script>

<div class="grid gap-4 grid-cols-2">

    <div>
        <canvas class="w-full h-auto" bind:this={canvas}></canvas>
    </div>
    <form spellcheck="false">

        <label for="titre">Titre</label>
        <Input type="textarea"  id="titre" bind:value={titre}/>
        
        <label for="date">Date</label>
        <Input type="textarea"  id="date" bind:value={date}/>

        <form>
            {#key events}
                {#each events as event,i }

                    <fieldset class="border p-2">
                        <legend>Agenda {i}</legend>

                        <label>Jour</label>
                        <Input type="text" bind:value={event["jour"]}/>
                        
                        <label>horaires</label>
                        <Input type="text" bind:value={event["horaires"]}/>
                        
                        <label>nom</label>
                        <Input type="text" bind:value={event["nom"]}/>
                        
                        <label>lieu</label>
                        <Input type="text" bind:value={event["lieu"]}/>
                        <Button on:click={ () => {events.splice(i,1); events = events} }>Remove</Button>
                    </fieldset>
                {/each}
            {/key}
            <Button on:click={ addEvent }>Add</Button>

        </form>
        
        <label for="date">Isati qui court</label>
        <Input type="select"  bind:value={isatiIndex}>
            <option value="1" selected={true}>Isati 1</option>
            <option value="2">Isati 2</option>
            <option value="3">Isati 3</option>
            <option value="4">Isati 4</option>
            <option value="5">Isati 5</option>
            <option value="6">Isati 6</option>
            <option value="7">Isati 7</option>
        </Input>

    </form>

    <Button on:click={() => template.download()}>Télécharger</Button>

</div>