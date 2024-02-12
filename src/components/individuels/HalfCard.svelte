<script lang="ts">
    export let icone = ""
    export let main:string
    export let sub:string
</script>

<div class="container">
    <div class="content">
        <span class="icon">{icone}</span>
        <div>
            <p class="main">{main}</p>
            <p class="sub">{sub}</p>
        </div>
    </div>
</div>

<style>

    .container {
        width: calc(160px - 20px);
        height: calc(70px - 20px);
        border-radius: 26px;
        box-shadow: var(--shadow);
        padding:10px;
        background-color: var(--container);
        position: relative;
    }

    .icon {
        height: 50px;
        width: 50px;
        border-radius: 16px;
        background-color: #7DCA89;
        display: block;
        display: grid;
        place-items: center;
        font-size: 36px;
        font-weight: 600;
        color:var(--text);
    }

    .content {
        display: flex;
        align-items: center;
        gap:16px;
    }

    p.main {
        margin: 0;
        font-weight: 600;
        font-size: 16px;
        line-height: 15px;
    }

    p.sub {
        margin: 0;
        font-weight: 300;
        font-size: 12px;
        line-height: 15px;
    }

</style>