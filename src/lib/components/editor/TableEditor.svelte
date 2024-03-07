<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import ButtonIcon from "$lib/components/individuels/ButtonIcon.svelte";
    import type { editorItems,editorItem } from "$lib/scripts/editorStructure";
    import TexteEditor from "$lib/components/editor/TexteEditor.svelte";
    import { writable, type Writable } from "svelte/store";
    import EditeurRaw from "./EditeurRaw.svelte";

	let dialog:HTMLDialogElement
    let selected:Writable<editorItem|undefined> = writable(undefined)

    export let data:editorItems

	function addEmpty() {
		data.addEmpty()
		data = data
	}

	
</script>

{#if $selected}
	<EditeurRaw selected={selected} data={data} ></EditeurRaw>
{:else}
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
							<img src={data.structure[key].bucket + item["ID"] + ".webp"} alt="pp">
						{:else}
							{item[key]}
						{/if}
					</td>
				{/each}
				<td>
					<ButtonIcon on:click={() => {selected.set(item)}}>
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
{/if}


<!-- <div style="margin:auto;display:grid; gap:16px; place-items:center;">
	<dialog bind:this={dialog}>
        {#if selected != undefined}
            {#each Object.keys(data.structure) as key}
				{#if data.structure[key].editable }
					<label for={key}>{key}</label>

					{#if data.structure[key].type == "file" }
						<input type="file" bind:files={selected[key]} bind:this={data.toBeProcessed[key]} id={key} >
					{:else if data.structure[key].type == "date" }
						<input type="date" bind:value={selected[key]} id={key} >
					{:else if data.structure[key].type == "texteditor" }
						{#if selected.ID}
							{#await data.fetch(selected,key)}
								loading
							{:then datajson}
								<TexteEditor editorItems={data} key={key} importedData={datajson}></TexteEditor>
							{/await}
						{:else}
							<TexteEditor editorItems={data} key={key}></TexteEditor>
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
                                <img src={data.structure[key].bucket + item["ID"] + ".webp"} alt="pp">
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
</div> -->

<style>


</style>