<script lang="ts">
    import TableEditor from "$lib/components/editor/TableEditor.svelte";
    import { apiUri } from "$lib/config";
	import {  eventEditorStructure } from "$lib/scripts/editorStructure";
    import { onMount } from "svelte";
    
    let events:eventEditorStructure

	onMount(async()=> {
		events = new eventEditorStructure((await (await fetch(apiUri + "events")).json())["data"])
	})

</script>

<TableEditor data={events}></TableEditor>
