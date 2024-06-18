<script lang="ts">
    import type { Template, configuration } from "canvas-editor";
    import Input from "$lib/components/individuels/Input.svelte";
    import Global from "./Global.svelte";

    let titre = "LA $TRUC$ SUPER"
    let subtitle = "LE LAVAGE (TERRIFIANT) DU FRIGO DU BDE"

    export let isatiIndex:string
    
    let files : File[]

    async function beforeUpdateCallback(template:Template,config:configuration,formatting){
        await template.drawBackground()

        if (files) {
            // load une image 
            let image = await template.loadImageFile(files[0])
            
            template.drawResizeCropImage(image,60,200,400,800)
        }
        
        await template.drawFormattedTexte(titre,65,1080-65,150,formatting.f1)
        await template.drawFormattedTexte(subtitle,500,1080-65,290,formatting.f6)
    }
</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 4 - Supplémentaire/fond.png`} beforeUpdateCallback={beforeUpdateCallback}>
    <Input placeholder="Titre" type="text" bind:value={titre}/>
    <Input placeholder="Texte" type="textarea" bind:value={subtitle}/>
    <Input placeholder="Image" type="file" bind:files={files}/>
</Global>