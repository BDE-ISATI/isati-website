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

<div class="container">
    {#each Object.keys(data.structure) as key}
        {#if data.structure[key].editable }
            <label for={key}>{key}</label>

            {#if data.structure[key].type == "file" }
                <Input type="file" bind:files={$selected[key]} bind:this={data.toBeProcessed[key]} id={key} /> ⚠️ Bug
            {:else if data.structure[key].type == "date" }
                <Input type="date" bind:value={$selected[key]} id={key} />
                
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
                <Input type="number" bind:value={$selected[key]} id={key} />
            {:else} 
                <Input bind:value={$selected[key]} id={key} />
            {/if}
        {/if}
    {/each}

    <div style="display:flex; gap:16px;">
        <Button on:click={async() => {await data.save($selected);selected.set(undefined)}}>Save</Button>
        <Button on:click={() => {selected.set(undefined)}}>Cancel</Button>
    </div>
</div>

<style>
	.container{
        display: flex;
        gap: 16px;
        flex-direction: column;
		color:var(--text);
	}

	.delete{
		background-color: var(--primary);
	}

    label {
        color:var(--text);
    }

	.input-bg {
		display: none;
	}

	.label-file{
		display: grid;
		place-items: center;
		position: relative;
	}

	.label-file > img {
		height: 100px;
		width: 100px;
		object-fit: cover;
	}

	.label-file::after {
		content: "Changer";
		background-color: #00000055;
		position: absolute;
		padding:16px;
	}


</style>