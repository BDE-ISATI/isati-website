<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import HalfCard from "$lib/components/individuels/HalfCard.svelte";
</script>

<div class="main">

    <h2>L'équipe</h2>

    <div class="content">
        <HalfCard main="Tanguy" sub="Secrétaire" icone=""></HalfCard>
        <HalfCard main="Tanguy" sub="Secrétaire" icone=""></HalfCard>
        <HalfCard main="Tanguy" sub="Secrétaire" icone=""></HalfCard>
        <HalfCard main="Tanguy" sub="Secrétaire" icone=""></HalfCard>
    </div>
    
    <div class="action">
        <Button>Voir plus</Button>
    </div>

</div>

<style>

    .main {
        display: flex;
        flex-direction: column;
        gap:15px;
    }

    .content {
        display: flex;
        justify-content: space-between
    }

    .action {
        display: grid;
        place-items: center;
    }

    @media (max-width : 720px) {
        .content {
            display: grid;
            grid-template-columns: repeat(2,1fr);
            gap:10px;
            place-items: center;
        }
    }

</style>