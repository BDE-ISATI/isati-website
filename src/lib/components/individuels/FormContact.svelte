<script lang="ts">
    import { PaperPlaneTilt } from "phosphor-svelte";
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";

    let nom = ""
    let contact = ""
    let msg = ""
    let url = "https://discord.com/api/webhooks/1227688957962354779/lBbZ01Y6tE-_SfjIpa8rfzZy1b5KwZsEY_PR8fcYgNMOu35r3PpG7iOcaBZLWQOui8Ro"

    async function send(){
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content:`# Destinateur : ${nom}\n## Contact : ${contact}\n\n${msg}`}),
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
        <Input type="text" placeholder="Mail ou réseau social" bind:value={contact}/>
    </div>
    
    <Input type="textarea" placeholder="Votre message" bind:value={msg}/>
    <Button on:click={send} icon={PaperPlaneTilt}>Envoyer</Button>
    
</div>