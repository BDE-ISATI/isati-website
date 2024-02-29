<script lang="ts">
    import TableEditor from "$lib/components/editor/TableEditor.svelte";
    import { apiUri } from "$lib/config";

	import {  userEditorStructure } from "$lib/scripts/editorStructure";

    import { onMount } from "svelte";


	let users:userEditorStructure

	onMount(async()=> {
		let usersraw = await (await fetch(apiUri + "/members")).json()

		for (let user of usersraw){
			// user["photo"] = `https://website-members-pictures.s3.eu-west-3.amazonaws.com/${user.ID}.webp`
		}

		users = new userEditorStructure(usersraw)
	})


</script>
{#if users}

<TableEditor data={users}></TableEditor>
{/if}