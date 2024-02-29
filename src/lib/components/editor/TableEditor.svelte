<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
    import type { editorItems,editorItem } from "$lib/scripts/editorStructure";

	let dialog:HTMLDialogElement
    let selected:editorItem|undefined

    export let data:editorItems


	function addEmpty() {
		data.addEmpty()
		data = data
	}

	
</script>

<div style="margin:auto;display:grid; gap:16px; place-items:center;">
	<dialog bind:this={dialog}>
        {#if selected != undefined}
            {#each Object.keys(data.structure) as key}
                <label for={key}>{key}</label>

                {#if data.structure[key].type == "file" }
                    <input type="file" bind:files={selected[key]} id={key} >
                {:else if data.structure[key].type == "date" }
                <input type="date" bind:value={selected[key]} id={key} >
                {:else}
                    <input bind:value={selected[key]} id={key} >
                {/if}

            {/each}

            <Button on:click={() => {data.save(selected);dialog.close()}}>Save</Button>
            <Button on:click={() => {dialog.close()}}>Cancel</Button>
		
		{/if}
	</dialog>

	<table >
		<thead>
			<tr>
				{#each Object.keys(data.structure) as key}
					<td>{key}</td>
				{/each}
			</tr>
		</thead>
		<tbody>
            {#each data.items as item,i}
                <tr>
                    {#each Object.keys(data.structure) as key}
                        <td>
                            {#if data.structure[key].type == "file"}
                                <img src={item[key]} alt="pp">
                            {:else}
                                {item[key]}
                            {/if}
                        </td>
                    {/each}
                    <td>
                        <Button on:click={() => {selected=item;dialog.show()}}>
                            <i class="ph ph-pencil-simple"></i>
                        </Button>
                    </td><td>
                        <Button on:click={() => {data.delete(i);data=data}}>
                            <i class="ph ph-trash"></i>
                        </Button>
                    </td>
                </tr>
            {/each}
		</tbody>
	</table>
	<Button on:click={addEmpty}>Ajouter une personne</Button>
</div>

<style>

	dialog{
		z-index: 50;
	}

	.delete{
		background-color: var(--primary);
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

	input {
		height: 100%;
		width: calc(100% - 32px);
		color:var(--text);
		background-color: #00000055;
		border: unset;
		padding:16px;
	}
</style>