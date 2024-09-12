<script lang="ts">
    import { PaperPlaneTilt } from "phosphor-svelte";
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";

    let nom = ""
    let contact = ""
    let pôle = ""
    let msg = ""
    let url = "https://discord.com/api/webhooks/1227688957962354779/lBbZ01Y6tE-_SfjIpa8rfzZy1b5KwZsEY_PR8fcYgNMOu35r3PpG7iOcaBZLWQOui8Ro"

    async function send(){
        if (nom === "" || contact === "" || msg === ""){
            alert("Message non Envoyé, merci de remplir tous les champs")
            return
        }


        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content:`# Destinateur : ${nom}\n# Destinataire : ${pôle}\n## Contact : ${contact}\n\n${msg}`}),
        })
        if (response.status == 204) {
            alert("Message Envoyé, merci 🙂")
        }
        else {
            alert("Message Non Envoyé, désolé 😥")
        }
    }
</script>

<div class="flex flex-col gap-2 w-full">
    <div class="flex gap-2">
        <Input type="text" placeholder="Nom" bind:value={nom}/>
        <Input type="select" placeholder="Pôle" bind:value={pôle}>
            <option value="<@&1226550229113770084>">Pôle Communication</option>
            <option value="<@&1226550092786438224>">Bureau Restreint</option>
            <option value="<@&1226550269073162403>">Pôle Tutorat</option>
            <option value="<@&1226550404351922207>">Pôle Event</option>
            <option value="">Autre</option>
        </Input>
        <Input type="text" placeholder="Mail ou réseau social" bind:value={contact}/>
    </div>
    
    <Input type="textarea" placeholder="Votre message" bind:value={msg}/>
    <Button on:click={send} icon={PaperPlaneTilt}>Envoyer</Button>
    
</div>