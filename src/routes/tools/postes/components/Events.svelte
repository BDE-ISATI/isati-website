<script lang="ts">
    import Global from "./Global.svelte";
    import Input from "$lib/components/individuels/Input.svelte";
    import type { Template, configuration } from "canvas-editor";

    let variante:string

    export let isatiIndex:string

    let files : File[]

    async function beforeUpdateCallback(template:Template,config:configuration,formatting){
        if (files) {
            let image = await template.loadImageFile(files[0])
            template.drawResizeCropImage(image,0,0,1080,1080)
        }
        await template.drawBackground()
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 3 - Event/${variante}.png`} beforeUpdateCallback={beforeUpdateCallback}>
    <Input placeholder="Image" type="file" bind:files={files}/>
    <Input placeholder="Variante" type="select"  bind:value={variante}>
        <option value="1" selected={true}>Fond 1</option>
        <option value="2">Fond 2</option>
    </Input>
</Global>