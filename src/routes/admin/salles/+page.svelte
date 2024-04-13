<script lang="ts">
    import TableEditor from "$lib/components/editor/TableEditor.svelte";
    import { apiUri } from "$lib/config";

	import {  salleEditorStructure } from "$lib/scripts/editorStructure";

    import { onMount } from "svelte";


	let salles:salleEditorStructure

	onMount(async()=> {
		salles = new salleEditorStructure((await (await fetch(apiUri + "/salles")).json())["data"])
	})


</script>
{#if salles}
	<TableEditor data={salles}></TableEditor>
{/if}