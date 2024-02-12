<script lang="ts">
    import Button from "../individuels/Button.svelte";
    import HalfCard from "../individuels/HalfCard.svelte";
</script>

<div class="main">

    <h2>Les salles</h2>

    <div class="content">
        <HalfCard main="Salle 104" sub="Libre" icone="41"></HalfCard>
        <HalfCard main="Salle 104" sub="Libre" icone="41"></HalfCard>
        <HalfCard main="Salle 104" sub="Libre" icone="41"></HalfCard>
        <HalfCard main="Salle 104" sub="Libre" icone="41"></HalfCard>
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
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap:10px;
        place-items: center;
    }

    .action {
        display: grid;
        place-items: center;
    }

</style>