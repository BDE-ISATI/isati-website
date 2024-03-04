<script lang="ts">
    import Button from '$lib/components/individuels/Button.svelte';
    import { onMount } from 'svelte';
    import { apiUri,getIdToken } from '$lib/config';

    const url = apiUri + "/login";
    

let email: ""
let password: ""

async function send(){
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });

  let data = await response.json()

  document.cookie = `AccessToken=${data.AuthenticationResult.AccessToken};max-age=${data.AuthenticationResult.ExpiresIn}`;
  document.cookie = `RefreshToken=${data.AuthenticationResult.RefreshToken};max-age=${data.AuthenticationResult.ExpiresIn}`;
  document.cookie = `IdToken=${data.AuthenticationResult.IdToken};max-age=${data.AuthenticationResult.ExpiresIn}`;
  logged = true

}

let logged = false;

async function check() {
  if (!getIdToken()) { return false }
  try {
    let req = await fetch(apiUri+"/login/test", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getIdToken()}`
        }
    });
    return req.status == 200
  }
  catch {
    return false
  }
  
}

onMount(async () => {
  logged = await check()
})

</script>
{#if !logged}
  <form>
    <h1>Panel Admin</h1>
    <label>Login</label>
    <input bind:value={email}>
    <label>Password</label>
    <input type="password" bind:value={password}>
    <Button on:click={send}>Connexion</Button>
  </form>
{:else}
    <div class="itembarre">
      <Button on:click={() => {window.location.pathname="/admin/events"}}>Events</Button>
      <Button on:click={() => {window.location.pathname="/admin/users"}}>Users</Button>
      <Button on:click={() => {window.location.pathname="/admin/salles"}}>Salles</Button>
      <Button on:click={() => {window.location.pathname="/admin/articles"}}>Articles</Button>
    </div>
    <slot></slot>

{/if}

<style>

.itembarre{
  display: flex;
  gap:16px;

}

form{
  display: flex;
  flex-direction: column;
  gap:16px;
  color:var(--text);
  font-size:20px;
}

form input {
  background-color: var(--container);
  border: 0;
  width: calc(100% - 32px);

  padding:16px;
  color:var(--text);
  font-size:20px;
  outline: none;
}

</style>