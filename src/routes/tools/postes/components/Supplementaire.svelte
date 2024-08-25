<script lang="ts">
    import { CE_FormattedText, CE_Picture, CE_Vec2, type Template } from "canvas-editor";
    import Input from "$lib/components/individuels/Input.svelte";
    import Global from "./Global.svelte";
    import { formatting } from "./format";
    import { afterUpdate } from "svelte";

    let titre = new CE_FormattedText(formatting.f1,999)
    titre.position = new CE_Vec2(65,150)
    titre.data = "LA $TRUC$ SUPER"

    let subtitle = new CE_FormattedText(formatting.f6,999)
    subtitle.position = new CE_Vec2(500,290)
    subtitle.data = "LE LAVAGE (TERRIFIANT) DU FRIGO DU BDE"

    export let isatiIndex:string
    
    let files : File[]
    let image = new CE_Picture()
    image.resize(new CE_Vec2(400,800))
    image.position = new CE_Vec2(60,200)

    afterUpdate(async() => {
        if (files) {
            await image.loadFromFile(files[0])
        }
    })

    async function addAfterBackground(template:Template){
        template.add(image)        
        template.add(titre)
        template.add(subtitle)
    }
</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 4 - Supplémentaire/fond.png`} addAfterBackground={addAfterBackground}>
    <Input placeholder="Titre" type="text" bind:value={titre.data}/>
    <Input placeholder="Texte" type="textarea" bind:value={subtitle.data}/>
    <Input placeholder="Image" type="file" bind:files={files}/>
</Global>