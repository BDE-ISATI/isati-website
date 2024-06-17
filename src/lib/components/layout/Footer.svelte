<script lang="ts">
    import { siInstagram, siDiscord, siFacebook, siGithub, siYoutube, siLinkedin } from "simple-icons";

    import Formcontact from "$lib/components/individuels/Formcontact.svelte"
    import ButtonIcon from "../individuels/ButtonIcon.svelte";

    import Isati from "$lib/components/logo/Isati.svelte"
    import ESIR from "$lib/components/logo/ESIR.svelte"
    import UR1 from "$lib/components/logo/UR1.svelte"

    let icons = [
        {url:"https://www.instagram.com/isatibde/",icon:siInstagram},
        {url:"https://discord.gg/jfpVdAZT",icon:siDiscord},
        {url:"https://www.facebook.com/isati.lisatis",icon:siFacebook},
        {url:"https://github.com/organizations/BDE-ISATI",icon:siGithub},
        {url:"https://www.youtube.com/@isatibde",icon:siYoutube},
        {url:"https://www.linkedin.com/company/bde-isati/",icon:siLinkedin},
    ]
    
</script>

<footer class="w-full bg-container-800 grid gap-8 p-8 pb-24 md:pb-8">

    <div class="max-w-md w-full m-auto flex justify-between">
        <a href="/tools">Nos outils</a>
        <a href="https://forms.gle/tPL5Txmq9Qb5t2Pn6" target="_blank">Nous soumettre votre article</a>
    </div>
        
    <div class="max-w-md w-full m-auto grid grid-cols-3 gap-8 justify-items-center fill-current">
        {#each icons as icon}
            <ButtonIcon href={icon.url} target="_blank">
                {@html icon.icon.svg}
            </ButtonIcon>
        {/each}
    </div>

    <div class="max-w-md w-full m-auto">
        <Formcontact></Formcontact>
    </div>

    <div class="max-w-md w-full m-auto grid grid-cols-3 gap-8">
        <Isati></Isati>
        <ESIR></ESIR>
        <UR1></UR1>
    </div>

    <a class="text-center" href="/legals">Mentions Légales</a>

</footer>

