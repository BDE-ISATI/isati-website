<script lang="ts">
    import TableEditor from "$lib/components/editor/TableEditor.svelte";
    import { apiUri } from "$lib/config";

	import {  articleEditorStructure } from "$lib/scripts/editorStructure";

    import { onMount } from "svelte";


	let articles:articleEditorStructure

	onMount(async()=> {
		articles = new articleEditorStructure(await (await fetch(apiUri + "/articles")).json())
	})


</script>
{#if articles}
	<TableEditor data={articles}></TableEditor>
{/if}