<script lang="ts">
    import Button from "../individuels/Button.svelte";
    import HalfCard from "../individuels/HalfCard.svelte";
</script>

<div class="main">

    <h2>L'équipe</h2>

    <div class="content">
        <HalfCard main="Tanguy" sub="Secrétaire"></HalfCard>
        <HalfCard main="Tanguy" sub="Secrétaire"></HalfCard>
        <HalfCard main="Tanguy" sub="Secrétaire"></HalfCard>
        <HalfCard main="Tanguy" sub="Secrétaire"></HalfCard>
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

</style>