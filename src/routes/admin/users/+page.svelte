<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import { Users } from "$lib/scripts/bddToClass";
    import { onMount } from "svelte";
	import { apiUri } from "$lib/config";


	let users : Users

	onMount(async()=> {
		let data = await (await fetch(apiUri + "/members")).json()
		users = new Users(data)
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
	<Button on:click={save}>Sauvegarder</Button>
	<Button on:click={addEmpty}>Ajouter une personne</Button>
	<table >
		<thead>
			<tr>
				<td>Nom</td>
				<td>Contact (lien vers Instagram par exemple)</td>
				<td>Rôle</td>
				<td>Ordre d'apparition</td>
				<td>Photo</td>
				<td>Actions</td>
			</tr>
		</thead>
		<tbody>
			{#if users}
				{#each users.liste as user,i}
					<tr class:delete={user.delete}>
						<td><input bind:value={user.nom} type="text"></td>
						<td><input bind:value={user.contact} type="text"></td>
						<td><input bind:value={user.rôle} type="text"></td>
						<td><input bind:value={user.ordre} type="text"></td>
						<td>
							<label class="label-file" for={"file"+i}>
								<img src={user.photo} alt="pp">
							</label>
							<input id={"file"+i} class="input-bg" accept="image/*" on:change={(e) => user.changePhoto(e)} bind:files={user.filePicture} type="file">
						</td>
						<td>
							<Button on:click={() => {user.addToDelete();user=user}}>
								Ajouter à la corbeille
							</Button>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
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