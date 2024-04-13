<script lang="ts">
    import TableEditor from "$lib/components/editor/TableEditor.svelte";
	import {  articleEditorStructure } from "$lib/scripts/editorStructure";
    import { articles } from "$lib/store";

</script>

<TableEditor data={new articleEditorStructure($articles)}></TableEditor>
