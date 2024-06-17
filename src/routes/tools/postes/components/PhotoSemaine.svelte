<script lang="ts">
    import type { Template, configuration } from "$lib/scripts/canvas";
    import Input from "$lib/components/individuels/Input.svelte";
    import Global from "./Global.svelte";

    let titre = "LA $PHOTO$ DE LA SEMAINE"
    let subtitle = "LE LAVAGE (TERRIFIANT) DU FRIGO DU BDE"

    export let isatiIndex:string
    
    let files : File[]

    async function beforeUpdateCallback(template:Template,config:configuration,formatting){

        if (files) {
            // load une image 
            let image = await template.loadImageFile(files[0])
            template.drawResizeCropImage(image, 49,306,981,595)
        }
        await template.drawBackground()
        await template.drawFormattedTexte(titre,65,1080-65,150,formatting.f1)
        await template.drawTexte(subtitle,1080-65,930,"AzoSansBlack",26,"500","#1d1d1d",-1,"right")
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 5 - Photo/fond.png`} beforeUpdateCallback={beforeUpdateCallback}>
    <Input placeholder="Titre" type="text" bind:value={titre}/>
    <Input placeholder="Subtitle" type="text" bind:value={subtitle}/>
    <Input placeholder="Image" type="file" bind:files={files}/>
</Global>