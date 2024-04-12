<script lang="ts">
    import Button from '$lib/components/individuels/Button.svelte';
    import { onMount } from 'svelte';
    import { apiUri,getIdToken } from '$lib/config';
    import { writable } from 'svelte/store';
    import { logged } from '$lib/store';

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
  $logged = true

}

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
  if (!$logged){
    $logged = await check()
  }
})

</script>
<div class="container">
  {#if !$logged}
    
      <h1>Panel Admin</h1>
      <label>Login</label>
      <input class="bg-container-800" bind:value={email}>
      <label>Password</label>
      <input class="bg-container-800" type="password" bind:value={password}>
      <Button on:click={send}>Connexion</Button>
    
  {:else}
    <div class="itembarre">
      <Button href={"/admin/events"}>Events</Button>
      <Button href={"/admin/users"}>Users</Button>
      <Button href={"/admin/salles"}>Salles</Button>
      <Button href={"/admin/articles"}>Articles</Button>
    </div>
    <slot></slot>
  {/if}
</div>

<style>

.container{
  display: flex;
  flex-direction: column;
  gap:16px;
  color:var(--text);
}

.itembarre{
  display: flex;
  gap:16px;

}

form input {
  border: 0;
  width: calc(100% - 32px);

  padding:16px;
  color:var(--text);
  font-size:20px;
  outline: none;
}

</style>