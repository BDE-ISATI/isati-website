<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import ButtonIcon from "$lib/components/individuels/ButtonIcon.svelte";
    import type { editorItems,editorItem } from "$lib/scripts/editorStructure";
	import { PencilSimple, Trash } from "phosphor-svelte"
    import { writable, type Writable } from "svelte/store";
    import EditeurRaw from "./EditeurRaw.svelte";

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
<table class="border-collapse table-auto w-full text-sm" >
	<thead>
		<tr>
			{#each Object.keys(data.structure) as key}
				<td class="p-2 overflow-hidden max-w-24 text-ellipsis whitespace-nowrap">{key}</td>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data.items as item,i}
			<tr>
				{#each Object.keys(data.structure) as key}
					<td class="p-2 overflow-hidden max-w-24 text-ellipsis whitespace-nowrap">
						{#if data.structure[key].type == "file"}
							<img src={`${data.structure[key].bucket}${item["ID"]}.webp?${(new Date()).getTime()}`} alt="pp">
						{:else}
							{item[key]}
						{/if}
					</td>
				{/each}
				<td class="p-2 overflow-hidden max-w-24 text-ellipsis whitespace-nowrap">
					<ButtonIcon on:click={() => {selected.set(item)}}>
						<PencilSimple weight="fill"/>
					</ButtonIcon>
				</td>
				<td class="p-2 overflow-hidden max-w-24 text-ellipsis whitespace-nowrap">
					<ButtonIcon on:click={async () => {await data.delete(i);data=data}}>
						<Trash weight="fill"/>
					</ButtonIcon>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<Button on:click={addEmpty}>Ajouter une entrée</Button>
{/if}