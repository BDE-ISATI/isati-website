<script lang="ts">
 
    import Global from "./Global.svelte";
    import Input from "$lib/components/individuels/Input.svelte";
    import { CE_FormattedText, CE_Vec2, type Template } from "canvas-editor";
    import { formatting } from "./format";
       
    export let isatiIndex:string
    
    let titre = new CE_FormattedText(formatting.f1,999)
    titre.position = new CE_Vec2(65,150)
    titre.data = "PLUS D'INFOS DANS TES $MAILS$ !"

    let subtitle = new CE_FormattedText(formatting.f4,999)
    subtitle.position = new CE_Vec2(110,415)
    subtitle.data = "- MAIS J'AI RIEN REÇU ?\n- VÉRIFIE TES SPAMS ET ENVOIE TON MAIL EN MP !"

    async function addAfterBackground(template:Template){
        template.add(titre)
        template.add(subtitle)
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 6 - Fin/fond.png`} addAfterBackground={addAfterBackground}>
    <Input placeholder="Titre" type="text" bind:value={titre.data}/>
    <Input placeholder="Subtitle" type="textarea" bind:value={subtitle.data}/>
</Global>