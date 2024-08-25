<script lang="ts">

    import { fade  } from 'svelte/transition';
    import Button from "$lib/components/individuels/Button.svelte";
    
    export let data

</script>


<svelte:head>
    <title>ISATI BDE</title>
    <meta name="description" content="">
</svelte:head>



<div class="flex flex-col gap-4">

    
    <div class="flex justify-evenly">
        <a href="/tools/article"><Button>Editeur Article</Button></a>
        <a href="/tools/mails"><Button>Editeur Mails</Button></a>
        <a href="/tools/postes"><Button>Editeur Postes</Button></a>
        <a href="/tools/birthday"><Button>Editeur Anniversaires</Button></a>
        <a href="/tools/club-jeu"><Button>Editeur Club Jeu</Button></a>
        <a href="/tools/club-jap"><Button>Editeur Club Japonais</Button></a>
        <a href="/tools/volley"><Button>Editeur Volley</Button></a>
    </div>

    {#key data.pathname}
        <div class="" in:fade={{ duration: 1000}}>
            <slot></slot>
        </div>
    {/key}
    

</div>