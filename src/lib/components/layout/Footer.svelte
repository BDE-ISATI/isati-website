<script lang="ts">
    import { siInstagram, siDiscord, siFacebook, siGithub, siYoutube, siLinkedin } from "simple-icons";

    let icons = [
        {url:"",icon:siInstagram},
        {url:"",icon:siDiscord},
        {url:"",icon:siFacebook},
        {url:"",icon:siGithub},
        {url:"",icon:siYoutube},
        {url:"",icon:siLinkedin},
    ]

</script>
<footer>
    <div class="networks">
        {#each icons as icon}
            <a href={icon.url} style={`color:#${icon.icon.hex};`}>
                {@html icon.icon.svg}
            </a>
        {/each}
    </div>
    <p>Site Isati</p>
</footer>

<style>

footer {
    margin-top:64px;
    background-color: var(--container);
    width: calc(100% - 32px);
    padding:48px 16px;
}

:global(a > svg) {
    fill: currentColor;
    width: 100%;
    height:100%;
}

.networks {
    display: flex;
    gap:16px;
    justify-content: center;
}

a {
    background-color: var(--alternatif);
    width:30px;
    aspect-ratio: 1/1;
    display: block;
    border-radius: 50%;
    padding: 16px;
    line-height: 0;
}

</style>