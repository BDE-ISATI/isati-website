<script lang="ts">
    export let url  : string
    export let text : string
</script>

<div class="container">
    <div class="content">
        <h3>{text}</h3>
    </div>
    <img src={url} alt={text}>
</div>

<style>

    .container {
        position: relative;
        display: block;
        width : 200px;
        height: 300px;
        border-radius: 26px;
        overflow: hidden;
        box-shadow: var(--shadow);
        background-color: var(--container);
    }

    .content {
        position: absolute;
        top:0;
        left:0;
        padding:20px;
        background-color: rgba(0, 0, 0, 0.35);
        width: 100%;
        height: 100%;
        z-index: 1;
        
    }

    .content > h3 {
        color:var(--white);
    }

    img {
        height: 100%;
        width : 100%;
        top: 0;
        left:0;
        position: absolute;
        object-fit: cover;
    }


</style>