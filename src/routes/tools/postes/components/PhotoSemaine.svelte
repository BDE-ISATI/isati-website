<script lang="ts">
    import { CE_FormattedText, CE_Picture, CE_Text, CE_Vec2, type Template } from "canvas-editor";
    import Input from "$lib/components/individuels/Input.svelte";
    import Global from "./Global.svelte";
    import { formatting } from "./format";
    import { afterUpdate } from "svelte";

    let titre = new CE_FormattedText(formatting.f1,999)
    titre.position = new CE_Vec2(65,150)
    titre.data = "LA $PHOTO$ DE LA SEMAINE"

    let subtitle = new CE_Text("AzoSansBlack",26,"500","#1d1d1d",-1,"right")
    subtitle.position = new CE_Vec2(1080-65,930)
    subtitle.data = "LE LAVAGE (TERRIFIANT) DU FRIGO DU BDE"
    
    export let isatiIndex:string
    
    let files : File[]
    let image = new CE_Picture()
    image.resize(new CE_Vec2(981,595))
    image.position = new CE_Vec2(49,306)

    afterUpdate(async() => {
        if (files) {
            await image.loadFromFile(files[0])
        }
    })

    async function addBeforeBackground(template:Template){
        template.add(image)
    }

    async function addAfterBackground(template:Template){
        template.add(titre)
        template.add(subtitle)
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 5 - Photo/fond.png`} addAfterBackground={addAfterBackground} addBeforeBackground={addBeforeBackground}>
    <Input placeholder="Titre" type="text" bind:value={titre.data}/>
    <Input placeholder="Subtitle" type="text" bind:value={subtitle.data}/>
    <Input placeholder="Image" type="file" bind:files={files}/>
</Global>