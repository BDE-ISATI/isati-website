<script lang="ts">
    import TableEditor from "$lib/components/editor/TableEditor.svelte";
	import {  userEditorStructure } from "$lib/scripts/editorStructure";
    import { members_private } from "$lib/store";
</script>

<TableEditor data={new userEditorStructure($members_private)}></TableEditor>
