<script lang="ts">

    export let placeholder = ""
    export let value:any|undefined = undefined
    export let files:any|undefined = undefined
    export let min:number|undefined = undefined
    export let max:number|undefined = undefined
    export let type = "text"

    let id = btoa(placeholder + type + Date.now().toString());

    let classes = "placeholder:opacity-0 peer transition shadow-black/5 ring-1 ring-slate-700/10 rounded-md w-full pb-2 pt-5 px-4 bg-container-700 leading-tight focus:outline"
</script>
<svelte:options accessors />

<div class="relative ">
    {#if type=="textarea"}
        <textarea rows="10" id={id} placeholder={placeholder} bind:value={value} class={classes}/>
    {:else if type=="file"}
        <input id={id} type="file" placeholder={placeholder} bind:files={files} class={classes}/>
    {:else if type=="number"}
        <input id={id} type="number" min={min} max={max} placeholder={placeholder} bind:value={value} class={classes}/>
    {:else if type=="range"}
        <input id={id} type="range" min={min} max={max} placeholder={placeholder} bind:value={value} class={classes}/>
    {:else if type=="date"}
        <input id={id} type="date" placeholder={placeholder} bind:value={value} class={classes}/>
    {:else if type=="time"}
        <input id={id} type="time" placeholder={placeholder} bind:value={value} class={classes}/>
    {:else if type=="password"}
        <input id={id} type="password" placeholder={placeholder} bind:value={value} class={classes}/>
    {:else if type=="select"}
        <select id={id} placeholder={placeholder} class={classes} bind:value={value} >
            <slot></slot>
        </select>
    {:else}
        <input id={id} type="text" placeholder={placeholder} bind:value={value} class={classes}/>
    {/if}


    {#if placeholder}
        <label for={id} class="absolute tracking-[.03125em] duration-300 -translate-y-2.5 scale-75 top-2.5 origin-[0] left-4 peer-focus:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5">
            {placeholder}
        </label>
    {/if}
</div>