<script lang="ts">
    import Input from "$lib/components/individuels/Input.svelte";
    import type { Template, configuration } from "$lib/scripts/canvas";
    import Global from "./Global.svelte";

    let titre = "LES $ACTUS$ DE LA SEMAINE"
    let date = "$15/04$"
    let variante:number = 1
    export let isatiIndex:string
    let files:File[];
    
    async function beforeUpdateCallback(template:Template,config:configuration,formatting){
        if (files) {
            let image = await template.loadImageFile(files[0])
            template.drawResizeCropImage(image, 270,210,810,810)
        }

        await template.drawBackground()

        let y = template.drawFormattedTexte(titre,65,1080-65,192,formatting.f5)
        template.drawFormattedTexte(date,65,1080-65, y+66,formatting.f5)
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 1/${variante}.png`} beforeUpdateCallback={beforeUpdateCallback}>
    <Input placeholder="Titre" type="text" bind:value={titre}/>
    <Input placeholder="Date" type="text" bind:value={date}/>
    <Input placeholder="Image" type="file" bind:files={files}/>
    <Input placeholder="Variante" type="select"  bind:value={variante}>
        <option value="1" selected={true}>Fond 1</option>
        <option value="2">Fond 2</option>
        <option value="3">Fond 3</option>
        <option value="4">Fond 4</option>
        <option value="5">Fond 5</option>
        <option value="6">Fond 6</option>
        <option value="7">Fond 7</option>
        <option value="8">Fond 8</option>
        <option value="9">Fond 9</option>
    </Input>
</Global>