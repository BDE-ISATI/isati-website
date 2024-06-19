<script lang="ts">
    import Input from "$lib/components/individuels/Input.svelte";
    import { Template, CE_FormattedText, CE_Vec2, CE_Picture } from "canvas-editor";
    import Global from "./Global.svelte";
    import { afterUpdate } from "svelte";
    import { formatting } from "./format";

    let variante:number = 1
    export let isatiIndex:string
    let files:File[];    
    let image = new CE_Picture()

    image.resize(new CE_Vec2(810,810))
    image.position = new CE_Vec2(270,210)

    afterUpdate(async() => {
        if (files) {
            await image.loadFromFile(files[0])
        }
    })

    async function addBeforeBackground(template:Template){
        template.add(image)
    }

    let titre  = new CE_FormattedText(formatting.f5,950)
    titre.data = "LES $ACTUS$ DE LA SEMAINE"
    titre.position = new CE_Vec2(65,192)

    let date  = new CE_FormattedText(formatting.f5,950)
    date.data = "$15/04$"
    date.position = new CE_Vec2(65,738)

    async function addAfterBackground(template:Template){
        template.add(titre)
        template.add(date)
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 1/${variante}.png`} addBeforeBackground={addBeforeBackground} addAfterBackground={addAfterBackground}>
    <Input placeholder="Titre" type="text" bind:value={titre.data}/>
    <Input placeholder="Date" type="text" bind:value={date.data}/>
    <Input placeholder="Image" type="file" bind:files={files}/>
    <Input placeholder="Variante" type="select"  bind:value={variante}>
        <option value={1}>Fond 1</option>
        <option value={2}>Fond 2</option>
        <option value={3}>Fond 3</option>
        <option value={4}>Fond 4</option>
        <option value={5}>Fond 5</option>
        <option value={6}>Fond 6</option>
        <option value={7}>Fond 7</option>
        <option value={8}>Fond 8</option>
        <option value={9}>Fond 9</option>
    </Input>
</Global>