<script lang="ts">
    import { siInstagram, siDiscord, siFacebook, siGithub, siYoutube, siLinkedin } from "simple-icons";

    let icons = [
        {url:"https://www.instagram.com/isatibde/",icon:siInstagram},
        {url:"https://discord.gg/jfpVdAZT",icon:siDiscord},
        {url:"https://www.facebook.com/isati.lisatis",icon:siFacebook},
        {url:"https://github.com/organizations/BDE-ISATI",icon:siGithub},
        {url:"https://www.youtube.com/@isatibde",icon:siYoutube},
        {url:"https://www.linkedin.com/company/bde-isati/",icon:siLinkedin},
    ]

</script>
<footer>
    <a href="/tools">Nos outils</a>
    <a href="https://forms.gle/tPL5Txmq9Qb5t2Pn6" target="_blank">Nous soumettre votre article</a>
    <div class="networks">
        {#each icons as icon}
            <a href={icon.url} target="_blank" style={`color:#${icon.icon.hex};`}>
                {@html icon.icon.svg}
            </a>
        {/each}
    </div>

    <h4>Technologies utilisés</h4>
    <span>Hébergé sur AWS</span>
    <span>Svelte et editorjs </span>

    
    <h4>Avec le soutien</h4>
    <div class="univs">
        <img src="/logo/ESIR.svg">
        <img src="/logo/UR1.svg">
    </div>
    
    <h4>Isati © {(new Date()).getFullYear()}</h4>
</footer>

<style>

.univs{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap:16px;
    width: 200px;
    place-items: center;
}

.univs > img{
    width: 100%;
}

footer {
    margin-top:64px;
    background-color: var(--container);
    width: calc(100% - 32px);
    padding:48px 16px;
    display: flex;
    flex-direction: column;
    gap:32px;
    align-items: center;
}

:global(a > svg) {
    fill: currentColor;
    width: 100%;
    height:100%;
}

.networks {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    place-items: center;
    gap:32px;
}

.networks > a {
    background-color: var(--white);
    box-shadow: var(--shadow);
    width:20px;
    height:20px;
    display: block;
    border-radius: 50%;
    padding: 16px;
    line-height: 0;
}
span{
    text-align: center;
}

</style>