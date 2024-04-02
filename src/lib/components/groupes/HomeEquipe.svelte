<script lang="ts">
	import Button from "$lib/components/individuels/Button.svelte";
	import HalfCard from "$lib/components/individuels/HalfCard.svelte";

	import { members } from "$lib/store";

</script>

<div class="main">

	<h1><a class="action" href={"/equipe"}>ÉQUIPE<i class="ph ph-caret-right"></i></a></h1>

	<div class="content">

		{#each $members.slice(0,4) as user}
			<HalfCard main={user.nom} sub={user.rôle} contact={user.contact} icone={`https://website-members-pictures.s3.eu-west-3.amazonaws.com/${user.ID}.webp`}></HalfCard>
		{/each}
	</div>
	

</div>

<style>

	.main {
		display: flex;
		flex-direction: column;
		gap:15px;
	}

	.content {
		display: flex;
		justify-content: space-between
	}

	.action {
		text-decoration: unset;
		color:var(--text);
		display: flex;
		gap:8px;
		transition: 0.5s;
		align-items: center;
	}

	.action:hover{
		gap: 24px;
	}

	@media (max-width : 720px) {
		.content {
			display: grid;
			grid-template-columns: repeat(2,1fr);
			gap:10px;
			place-items: center;
		}
	}

</style>