<script lang="ts">
 
    import Global from "./Global.svelte";
    import Input from "$lib/components/individuels/Input.svelte";
    import type { Template, configuration } from "canvas-editor";

    let titre = "PLUS D'INFOS DANS TES $MAILS$ !"
    let subtitle = "- MAIS J'AI RIEN REÇU ?\n- VÉRIFIE TES SPAMS ET ENVOIE TON MAIL EN MP !"
        
    export let isatiIndex:string

    async function beforeUpdateCallback(template:Template,config:configuration,formatting){
        await template.drawBackground()
        await template.drawFormattedTexte(titre,65,1080-65,150,formatting.f1)
        await template.drawFormattedTexte(subtitle,110,1080-65,415,formatting.f4)
    }

</script>

<Global isatiIndex={isatiIndex} backgroundURL={`./postes/Page 6 - Fin/fond.png`} beforeUpdateCallback={beforeUpdateCallback}>
    <Input placeholder="Titre" type="text" bind:value={titre}/>
    <Input placeholder="Subtitle" type="textarea" bind:value={subtitle}/>
</Global>