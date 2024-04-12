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

<div class="flex flex-col gap-2">
    <div class="flex gap-2">
        <input class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" placeholder="nom" bind:value={nom}>
        <input class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" placeholder="mail ou réseau social" bind:value={contact} >
    </div>
    <textarea class="shadow-black/5 ring-1 ring-slate-700/10 appearance-none rounded-md w-full p-2 text-[var(--text)] bg-container-700 leading-tight focus:outline" placeholder="Votre message" bind:value={msg} rows="10"></textarea>
    <Button on:click={send} icone="ph-fill ph-paper-plane-tilt">Envoyer</Button>
</div>