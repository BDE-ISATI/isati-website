<script lang="ts">
    import Global from "./Global.svelte";
    import Input from "$lib/components/individuels/Input.svelte";
    import { Template, CE_Picture, CE_Vec2 } from "canvas-editor";
    import { afterUpdate } from "svelte";

    let variante:string = "1"

    export let isatiIndex:string

    let files : File[]
    let image = new CE_Picture()
    image.resize(new CE_Vec2(1080,1080))

    afterUpdate(async() => {
        if (files) {
            await image.loadFromFile(files[0])
        }
    })

    async function addBeforeBackground(template:Template){
        template.add(image)
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 3 - Event/${variante}.png`} addBeforeBackground={addBeforeBackground}>
    <Input placeholder="Image" type="file" bind:files={files}/>
    <Input placeholder="Variante" type="select"  bind:value={variante}>
        <option value="1">Fond 1</option>
        <option value="2">Fond 2</option>
    </Input>
</Global>