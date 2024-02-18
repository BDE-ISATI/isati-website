<script lang="ts"></script>

<button on:click><slot></slot></button>

<style>

button {
	background-color:var(--alternatif);
	border:unset;

	box-shadow: var(--shadow);
	border-radius: 26px;
	font-weight: 600;
	font-size: 16px;
	display: grid;
	place-items: center;
	user-select: none;

	width: 180px;
	height: 40px;
}

</style>