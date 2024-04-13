<script lang="ts">
    import TableEditor from "$lib/components/editor/TableEditor.svelte";
	import {  eventEditorStructure } from "$lib/scripts/editorStructure";
    import { events } from "$lib/store";

</script>

<TableEditor data={new eventEditorStructure($events)}></TableEditor>
