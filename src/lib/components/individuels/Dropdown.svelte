<script lang="ts">
    export let options = [{
        action : () => {},
        value: "Test",
        icon: "",
    }]
</script>

<div class="dropbox">
    <button>Ajouter au calendrier</button>
    <ul class="fold">
        {#each options as option}
            <li on:click={option.action}>{option.value}</li>
        {/each}
    </ul>
</div>

<style>
    .dropbox{
        position:relative;
        /* width:fit-content; */
    }
    .dropbox:focus-within > .fold{
        display:block;
    }
    
    .fold {
        display:none;
        position:absolute;
        flex-direction:column;
        height:300px;
        padding:0;
        width:100%;
    }
    
    button,li{
        border: 26px;
        all:unset;
        cursor:pointer;
        display:flex;
        gap:16px;
        align-items:center;
        padding:10px 16px;
        width:calc( 100% - 32px);
        justify-content: space-between;
        background:var(--container);
        box-shadow: var(--shadow);
    }
    
    button:hover,li:hover {
        background:var(--container);
    }
    
    /* button::after {
        font-size:10px;
        content:"▼";
    }
     */
    li {
        display:block;
        width:100%;
    }    
</style>