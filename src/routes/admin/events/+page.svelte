<script lang="ts">
    import TableEditor from "$lib/components/editor/TableEditor.svelte";
	import {  eventEditorStructure } from "$lib/scripts/editorStructure";
    import { events_private } from "$lib/store";

</script>

<TableEditor data={new eventEditorStructure($events_private)}></TableEditor>