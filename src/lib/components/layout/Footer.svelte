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
    <span>Hébergé sur AWS</span>
    <span>Technologies : Svelte et editorjs </span>

    <span>Isati © {(new Date()).getFullYear()}</span>
</footer>

<style>

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
    width:200px;
    place-items: center;
    gap:32px;
}

.networks > a {
    background-color: var(--white);
    box-shadow: var(--shadow);
    width:20px;
    aspect-ratio: 1/1;
    display: block;
    border-radius: 50%;
    padding: 16px;
    line-height: 0;
}
span{
    text-align: center;
}

</style>