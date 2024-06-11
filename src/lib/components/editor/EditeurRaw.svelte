<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import ButtonIcon from "$lib/components/individuels/ButtonIcon.svelte";
    import type { editorItems,editorItem } from "$lib/scripts/editorStructure";
    import TexteEditor from "$lib/components/editor/TexteEditor.svelte";
    import { type Writable } from "svelte/store";
    import Input from "../individuels/Input.svelte";
    export let selected:Writable<editorItem|undefined>
    export let data:editorItems

    let id = $selected.ID

</script>

<div class="text-container-100 flex gap-4 flex-col">
    {#each Object.keys(data.structure) as key}
        {#if data.structure[key].editable }
            {#if data.structure[key].type == "file" }
                <Input type="file" bind:files={$selected[key]} bind:this={data.toBeProcessed[key]} placeholder={key} /> ⚠️ Bug
            {:else if data.structure[key].type == "date" }
                <Input type="date" bind:value={$selected[key]} placeholder={key} />
                
            {:else if data.structure[key].type == "texteditor" }
                {#if id}
                    {#await data.fetch(id,key)}
                        loading
                    {:then datajson}
                        <TexteEditor editorItems={data} key={key} importedData={datajson}></TexteEditor>
                    {/await}
                    
                {:else}
                    <TexteEditor editorItems={data} key={key}></TexteEditor>
                {/if}
            {:else if data.structure[key].type == "number"} 
                <Input type="number" bind:value={$selected[key]} placeholder={key} />
            {:else} 
                <Input bind:value={$selected[key]} placeholder={key} />
            {/if}
        {/if}
    {/each}

    <div class="flex gap-4">
        <Button on:click={async() => {await data.save($selected);selected.set(undefined)}}>Save</Button>
        <Button on:click={() => {selected.set(undefined)}}>Cancel</Button>
    </div>
</div>