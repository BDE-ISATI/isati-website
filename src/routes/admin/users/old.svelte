<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import { Users } from "$lib/scripts/bddToClass";
    import { onMount } from "svelte";
	import { apiUri } from "$lib/config";

	let dialog:HTMLDialogElement

	let users : Users

	let selected

	let structure = {
		ID:"text",
		nom:"text",
		contact:"text",
		rôle:"text",
		ordre:"number",
		photo:"file"
	}

	onMount(async()=> {
		users = await (await fetch(apiUri + "/members")).json()
		
		for (let user of users){
			user["photo"] = `https://website-members-pictures.s3.eu-west-3.amazonaws.com/${user.ID}.webp`
		}

		// users = new Users(data)
	})

	function save() {
		users.save()
		users = users
	}

	function addEmpty() {
		users.addEmpty()
		users = users
	}

	
</script>

<div style="margin:auto;display:grid; gap:16px; place-items:center;">
	<dialog bind:this={dialog}>
		{#if selected != undefined}
		{#each Object.keys(structure) as key}
			<label for={key}>{key}</label>
			<input bind:value={selected[key]} id={key} >
		{/each}

		<Button on:click={() => {dialog.close()}}>Save</Button>
		<Button on:click={() => {dialog.close()}}>Cancel</Button>
		
		{/if}
	</dialog>

	<!-- <Button on:click={save}>Sauvegarder</Button> -->

	<table >
		<thead>
			<tr>
				{#each Object.keys(structure) as key}
					<td>{key}</td>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if users}
				{#each users as user}
				<tr>
						{#each Object.keys(structure) as key}
							<td>
								{#if structure[key] == "file"}
									<img src={user[key]} alt="pp">
								{:else}
									{user[key]}
								{/if}
							</td>
						{/each}
						<!-- <td>{user.nom}</td>
						<td>{user.contact}</td>
						<td>{user.rôle}</td>
						
						<td><img src={user.photo} alt="pp"></td> -->
							<!-- <label class="label-file" for={"file"+i}>
								
							</label>
							<input id={"file"+i} class="input-bg" accept="image/*" on:change={(e) => user.changePhoto(e)} bind:files={user.filePicture} type="file">
						</td> -->
						<td>
							<Button on:click={() => {selected=user;dialog.show()}}>
								<i class="ph ph-pencil-simple"></i>
							</Button>
						</td><td>
							<Button on:click={() => {user.addToDelete();user=user}}>
								<i class="ph ph-trash"></i>
							</Button>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
	<Button on:click={addEmpty}>Ajouter une personne</Button>
</div>

<style>

	dialog{
		z-index: 50;
	}

	.delete{
		background-color: var(--primary);
	}

	.input-bg {
		display: none;
	}

	.label-file{
		display: grid;
		place-items: center;
		position: relative;
	}

	.label-file > img {
		height: 100px;
		width: 100px;
		object-fit: cover;
	}

	.label-file::after {
		content: "Changer";
		background-color: #00000055;
		position: absolute;
		padding:16px;
	}

	input {
		height: 100%;
		width: calc(100% - 32px);
		color:var(--text);
		background-color: #00000055;
		border: unset;
		padding:16px;
	}
</style>