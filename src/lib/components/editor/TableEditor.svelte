<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import ButtonIcon from "$lib/components/individuels/ButtonIcon.svelte";
    import type { editorItems,editorItem } from "$lib/scripts/editorStructure";
    import TexteEditor from "$lib/components/editor/TexteEditor.svelte";

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
				{#if data.structure[key].const }
				{:else}
					<label for={key}>{key}</label>

					{#if data.structure[key].type == "file" }
						<input type="file" bind:files={selected[key]} id={key} >
					{:else if data.structure[key].type == "date" }
						<input type="date" bind:value={selected[key]} id={key} >
					{:else if data.structure[key].type == "texteditor" }
						{#if selected.ID}
							{#await data.fetch(selected,key)}
								loading
							{:then datajson}
								<TexteEditor bind:data={selected[key]} importedData={datajson}></TexteEditor>
							{/await}
						{:else}
							<TexteEditor bind:data={selected[key]}></TexteEditor>
						{/if}
					{:else}
						<input bind:value={selected[key]} id={key} >
					{/if}
				{/if}

            {/each}

			<div style="display:flex; gap:16px;">
				<Button on:click={async() => {await data.save(selected);dialog.close();data = data}}>Save</Button>
				<Button on:click={() => {dialog.close()}}>Cancel</Button>
			</div>
		
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
                        <ButtonIcon on:click={() => {selected=item;dialog.show()}}>
                            <i class="ph ph-pencil-simple"></i>
                        </ButtonIcon>
                    </td><td>
                        <ButtonIcon on:click={async () => {await data.delete(i);data=data}}>
                            <i class="ph ph-trash"></i>
                        </ButtonIcon>
                    </td>
                </tr>
            {/each}
		</tbody>
	</table>
	<Button on:click={addEmpty}>Ajouter une entrée</Button>
</div>

<style>

	dialog{
		z-index: 50;
		overflow: auto;
		top: 50%;
		transform: translateY(-50%);
		resize: vertical;
		background-color: var(--container);
		color:var(--text);
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
		width: calc(100% - 32px);
		color:var(--text);
		background-color: #00000055;
		border: unset;
		padding:16px;
	}
</style>