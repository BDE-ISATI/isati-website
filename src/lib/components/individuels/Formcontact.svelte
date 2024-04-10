<script lang="ts">
    import Button from "./Button.svelte";

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

<div>
    <label>Votre nom</label>
    <input bind:value={nom}>
    <label>Vous recontacter</label>
    <input bind:value={contact} >
    <label>Votre message</label>
    <textarea bind:value={msg} rows="10"></textarea>
    <Button on:click={send}>Envoyer</Button>
</div>

<style>
    
    div {
        display: flex;
        flex-direction: column;
        gap:8px;
        width: 300px;;
    }
    textarea{
        flex:1;
        
        resize: none;
        outline: unset;
        border: unset;
        color : var(--text);
    }
</style>