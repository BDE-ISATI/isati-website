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

<style>
	table {
		max-width: 100%;
	}
	table td {
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>