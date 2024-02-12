<script lang="ts"></script>

<button><slot></slot></button>

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

    width: 180px;
    height: 40px;
}



</style>