<script lang="ts">
    import Button from "$lib/components/individuels/Button.svelte";
    import ActusCard from "$lib/components/individuels/ActusCard.svelte";
</script>

<div class="main">

    <h2>Les actus</h2>

    <div class="content">

        <div>
            <ActusCard url="https://www.isati.org/wp-content/uploads/2022/06/pasted-image-0-350x350.png" text="MDD #12"></ActusCard>
            <ActusCard url="https://www.isati.org/wp-content/uploads/2022/05/Olympiades-21.05-avec-QR-code-350x350.png" text="MDD #11"></ActusCard>
            <ActusCard url="https://www.isati.org/wp-content/uploads/2022/05/DEEPTECHTOUR-RENNES_1200x630-350x350.jpg" text="MDD #10"></ActusCard>
            <ActusCard url="" text="MDD #25"></ActusCard>
            <ActusCard url="" text="MDD #25"></ActusCard>
        </div>
        
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
        width: calc( 100% + 12px);
        scrollbar-width: none;
        overflow-x: scroll;
        overflow-y:visible ;
        padding:10px;
        margin:-16px;
    }

    .content::-webkit-scrollbar {
        display: none;
    }


    .content > div {
        width: fit-content;
        display: flex;
        gap:10px;
    }

    .action {
        display: grid;
        place-items: center;
    }

</style>