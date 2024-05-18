<script lang="ts">

    export let id = ""
    export let placeholder = ""
    export let value:any|undefined = undefined
    export let files:any|undefined = undefined
    export let type = "text"

    let classes = "shadow-black/5 ring-1 ring-slate-700/10 rounded-md w-full p-2 bg-container-700 leading-tight focus:outline"
</script>

{#if type=="textarea"}
    <textarea rows="10" id={id} placeholder={placeholder} bind:value={value} class={classes}/>
{:else if type=="file"}
    <input id={id} type="file" placeholder={placeholder} bind:files={files} class={classes}/>

{:else if type=="number"}
    <input id={id} type="number" placeholder={placeholder} bind:value={value} class={classes}/>
{:else if type=="date"}
    <input id={id} type="date" placeholder={placeholder} bind:value={value} class={classes}/>
{:else if type=="time"}
    <input id={id} type="time" placeholder={placeholder} bind:value={value} class={classes}/>
{:else if type=="password"}
    <input id={id} type="password" placeholder={placeholder} bind:value={value} class={classes}/>
{:else if type=="select"}
    <select id={id} class={classes} bind:value={value} >
        <slot></slot>
    </select>
{:else}
    <input id={id} type="text" placeholder={placeholder} bind:value={value} class={classes}/>
{/if}